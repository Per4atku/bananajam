// /api/get/artists/[id]/
export interface ArtistResponseAPI {
  external_urls: ExternalUrls;
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  images: ImagesEntity[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}
export interface ExternalUrls {
  spotify: string;
}
export interface Followers {
  href?: null;
  total: number;
}
export interface ImagesEntity {
  height: number;
  url: string;
  width: number;
}

// /api/get/artists/[id]/albums/
export interface ArtistAlbumsResponseAPI {
  href: string;
  items: ItemsEntity[];
  limit: number;
  next: string;
  offset: number;
  previous: null;
  total: number;
}
export interface ItemsEntity {
  album_group: string;
  album_type: string;
  artists: ArtistsEntity[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: ImagesEntity[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}
export interface ArtistsEntity {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}
