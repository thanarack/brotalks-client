import Image from 'next/image'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { PencilAltIcon, SearchIcon } from '@heroicons/react/solid'
import SinglePost from './singlePost'
// import ResizeObserver from '../../custom-libs/rc-resize-observer/lib'
// import Resizable from 're-resizable'
// import ResizeObserver from 'react-resize-observer'
import ResizePost from './resizePost'
// import { VariableSizeList as List } from 'react-window'
import { VariableSizeList as List } from 'react-window'
import useResizeObserver from '@react-hook/resize-observer'
import AutoSizer from 'react-virtualized-auto-sizer'
import InfiniteLoader from 'react-window-infinite-loader'
import LoadingPost from './loadPost'

interface PostsListInfinityInterface {
  hasNextPage: boolean
  isNextPageLoading: boolean
  items: [] | any
  loadNextPage: Function | any
}

const PostsListInfinity = (props: PostsListInfinityInterface) => {
  const { hasNextPage, isNextPageLoading, items, loadNextPage } = props
  // console.log(hasNextPage, isNextPageLoading, items)
  // Get theme from redux store.
  // const theme = useSelector((state:RootState) => state.theme)
  const ref = useRef<HTMLDivElement>(null)
  const listRef: any = useRef({})
  const infiniteLoaderRef = useRef(null)
  const hasMountedRef = useRef(false)
  const [fullPostIndex, setFullPostIndex] = useState<Array<any>>([])
  const rowHeights: any = useRef({})
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (ref.current && process.browser) {
      setWidth(ref.current.offsetWidth)
    }
    if (process.browser) {
      setHeight(Math.abs(window.outerHeight - 103))
    }
  }, [])

  // Each time the sort prop changed we called the method resetloadMoreItemsCache to clear the cache
  useEffect(() => {
    if (hasMountedRef.current) {
      if ('listRef.current' in listRef.current) {
        listRef.current.resetloadMoreItemsCache()
      }
    }
    hasMountedRef.current = true
  }, [])

  const getRowHeight = (index: string | number) => {
    const getHeight: number = rowHeights.current[index] || 1
    return getHeight
  }

  const setRowHeight = (index: any, size: any) => {
    if ('resetAfterIndex' in listRef.current) {
      listRef.current.resetAfterIndex(0)
      rowHeights.current = { ...rowHeights.current, [index]: size }
    }
  }

  const addFullPostIndex = (index: any) => {
    const current: Array<any> = fullPostIndex || []
    if (!current.find((v) => v === index)) {
      current.push(index)
    }
    setFullPostIndex(current)
    return
  }

  // Work on each row.
  function RowRenderer({ index, style }: any) {
    let content
    const rowRef: any = useRef({})
    const data = items[index]
    let isShortPost: boolean = true

    if (isItemLoaded(index) && data) {
      if (fullPostIndex.length && fullPostIndex.find((v) => v === index) >= 0) {
        isShortPost = false
      }
      content = (
        <SinglePost
          data={data}
          postIndex={index}
          postStyle={style}
          addFullPostIndex={addFullPostIndex}
          initialShortPost={isShortPost}
        />
      )
    } else {
      content = (
        <div className="py-4 px-4">
          <LoadingPost />
        </div>
      )
    }

    return (
      <div style={style} ref={rowRef}>
        <ResizePost
          setRowHeight={setRowHeight}
          rowRef={rowRef}
          rowIndex={index}
        >
          {content}
        </ResizePost>
      </div>
    )
  }

  // Count total item and check condition when has next page
  // 2 is default loading component
  const itemCount = hasNextPage ? items.length + 2 : items.length

  // Each row will call this function to check already load or not yet.
  const isItemLoaded = (index: number) => !hasNextPage || index < items.length

  // Calllback when isNextPageLoading is false or scroll to page bottom.
  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage

  return (
    <div id="post-list-infinity" className="w-full h-full" ref={ref}>
      {/* PostList */}
      <InfiniteLoader
        ref={infiniteLoaderRef}
        isItemLoaded={isItemLoaded}
        itemCount={itemCount}
        loadMoreItems={loadMoreItems}
      >
        {({ onItemsRendered, ref }: any) => {
          return (
            <List
              height={height}
              itemCount={itemCount}
              itemSize={getRowHeight}
              onItemsRendered={onItemsRendered}
              ref={(list) => {
                // Pass List ref through to InfiniteLoader
                ref(list)
                // And store a copy for yourself.
                listRef.current = list
              }}
              width={width}
            >
              {RowRenderer}
            </List>
          )
        }}
      </InfiniteLoader>
    </div>
  )
}

PostsListInfinity.defaultProps = {
  hasNextPage: false,
  isNextPageLoading: false,
  items: [],
  loadNextPage: () => {},
}

export default React.memo(PostsListInfinity)
