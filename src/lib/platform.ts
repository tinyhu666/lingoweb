export type PlatformId = 'macos' | 'windows' | 'unknown'

export function detectPreferredPlatform(userAgent?: string): PlatformId {
  const source =
    typeof userAgent === 'string'
      ? userAgent
      : typeof navigator !== 'undefined'
        ? navigator.userAgent
        : ''

  const normalized = source.toLowerCase()

  if (/(iphone|ipad|android)/.test(normalized)) {
    return 'unknown'
  }

  if (normalized.includes('macintosh') || normalized.includes('mac os x')) {
    return 'macos'
  }

  if (normalized.includes('windows')) {
    return 'windows'
  }

  return 'unknown'
}
