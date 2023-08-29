export class CreatePostDto {
  title: string;
  description: string;
  author: string;
  img: string;
  videoUrl?: string;
  carousel?: boolean;
  sideFeed?: boolean;
  feed?: boolean;
  featured?: boolean;
  analytics?: boolean;
}

export class UpdatePostDto {
  title?: string;
  description?: string;
  author?: string;
  img?: string;
  carousel?: boolean;
  sideFeed?: boolean;
  feed?: boolean;
  featured?: boolean;
  analytics?: boolean;
}
