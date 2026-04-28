import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/cn'
import lingoLogoHorizontal from '@/assets/lingo-logo-horizontal.svg'

type BrandLogoProps = {
  className?: string
}

function BrandLogo({ className }: BrandLogoProps) {
  const { t } = useTranslation()

  return (
    <img
      alt={t('brand.appIconAlt')}
      className={cn('h-12 w-auto object-contain drop-shadow-[0_0_18px_rgba(96,165,250,0.28)]', className)}
      src={lingoLogoHorizontal}
    />
  )
}

export default BrandLogo
