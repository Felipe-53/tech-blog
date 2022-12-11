import { Category } from "./Category"

export interface APIResponseDTO {
  id: string
  title: string
  body: string
  author: {
    id: string
    name: string
    email: string
    admin: boolean
  }
  excerpt: string
  categories: Category[]
  slug: string
  ogImageUrl: string
  createdAt: string
  updatedAt: string | null
}
