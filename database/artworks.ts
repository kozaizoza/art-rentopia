import { cache } from 'react';
import { Artwork } from '../migrations/1687366122-createTableArtworks';
import { sql } from './connect';

export const getArtworkByArtworkName = cache(async (artworkName: string) => {
  const [artwork] = await sql<Artwork[]>`
    SELECT
      id,
      artwork_name
    FROM
      artworks
    WHERE
      artworks.artwork_name = ${artworkName.toLowerCase()}
 `;

  return artwork;
});

export const createArtwork = cache(
  async (artworkName: string, userId: number) => {
    const [artwork] = await sql<Artwork[]>`
    INSERT INTO artworks
      (artwork_name, user_id)
    VALUES
      (${artworkName.toLowerCase()}, ${userId})
    RETURNING
      id,
      artwork_name
 `;

    return artwork;
  },
);

export const getArtworksByUserId = cache(async (userId: number) => {
  const artworksByUserId = await sql<Artwork[]>`
    SELECT
      artworks.artwork_name
    FROM artworks
    WHERE
      artworks.user_id = ${userId}

  `;
  return artworksByUserId;
});

export const getAllArtworks = cache(async () => {
  const artworks = await sql<Artwork[]>`
    SELECT *
    FROM artworks
  `;
  return artworks;
});
