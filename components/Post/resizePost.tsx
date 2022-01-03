import React, { useEffect, useLayoutEffect } from 'react'
import useResizeObserver from '@react-hook/resize-observer'
import { canUseDOM } from '../../utilize/canUseDOM'

const useIsomorphicLayoutEffect = canUseDOM ? useLayoutEffect : useEffect

const useSize = (target: any) => {
  const [size, setSize] = React.useState()

  useIsomorphicLayoutEffect(() => {
    setSize(target.current.getBoundingClientRect())
  }, [target])

  // Where the magic happens
  useResizeObserver(target, (entry: any) => setSize(entry.contentRect))
  return size
}

const ResizePost = (props: any) => {
  const target = React.useRef(null)
  const size: any = useSize(target)

  useEffect(() => {
    if (size) {
      const postIndex = props.rowIndex
      const oldHeight = props.rowRef.current.clientHeight
      const currentHeight = size.height
      if (currentHeight > oldHeight) {
        props.setRowHeight(postIndex, currentHeight)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size])

  return <div ref={target}>{props.children}</div>
}

export default React.memo(ResizePost)
