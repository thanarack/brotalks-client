import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { onShowSlide } from '../../store/reducers/topMenuReducer'
import SliderMenu from '../Navbar/SliderMenu'

const MainLayout = ({ children }: any) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const store = useSelector((state: RootState) => state)
  const topmenu = store.topMenu

  useEffect(() => {
    const handleRouteChange = (url: string, { shallow }: any) => {
      // console.log(
      //   `App is changing to ${url} ${
      //     shallow ? 'with' : 'without'
      //   } shallow routing`
      // )
      // Close slide if opened
      if (topmenu.activeTab) {
        dispatch(onShowSlide(false))
      }
    }
    router.events.on('routeChangeStart', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div id="layout-main">
      <SliderMenu />
      {children}
    </div>
  )
}

export default MainLayout
