import { Category } from './Category';

export interface Article {
  id: string,
  title: string,
  excerpt: string,
  created_at: string,
  last_updated: string,
  slug: string,
  body: string,
  categories: Category[],
  author: {
    name: string,
    href: string
  }
}
