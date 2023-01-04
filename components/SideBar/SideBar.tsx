import React from "react"
import { Category } from "../../types/Category"
import { CategoryLink } from "../CategoryLink/CategoryLink"
import Divider from "../decorative/Divider/Divider"
import ExternalLink from "../ExternalLink/ExternalLink"
import SmallHeading from "../typographic/SmallHeading/SmallHeading"

interface SideBarProps {
  categories?: Category[]
  categoryState: [
    Category | null,
    React.Dispatch<React.SetStateAction<Category | null>>
  ]
}

const SideBar: React.FC<SideBarProps> = ({ categories, categoryState }) => {
  const [_, set_chosenCategory] = categoryState

  return (
    <div
      className="
      h-full
      py-8 bg-gray-700
      flex flex-col items-center gap-14
      lg:py-4"
    >
      <Spot title="Tags">
        {categories?.map((cat) => {
          return (
            <CategoryLink
              onClick={() => set_chosenCategory(cat)}
              key={cat.id}
              href="/#artigos"
            >
              {cat.name}
            </CategoryLink>
          )
        })}
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
