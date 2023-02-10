import { Genre } from '../../types/genre';
import { Music } from '../../types/music';
import axiosClient from '../axiosClient';

const getMusic = (params?: {
  pagination?: { limit?: number; offset?: number };
  filter?: {
    genre_id?: string;
    artist_name?: string;
    year?: string;
    song?: string;
  };
}) => {
  return axiosClient.get<{ count: number; data: Music[] }>('/music', {
    params: {
      limit: params?.pagination?.limit,
      offset: params?.pagination?.offset,
      genre_id: params?.filter?.genre_id || undefined,
      song: params?.filter?.song || undefined,
      artist_name: params?.filter?.artist_name || undefined,
      year: params?.filter?.year || undefined,
    },
  });
};

const getGenres = () => {
  return axiosClient.get<Genre[]>('/music/genres');
};

export default {
  getMusic,
  getGenres,
};
