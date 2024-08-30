/**
 * Generated by orval v7.0.1 🍺
 * Do not edit manually.
 * Spotify Web API with fixes and improvements from sonallux
 * You can use Spotify's Web API to discover music and podcasts, manage your Spotify library, control audio playback, and much more. Browse our available Web API endpoints using the sidebar at left, or via the navigation bar on top of this page on smaller screens.

In order to make successful Web API requests your app will need a valid access token. One can be obtained through <a href="https://developer.spotify.com/documentation/general/guides/authorization-guide/">OAuth 2.0</a>.

The base URI for all Web API requests is `https://api.spotify.com/v1`.

Need help? See our <a href="https://developer.spotify.com/documentation/web-api/guides/">Web API guides</a> for more information, or visit the <a href="https://community.spotify.com/t5/Spotify-for-Developers/bd-p/Spotify_Developer">Spotify for Developers community forum</a> to ask questions and connect with other developers.

 * OpenAPI spec version: 2024.6.16
 */
import type { SimplifiedArtistObject } from './simplifiedArtistObject';
import type { CopyrightObject } from './copyrightObject';
import type { ExternalIdObject } from './externalIdObject';
import type { PagingSimplifiedTrackObject } from './pagingSimplifiedTrackObject';

export type AlbumObjectAllOf = {
  /** The artists of the album. Each artist object includes a link in `href` to more detailed information about the artist.
 */
  artists?: SimplifiedArtistObject[];
  /** The copyright statements of the album.
 */
  copyrights?: CopyrightObject[];
  /** Known external IDs for the album.
 */
  external_ids?: ExternalIdObject;
  /** A list of the genres the album is associated with. If not yet classified, the array is empty.
 */
  genres?: string[];
  /** The label associated with the album.
 */
  label?: string;
  /** The popularity of the album. The value will be between 0 and 100, with 100 being the most popular.
 */
  popularity?: number;
  /** The tracks of the album.
 */
  tracks?: PagingSimplifiedTrackObject;
};
