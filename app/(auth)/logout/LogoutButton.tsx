'use client';

import { useRouter } from 'next/navigation';
import { logout } from './actions';
import styles from './logoutButton.module.scss';
import { Route } from 'next';

export function LogoutButton() {
  const router = useRouter();
  return (
    <form>
      <button
        className={styles.button}
        formAction={async () => {
          await logout();
          router.push('/' as Route);
        }}
      >
        Logout
      </button>
    </form>
  );
}
