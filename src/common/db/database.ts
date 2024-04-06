import { Playlist } from '@/interfaces/playlist';
import { Video } from '@/interfaces/video';
import fs from 'fs';

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
  },

  removeVideo: (videoId:number,playlistId: number): Video[] => {

    try {
      const playlists = Database.playlists();
      const playlistIndex = playlists.findIndex(playlist => playlist.id === playlistId);
  
      if (playlistIndex === -1) {
        throw new Error(`Playlist with ID ${playlistId} not found.`);
      }
  
      let playlist = playlists[playlistIndex];
      playlist.videoIds = playlist.videoIds.filter(item => item !== videoId);
      playlists[playlistIndex] = playlist;
  
      // 将更新后的播放列表写回到 JSON 文件中
      fs.writeFileSync('src/common/db/playlists.json', JSON.stringify(playlists, null, 2));
  
      return Database.videosInPlaylist(playlist.id);
    } catch (error) {
      console.error('Error removing video from playlist:', error);
      return [];
    }

  },
  addPlaylist: (playlistName: string, playlistDesc: string): Playlist[] => {
    const playlists = Database.playlists();
    const newPlaylist: Playlist = {
      id: playlists.reduce((max, playlist) => {
        return playlist.id > max ? playlist.id : max;
    }, 0) + 1,
      name: playlistName,
      description: playlistDesc,
      videoIds: []
    };
    
    playlists.push(newPlaylist)
    fs.writeFileSync('src/common/db/playlists.json', JSON.stringify(playlists, null, 2));
    return playlists

  },
  removePlaylist: (playlistId: number): Playlist[] => {

    try {
      console.log("Deleting", playlistId)
      const playlists = Database.playlists();
      console.log("currentlist:",playlists)
      const newPlaylist = playlists.filter(playlist => playlist.id !== playlistId);
      if (!newPlaylist) {
        throw new Error(`Playlist with ID ${playlistId} not found.`);
      }
      playlists.length = 0; 
      newPlaylist.forEach(playlist => playlists.push(playlist));
      fs.writeFileSync('src/common/db/playlists.json', JSON.stringify(newPlaylist, null, 2));
      console.log("updated list:",newPlaylist)
      return newPlaylist;
    } catch (error) {
      console.error('Error removing video from playlist:', error);
      return [];
    }


  },

  addVidToList:(videoId: number, listId: number):Boolean=>{

    const playlists = Database.playlists();
    const playlistIndex = playlists.findIndex(playlist => playlist.id === listId);

    console.log(videoId,listId)
    if (playlistIndex === -1) {
      throw new Error(`Playlist with ID ${listId} not found.`);
    }

    let playlist = playlists[playlistIndex];
    playlist.videoIds.push(videoId);
    playlists[playlistIndex] = playlist;

    fs.writeFileSync('src/common/db/playlists.json', JSON.stringify(playlists, null, 2));

    return true

  },


}