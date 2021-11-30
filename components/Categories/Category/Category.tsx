import React from 'react'
import { Category } from '../../../types/Category'


interface CategoryProps {
  category: Category,
  set_chosenCategory: React.Dispatch<React.SetStateAction<Category | null>>,
  variant?: 'small' | 'normal',
  inlineStyles?: object,
  chosen: boolean
}

const Category: React.FC<CategoryProps> = ({ category, variant, inlineStyles, set_chosenCategory, chosen }) => {
  function toggleCurrentCategory() {
    chosen? set_chosenCategory(null) : set_chosenCategory(category);
  }

  let tailwindBaseClass = `
    w-32 text-lg text-darkfont text-center rounded-full bg-primary
    hover:cursor-pointer
    py-1 px-2
    lg:py-2 lg:px-4
  `

  if (chosen) {
    tailwindBaseClass += `border-2 border-secondary`
  }

  return (
    <button
      style={inlineStyles}
      className={tailwindBaseClass}
      onKeyDown={event => {
        if (event.key === 'Escape') {
          set_chosenCategory(null)
        }
      }}
      onClick={e => {
        e.stopPropagation();
        toggleCurrentCategory();
      }}
    >
      {category.name}
    </button>
  )
}

export default Category
