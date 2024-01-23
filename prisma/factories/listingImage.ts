import { faker } from '@faker-js/faker'
import type { ListingImage } from '@prisma/client'

type ReturnedListing = Omit<ListingImage, 'createdAt' | 'updatedAt' | 'id'>

type ListingImageFactoryParams = Partial<ReturnedListing> & {
  listingId: string
}

export function createListingImage(
  params: ListingImageFactoryParams,
  transientParams?: { imageCategory: string },
): ReturnedListing {
  return {
    url: faker.image.urlLoremFlickr({
      category: transientParams?.imageCategory ?? 'house',
    }),
    caption: faker.lorem.sentence(),
    ...params,
  }
}
