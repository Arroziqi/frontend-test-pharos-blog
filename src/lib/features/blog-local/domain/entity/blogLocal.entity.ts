export interface BlogLocalEntity {
  id: string;
  title: string;
  slug?: string;
  body: string;
  category: string;
  thumbnailImage?: string;
  author: string;
  authorImage?: string;
  createdAt: string; // ISO date string
}

export type BlogFormState = Partial<BlogLocalEntity>;

// thumbnail onChange accepts file upload OR URL string OR null (clear)
export type ThumbnailChangeHandler = (fileOrUrl: string | File | null) => void;
