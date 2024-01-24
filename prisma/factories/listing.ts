import { faker } from '@faker-js/faker'
import type { Listing } from '@prisma/client'

type ReturnedListing = Omit<Listing, 'createdAt' | 'updatedAt' | 'id'>

type ListingFactoryParams = Partial<ReturnedListing>

export function createListing(
  params: Partial<ListingFactoryParams> & { userId: string },
): ReturnedListing {
  return {
    name: faker.commerce.productName(),
    price: faker.number.int({ min: 8000, max: 20000 }),
    beds: faker.number.int({ min: 1, max: 5 }),
    baths: faker.number.float({ min: 1, max: 5, precision: 0.5 }),
    sqft: faker.number.int({ min: 500, max: 5000 }),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zip: parseInt(faker.location.zipCode()),
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(0),
    has_self_check_in: faker.helpers.arrayElement([true, false]),
    has_office: faker.helpers.arrayElement([true, false]),
    has_lakeview: faker.helpers.arrayElement([true, false]),
    has_kitchen: faker.helpers.arrayElement([true, false]),
    has_beach_access: faker.helpers.arrayElement([true, false]),
    has_wifi: faker.helpers.arrayElement([true, false]),
    has_free_parking: faker.helpers.arrayElement([true, false]),
    has_hot_tub: faker.helpers.arrayElement([true, false]),
    has_pool: faker.helpers.arrayElement([true, false]),
    has_pets_allowed: faker.helpers.arrayElement([true, false]),
    has_wheelchair_accessible: faker.helpers.arrayElement([true, false]),
    has_smoking_allowed: faker.helpers.arrayElement([true, false]),
    ...params,
  }
}
