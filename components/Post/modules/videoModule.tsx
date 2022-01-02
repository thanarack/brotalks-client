import classNames from 'classnames'
import Hls from 'hls.js'
import React, { useEffect, useRef, useState } from 'react'
import { generateIds } from '../../../utilize/generateIds'
import { ChevronRightIcon } from '@heroicons/react/outline'
import { SinglePostDataInterface } from '../singlePost'

interface VideoModuleInterface {
  data: SinglePostDataInterface
  className?: string
}

const VideoModule = ({ data, className }: VideoModuleInterface) => {
  const [heightOfVideo, setHeightOfVideo] = useState(214) // Default height video
  const videoRef = useRef<HTMLDivElement>(null)
  const [videoId, setVideoId] = useState(`video-${data.id}-${generateIds()}`)
  const [isPlay, setIsPlay] = useState(false)
  // const [videoGlobal, setVideoGlobal] = useState<HTMLMediaElement | undefined>(undefined)

  useEffect(() => {
    // Set up video
    if (process.browser && Hls.isSupported()) {
      const video = document.getElementById(videoId) as HTMLMediaElement
      // video.preload = 'none'
      if (isPlay) {
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
        })
        hls.loadSource('https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8')
        // hls.loadSource('https://cdn.jwplayer.com/manifests/pZxWPRg4.m3u8')
        hls.attachMedia(video)
        // console.log(hls.media?.clientHeight)
        // hls.autoLevelEnable
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          video.play()
          console.log('Play')
          // setVideoGlobal(video)
          // video.load
        })
      }
    }
  }, [isPlay, videoId])

  // useEffect(() => {
  //   if (videoRef.current) {
  //     setHeightOfVideo(214)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [videoRef.current])

  return (
    <div className="w-full px-4 pt-2">
      <div
        ref={videoRef}
        style={{ minHeight: heightOfVideo + 'px' }}
        className="flex flex-col justify-center items-center h-full"
      >
        {!isPlay && (
          <div className="w-full h-full relative">
            <div
              onClick={() => setIsPlay(true)}
              style={{ minHeight: heightOfVideo + 'px' }}
              className="bg-black rounded-2xl flex flex-col justify-center items-center"
            >
              <ChevronRightIcon className="w-16 h-16 text-blue-500 border-4 border-blue-500 rounded-full" />
            </div>
          </div>
        )}
        {isPlay && (
          <video id={videoId} controls className="w-full rounded-2xl"></video>
        )}
      </div>
    </div>
  )
}

export default React.memo(VideoModule)
