import Image from 'next/image'
import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import {
  PencilAltIcon,
  SearchIcon,
  UserCircleIcon,
} from '@heroicons/react/outline'
import Link from 'next/link'
import { onShowSlide } from '../../store/reducers/topMenuReducer'

const Navbar = ({ props }: any) => {
  const store = useSelector((state: RootState) => state)
  const topMenu = store.topMenu
  const dispatch = useDispatch()
  // Get theme from redux store.
  // const theme = useSelector((state:RootState) => state.theme)

  return (
    <div className="fixed w-full px-4 py-4 flex flex-row space-x-4 items-center bg-slate-100 top-0 z-20">
      <div className="h-8">
        <Link href="/" passHref>
          <a>
            <Image src="/logo-1.png" width={32} height={32} alt="logo" />
          </a>
        </Link>
      </div>
      <div className="grow relative">
        <SearchIcon className="h-4 w-4 text-slate-700 absolute top-2 left-3" />
        <input className="w-full pl-9 bg-slate-300 rounded-full m-0 h-8 outline-none" />
      </div>
      <div>
        <Link href="/compose" passHref>
          <a>
            <PencilAltIcon className="h-6 w-6 text-gray-800" />
          </a>
        </Link>
      </div>
      <div onClick={() => dispatch(onShowSlide(true))}>
        <UserCircleIcon className="h-6 w-6 text-gray-800" />
      </div>
    </div>
  )
}
export default React.memo(Navbar)
