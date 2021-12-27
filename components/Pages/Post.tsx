import type { NextPage } from 'next'
import { i18n, useTranslation } from 'next-i18next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MainLayout from '../Layout/MainLayout'
import Navbar from '../Navbar'
// import PostsList from '../Post/postsList'
import TopMenu from '../TopMenu'
import { RootState } from '../../store'
import MainSection from '../Layout/MainSection'

const Post: NextPage = (props) => {
  const { t } = useTranslation()
  const route = useRouter()
  const theme = useSelector((state: RootState) => state.theme)

  return (
    <MainLayout {...props}>
      <Head>
        <title>Post</title>
      </Head>
      <div className="w-full">{theme.isNavbar && <Navbar />}</div>
      <MainSection>
        <div></div>
      </MainSection>
    </MainLayout>
  )
}

export default Post
