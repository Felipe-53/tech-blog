import React from 'react'

interface Props {
  pages: number[],
  currentPageState: [number, React.Dispatch<React.SetStateAction<number>>]
  className?: string
}

const Pagination: React.FC<Props> = ({ pages, currentPageState, className }) => {
  const [currentPage, set_currentPage] = currentPageState

  // let 

  return (
    <div className={`flex justify-around ${className}`}>
      {
        pages.map(page => {
          let textColor = ''
          if (page === currentPage) textColor = 'border border-2 border-secondary'

          return (
            <a
              onClick={() => set_currentPage(page)}
              key={page}
              className={`
                w-8 h-8 flex justify-center items-center rounded-full bg-gray-500
                text-lg text-darkfont ${textColor} font-bold
                hover:cursor-pointer
              `}
            >
              {page}
            </a>
          )
        })
      }
    </div>
  )
}

export default Pagination