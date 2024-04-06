"use client";
import { useEffect, useState } from 'react';
import VideoItem from '@/components/video-item';

export default function PlaylistPage({ params }: { params: { id: string } }) {
  const [videolist, setVideolist] = useState<any[]>([]);

  useEffect(() => {
    async function fetchPlaylist() {
      try {

        const response = await fetch('/api/playlists/'+params.id);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setVideolist(data);
        console.log("refreshing")
        
      } catch (error) {
        console.error('Error fetching playlist:', error);
      }
    }

    if (params.id) {
      fetchPlaylist();
    }
  }, [params.id]);

  if (!videolist) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>This Playlist {params.id}</h1>

      {videolist ? (
        <div>
        {videolist.map((video, index) => (
          <VideoItem key={index} video={video} inList={true} listId={Number(params.id)} setVideolist={setVideolist} 
          handleShow={() => true} setSelectVid={() => true} setSelectName={() => true}
          />
          
        ))}
        </div>
      ) 
       : (
        'Loading...'
      )}
    </div>
  );
}