import { APIResponseDTO } from "../../types/APIResponseDTO";
import { TechNote } from "../../types/TechNote";

function apiResponseAdapter(response: APIResponseDTO): TechNote {
  return {
    id: response.id,
    title: response.title,
    author: {
      name: response.author.name,
      href: './about'
    },
    body: response.body,
    og_image_url: response.ogImageUrl,
    slug: response.slug,
    categories: response.categories,
    created_at: response.createdAt
  }
}


export { apiResponseAdapter }