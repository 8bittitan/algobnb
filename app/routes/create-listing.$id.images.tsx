import { json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'

import { Button } from '~/components/ui/button'
import { requiresUser } from '~/lib/auth.server'
import prisma from '~/lib/db.server'

export async function loader({ request, params }: LoaderFunctionArgs) {
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

  return json({
    listing,
  })
}

export default function CreateListingImages() {
  const { listing } = useLoaderData<typeof loader>()

  return (
    <div>
      <h1>Listing images</h1>

      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-secondary px-8 py-4">
        <Button asChild variant="outline">
          <Link to={`/create-listing/${listing.id}/amenities`}>Back</Link>
        </Button>
        <Button type="submit">Next</Button>
      </div>
    </div>
  )
}
