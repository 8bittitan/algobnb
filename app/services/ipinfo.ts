import IPinfoWrapper from 'node-ipinfo'
import { getClientIPAddress } from 'remix-utils/get-client-ip-address'

import env from '~/lib/env.server'

export async function getLatitudeLongitudeFromIP(request: Request) {
  const ipAddress = getClientIPAddress(request)

  let coords = { latitude: 45.0275, longitude: 84.6748 }

  if (ipAddress) {
    const ipInfo = new IPinfoWrapper(env.IPINFO_TOKEN)

    const { loc } = await ipInfo.lookupIp(ipAddress)

    if (loc) {
      const [lat, lng] = loc.split(',')

      coords = {
        latitude: parseFloat(lat),
        longitude: parseFloat(lng),
      }
    }
  }

  return coords
}