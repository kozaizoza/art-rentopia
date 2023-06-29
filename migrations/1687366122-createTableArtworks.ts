import { Sql } from 'postgres';

export type Artwork = {
  id: number;
  artworkName: string;
  description: string;
  userId: number | null;
  imageUrl: string;
  categoryId: number | null;
};

export async function up(sql: Sql) {
  await sql`
  CREATE TABLE artworks (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    artwork_name varchar(30) NOT NULL,
    description varchar(600) NOT NULL,
    user_id integer,
    image_url varchar(140),
    category_id integer
  )
  `;
}

export async function down(sql: Sql) {
  await sql`
  DROP TABLE artworks
  `;
}
