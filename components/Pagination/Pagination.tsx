import Link from "next/link"
import { useRouter } from "next/router"
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai"
interface Props {
  displayablePageOptions: number[]
  currentPageState: [number, React.Dispatch<React.SetStateAction<number>>]
  totalNumberOfPages: number
  className?: string
}

const Pagination: React.FC<Props> = ({
  displayablePageOptions,
  currentPageState,
  className,
  totalNumberOfPages,
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

        {displayablePageOptions.map((page) => {
          let textColor = ""
          if (page === currentPage)
            textColor = "border border-2 border-secondary"

          return (
            <Link
              href={"/#artigos"}
              onClick={(e) => {
                e.stopPropagation()
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
          disabled={currentPage === totalNumberOfPages}
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
  const baseStyles = "text-3xl"
  const disabledText = "text-gray-500"

  const className = `${baseStyles} ${disabled ? disabledText : "text-primary"}`
  const router = useRouter()

  function handler() {
    console.log("ran")
    if (direction === "left") {
      set_currentPage((current) => current - 1)
    } else {
      set_currentPage((current) => current + 1)
    }
    router.push("/#artigos")
  }

  function clickHandler(e: React.MouseEvent) {
    if (disabled) return
    handler()
  }

  const map = {
    left: <AiOutlineLeft className={className} />,

    right: <AiOutlineRight className={className} />,
  }

  return (
    <button disabled={disabled} onClick={clickHandler}>
      {map[direction]}
    </button>
  )
}

export default Pagination
