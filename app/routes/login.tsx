import { redirect, type ActionFunctionArgs } from '@remix-run/node'
import { Form } from '@remix-run/react'
import { Label } from '@radix-ui/react-label'

import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { auth } from '~/lib/auth.server'

export default function Login() {
  return (
    <div className="flex justify-center pt-20">
      <div>
        <h1 className="text-4xl font-bold">Login</h1>
        <Form className="mt-8 w-96 space-y-4" method="POST">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input id="username" name="username" type="text" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" />
          </div>
          <Button type="submit">Register</Button>
        </Form>
      </div>
    </div>
  )
}

export async function action({ request }: ActionFunctionArgs) {
  const fData = await request.formData()

  const username = fData.get('username')?.toString() ?? ''
  const password = fData.get('password')?.toString() ?? ''

  const key = await auth.useKey('username', username.toLowerCase(), password)
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
