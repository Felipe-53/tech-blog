import React from 'react'
import Divider from '../decorative/Divider/Divider'
import TechNotePresentation from '../TechNotePresentation/TechNotePresentation'
import MainHeading from '../typographic/MainHeading/MainHeading'

const TechNotes: React.FC = ({}) => {
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
        <TechNotePresentation
          title="Separation of Concerns em Resp APIs"
          date="13 Fev"
        />
        <TechNotePresentation
          title="Separation of Concerns em Resp APIs"
          date="13 Fev"
        />
        <TechNotePresentation
          title="Separation of Concerns em Resp APIs"
          date="13 Fev"
        />
      </div>

    </div>
  )
}

export default TechNotes