import {
  ActionFunctionArgs,
  json,
  redirect,
  type LoaderFunctionArgs,
} from '@remix-run/node'
import {
  Form,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'

import '~/styles.css'

import { Button } from '~/components/ui/button'
import { auth } from '~/lib/auth.server'

export async function loader({ request }: LoaderFunctionArgs) {
  const authReq = auth.handleRequest(request)
  const session = await authReq.validate()

  return json({
    user: session?.user,
  })
}

export default function App() {
  const { user } = useLoaderData<typeof loader>()

  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {user ? (
          <div>
            <p>{user.username}</p>
            <Form method="POST">
              <Button variant="secondary">Logout</Button>
            </Form>
          </div>
        ) : null}
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

export async function action({ request }: ActionFunctionArgs) {
  const authReq = auth.handleRequest(request)
  const session = await authReq.validate()

  if (!session) {
    return new Response('Not currently logged in', {
      status: 401,
    })
  }

  await auth.invalidateSession(session.sessionId)

  const sessionCookie = auth.createSessionCookie(null)

  return redirect('/', {
    headers: {
      'Set-Cookie': sessionCookie.serialize(),
    },
  })
}
