/**
 * Generated by orval v7.0.1 🍺
 * Do not edit manually.
 * Spotify Web API
 * You can use Spotify's Web API to discover music and podcasts, manage your Spotify library, control audio playback, and much more. Browse our available Web API endpoints using the sidebar at left, or via the navigation bar on top of this page on smaller screens.

In order to make successful Web API requests your app will need a valid access token. One can be obtained through <a href="https://developer.spotify.com/documentation/general/guides/authorization-guide/">OAuth 2.0</a>.

The base URI for all Web API requests is `https://api.spotify.com/v1`.

Need help? See our <a href="https://developer.spotify.com/documentation/web-api/guides/">Web API guides</a> for more information, or visit the <a href="https://community.spotify.com/t5/Spotify-for-Developers/bd-p/Spotify_Developer">Spotify for Developers community forum</a> to ask questions and connect with other developers.

 * OpenAPI spec version: 1.0.0
 */
import type { CopyrightObject } from './copyrightObject';
import type { ExternalUrlObject } from './externalUrlObject';
import type { ImageObject } from './imageObject';
import type { ShowBaseType } from './showBaseType';

export interface ShowBase {
  /** A list of the countries in which the show can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.
 */
  available_markets: string[];
  /** The copyright statements of the show.
 */
  copyrights: CopyrightObject[];
  /** A description of the show. HTML tags are stripped away from this field, use `html_description` field in case HTML tags are needed.
 */
  description: string;
  /** Whether or not the show has explicit content (true = yes it does; false = no it does not OR unknown).
 */
  explicit: boolean;
  /** External URLs for this show.
 */
  external_urls: ExternalUrlObject;
  /** A link to the Web API endpoint providing full details of the show.
 */
  href: string;
  /** A description of the show. This field may contain HTML tags.
 */
  html_description: string;
  /** The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the show.
 */
  id: string;
  /** The cover art for the show in various sizes, widest first.
 */
  images: ImageObject[];
  /** True if all of the shows episodes are hosted outside of Spotify's CDN. This field might be `null` in some cases.
 */
  is_externally_hosted: boolean;
  /** A list of the languages used in the show, identified by their [ISO 639](https://en.wikipedia.org/wiki/ISO_639) code.
 */
  languages: string[];
  /** The media type of the show.
 */
  media_type: string;
  /** The name of the episode.
 */
  name: string;
  /** The publisher of the show.
 */
  publisher: string;
  /** The total number of episodes in the show.
 */
  total_episodes: number;
  /** The object type.
 */
  type: ShowBaseType;
  /** The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the show.
 */
  uri: string;
}
