import {
  ActionFunctionArgs,
  json,
  redirect,
  type LoaderFunctionArgs,
} from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'

import '~/styles.css'

import MainNavigation from '~/components/main-nav'
import { auth } from '~/lib/auth.server'

export async function loader({ request }: LoaderFunctionArgs) {
  const authReq = auth.handleRequest(request)
  const session = await authReq.validate()

  return json({
    user: session?.user,
  })
}

export type RootLoaderData = typeof loader

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <MainNavigation />
        <main className="mx-auto max-w-screen-2xl justify-between px-6">
          <Outlet />
        </main>
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
