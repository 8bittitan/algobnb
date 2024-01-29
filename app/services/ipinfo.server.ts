import { IPinfoWrapper, LruCache } from 'node-ipinfo'
import { getClientIPAddress } from 'remix-utils/get-client-ip-address'

import env from '~/lib/env.server'

const cache = new LruCache({
  max: 5000,
  ttl: 12 * 1000 * 60 * 60,
})

export async function getLatitudeLongitudeFromIP(request: Request) {
  const ipAddress = getClientIPAddress(request)

  const coords = {
    latitude: env.DEFAULT_LATITUDE,
    longitude: env.DEFAULT_LONGITUDE,
  }

  if (!ipAddress) return coords

  try {
    const ipInfo = new IPinfoWrapper(env.IPINFO_TOKEN, cache, 600)

    const { loc } = await ipInfo.lookupIp(ipAddress)

    const [lat, lng] = loc.split(',')

    if (!lat && !lng) return coords

    return {
      latitude: parseFloat(lat),
      longitude: parseFloat(lng),
    }
  } catch (e) {
    console.error(e)

    return coords
  }
}
