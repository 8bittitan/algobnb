import algoliasearch from 'algoliasearch'

import prisma from '~/lib/db.server'
import env from '~/lib/env.server'

async function importListings() {
  try {
    const client = algoliasearch(env.ALGOLIA_APP_ID, env.ALGOLIA_ADMIN_API_KEY)

    const index = client.initIndex('listings')

    const listings = await prisma.listing.findMany({
      include: {
        images: true,
      },
    })

    const listingsForAlolia = listings.map((l) => ({
      ...l,
      _geolc: {
        lat: l.latitude,
        lng: l.longitude,
      },
      objectID: l.id,
    }))

    await index.clearObjects()

    await index.saveObjects(listingsForAlolia)

    console.log('DONE')
  } catch (err) {
    console.error(err)
  }
}

importListings()
