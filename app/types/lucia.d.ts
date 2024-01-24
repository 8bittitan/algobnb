/// <reference types="lucia" />

declare namespace Lucia {
  type Auth = import('../lib/auth.server').Auth
  type DatabaseUserAttributes = {
    username: string
    avatar?: string
  }
}
