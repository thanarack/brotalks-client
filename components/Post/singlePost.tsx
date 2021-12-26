import Image from 'next/image'
import React, {
  Ref,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import {
  AnnotationIcon,
  ThumbUpIcon,
  ExternalLinkIcon,
} from '@heroicons/react/outline'
import { ThumbUpIcon as ThumbUpIconSolid } from '@heroicons/react/solid'
import { kFormatter } from '../../utilize/kFormatter'
import { timeAgo } from '../../utilize/timeAgo'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { onFullPostIndex } from '../../store/reducers/postsReducer'

export interface SinglePostInterface {
  postIndex: string | number
  data: SinglePostDataInterface
  postStyle?: {
    height: number
  }
  initialShortPost: boolean
}

export interface SinglePostDataInterface {
  id: string
  postType: string
  post: {
    postContent: string
    postDate: string
  }
  user: {
    userName: string
    userId: string
    userSlug: string
    userAvatar: string
  }
  counts: {
    like: number
    repost: number
    comments: number
    viewer?: number
  }
  isLiked: boolean
}

/**
 * Component for showing a post.
 *
 * @component
 * @example
 * const data = {}
 * return (
 *   <SinglePost data={Object} />
 * )
 */
const SinglePost = (props: SinglePostInterface) => {
  const dispatch = useDispatch()
  const { t } = useTranslation('common')
  const { data, postIndex, postStyle, initialShortPost } = props
  // const {postType} = props
  // Get theme from redux store.
  // const theme = useSelector((state:RootState) => state.theme)
  const [isShortPost, setIsShortPost] = useState(initialShortPost)
  // console.log(initialShortPost)
  const [shortPost, setShortPost] = useState('')
  const [fullPost, setFullPost] = useState('')
  const [isLiked, setIsLiked] = useState(data.isLiked)
  // const [postDocument, setPostDocument] = useState<HTMLElement>() || undefined
  const [counts, setCounts] = useState({
    like: data.counts.like,
    comments: data.counts.comments,
    repost: data.counts.repost,
  })
  // const warpTextRef = useRef<HTMLSpanElement>(null)
  const route = useRouter()

  // Listening dom updated
  useEffect(() => {
    // if (process.browser && window.document) {
    //   const getPostDocument =
    //     window.document.getElementById(postIndex) || undefined
    //   setPostDocument(getPostDocument)
    // }
    function calculateHeightOfPost() {
      const maxWords = 126
      const textContent = data.post.postContent || ''
      const postLength = textContent?.length ?? 0
      if (process.browser && postLength > maxWords) {
        // Manapulate texts
        const tempShortPost =
          textContent
            ?.slice(0, maxWords)
            .replace(/\s+\S*$/gim, '')
            .concat('...') || ''
        setShortPost(tempShortPost)
        setIsShortPost(true)
      }
    }
    if (initialShortPost) {
      calculateHeightOfPost()
    }
    if (!fullPost) {
      setFullPost(data.post.postContent)
    }
  }, [])

  /**
   * Handle on click read more link.
   * @return    {null}
   */
  const showFullPost = () => {
    if (isShortPost) {
      // warpTextRef.current.textContent = fullPost
      // if (postDocument) {

      // }
      setIsShortPost(false)
      dispatch(onFullPostIndex(data.id))
    }
    return
  }

  /**
   * Handle on click like button.
   * @return    {null}
   */
  const onLike = () => {
    let likeCode = '0' // 0 Like 1 Unlike
    if (!isLiked) {
      setCounts({ ...counts, like: counts.like + 1 })
      setIsLiked(true)
    } else {
      setCounts({ ...counts, like: counts.like - 1 })
      setIsLiked(false)
      likeCode = '1'
    }
    // Logic to call api.
    return
  }

  /**
   * Handle on click comment button.
   * @return    {null}
   */
  const onComments = () => {
    // Logic for click comment button
    return route.push({ pathname: `/post/${data.id}` })
  }

  /**
   * Handle on click re-post button.
   * @return    {null}
   */
  const onRepost = () => {
    // Logic for click repost button
    return route.push({
      pathname: `/compose`,
      query: { type: 'repost', repost_id: data.id },
    })
  }

  // Check condition render
  if (data?.postType === undefined) {
    return null
  }

  // Initial height value from post list component.
  const heightProps = postStyle?.height || 1
  // Defined id of element of post
  const singelPostId = `post-${postIndex}-${data.id}`

  return (
    <div
      id={singelPostId}
      className={classNames('block', { 'opacity-0': heightProps <= 1 })}
    >
      <div
        id="user"
        className="flex flex-row space-x-4 px-4 pt-4 justify-start"
      >
        <div>
          <Image
            className="rounded-full"
            src="/logo-1.png"
            width={32}
            height={32}
            alt="Profile"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row space-x-1">
            <h3 className="text-base leading-4 text-slate-800 font-semibold">
              {data.user.userName}
            </h3>
            <div id="user-id">
              <h3 className="text-base leading-4 text-slate-500 font-normal">
                {data.user.userSlug}
              </h3>
            </div>
          </div>
          <h4 className="text-xs leading-6 text-slate-500">
            {timeAgo(data.post.postDate)}
          </h4>
        </div>
      </div>
      <div id="content-body" className="pb-4 pt-2">
        <div id="warp-text" className="px-4 warp-text">
          <span
            // ref={warpTextRef}
            className="text-slate-900 text-base overflow-hidden leading-6 post-more"
          >
            {/* {data.post.postContent} */}
            {/* {postIndex} - */}
            {isShortPost && shortPost}
            {!isShortPost && fullPost}
          </span>
          {isShortPost && (
            <span
              className="text-blue-500 pl-2"
              role="button"
              onClick={showFullPost}
            >
              {t('post-more')}
            </span>
          )}
        </div>
      </div>
      <div id="action-post" className="flex flex-row px-4 pb-4 space-x-6">
        <div id="like">
          <div
            className="flex flex-row text-center content-center items-center space-x-2"
            role="button"
            onClick={onLike}
          >
            {!isLiked && <ThumbUpIcon className="h-5 w-5 text-gray-500" />}
            {isLiked && <ThumbUpIconSolid className="h-5 w-5 text-blue-500" />}
            <span className="text-sm font-normal uppercase text-gray-500">
              {kFormatter(counts.like)}
            </span>
          </div>
        </div>
        <div id="comments">
          <div
            className="flex flex-row text-center content-center items-center space-x-2"
            role="button"
            onClick={onComments}
          >
            <AnnotationIcon className="h-5 w-5 text-gray-500" />
            <span className="text-sm font-normal text-slate-500 uppercase">
              {kFormatter(counts.comments)}
            </span>
          </div>
        </div>
        <div id="repost">
          <div
            className="flex flex-row text-center content-center items-center space-x-2"
            role="button"
            onClick={onRepost}
          >
            <ExternalLinkIcon className="h-5 w-5 text-gray-500" />
            <span className="text-sm font-normal text-slate-500 uppercase">
              {kFormatter(counts.repost)}
            </span>
          </div>
        </div>
      </div>
      <div id="end-post" className="border-t h-1 border-slate-200 w-full" />
    </div>
  )
}

export default React.memo(SinglePost)
