/** Bundled client version; manifests older than this are ignored when resolving download links. */
export const APP_VERSION = '1.0.0'
export const COS_PUBLIC_BASE_URL = 'https://lingo-1259551686.cos.ap-shanghai.myqcloud.com'
export const RELEASE_MANIFEST_URL = './releases/latest-web.json'

export const DISCORD_URL = 'https://discord.gg/cWB49jCfdP'
export const QQ_GROUP_ID = '1095706752'
export const CONTACT_EMAIL = 'huruiw@outlook.com'
export const SITE_URL = 'https://lingo.ink/'

export const DOWNLOAD_URLS = {
  macos: `${COS_PUBLIC_BASE_URL}/releases/Lingo_latest_aarch64.dmg`,
  windows: `${COS_PUBLIC_BASE_URL}/releases/Lingo_latest_x64-setup.exe`,
  windowsPortable: `${COS_PUBLIC_BASE_URL}/releases/Lingo_latest_x64-portable.zip`,
}

export const NAV_SECTIONS = [
  { key: 'features', href: '#features' },
  { key: 'styles', href: '#styles' },
  { key: 'games', href: '#games' },
  { key: 'howItWorks', href: '#how-it-works' },
  { key: 'download', href: '#download' },
] as const

export type NavSectionKey = (typeof NAV_SECTIONS)[number]['key']

/** Languages the client can translate between, in the client's own order. */
export const TRANSLATION_LANGUAGES = ['zh', 'en-SEA', 'ko', 'en', 'fr', 'ru', 'es', 'ja', 'de'] as const
