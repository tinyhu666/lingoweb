export const APP_VERSION = '0.9.7'
export const RELEASE_REPO = 'tinyhu666/Lingo'
export const COS_PUBLIC_BASE_URL = 'https://lingo-1259551686.cos.ap-shanghai.myqcloud.com'
export const RELEASE_MANIFEST_URL = './releases/latest-web.json'

export const DISCORD_URL = 'https://discord.gg/cWB49jCfdP'
export const QQ_GROUP_ID = '1095706752'
export const SITE_URL = 'https://lingo.ink/'

export const DOWNLOAD_URLS = {
  macos: `${COS_PUBLIC_BASE_URL}/releases/Lingo_latest_aarch64.dmg`,
  windows: `${COS_PUBLIC_BASE_URL}/releases/Lingo_latest_x64-setup.exe`,
}

export const NAV_SECTIONS = [
  { key: 'features', href: '#features' },
  { key: 'supportedGames', href: '#supported-games' },
  { key: 'howItWorks', href: '#how-it-works' },
] as const
