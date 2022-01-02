import type { NextPage } from 'next'
import { i18n } from 'next-i18next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MainLayout from '../Layout/MainLayout'
import Navbar from '../../components/Navbar'
// import PostsList from '../Post/postsList'
import TopMenu from '../../components/TopMenu'
import { RootState } from '../../store'
import { changeTheme } from '../../store/reducers/themeReducer'
import PostsListInfinity from '../Post/postsListInfinity'
import {
  onHasNextPage,
  onIsNextPageLoading,
  onSetItems,
} from '../../store/reducers/postsReducer'
import { generateIds } from '../../utilize/generateIds'
import SliderMenu from '../Navbar/SliderMenu'
import MainSection from '../Layout/MainSection'

const mockPosts = {
  id: '1',
  postType: 'post',
  user: {
    name: 'News Update',
    id: '99123223432',
    avatar: 'test',
    slug: '@newsofficial',
  },
  counts: {
    like: 123,
    comments: 342,
    repost: 34,
  },
  post: {
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    date: '2021-12-25T10:05:46.384Z',
  },
  isLiked: false,
}

const mockPostsImage = {
  id: '2',
  postType: 'image',
  user: {
    name: 'News Update',
    id: '99123223432',
    avatar: 'test',
    slug: '@newsofficial',
  },
  counts: {
    like: 123,
    comments: 342,
    repost: 34,
  },
  post: {
    content: 'Image post',
    date: '2021-12-25T10:05:46.384Z',
    images: [
      'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80',
    ],
  },
  isLiked: false,
}

const mockPostsImage2 = {
  id: '3',
  postType: 'video',
  user: {
    name: 'News Update',
    id: '99123223432',
    avatar: 'test',
    slug: '@newsofficial',
  },
  counts: {
    like: 123,
    comments: 342,
    repost: 34,
  },
  post: {
    content: 'More than 2 image',
    date: '2021-12-25T10:05:46.384Z',
    images: [
      'https://images.unsplash.com/photo-1640645295115-25ef3a67a2ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      'https://pbs.twimg.com/media/FHnYlOdVgAUlEB4?format=jpg&name=small',
    ],
    video: {
      source: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    },
  },
  isLiked: false,
}

const mockPostsImage3 = {
  id: '4',
  postType: 'image',
  user: {
    name: 'News Update',
    id: '99123223432',
    avatar: 'test',
    slug: '@newsofficial',
  },
  counts: {
    like: 123,
    comments: 342,
    repost: 34,
  },
  post: {
    content: 'More than 4 image',
    date: '2021-12-25T10:05:46.384Z',
    images: [
      'https://pbs.twimg.com/media/FHnYlOdVgAUlEB4?format=jpg&name=small',
      'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80',
      'https://pbs.twimg.com/media/FHnYlOdVgAUlEB4?format=jpg&name=small',
      'https://pbs.twimg.com/media/FHnYlOdVgAUlEB4?format=jpg&name=small',
      'https://pbs.twimg.com/media/FHnYlOdVgAUlEB4?format=jpg&name=small',
      'https://pbs.twimg.com/media/FHnYlOdVgAUlEB4?format=jpg&name=small',
    ],
  },
  isLiked: false,
}

const multiplePost = [
  mockPostsImage2,
  mockPosts,
  mockPostsImage,
  mockPostsImage2,
  mockPostsImage3,
]

const Home: NextPage = (props) => {
  const dispatch = useDispatch()
  const store = useSelector((state: RootState) => state)
  const theme = store.theme
  const postsStore = store.posts
  const topMenuStore = store.topMenu
  const items = postsStore.items
  const total = postsStore.total
  const route = useRouter()

  if (process.browser) {
    route.prefetch('/user')
    route.prefetch('/compose')
    route.prefetch('/post')
  }

  // Callback when scroll to bottom.
  const loadNextPage = (startPage: number, endPage: number) => {
    // console.log('loadNextPage', startPage, endPage)
    setTimeout(() => {
      dispatch(onHasNextPage(items.length < total))
      dispatch(onIsNextPageLoading(false))
      // const pollData: any = new Array(10).fill(items.length).map((v) => {
      //   const createData = { ...mockPosts }
      //   createData.id = generateIds()
      //   v = createData
      //   return v
      // })
      const pollData: any = multiplePost
      const pollDataMerge = [...items].concat(pollData)
      dispatch(onSetItems(pollDataMerge))
    }, 100)
  }

  // Handle when tab change
  useEffect(() => {
    console.log('Tab changed.')
  }, [topMenuStore.activeTab])

  return (
    <MainLayout {...props}>
      <Head>
        <title>BroTalks</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full">
        {theme.isNavbar && <Navbar />}
        <TopMenu className="mt-16" />
      </div>
      <MainSection>
        <div id="posts-content" className="posts-content z-0">
          {/* Start show feed here. */}
          <PostsListInfinity
            hasNextPage={postsStore.hasNextPage}
            isNextPageLoading={postsStore.isNextPageLoading}
            items={items}
            loadNextPage={loadNextPage}
          />
        </div>
      </MainSection>
    </MainLayout>
  )
}

export default Home
