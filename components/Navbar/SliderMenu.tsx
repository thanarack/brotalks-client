import Link from 'next/link'
import { slide as Menu } from 'react-burger-menu'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { onShowSlide } from '../../store/reducers/topMenuReducer'

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
    left: '10px',
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
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em',
  },
  bmMorphShape: {
    fill: '#373a47',
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em',
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

  return (
    <div className="h-full">
      <Menu
        isOpen={topMenu.isSlide}
        customBurgerIcon={false}
        right
        styles={styles}
        itemListElement="div"
        width={280}
        onOpen={() => dispatch(onShowSlide(true))}
        onClose={() => dispatch(onShowSlide(false))}
      >
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </Menu>
    </div>
  )
}

export default SliderMenu
