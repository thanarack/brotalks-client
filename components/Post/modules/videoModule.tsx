/* eslint-disable @next/next/no-img-element */
import classNames from 'classnames'
import Hls from 'hls.js'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { generateIds } from '../../../utilize/generateIds'
import { ChevronRightIcon } from '@heroicons/react/outline'
import { SinglePostDataInterface } from '../singlePost'
import { RootState } from '../../store'
import styled from 'styled-components'
import Image from 'next/image'
import { onPlayVideoId } from '../../../store/reducers/videoReducer'

interface VideoModuleInterface {
  data: SinglePostDataInterface
  className?: string
  playVideo?: Function
}

const BlockImagePreview = styled.div<{
  src: string
  cover?: boolean
  height?: number
}>`
  background: ${(props: any) => (props.src ? 'url(' + props.src + ')' : '')};
  background-size: ${(props: any) => (props.cover ? 'cover' : 'contain')};
  background-repeat: no-repeat;
  background-position: center center;
  background-color: rgba(0, 0, 0, 0);
  min-height: ${(props: any) => (props.height ? props.height + 'px' : '')};
  disstartplay: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`

const VideoModule = ({ data, className, playVideo }: VideoModuleInterface) => {
  // const [heightOfVideo, setHeightOfVideo] = useRef(214) // Default height video
  const dispatch = useDispatch()
  const generateIdVideo = generateIds()
  // const store = useSelector((state: RootState) => state)
  const videoRef = useRef<HTMLDivElement>(null)
  const [imgHeight, setImgHeight] = useState(0)
  const [videoId, setVideoId] = useState(`video-${data.id}-${generateIdVideo}`)
  const [isReady, setIsReady] = useState(false)
  const [isStartPlay, setIsStartPlay] = useState(false)
  // const [videoGlobal, setVideoGlobal] = useState<HTMLMediaElement | undefined>(undefined)
  const imageId = useRef<any>()
  const urlVideo = `http://localhost:3000/mock/${data.post?.video?.source}/playlist.m3u8`
  const urlPreviewImage = `http://localhost:3000/mock/${data.post?.video?.source}/hd.jpg`

  useEffect(() => {
    // Set up video
    if (process.browser && Hls.isSupported() && isStartPlay) {
      const video = document.getElementById(videoId) as HTMLMediaElement
      const mywindow: Window | any = window
      // video.preload = 'none'
      let hls = new Hls({
        enableWorker: true,
        maxBufferLength: 1,
        liveBackBufferLength: 0,
        liveSyncDuration: 0,
        liveMaxLatencyDuration: 5,
        liveDurationInfinity: true,
        highBufferWatchdogPeriod: 1,
        lowLatencyMode: true,
        backBufferLength: 90,
        fLoader: mywindow?.peer5 && mywindow?.peer5?.HlsJsFragmentLoader,
        pLoader: mywindow?.peer5 && mywindow?.peer5?.HlsJsPlaylistLoader,
      })
      // hls.loadSource('https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8')
      // hls.loadSource('https://cdn.jwplayer.com/manifests/pZxWPRg4.m3u8')
      hls.loadSource(urlVideo)
      hls.attachMedia(video)
      // console.log(hls.media?.clientHeight)
      // hls.autoLevelEnable
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        stopPreviosVideo()
        video.play()
        setIsReady(true)
        console.log('Play')
        // setVideoGlobal(video)
        // video.load
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStartPlay])

  useEffect(() => {
    if (isReady) {
      // dispatch(onPlayVideoId('1'))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady])

  const stopPreviosVideo = () => {
    // Stop previous video.
    const videoIdPrevios = window.localStorage.getItem('playvideoid')
    const video = document.getElementById(videoIdPrevios) as HTMLMediaElement
    if (videoIdPrevios && video) {
      video.pause()
    }
  }

  const onStartPlay = () => {
    setIsStartPlay(true)
    // playVideo(generateIdVideo)
    console.log(videoId)
    stopPreviosVideo()
    // Set new video id
    window.localStorage.setItem('playvideoid', videoId)
  }

  if (!data.post?.video?.source) {
    return null
  }

  return (
    <div className="w-full px-4 pt-2">
      <div
        ref={videoRef}
        className="flex flex-col justify-center items-center h-full w-10/12 relative"
      >
        {/* Show the button when video not load yet */}
        {!isStartPlay && !isReady && (
          <div className="w-full h-full relative z-10">
            <div onClick={onStartPlay} role="button">
              <BlockImagePreview
                src={urlPreviewImage}
                cover
                className="flex flex-col justify-center items-center overflow-hidden rounded-2xl"
              >
                <img
                  src={urlPreviewImage}
                  className="opacity-0"
                  alt="video"
                  ref={(ref: HTMLImageElement) => {
                    if (ref && ref.offsetHeight) {
                      setImgHeight(ref?.clientHeight)
                    }
                  }}
                />
                <ChevronRightIcon className="w-16 h-16 text-white border-4 bg-blue-600 border-white-500 rounded-full player-icon" />
              </BlockImagePreview>
            </div>
          </div>
        )}
        {/* Inital load video tag */}
        <div
          className={classNames('w-full', {
            'opacity-0 absolute top-0 z-0': !isReady && !isStartPlay,
          })}
        >
          <video
            id={videoId}
            controls
            style={{ minHeight: imgHeight }}
            className="rounded-2xl"
          />
        </div>
      </div>
    </div>
  )
}

export default React.memo(VideoModule)
