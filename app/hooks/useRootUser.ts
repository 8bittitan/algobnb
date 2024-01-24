import { useRouteLoaderData } from '@remix-run/react'

import { RootLoaderData } from '~/root'

export default function useRootUser() {
  const { user } = useRouteLoaderData<RootLoaderData>('root')!

  return user
}
