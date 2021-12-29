/* eslint-disable @next/next/no-img-element */
import classNames from 'classnames'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { SinglePostDataInterface } from '../singlePost'

interface ImageModuleInterface {
  data: SinglePostDataInterface
  className?: string
}

const ImageBlock = styled.div<{ src: string }>`
  background: ${(props: any) => (props.src ? 'url(' + props.src + ')' : '')};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-color: rgba(0, 0, 0, 0);
`

const SingleImage = ({ images }: { images: Array<any> | undefined }) => {
  const [natural, setNatural] = useState({
    naturalHeight: 0,
    naturalWidth: 0,
  })
  if (!images?.length) return null
  const image = images[0]

  return (
    <div>
      <ImageBlock src={image} className="rounded-2xl">
        <img
          src={image}
          width="100%"
          height="100%"
          className="opacity-0"
          alt="post image"
          loading="lazy"
        ></img>
      </ImageBlock>
    </div>
  )
}

const ImageModule = ({ data, className }: ImageModuleInterface) => {
  const countImage = data.post.images?.length || 0

  if (data.postType !== 'image') return null

  return (
    <div className={classNames(className, 'px-4 pt-2 relative')}>
      <div className="min-h-full">
        {countImage === 1 && <div className='w-10/12'><SingleImage images={data?.post?.images} /></div>}
      </div>
    </div>
  )
}

export default React.memo(ImageModule)
