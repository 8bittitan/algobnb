import { json, type MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '~/components/ui/carousel'
import prisma from '~/lib/db.server'

export const meta: MetaFunction = () => {
  return [
    { title: 'AlgoBNB' },
    { name: 'description', content: 'BNB powered by Algolia and Remix' },
  ]
}

export const loader = async () => {
  const listings = await prisma.listing.findMany({
    include: {
      images: true,
    },
    take: 20,
  })

  return json({
    listings,
  })
}

const PerNight = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export default function Index() {
  const { listings } = useLoaderData<typeof loader>()

  return (
    <div>
      <h1>Welcome to Remix</h1>
      <div className="mx-auto mt-8 grid max-w-screen-2xl grid-cols-5 gap-8 px-6">
        {listings.map((listing) => (
          <article key={listing.id} className="space-y-4">
            <Carousel className="group">
              <CarouselContent>
                {listing.images.map((image) => (
                  <CarouselItem key={image.id}>
                    <img
                      className="rounded-lg"
                      src={image.url}
                      alt={image.caption ?? ''}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              {listing.images.length > 1 && (
                <>
                  <CarouselPrevious
                    variant="default"
                    className="left-3 hidden group-hover:inline-flex"
                  />
                  <CarouselNext
                    variant="default"
                    className="right-3 hidden group-hover:inline-flex"
                  />
                </>
              )}
            </Carousel>
            <p>{listing.name}</p>
            <span>
              <strong>{PerNight.format(listing.price / 100)}</strong> per night
            </span>
          </article>
        ))}
      </div>
    </div>
  )
}
