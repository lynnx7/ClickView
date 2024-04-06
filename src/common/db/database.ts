import { Playlist } from '@/interfaces/playlist';
import { Video } from '@/interfaces/video';

export const Database = {
  playlists: (): Playlist[] => {
    return require('./playlists.json');
  },
  videos: (): Video[] => {
    return require('./videos.json');
  },

  // Get all videos in one playlist
  videosInPlaylist: (playlistId: number): Video[] => {
    const playlists = Database.playlists();
    const videos = Database.videos();

    const playlist = playlists.find(playlist => playlist.id === playlistId);

    if (!playlist) {
      throw new Error(`Playlist with ID ${playlistId} not found.`);
    }

    const playlistVideos: Video[] = [];

    playlist.videoIds.forEach(videoId => {
      const video = videos.find(video => video.id === videoId);
      if (video) {
        playlistVideos.push(video);
      }
    });

    return playlistVideos;
  }


}