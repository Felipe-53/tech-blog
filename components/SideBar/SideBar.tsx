import React from 'react'
import Divider from '../decorative/Divider/Divider'
import ExternalLink from '../ExternalLink/ExternalLink'
import SmallHeading from '../typographic/SmallHeading/SmallHeading'

function SideBar() {
  return (
    <div className="
      py-8 col-start-5 col-end-6 bg-gray-700
      flex flex-col items-center gap-12
      lg:py-4"
    >
      <Spot title="Desenvolvendo">
        <a
          href="https://www.instagram.com/agilizze.app/"
          target="_blank"
          rel="noreferrer"
          className="hover:text-secondary"
        >
          ➡️ Agilzze App
        </a>
      </Spot>

      <Spot title="Estudando">
        <ul>
          <li>Docker</li>
          <li>Typescript</li>
          <li>Next.js</li>
          <li>Tailwind CSS</li>
          <li>Firebase</li>
        </ul>
      </Spot>

      <Spot title="Lendo">
        <ul>
          <li>
            <ExternalLink
              href="https://www.typescriptlang.org/docs/handbook/intro.html"
            >
              The TypeScript Handbook
            </ExternalLink>
          </li>
          <li>
            <ExternalLink
              href="https://www.nodejsdesignpatterns.com/"
            >
              Node.js Design Patterns
            </ExternalLink>
          </li>
        </ul>
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
        {children}
      </div>
    </div>
  )
}

export default SideBar
