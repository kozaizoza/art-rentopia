import { Sql } from 'postgres';

export const artworks = [
  {
    id: 1,
    artworkName: 'buttons',
    description:
      'Duprés collage featuring a cat showcases her distinctive manual manipulation technique of cutting and pasting paper onto canvas, resulting in a mesmerizing artwork that defies conventional perceptions. By meticulously altering the original images, Dupré creates a surreal and captivating reality where the feline subject takes on a whole new dimension. The intricate layering and rearrangement of the cats image evoke a sense of curiosity and wonder, inviting viewers to explore the artists imaginative world where the familiar transforms into an enigmatic and intriguing presence.',
    userId: null,
    imageUrl:
      'https://res.cloudinary.com/dgb5gkfjb/image/upload/v1687451167/1200-buttons-lola-dupre_cfljwn.jpg',
    categoryId: null,
  },
];

export async function up(sql: Sql) {
  for (const artwork of artworks) {
    await sql`
    INSERT INTO artworks
      (artwork_name, description, user_id, image_url, category_id)
    VALUES
      (${artwork.artworkName}, ${artwork.description}, ${artwork.userId}, ${artwork.imageUrl}, ${artwork.categoryId})
  `;
  }
}

export async function down(sql: Sql) {
  for (const artwork of artworks) {
    await sql`
      DELETE FROM artworks WHERE id = ${artwork.id}
  `;
  }
}
