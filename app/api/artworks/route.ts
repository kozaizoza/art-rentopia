import { Artwork } from '../../../migrations/1687366122-createTableArtworks';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { getUserByToken } from '../../../database/users';
import { createArtwork } from '../../../database/artworks';

export type Error = {
  error: string;
};
export type CreateArtworkResponseBodyPost = { artwork: Artwork } | Error;

const artworkSchema = z.object({
  author: z.string(),
  artworkName: z.string(),
  description: z.string(),
  userId: z.number(),
  imageUrl: z.string(),
  // categoryId: z.number(),
});

export async function POST(
  request: NextRequest,
): Promise<NextResponse<CreateArtworkResponseBodyPost>> {
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');
  const user = token && (await getUserByToken(token.value));
  if (!user) {
    return NextResponse.json({ error: 'User not found' });
  }
  const body = await request.json();
  console.log(body);
  // get credentials from the body
  const result = artworkSchema.safeParse(body);
  // verify the user data and check that the name is not taken
  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Some information are missing, please complete form',
      },
      { status: 400 },
    );
  }
  // store credentials in the DB
  const newArtwork = await createArtwork(
    result.data.author,
    result.data.artworkName,
    result.data.description,
    result.data.userId,
    result.data.imageUrl,
    // result.data.categoryId,
  );
  if (!newArtwork) {
    return NextResponse.json(
      {
        error: 'Error creating the new artwork',
      },
      { status: 500 },
    );
  }
  return NextResponse.json({
    artwork: newArtwork,
  });
}

// Delete part
// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: Record<string, string | string[]> },
// ): Promise<NextResponse<CreateArtworkResponseBodyPost>> {
//   const artworkId = Number(params.artworkId);
//   const cookieStore = cookies();
//   const token = cookieStore.get('sessionToken');
//   const user = token && (await getUserByToken(token.value));
//   if (!user) {
//     return NextResponse.json({ error: 'User not found' });
//   }

//   // Check if the artwork belongs to the user
//   const artwork = await getArtworkById(artworkId);
//   if (!artwork || artwork.userId !== user.id) {
//     return NextResponse.json({ error: 'Artwork not found' });
//   }

//   // Delete the artwork from the database
//   const deletedArtwork = await deleteArtworkById(artworkId);
//   if (!deletedArtwork) {
//     return NextResponse.json({ error: 'Error deleting the artwork' });
//   }

//   return NextResponse.json({
//     artwork: deletedArtwork,
//   });
// }
