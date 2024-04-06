import { NextRequest } from 'next/server';
import { Database } from '@/common/db/database';

export async function GET() {
  try {
    const data = await Database.videos();

    return Response.json(data);
  } catch {
    return new Response(`File not found`, { status: 400 })
  }
}

export async function DELETE(req: NextRequest) {

  try {
    if (req.body){
      const { id, listId } = await req.json();
      const result = await Database.removeVideo(id,listId);
      return Response.json(result);
    }

    return new Response(`Video with ID deleted successfully`, { status: 200 });
  } catch (error) {
    console.error('Error deleting video:', error);
    return new Response(`Internal Server Error`, { status: 500 });
  }
}

export async function POST(req: NextRequest) {

  try {
    if (req.body){
      const { videoId, listId } = await req.json();
      const result = await Database.addVidToList(videoId, listId);
      return Response.json(result);
    }

    return new Response(`Video added successfully`, { status: 200 });
  } catch (error) {
    console.error('Error adding video:', error);
    return new Response(`Internal Server Error`, { status: 500 });
  }
}