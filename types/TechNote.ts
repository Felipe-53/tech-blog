interface TechNote {
  id: number
  title: string
  body: string
  slug: string
  og_image_url: string
  author: {
    name: string
    href: string
  }
  created_at: string
  categories: {
    id: number
    name: string
  }[]
}

export type { TechNote }