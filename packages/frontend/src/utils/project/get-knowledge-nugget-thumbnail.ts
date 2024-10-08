import { type KnowledgeNugget } from '@l2beat/config'

export const THUMBNAILS_FOLDER = '/images/thumbnails/'
export const DEFAULT_THUMBNAIL = THUMBNAILS_FOLDER + 'default.jpg'

export function getKnowledgeNuggetThumbnail(
  knowledgeNugget: KnowledgeNugget,
): string {
  if (knowledgeNugget.thumbnail === undefined) {
    return DEFAULT_THUMBNAIL
  }

  return THUMBNAILS_FOLDER + knowledgeNugget.thumbnail
}
