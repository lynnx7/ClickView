import { Button} from 'react-bootstrap';

interface RemoveButtonProps {
    id: Number;
    setVideolist:Function;
    listId?:Number
  }

  interface addPlaylistProps {
    videoId: Number;
    listId: Number;
    listName: String;
    handleClose: Function;
  }

  interface newVideoProps {
    handleShow: Function;
    setSelectVid: Function;
    vid: Number;
  
    setSelectName: Function;
    selectName: string;
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

  export function AddPlaylistButton({videoId,listId,listName,handleClose}: addPlaylistProps){

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
          console.log(data)
          handleClose(data)
          console.log('Video deleted successfully');
        } catch (error) {
          console.error('Error deleting video:', error);
        }
    }



    return(<Button onClick={fetchData} variant="outline-primary"> {listName}</Button>)
    
  }

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

