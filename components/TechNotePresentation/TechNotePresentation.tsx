import React from 'react'

interface Props {
  title: string
  date: string
}

const TechNotePresentation: React.FC<Props> = ({ title, date }) => {
  return (
    <a
      tabIndex={0}
      className="
        flex justify-between px-6 py-3
        hover:bg-gray-700 hover:rounded-md
        focus:bg-gray-700 focus:rounded-md
        cursor-pointer inde
      "
    >
      <h5 className="text-darkfont text-xl">
        {title}
      </h5>

      <span className="text-gray-300 text-lg">
        {date}
      </span>
    </a>
  )
}

export default TechNotePresentation