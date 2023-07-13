import {
  deleteArtworkById,
  getArtworkById,
} from '../../../../database/artworks';
import { NextRequest, NextResponse } from 'next/server';
import { getUserByToken } from '../../../../database/users';
import { cookies } from 'next/headers';
import { Artwork } from '../../../../migrations/1687366122-createTableArtworks';

type Error = {
  error: string;
};

export type CreateArtworkResponseBodyDelete = { artwork: Artwork } | Error;

export async function DELETE(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<CreateArtworkResponseBodyDelete>> {
  const artworkId = Number(params.artworkId);
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');
  const user = token && (await getUserByToken(token.value));
  if (!user) {
    return NextResponse.json({ error: 'User not found' });
  }

  // Check if the artwork belongs to the user
  const artwork = await getArtworkById(artworkId);
  if (!artwork || artwork.userId !== user.id) {
    return NextResponse.json({ error: 'Artwork not found' });
  }

  // Delete the artwork from the database
  const deletedArtwork = await deleteArtworkById(artworkId);
  if (!deletedArtwork) {
    return NextResponse.json({ error: 'Error deleting the artwork' });
  }

  return NextResponse.json({
    artwork: artwork,
  });
}
