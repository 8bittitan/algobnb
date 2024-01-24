import { PrismaClient } from '@prisma/client'
import { User } from 'lucia'

import { createListing } from './factories/listing'
import { createListingImage } from './factories/listingImage'
import { createUserWithCredentials } from './factories/user'

const prisma = new PrismaClient()

async function main() {
  const mainUser = await createUserWithCredentials({
    username: 'PJankowski25',
    password: 'password',
  })

  const homeListing = await prisma.listing.create({
    data: createListing({
      name: 'Blue Heaven',
      latitude: 45.0275,
      longitude: 84.6748,
      userId: mainUser.userId,
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

  const users: User[] = []

  for (let i = 0; i < 5; i++) {
    const user = await createUserWithCredentials()

    users.push(user)
  }

  for (let i = 0; i < 100; i++) {
    const listing = await prisma.listing.create({
      data: createListing({
        userId: users[i % users.length].userId,
      }),
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
