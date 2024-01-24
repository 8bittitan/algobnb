import { redirect, type ActionFunctionArgs } from '@remix-run/node'

import { auth } from '~/lib/auth.server'

export async function action({ request }: ActionFunctionArgs) {
  const fData = await request.formData()

  const username = fData.get('username')?.toString() ?? ''
  const password = fData.get('password')?.toString() ?? ''

  // TODO: Validate username and password

  const getUser = async () => {
    try {
      const key = await auth.useKey(
        'username',
        username.toLowerCase(),
        password,
      )

      return key
    } catch (e) {
      return null
    }
  }

  const key = await getUser()

  if (key) {
    const session = await auth.createSession({
      userId: key.userId,
      attributes: {},
    })
    const sessionCookie = auth.createSessionCookie(session)

    return redirect('/', {
      headers: {
        'Set-Cookie': sessionCookie.serialize(),
      },
    })
  }

  const user = await auth.createUser({
    key: {
      providerId: 'username',
      providerUserId: username.toLowerCase(),
      password,
    },
    attributes: {
      username,
    },
  })
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
}
