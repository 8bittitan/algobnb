import { LoaderFunctionArgs, redirect } from '@remix-run/node'
import { OAuthRequestError } from '@lucia-auth/oauth'
import { parseCookie } from 'lucia/utils'

import { auth, githubAuth } from '~/lib/auth.server'

export async function loader({ request }: LoaderFunctionArgs) {
  const cookies = parseCookie(request.headers.get('Cookie') ?? '')
  const storedState = cookies.github_oauth_state

  const url = new URL(request.url)

  const state = url.searchParams.get('state')
  const code = url.searchParams.get('code')

  if (!storedState || !state || storedState !== state || !code) {
    return new Response(null, {
      status: 400,
      statusText: 'Bad Request',
    })
  }

  try {
    const { getExistingUser, createUser, githubUser } =
      await githubAuth.validateCallback(code)

    const getUser = async () => {
      const existingUser = await getExistingUser()

      if (existingUser) return existingUser

      const user = await createUser({
        attributes: {
          username: githubUser.login,
          avatar: githubUser.avatar_url,
        },
      })

      return user
    }

    const user = await getUser()
    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    })
    const sessionCookie = auth.createSessionCookie(session)

    return redirect('/', {
      headers: {
        'Set-Cookie': sessionCookie.serialize(),
      },
    })
  } catch (err) {
    if (err instanceof OAuthRequestError) {
      return new Response(null, {
        status: 400,
      })
    }

    return new Response(null, {
      status: 500,
      statusText: 'Internal Server Error',
    })
  }
}
