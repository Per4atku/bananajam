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
import type { RemoveTracksPlaylistBodyTracksItem } from './removeTracksPlaylistBodyTracksItem';

export type RemoveTracksPlaylistBody = {
  /** The playlist's snapshot ID against which you want to make the changes.
The API will validate that the specified items exist and in the specified positions and make the changes,
even if more recent changes have been made to the playlist.
 */
  snapshot_id?: string;
  /** An array of objects containing [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) of the tracks or episodes to remove.
For example: `{ "tracks": [{ "uri": "spotify:track:4iV5W9uYEdYUVa79Axb7Rh" },{ "uri": "spotify:track:1301WleyT98MSxVHPZCA6M" }] }`. A maximum of 100 objects can be sent at once.
 */
  tracks: RemoveTracksPlaylistBodyTracksItem[];
};
