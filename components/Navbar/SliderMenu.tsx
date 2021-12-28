import Image from 'next/image'
import Link from 'next/link'
import { slide as Menu } from 'react-burger-menu'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { onShowSlide } from '../../store/reducers/topMenuReducer'
import { kFormatter } from '../../utilize/kFormatter'

const slideMenu = [
  {
    title: 'ฟีด',
    keyName: 'feed',
    isAuth: true,
    href: '/',
  },
  {
    title: 'โปรไฟล์',
    keyName: 'profile',
    isAuth: true,
    href: '/user',
  },
  {
    title: 'ตั้งค่า',
    keyName: 'setting',
    isAuth: true,
    href: '/user/setting',
  },
  {
    title: 'ออกจากระบบ',
    keyName: 'logout',
    isAuth: true,
    href: '/logout',
  },
]

const styles: any = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    left: '36px',
    top: '36px',
  },
  bmBurgerBars: {
    background: '#373a47',
  },
  bmBurgerBarsHover: {
    background: '#a90000',
  },
  bmCrossButton: {
    height: '24px',
    width: '24px',
  },
  bmCross: {
    background: '#fff',
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100%',
    top: 0,
    transition: 'all 0.1s ease 0s; top: 0px',
    zIndex: '1200',
  },
  bmMenu: {
    background: 'rgb(17 24 39)',
    padding: '2.5em 0.5em 0',
    fontSize: '1.15em',
  },
  bmMorphShape: {
    fill: '#373a47',
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.4em',
  },
  bmItem: {
    display: 'inline-block',
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)',
  },
}

const SliderMenu = () => {
  const dispatch = useDispatch()
  const store = useSelector((state: RootState) => state)
  const topMenu = store.topMenu
  const user = store.user
  const userLinkProfile = `/user/${user.user?.id}`
  slideMenu[1].href = userLinkProfile

  return (
    <div className="h-full">
      <Menu
        isOpen={topMenu.isSlide}
        customBurgerIcon={false}
        right
        disableAutoFocus
        styles={styles}
        itemListElement="div"
        width={280}
        onOpen={() => dispatch(onShowSlide(true))}
        onClose={() => dispatch(onShowSlide(false))}
      >
        <h3 className="absolute top-0 pt-1 leading-8 text-lg text-white">
          ข้อมูลผู้ใช้งาน
        </h3>
        <div className="slide-profile w-full flex flex-col justify-center items-center py-4 space-y-1 pb-8">
          <div>
            <Image
              className="rounded-full"
              src="/logo-1.png"
              width={42}
              height={42}
              alt="Profile"
            />
          </div>
          <h4 className="text-base text-white">{user.user?.name}</h4>
          <div className="flex flex-row space-x-8 pt-3">
            <div className="space-x-1 flex flex-col text-center space-y-1">
              <h4 className="text-base text-white">
                {kFormatter(user.user?.count?.follow || 0)}
              </h4>
              <h5 className="text-sm text-white">การติดตาม</h5>
            </div>
            <div className="space-x-1 flex flex-col text-center space-y-1">
              <h4 className="text-base text-white">
                {kFormatter(user.user?.count?.followers || 0)}
              </h4>
              <h5 className="text-sm text-white">ผู้ติดตาม</h5>
            </div>
          </div>
        </div>
        <div className="block w-full">
          <ul className="flex flex-col space-y-4">
            {slideMenu.map((value: any, index: any) => (
              <li key={index}>
                <Link href={value.href} passHref>
                  <a className="text-base text-white">{value.title}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Menu>
    </div>
  )
}

export default SliderMenu
