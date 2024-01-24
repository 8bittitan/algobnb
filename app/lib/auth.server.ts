import { prisma } from '@lucia-auth/adapter-prisma'
import { github } from '@lucia-auth/oauth/providers'
import { lucia } from 'lucia'
import { web } from 'lucia/middleware'

import db from '~/lib/db.server'
import env from '~/lib/env.server'

export const auth = lucia({
  adapter: prisma(db),
  env: env.NODE_ENV === 'development' ? 'DEV' : 'PROD',
  middleware: web(),
  sessionCookie: {
    expires: false,
  },
  getUserAttributes(data) {
    return {
      username: data.username,
      avatar: data.avatar,
    }
  },
})

export type Auth = typeof auth

export const githubAuth = github(auth, {
  clientId: env.GITHUB_CLIENT_ID,
  clientSecret: env.GITHUB_CLIENT_SECRET,
})
