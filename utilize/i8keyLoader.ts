import type { AppProps } from "next/dist/shared/lib/router/router"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function i8keyLoader({ locale }: AppProps) {
  const i8key = await serverSideTranslations(locale, ['common', 'footer'])
  return i8key
}
