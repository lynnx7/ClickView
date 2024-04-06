import { Button, Col, Row } from 'react-bootstrap';
import { Playlist } from '../interfaces/playlist';

import { useRouter } from 'next/navigation'

import {RemovePlaylistButton} from '@/components/utils-item';

interface PlaylistItemProps {
  playlist: Playlist;
  setPlaylist: Function;
}

function BrowseButton ({ id }: { id: Number }) {
  const router = useRouter()
  return (
    <Button variant="success" onClick={() => router.push('/playlists/'+JSON.stringify(id))}>Browse</Button>
  );
};


export function PlaylistItem(props: PlaylistItemProps) {
  const { playlist } = props;
  const setPlaylist = props.setPlaylist;


  const videoCount = playlist.videoIds.length === 1 ? '1 video' : `${playlist.videoIds.length} videos`;

  return (
  
  
    <Row className='border rounded p-2 mb-2'>
      <Col xs='12' md='1'>
        <BrowseButton id={playlist.id} />
        <RemovePlaylistButton id={playlist.id} setPlaylist = {setPlaylist} />
      </Col>
      <Col xs='12' md='3'>
        <h2 className='h5'>{playlist.name}</h2>
        <p className='mb-0'>{videoCount}</p>
      </Col>
      <Col xs='12' md='8'>
        <p className='mb-0'>{playlist.description}</p>
      </Col>
    </Row>

  )
}