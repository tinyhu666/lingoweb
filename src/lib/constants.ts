export const APP_VERSION = '0.3.10'

export const REPO_URL = 'https://github.com/tinyhu666/Lingo'
export const RELEASES_URL = `${REPO_URL}/releases/latest`
export const CHANGELOG_URL = `${REPO_URL}/blob/main/CHANGELOG.md`
export const LICENSE_URL = REPO_URL
export const DISCORD_URL = 'https://discord.gg/cWB49jCfdP'
export const SITE_URL = 'https://lingo.ink/'

export const DOWNLOAD_URLS = {
  macos: `https://github.com/tinyhu666/Lingo/releases/download/v${APP_VERSION}/Lingo_${APP_VERSION}_aarch64.dmg`,
  windows: `https://github.com/tinyhu666/Lingo/releases/download/v${APP_VERSION}/Lingo_${APP_VERSION}_x64-setup.exe`,
}

export const NAV_SECTIONS = [
  { key: 'features', href: '#features' },
  { key: 'howItWorks', href: '#how-it-works' },
  { key: 'download', href: '#download' },
] as const
