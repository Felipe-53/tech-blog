import React from 'react'
import { useRouter } from 'next/router'
import { AiOutlineRight, AiOutlineLeft, AiFillCaretRight, AiFillCaretLeft } from 'react-icons/ai'
import { BsArrowRight } from 'react-icons/bs'

interface Props {
  pages: number[],
  currentPageState: [number, React.Dispatch<React.SetStateAction<number>>]
  className?: string
}

const Pagination: React.FC<Props> = ({ pages, currentPageState, className }) => {
  const [currentPage, set_currentPage] = currentPageState
  const router = useRouter()

  return (
    <div className={`flex justify-between items-center select-none ${className}`}>
      <>
        <ArrowBtn
          direction='left'
          disabled={currentPage === 1}
          set_currentPage={set_currentPage}
        />

        {
          pages.map(page => {
            let textColor = ''
            if (page === currentPage) textColor = 'border border-2 border-secondary'

            return (
              <a
                onClick={() => {
                  router.push('/#artigos')
                  set_currentPage(page)
                }}
                key={page}
                className={`
                  w-8 h-8 flex justify-center items-center rounded-full bg-primary
                  text-lg text-darkfont ${textColor} font-bold
                  hover:cursor-pointer
                `}
              >
                {page}
              </a>
            )
          })
        }

        <ArrowBtn
          direction='right'
          disabled={currentPage === pages.length}
          set_currentPage={set_currentPage}
        />
      </>
    </div>
  )
}

interface ArrowBtnProps {
  direction: 'left' | 'right',
  disabled: boolean,
  set_currentPage: React.Dispatch<React.SetStateAction<number>>
}

const ArrowBtn: React.FC<ArrowBtnProps> = ({ direction, disabled, set_currentPage }) => {
  const router = useRouter()

  const baseStyles = 'text-3xl text-primary hover:cursor-pointer'
  const disabledText = 'text-gray-500'

  const map = {
    left: (
      <AiOutlineLeft
        className={`${baseStyles} ${disabled? disabledText : ''}`}
        onClick={() => {
          if (disabled) return
          router.push('/#artigos')
          set_currentPage(current => current - 1)
        }}
      />
    ),

    right: (
      <AiOutlineRight
        className={`${baseStyles} ${disabled? disabledText : ''}`}
        onClick={() => {
          if (disabled) return
          router.push('/#artigos')
          set_currentPage(current => current + 1)
        }}
      />
    )
  }

  return map[direction]
}

export default Pagination