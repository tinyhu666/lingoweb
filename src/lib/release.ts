import { APP_VERSION, DOWNLOAD_URLS, RELEASE_MANIFEST_URL } from '@/lib/constants'

export type ReleaseDownloads = {
  macos: string
  windows: string
  windowsPortable: string | null
}

export type ReleaseInfo = {
  version: string
  downloads: ReleaseDownloads
}

export const FALLBACK_RELEASE_INFO: ReleaseInfo = {
  version: APP_VERSION,
  downloads: DOWNLOAD_URLS,
}

const RELEASE_REQUEST_TIMEOUT_MS = 4000

function normalizeVersion(value: unknown) {
  return String(value || '').replace(/^v/i, '').trim()
}

export function compareVersions(left: string, right: string) {
  const leftParts = normalizeVersion(left)
    .split('.')
    .map((part) => Number.parseInt(part, 10) || 0)
  const rightParts = normalizeVersion(right)
    .split('.')
    .map((part) => Number.parseInt(part, 10) || 0)
  const length = Math.max(leftParts.length, rightParts.length)

  for (let index = 0; index < length; index += 1) {
    const leftValue = leftParts[index] || 0
    const rightValue = rightParts[index] || 0

    if (leftValue > rightValue) {
      return 1
    }

    if (leftValue < rightValue) {
      return -1
    }
  }

  return 0
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object'
}

function mapManifestPayload(payload: unknown): ReleaseInfo | null {
  if (!isRecord(payload)) {
    return null
  }

  const version = normalizeVersion(payload.version)
  const downloads = isRecord(payload.downloads) ? payload.downloads : null

  if (!version || !downloads) {
    return null
  }

  const macos = typeof downloads.macos === 'string' ? downloads.macos : ''
  const windows = typeof downloads.windows === 'string' ? downloads.windows : ''
  const windowsPortable = typeof downloads.windows_portable === 'string' ? downloads.windows_portable : null

  if (!macos || !windows) {
    return null
  }

  return {
    version,
    downloads: { macos, windows, windowsPortable },
  }
}

async function fetchJson(url: string, headers: HeadersInit) {
  const controller = new AbortController()
  const timeoutId = window.setTimeout(() => controller.abort(), RELEASE_REQUEST_TIMEOUT_MS)

  try {
    const response = await fetch(url, {
      cache: 'no-store',
      headers,
      signal: controller.signal,
    })

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`)
    }

    return response.json()
  } finally {
    window.clearTimeout(timeoutId)
  }
}

/**
 * Loads the public release manifest that the client release pipeline publishes
 * so the download links always point at the current installers. A manifest
 * older than the bundled version is ignored.
 */
export async function fetchLatestReleaseInfo(): Promise<ReleaseInfo> {
  try {
    const payload = await fetchJson(RELEASE_MANIFEST_URL, {
      Accept: 'application/json',
    })
    const release = mapManifestPayload(payload)
    if (release && compareVersions(release.version, APP_VERSION) >= 0) {
      return release
    }
  } catch {
    // Fall back to bundled defaults.
  }

  return FALLBACK_RELEASE_INFO
}
