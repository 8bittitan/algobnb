import { Form, Link } from '@remix-run/react'
import { User } from 'lucia'

import AuthModal from '~/components/auth-modal'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'

type Props = {
  user?: User
}

export default function MainNavigation({ user }: Props) {
  return (
    <nav className="mx-auto flex max-w-screen-2xl justify-between px-6 py-6">
      <Link to="/">AlgoBNB</Link>

      <div>
        <Input placeholder="search" />
      </div>

      <div>
        {user ? (
          <Form method="POST">
            <Button variant="secondary">Logout</Button>
          </Form>
        ) : (
          <div className="space-x-4">
            <AuthModal />
          </div>
        )}
      </div>
    </nav>
  )
}
