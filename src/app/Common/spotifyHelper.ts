import { addMilliseconds, format } from 'date-fns';
import { IArtist } from '../Interfaces/IArtist';
import { IMusic } from '../Interfaces/IMusic';
import { IPlaylist } from '../Interfaces/IPlaylist';
import { IUser } from '../Interfaces/IUser';
import { newMusic, newPlaylist } from './factories';

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

export function SpotifySinglePlaylistForPlaylist(
  playlist: SpotifyApi.SinglePlaylistResponse
): IPlaylist {
  if (!playlist) return newPlaylist();

  return {
    id: playlist.id,
    name: playlist.name,
    imageUrl: playlist.images.shift().url,
    musics: [],
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

export function SpotifyMusicForMusic(
  spotifyTrack: SpotifyApi.TrackObjectFull
): IMusic {
  if (!spotifyTrack) {
    return newMusic();
  }

  const msForMinutes = (ms: number) => {
    const date = addMilliseconds(new Date(0), ms);
    return format(date, 'mm:ss');
  };

  return {
    id: spotifyTrack.uri,
    title: spotifyTrack.name,
    album: {
      id: spotifyTrack.id,
      imageUrl: spotifyTrack.album.images.shift().url,
      name: spotifyTrack.album.name,
    },
    artists: spotifyTrack.artists.map((artist) => ({
      id: artist.id,
      name: artist.name,
    })),
    time: msForMinutes(spotifyTrack.duration_ms),
  };
}
