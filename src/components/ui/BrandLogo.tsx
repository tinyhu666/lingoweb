import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/cn'
import lingoLogoHorizontal from '@/assets/lingo-logo-horizontal.svg'

type BrandLogoProps = {
  className?: string
}

function BrandLogo({ className }: BrandLogoProps) {
  const { t } = useTranslation()

  return <img alt={t('brand.appIconAlt')} className={cn('h-12 w-auto object-contain', className)} src={lingoLogoHorizontal} />
}

export default BrandLogo
