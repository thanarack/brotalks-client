import type { AppProps } from 'next/dist/shared/lib/router/router'
import { i8keyLoader } from '../../utilize/i8keyLoader'
import Setting from '../../components/Pages/user/Setting'

/**
 * Initial props of page.
 * @return    {object}
 */
export const getStaticProps = async (props: AppProps) => {
  const i8key = await i8keyLoader(props)
  return {
    props: {
      ...i8key,
    },
  }
}

export default Setting
