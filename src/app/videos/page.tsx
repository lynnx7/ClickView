"use client";
import React from 'react';
import { useState, useEffect } from 'react';
import VideoItem from '@/components/video-item';

export default function VideosPage() {
  const [videolist, setVideolist] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/videos');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log(data)
        setVideolist(data);
      } catch (error) {
        console.error('Error fetching data:');
      }
    }

    fetchData();
  }, []);



  return (
    <>
      <h1>Videos route</h1>
      {videolist ? (
        <div>

        {videolist.map((video, index) => (
          <VideoItem key={index} video={video} 
          />
        ))}
        </div>
      ) 
       : (
        'Loading...'
      )}
    </>
  );
}