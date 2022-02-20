import React from 'react'
import { TechNote } from '../../types/TechNote'
import { getFormattedDate } from '../../use-cases/getFormattedDate'
import Divider from '../decorative/Divider/Divider'
import TechNotePresentation from '../TechNotePresentation/TechNotePresentation'
import MainHeading from '../typographic/MainHeading/MainHeading'

interface Props {
  techNotes: TechNote[]
}

const TechNotes: React.FC<Props> = ({ techNotes }) => {
  return (
    <div className="w-full">
      <div className="mb-10">
        <MainHeading className="text-center">Tech Notes</MainHeading>
        <p className="text-darkfont text-lg text-center mb-2">
          Posts concisos sobre problemas, soluções e dicas do dia-a-dia
        </p>
        <Divider />
      </div>

      <div className="flex flex-col gap-6 mb-28">
        {
          techNotes.map(techNote => {
            const { id, title, categories, created_at} = techNote
            return (
              <TechNotePresentation
                key={id}
                title={title}
                date={getFormattedDate(created_at)}
                categories={categories}
              />
            )
          })
        }
      </div>

    </div>
  )
}

export default TechNotes