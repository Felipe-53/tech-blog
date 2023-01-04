import Link from "next/link"
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai"
interface Props {
  pages: number[]
  currentPageState: [number, React.Dispatch<React.SetStateAction<number>>]
  className?: string
}

const Pagination: React.FC<Props> = ({
  pages,
  currentPageState,
  className,
}) => {
  const [currentPage, set_currentPage] = currentPageState

  return (
    <div
      className={`flex justify-between items-center select-none ${className}`}
    >
      <>
        <ArrowBtn
          direction="left"
          disabled={currentPage === 1}
          set_currentPage={set_currentPage}
        />

        {pages.map((page) => {
          let textColor = ""
          if (page === currentPage)
            textColor = "border border-2 border-secondary"

          return (
            <Link
              href={"/"}
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation()
                set_currentPage(page)
              }}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return
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
            </Link>
          )
        })}

        <ArrowBtn
          direction="right"
          disabled={currentPage === pages.length}
          set_currentPage={set_currentPage}
        />
      </>
    </div>
  )
}

interface ArrowBtnProps {
  direction: "left" | "right"
  disabled: boolean
  set_currentPage: React.Dispatch<React.SetStateAction<number>>
}

const ArrowBtn: React.FC<ArrowBtnProps> = ({
  direction,
  disabled,
  set_currentPage,
}) => {
  const baseStyles = "text-3xl text-primary hover:cursor-pointer"
  const disabledText = "text-gray-500"

  const className = `${baseStyles} ${disabled ? disabledText : ""}`

  function selectHandler(e: React.MouseEvent | React.KeyboardEvent) {
    e.stopPropagation()
    // @ts-ignore
    if (e.key !== undefined && e.key !== "Enter") return
    if (disabled) return
    if (direction === "left") {
      set_currentPage((current) => current - 1)
    } else {
      set_currentPage((current) => current + 1)
    }
  }

  const map = {
    left: (
      <AiOutlineLeft
        tabIndex={0}
        className={className}
        onClick={selectHandler}
        onKeyDown={selectHandler}
      />
    ),

    right: (
      <AiOutlineRight
        tabIndex={0}
        className={className}
        onClick={selectHandler}
        onKeyDown={selectHandler}
      />
    ),
  }

  return <Link href={"/#artigos"}>{map[direction]}</Link>
}

export default Pagination
