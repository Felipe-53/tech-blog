import React from "react"
import { TechNote } from "../../types/TechNote"
import { getFormattedDate } from "../../use-cases/getFormattedDate"
import Divider from "../decorative/Divider/Divider"
import TechNotePresentation from "../TechNotePresentation/TechNotePresentation"
import MainHeading from "../typographic/MainHeading/MainHeading"

interface Props {
  techNotes: TechNote[]
}

const TechNotes: React.FC<Props> = ({ techNotes }) => {
  return (
    <div className="w-full mb-8">
      <div className="mb-10">
        <MainHeading className="text-center">Tech Notes</MainHeading>
        <p className="text-darkfont text-lg text-center mt-2 mb-4">
          Posts concisos sobre problemas, soluções e dicas do dia-a-dia
        </p>
        <Divider />
      </div>

      <div className="flex flex-col gap-6">
        {techNotes.map((techNote) => {
          const { id, slug, title, categories, created_at } = techNote
          return (
            <TechNotePresentation
              key={id}
              title={title}
              slug={slug}
              date={getFormattedDate(created_at)}
              categories={categories}
            />
          )
        })}
      </div>
    </div>
  )
}

export default TechNotes
