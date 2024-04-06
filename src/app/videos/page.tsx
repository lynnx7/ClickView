"use client";
import React from 'react';
import { useState, useEffect } from 'react';
import VideoItem from '@/components/video-item';
import { Modal} from 'react-bootstrap';
import { AddPlaylistButton } from '@/components/utils-item';

export default function VideosPage() {
  const [videolist, setVideolist] = useState<any[]>([]);
  const [show, setShow] = useState(false);
  const [selectVid, setSelectVid] = useState(0)
  const [selectName, setSelectName] = useState("")

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      <h1>Videos route</h1>
      {videolist ? (
        <div>
          <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Add &quot;{selectName}&quot; to</Modal.Title>


                  </Modal.Header>
                  <Modal.Body>
                  
                  {playlist ? (
                          <div>
                              {playlist.map((list, index) => (
                                <React.Fragment key={index}>
                                  {!list.videoIds.includes(selectVid) && (
                                    <>
                                      <AddPlaylistButton
                                        videoId={selectVid} 
                                        listId={list.id}
                                        handleClose={handleClose}
                                        listName={list.name}
                                        setPlaylist={setPlaylist}
                                      />
                                      <br/>
                                    </>
                                  )}
                                </React.Fragment>
                              ))}
                          
                          </div>
                        ) 
                        : (
                          'Loading...'
                        )}
                  
                  </Modal.Body>
                </Modal>

        {videolist.map((video, index) => (
          <VideoItem key={index} video={video} inList={false} listId={0} setVideolist={setVideolist}
          
          handleShow={handleShow}
          setSelectVid = {setSelectVid}
          setSelectName = {setSelectName}
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