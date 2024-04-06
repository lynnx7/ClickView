import { Database } from '@/common/db/database';
import { NextRequest } from 'next/server';

export async function GET() {
  try {
    const data = await Database.playlists();

    return Response.json(data);
  } catch {
    return new Response(`File not found`, { status: 400 })
  }
}

export async function DELETE(req: NextRequest) {

  try {
    if (req.body){
      const { id} = await req.json();
      const result = await Database.removePlaylist(id);
      return Response.json(result);
    }

    return new Response(`Playlist deleted successfully`, { status: 200 });
  } catch (error) {
    console.error('Error deleting playlist:', error);
    return new Response(`Internal Server Error`, { status: 500 });
  }
}

export async function POST(req: NextRequest) {

  try {
    if (req.body){
      const bod = await req.json();
      const result = await Database.addPlaylist(bod.name,bod.desc);
      return Response.json(result);
    }

    return new Response(`Playlist added successfully`, { status: 200 });
  } catch (error) {
    console.error('Error adding playlist:', error);
    return new Response(`Internal Server Error`, { status: 500 });
  }
}