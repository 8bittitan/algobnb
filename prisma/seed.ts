import { PrismaClient } from '@prisma/client'

import { createListing } from './factories/listing'
import { createListingImage } from './factories/listingImage'

const prisma = new PrismaClient()

async function main() {
  const homeListing = await prisma.listing.create({
    data: createListing({
      name: 'Blue Heaven',
    }),
  })

  const lakehouseImages = [
    createListingImage(
      { listingId: homeListing.id },
      { imageCategory: 'lakehouse' },
    ),
    createListingImage(
      { listingId: homeListing.id },
      { imageCategory: 'lakehouse' },
    ),
  ]

  for (const image of lakehouseImages) {
    await prisma.listingImage.create({
      data: image,
    })
  }

  for (let i = 0; i < 100; i++) {
    const listing = await prisma.listing.create({
      data: createListing(),
    })

    const randomNumberOfImages = Math.floor(Math.random() * 5) + 1

    for (let j = 0; j < randomNumberOfImages; j++) {
      await prisma.listingImage.create({
        data: createListingImage({ listingId: listing.id }),
      })
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
