import { Sql } from 'postgres';

export type User = {
  id: number;
  username: string;
  email: string | null;
  author: string | null;
  bio: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE users (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      username varchar(80) NOT NULL UNIQUE,
      email varchar(80),
      password_hash varchar(160) NOT NULL,
      author varchar(40),
      bio varchar(600)
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE users
  `;
}
