import React from "react"
import Divider from "../decorative/Divider/Divider"
import ExternalLink from "../ExternalLink/ExternalLink"
import SmallHeading from "../typographic/SmallHeading/SmallHeading"

function SideBar() {
  return (
    <div
      className="
      h-full
      py-8 bg-gray-700
      flex flex-col items-center gap-14
      lg:py-4"
    >
      <Spot title="Estudando">
        <>Docker</>
        <>Typescript</>
        <>Next.js</>
        <>Tailwind CSS</>
        <>Firebase</>
      </Spot>

      <Spot title="Lendo">
        <ExternalLink href="https://www.typescriptlang.org/docs/handbook/intro.html">
          The TypeScript Handbook
        </ExternalLink>

        <ExternalLink href="https://www.nodejsdesignpatterns.com/">
          Node.js Design Patterns
        </ExternalLink>
      </Spot>

      <Spot title="Desenvolvendo">
        <ExternalLink href="https://www.instagram.com/agilizze.app/">
          Agilzze App
        </ExternalLink>
      </Spot>
    </div>
  )
}

interface SpotProps {
  title: string
}

const Spot: React.FC<SpotProps> = ({ title, children }) => {
  return (
    <div className="w-4/5">
      <SmallHeading>{title}</SmallHeading>
      <Divider />
      <div className="text-lg text-darkfont mt-2">
        <SideBarList>{children}</SideBarList>
      </div>
    </div>
  )
}

const SideBarList: React.FC = ({ children }) => {
  return (
    <ul className="flex flex-col gap-3">
      {React.Children.map(children, (child) => {
        return <li>{child}</li>
      })}
    </ul>
  )
}

export default SideBar
