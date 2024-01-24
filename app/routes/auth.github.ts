import { serializeCookie } from 'lucia/utils'

import { githubAuth } from '~/lib/auth.server'
import env from '~/lib/env.server'

export async function loader() {
  const [url, state] = await githubAuth.getAuthorizationUrl()

  const stateCookie = serializeCookie('github_oauth_state', state, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production', // `true` for production
    path: '/',
    maxAge: 60 * 60,
  })

  return new Response(null, {
    headers: {
      Location: url.toString(),
      'Set-Cookie': stateCookie,
    },
    status: 302,
  })
}
