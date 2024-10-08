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
import type { DisallowsObject } from './disallowsObject';
import type { ContextObject } from './contextObject';
import type { DeviceObject } from './deviceObject';
import type { CurrentlyPlayingContextObjectItem } from './currentlyPlayingContextObjectItem';

export interface CurrentlyPlayingContextObject {
  /** Allows to update the user interface based on which playback actions are available within the current context.
 */
  actions?: DisallowsObject;
  /** A Context Object. Can be `null`. */
  context?: ContextObject;
  /** The object type of the currently playing item. Can be one of `track`, `episode`, `ad` or `unknown`.
 */
  currently_playing_type?: string;
  /** The device that is currently active.
 */
  device?: DeviceObject;
  /** If something is currently playing, return `true`. */
  is_playing?: boolean;
  /** The currently playing track or episode. Can be `null`. */
  item?: CurrentlyPlayingContextObjectItem;
  /** Progress into the currently playing track or episode. Can be `null`. */
  progress_ms?: number;
  /** off, track, context */
  repeat_state?: string;
  /** If shuffle is on or off. */
  shuffle_state?: boolean;
  /** Unix Millisecond Timestamp when playback state was last changed (play, pause, skip, scrub, new song, etc.). */
  timestamp?: number;
}
