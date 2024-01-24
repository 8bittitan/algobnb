import { faker } from '@faker-js/faker'

import { auth } from '~/lib/auth.server'

type Params = {
  username: string
  password: string
}

export async function createUserWithCredentials(params?: Params) {
  const username = params?.username ?? faker.internet.userName()

  const user = await auth.createUser({
    key: {
      providerId: 'username',
      providerUserId: username.toLowerCase(),
      password: params?.password ?? 'password',
    },
    attributes: {
      username,
    },
  })

  return user
}
