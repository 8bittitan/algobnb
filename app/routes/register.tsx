import { ActionFunctionArgs, redirect } from '@remix-run/node'
import { Form } from '@remix-run/react'

import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { auth } from '~/lib/auth.server'

export default function Register() {
  return (
    <div className="flex justify-center pt-20">
      <div>
        <h1 className="text-4xl font-bold">Register</h1>
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
