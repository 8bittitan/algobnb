import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  redirect,
} from '@remix-run/node'
import { Form, Link, useLoaderData } from '@remix-run/react'

import { Button } from '~/components/ui/button'
import { Checkbox } from '~/components/ui/checkbox'
import { requiresUser } from '~/lib/auth.server'
import prisma from '~/lib/db.server'

export async function loader({ request, params }: LoaderFunctionArgs) {
  await requiresUser(request)
  const listingId = params.id

  const listing = await prisma.listing.findUnique({
    where: {
      id: listingId,
    },
  })

  if (!listing) {
    return redirect('/create-listing')
  }

  return json({
    listing,
  })
}

export default function CreateListingListing() {
  const { listing } = useLoaderData<typeof loader>()

  return (
    <Form method="POST">
      <div>
        <Checkbox
          name="has_self_check_in"
          defaultChecked={listing.has_self_check_in}
        />
        <Checkbox name="has_pool" defaultChecked={listing.has_pool} />
        <Checkbox name="has_lakeview" defaultChecked={listing.has_lakeview} />
        <Checkbox name="has_wifi" defaultChecked={listing.has_wifi} />
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-secondary px-8 py-4">
        <Button asChild variant="outline">
          <Link to="/create-listing/info">Back</Link>
        </Button>
        <Button type="submit">Next</Button>
      </div>
    </Form>
  )
}

export async function action({ request, params }: ActionFunctionArgs) {
  const user = await requiresUser(request)

  const listing = await prisma.listing.findUnique({
    where: {
      userId: user.userId,
      id: params.id,
    },
  })

  if (!listing) {
    return redirect('/create-listing')
  }

  const fData = await request.formData()

  const fields = Object.entries(Object.fromEntries(fData.entries())).reduce(
    (acc, curr) => {
      const [key, value] = curr
      return {
        [key]: value === 'on',
        ...acc,
      }
    },
    {},
  )

  await prisma.listing.update({
    where: {
      id: listing.id,
      userId: user.userId,
    },
    data: fields,
  })

  return redirect(`/create-listing/${listing.id}/images`)
}
