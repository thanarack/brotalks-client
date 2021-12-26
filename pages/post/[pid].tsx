import type { AppProps } from 'next/dist/shared/lib/router/router'
import { i8keyLoader } from '../../utilize/i8keyLoader'
import Post from '../../components/Pages/Post'

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

export const getStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
  }
}

export default Post
