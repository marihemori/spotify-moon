import { IArtist } from '../Interfaces/IArtist';
import { IMusic } from '../Interfaces/IMusic';
import { IPlaylist } from '../Interfaces/IPlaylist';

export function newArtist(): IArtist {
  return {
    id: '',
    imageUrl: '',
    name: '',
    musics: [],
  };
}

export function newMusic(): IMusic {
  return {
    id: '',
    album: {
      id: '',
      imageUrl: '',
      name: '',
    },
    artists: [],
    time: '',
    title: '',
  };
}

export function newPlaylist(): IPlaylist {
  return {
    id: '',
    imageUrl: '',
    name: '',
    musics: [],
  };
}
