import { Form } from '@remix-run/react'

import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'

export default function AuthModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Login</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login or Signup</DialogTitle>
          <DialogDescription>
            Login or Signup to be able to book a trip or post a listing
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <a
              href="/auth/github"
              className="flex w-full justify-center rounded-lg bg-secondary py-2 text-center text-secondary-foreground"
            >
              GitHub
            </a>
          </div>
          <div className="relative flex items-center justify-center">
            <span className="relative z-20 inline-flex bg-background px-2 text-sm text-foreground">
              OR
            </span>
            <div className="absolute left-1/2 z-10 h-[1px] w-full -translate-x-1/2 bg-foreground" />
          </div>
          <Form className="mt-8 w-96 space-y-4" method="POST" action="/auth">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" name="username" type="text" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" />
            </div>
            <Button type="submit">Submit</Button>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
