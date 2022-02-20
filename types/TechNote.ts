interface TechNote {
  id: number
  title: string
  body: string
  created_at: string
  categories: {
    id: number
    name: string
  }[]
}

export type { TechNote }