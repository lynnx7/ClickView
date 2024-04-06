import { Col, Image, Row,Button } from 'react-bootstrap';
import { Video } from '../interfaces/video';

import {AddVideoButton, RemoveVideoButton} from '@/components/utils-item';

interface VideoItemProps {
  video: Video;
  inList:Boolean;
  listId:Number;
  setVideolist:Function;

  handleShow: Function;
  setSelectVid:Function
  setSelectName: Function
}

export default function VideoItem(props: VideoItemProps) {
  const {
    video,
    inList,
    listId,
    setVideolist,
    handleShow,
    setSelectVid,
    setSelectName
  } = props;

  

  return (
    <Row>
      <Col xs='12' md='3' className='mb-3'>
        <Image fluid rounded src={`${video.thumbnail}?size=small`} alt={video.name} className='w-100' />
      </Col>
      <Col xs='12' md='9' className='mb-3'>
        <h2 className='h4'>{video.name}</h2>
        <p>{video.description}</p>
        {inList ? <RemoveVideoButton id={Number(video.id)} listId={listId} setVideolist={setVideolist}/>: 
                  <AddVideoButton handleShow={handleShow} setSelectVid={setSelectVid} vid={video.id} setSelectName={setSelectName}
                  selectName={video.name}
                  /> }
        
      </Col>
    </Row>
  )
}