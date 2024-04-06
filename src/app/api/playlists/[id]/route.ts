import { NextRequest } from 'next/server';
import { Database } from '@/common/db/database';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {

  try {
    const playListId = params.id

      const data = await Database.videosInPlaylist(Number(playListId));
      return Response.json(data);

  } catch {
    return new Response(`File not found`, { status: 400 });
  }

}