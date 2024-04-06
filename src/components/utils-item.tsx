// button components for add/remove videos
import { Button} from 'react-bootstrap';
import { useState } from 'react';

interface RemoveButtonProps {
    id: Number;
    setVideolist:Function;
    listId?:Number
  }

interface newPlaylistProps {
    setPlaylist: Function;
  }

interface addPlaylistProps {
  videoId: Number;
  listId: Number;
  listName: String;
  handleClose: Function;
  setPlaylist:Function
}

interface newVideoProps {
  handleShow: Function;
  setSelectVid: Function;
  vid: Number;

  setSelectName: Function;
  selectName: string;
}

interface RemovePlaylistProps {
  id: Number;
  setPlaylist:Function;
}

  export function AddPlaylistButton({videoId,listId,listName,handleClose,setPlaylist}: addPlaylistProps){

    async function fetchData() {
      try {
        console.log(videoId,listId,listName)
          const response = await fetch(`/api/videos`, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({"videoId":videoId,"listId":listId}),
          });
          const data = await response.json();
          setPlaylist(data)
          console.log(data)
          handleClose()
          console.log('Video deleted successfully');
        } catch (error) {
          console.error('Error deleting video:', error);
        }
    }



    return(<Button onClick={fetchData} variant="outline-primary"> {listName}</Button>)
    
  }

export function AddVideoButton ({handleShow,setSelectVid,vid,setSelectName,selectName}: newVideoProps){
  
    function add(){
      handleShow()
      setSelectName(selectName)
      setSelectVid(vid)
    }

    return (

      <Button onClick={add}>Add to Playlist</Button>
        );
}

export function NewPlaylist ({setPlaylist}: newPlaylistProps) {

  const [creating,setCreating] = useState(false)
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDesc, setPlaylistDesc] = useState("");

  async function fetchData() {
    try {
        const response = await fetch(`/api/playlists`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({"name":playlistName,"desc":playlistDesc}),
        });
        const data = await response.json();
        console.log(data)
        setPlaylist(data)
        console.log('Video deleted successfully');
      } catch (error) {
        console.error('Error deleting video:', error);
      }
  }

  const handleSubmit = () => {
    fetchData();
    setPlaylistName('');
    setPlaylistDesc('');
    setCreating(false)
  };

  if (creating){
    return (

      <div>
      
      <label>
        Playlist Name:
        <input type="text" value={playlistName} onChange={(e) => setPlaylistName(e.target.value)} />
      </label>
      <br />
      <label>
        Description:
        <input type="text" value={playlistDesc} onChange={(e) => setPlaylistDesc(e.target.value)} />
      </label>
      <br />
      <Button onClick={handleSubmit}>Create</Button>
      <Button variant="light" onClick={() => {setCreating(false)} }>Cancel</Button>
    </div>)
  }else{
    return <Button style={{margin: '10px'}} onClick={() => {setCreating(true)} } >New Playlist</Button>
  }



}



export function RemovePlaylistButton ({ id,setPlaylist}: RemovePlaylistProps) {

    async function fetchData() {
        try {
            const response = await fetch(`/api/playlists`, {
              method: 'DELETE',
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({"id":id}),
            });
            const data = await response.json();
            console.log(data)
            setPlaylist(data)
            console.log('Video deleted successfully');
          } catch (error) {
            console.error('Error deleting video:', error);
          }
      }

    return (
      <Button variant="secondary" onClick={fetchData}>Remove</Button>
    );
};

export function RemoveVideoButton ({ id,setVideolist, listId }: RemoveButtonProps) {

    async function fetchData() {
        try {
            const response = await fetch(`/api/videos`, {
              method: 'DELETE',
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({"id":id,"listId":listId}),
            });
            const data = await response.json();
        
            setVideolist(data)
            console.log('Video deleted successfully');
          } catch (error) {
            console.error('Error deleting video:', error);
          }
      }

    return (
      <Button variant="secondary" onClick={fetchData}>Remove</Button>
    );
};