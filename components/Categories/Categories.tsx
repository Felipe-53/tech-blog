import React from 'react'
import CategoryFC from './Category/Category'
import { Category } from '../../types/Category'

interface Props {
  categories: Category[],
  chosenCategory: Category | null,
  set_chosenCategory: React.Dispatch<React.SetStateAction<Category | null>>
}

const Categories: React.FC<Props> = ({ categories, set_chosenCategory, chosenCategory }) => {
  return (
    <div className="flex gap-8 flex-wrap justify-around">
      {categories.map(cat => {
        return (
          <CategoryFC
            key={cat.id}
            category={cat}
            set_chosenCategory={set_chosenCategory}
            chosen={cat.id === chosenCategory?.id}
          />
        )
      })}
    </div>
  )
}

export default Categories
