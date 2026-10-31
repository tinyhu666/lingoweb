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

/** Default translation hotkey of the client, rendered as keycap labels. */
export function getTranslationHotkey(platform: PlatformId): string[] {
  return platform === 'macos' ? ['⌘', 'T'] : ['Alt', 'T']
}

/** Modifier the client uses for phrase shortcuts (⌘+1 on macOS, Alt+1 on Windows). */
export function getPhraseModifier(platform: PlatformId): string {
  return platform === 'macos' ? '⌘' : 'Alt'
}
