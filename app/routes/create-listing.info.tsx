import { ActionFunctionArgs, redirect } from '@remix-run/node'
import { Form, Link } from '@remix-run/react'

import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { requiresUser } from '~/lib/auth.server'
import prisma from '~/lib/db.server'

export default function CreateListingInfo() {
  return (
    <Form method="POST" className="space-y-4">
      <div>
        <Label htmlFor="name">Listing Title</Label>
        <Input name="name" id="name" type="text" />
      </div>

      <div>
        <Label htmlFor="price">Price per night</Label>
        <Input type="number" name="price" id="price" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-secondary px-8 py-4">
        <Button asChild variant="outline">
          <Link to="/create-listing">Back</Link>
        </Button>
        <Button type="submit">Next</Button>
      </div>
    </Form>
  )
}

export async function action({ request }: ActionFunctionArgs) {
  const user = await requiresUser(request)

  const fData = await request.formData()

  const name = fData.get('name')?.toString() ?? ''
  const price = fData.get('price')?.toString() ?? ''

  const listing = await prisma.listing.create({
    data: {
      userId: user.userId,
      name,
      price: parseFloat(price),
    },
  })

  return redirect(`/create-listing/${listing.id}/amenities`)
}
