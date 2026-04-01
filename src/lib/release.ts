import { APP_VERSION, COS_PUBLIC_BASE_URL, DOWNLOAD_URLS, RELEASE_MANIFEST_URL, RELEASE_REPO } from '@/lib/constants'

export type ReleaseInfo = {
  version: string
  publishedAt: string | null
  notes: string | null
  downloads: {
    macos: string
    windows: string
  }
}

export const FALLBACK_RELEASE_INFO: ReleaseInfo = {
  version: APP_VERSION,
  publishedAt: null,
  notes: null,
  downloads: DOWNLOAD_URLS,
}

const RELEASE_API_URL = `https://api.github.com/repos/${RELEASE_REPO}/releases/latest`
const RELEASE_REQUEST_TIMEOUT_MS = 4000

function normalizeVersion(value: unknown) {
  return String(value || '').replace(/^v/i, '').trim()
}

function buildMirrorDownloadUrls(version: string) {
  return {
    macos: `${COS_PUBLIC_BASE_URL}/releases/v${version}/Lingo_${version}_aarch64.dmg`,
    windows: `${COS_PUBLIC_BASE_URL}/releases/v${version}/Lingo_${version}_x64-setup.exe`,
  }
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

  if (!macos || !windows) {
    return null
  }

  return {
    version,
    publishedAt: typeof payload.published_at === 'string' ? payload.published_at : null,
    notes: typeof payload.notes === 'string' ? payload.notes : null,
    downloads: { macos, windows },
  }
}

function mapReleasePayload(payload: unknown): ReleaseInfo | null {
  if (!isRecord(payload)) {
    return null
  }

  const version = normalizeVersion(payload.tag_name)

  if (!version) {
    return null
  }

  return {
    version,
    publishedAt:
      typeof payload.published_at === 'string'
        ? payload.published_at
        : typeof payload.created_at === 'string'
          ? payload.created_at
          : null,
    notes: typeof payload.body === 'string' ? payload.body : null,
    downloads: buildMirrorDownloadUrls(version),
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

export async function fetchLatestReleaseInfo(): Promise<ReleaseInfo> {
  try {
    const payload = await fetchJson(RELEASE_MANIFEST_URL, {
      Accept: 'application/json',
    })
    const release = mapManifestPayload(payload)
    if (release) {
      return release
    }
  } catch {
    // Fall back to GitHub metadata only when COS manifest is not reachable.
  }

  try {
    const payload = await fetchJson(RELEASE_API_URL, {
      Accept: 'application/vnd.github+json',
    })
    const release = mapReleasePayload(payload)
    if (release) {
      return release
    }
  } catch {
    // Fall back to bundled defaults.
  }

  return FALLBACK_RELEASE_INFO
}
