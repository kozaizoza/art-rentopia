import { Sql } from 'postgres';

export type Artwork = {
  id: number;
  author: string;
  artworkName: string;
  description: string;
  userId: number | null;
  imageUrl: string;
  // categoryId: number | null;
};

export async function up(sql: Sql) {
  await sql`
  CREATE TABLE artworks (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    author varchar (40) NOT NULL,
    artwork_name varchar(30) NOT NULL,
    description varchar(600) NOT NULL,
    user_id integer REFERENCES users (id) ON DELETE CASCADE,
    image_url varchar(140)
    -- category_id integer
  )
  `;
}

export async function down(sql: Sql) {
  await sql`
  DROP TABLE artworks
  `;
}
