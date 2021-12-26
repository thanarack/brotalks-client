import Image from 'next/image'
import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { PencilAltIcon, SearchIcon } from '@heroicons/react/solid'
import ScrollContainer from 'react-indiana-drag-scroll'
import classnames from 'classnames'

const topMenuList = [
  { id: 1, title: 'เป็นที่นิยม' },
  { id: 2, title: 'มาใหม่' },
  { id: 3, title: 'เทคโนโลยี' },
  { id: 4, title: 'หวยเด็ด' },
]

const TopMenu = ({ props }: any) => {
  // Get theme from redux store.
  // const theme = useSelector((state:RootState) => state.theme)

  const [itemActive, setItemActive] = useState(1)

  return (
    <div className="w-full bg-slate-100 pb-2 px-4 pt-1 border-b border-slate-200 static">
      <ScrollContainer className="scroll-container">
        <div className="w-full flex flex-row space-x-6 topmenu min-w-full">
          {topMenuList.map((slideContent, index) => (
            <div key={index} className="flex flex-col">
              <div
                className={classnames('text-base text-gray-400', {
                  active: itemActive === slideContent.id,
                })}
                onClick={setItemActive.bind(this, slideContent.id)}
              >
                {slideContent.title}
              </div>
              {itemActive === slideContent.id && (
                <div className="h w-4 border-t-2 border-gray-900 self-center" />
              )}
            </div>
          ))}
        </div>
      </ScrollContainer>
    </div>
  )
}
export default React.memo(TopMenu)
