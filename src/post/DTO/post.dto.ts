export class CreatePostDto {
  title: string;
  description: string;
  author: string;
  img: string;
  img2?: string;
  img3?: string;
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
  img2?: string;
  img3?: string;
  carousel?: boolean;
  sideFeed?: boolean;
  feed?: boolean;
  featured?: boolean;
  analytics?: boolean;
}
