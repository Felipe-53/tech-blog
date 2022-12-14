interface TechNote {
  id: string
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
    id: string
    name: string
  }[]
}

export type { TechNote }
