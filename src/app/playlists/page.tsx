"use client";
import React from 'react';
import { useState, useEffect } from 'react';
import { PlaylistItem } from '@/components/playlist-item';
import { NewPlaylist } from '@/components/utils-item';

export default function PlaylistsPage() {
  const [playlist, setPlaylist] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/playlists');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log("refresh",data)
        
        setPlaylist(data);
      } catch (error) {
        console.error('Error fetching data:');
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <h1>Playlists route</h1>
      <NewPlaylist setPlaylist={setPlaylist}/>
      {playlist ? (
        <div>
        {playlist.map((list, index) => (
          <PlaylistItem key={list.id} playlist={list} />
          
        ))}
        </div>
      ) 
       : (
        'Loading...'
      )}
    </>
  );
}