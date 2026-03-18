export const APP_VERSION = '0.3.13'
export const RELEASE_REPO = 'tinyhu666/Lingo'
export const COS_PUBLIC_BASE_URL = 'https://lingo-1259551686.cos.ap-shanghai.myqcloud.com'
export const RELEASE_MANIFEST_URL = `${COS_PUBLIC_BASE_URL}/releases/latest-web.json`

export const REPO_URL = `https://github.com/${RELEASE_REPO}`
export const RELEASES_URL = `${REPO_URL}/releases/latest`
export const CHANGELOG_URL = `${REPO_URL}/blob/main/CHANGELOG.md`
export const LICENSE_URL = `${REPO_URL}/blob/main/README.en.md#license`
export const DISCORD_URL = 'https://discord.gg/cWB49jCfdP'
export const SITE_URL = 'https://lingo.ink/'

export const DOWNLOAD_URLS = {
  macos: `${COS_PUBLIC_BASE_URL}/releases/v${APP_VERSION}/Lingo_${APP_VERSION}_aarch64.dmg`,
  windows: `${COS_PUBLIC_BASE_URL}/releases/v${APP_VERSION}/Lingo_${APP_VERSION}_x64-setup.exe`,
}

export const NAV_SECTIONS = [
  { key: 'features', href: '#features' },
  { key: 'supportedGames', href: '#supported-games' },
  { key: 'howItWorks', href: '#how-it-works' },
  { key: 'download', href: '#download' },
] as const
