import { Form, Link } from '@remix-run/react'

import AuthModal from '~/components/auth-modal'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import useRootUser from '~/hooks/useRootUser'

export default function MainNavigation() {
  const user = useRootUser()

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
