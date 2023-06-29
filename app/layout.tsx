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
      <body>
        <header className={styles.header}>
          {user ? (
            <div className={styles.username}>
              <div>{user.username}</div>
              <LogoutButton />
            </div>
          ) : (
            <ul className={styles.navbar}>
              <li className={styles.register}>
                <Link href="/register">Register</Link>
              </li>
              <li className={styles.button}>
                <Link href="/login">Log in</Link>
              </li>
            </ul>
          )}
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
