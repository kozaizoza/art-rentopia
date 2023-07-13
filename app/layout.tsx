import './globals.scss';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { getUserByToken } from '../database/users';
import { LogoutButton } from './(auth)/logout/LogoutButton';
import styles from './layout.module.scss';
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Art Rentopia',
  description:
    'This is a web platform that empowers artists to bypass intermediaries and rent or sell their art directly to interested individuals.',
};
type LayoutProps = {
  children: string;
};

export default async function RootLayout({ children }: LayoutProps) {
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');
  console.log(token);

  const user = !token?.value ? undefined : await getUserByToken(token.value);
  console.log(user);

  return (
    <html lang="en">
      <body className={inter.className}>
        <header className={styles.header}>
          <nav>
            <Link href="/" className={styles.h1}>
              Art Rentopia
            </Link>
            <ul>
              <li>
                <Link href="/artworks">Artworks</Link>
              </li>
              <li>
                <Link href="/upload">Get involved</Link>
              </li>
            </ul>
            <div>
              {user ? (
                <div className={styles.username}>
                  <div>{user.username}</div>
                  <LogoutButton />
                </div>
              ) : (
                <ul>
                  <li className={styles.register}>
                    <Link href="/register">Register</Link>
                  </li>
                  <li className={styles.button}>
                    <Link href="/login">Log in</Link>
                  </li>
                </ul>
              )}
            </div>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
