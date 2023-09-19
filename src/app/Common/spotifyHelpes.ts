import { IArtist } from '../Interfaces/IArtist';
import { IPlaylist } from '../Interfaces/IPlaylist';
import { IUser } from '../Interfaces/IUser';

export function SpotifyUserForUser(
  user: SpotifyApi.CurrentUsersProfileResponse
): IUser {
  const imageUrl = user.images?.length ? user.images.pop()?.url : undefined;
  return {
    id: user.id,
    name: user.display_name,
    imageUrl: user.images.pop().url,
  };
}

export function SpotifyPlaylistForPlaylist(
  playlist: SpotifyApi.PlaylistObjectSimplified
): IPlaylist {
  const imageUrl = playlist.images?.length
    ? playlist.images.pop()?.url
    : undefined;
  return {
    id: playlist.id,
    name: playlist.name,
    imageUrl: imageUrl,
  };
}

export function SpotifyArtistForArtist(
  spotifyArtist: SpotifyApi.ArtistObjectFull
): IArtist {
  return {
    id: spotifyArtist.id,
    imageUrl: spotifyArtist.images.sort((a, b) => a.width - b.width).pop().url,
    name: spotifyArtist.name,
  };
}
