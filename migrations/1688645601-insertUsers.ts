import { Sql } from 'postgres';

export const users = [
  {
    id: 1,
    username: 'azra',
    email: 'azra@email.com',
    passwordHash: '3653fhdfjfjhkhll',
    author: 'Lola Dupre',
    bio: 'Hello, my name is Azra',
  },
];

export async function up(sql: Sql) {
  for (const user of users) {
    await sql`
    INSERT INTO users ( username, email, password_hash, author, bio)
    VALUES
    (${user.username}, ${user.email}, ${user.passwordHash}, ${user.author}, ${user.bio})`;
  }
}

export async function down(sql: Sql) {
  for (const user of users) {
    await sql`
    DELETE FROM users WHERE id = ${user.id}
    `;
  }
}
