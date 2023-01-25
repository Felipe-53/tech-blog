import { APIResponseDTO } from "../../types/APIResponseDTO"
import { Article } from "../../types/Article"
import { TechNote } from "../../types/TechNote"

function apiResponseAdapter(response: APIResponseDTO): Article {
  return {
    id: response.id,
    title: response.title,
    author: {
      name: response.author.name,
      href: "/sobre",
    },
    body: response.body,
    og_image_url: response.ogImageUrl,
    slug: response.slug,
    categories: response.categories,
    created_at: response.createdAt,
    excerpt: response.excerpt,
    last_updated: response.updatedAt ? response.updatedAt : response.createdAt,
  }
}

export { apiResponseAdapter }
