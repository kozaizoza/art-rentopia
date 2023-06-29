'use client';

import { Route } from 'next';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getSafeReturnToPath } from '../../../util/validation';
import { LoginResponseBodyPost } from '../../api/(auth)/login/route';
import Link from 'next/link';
import styles from './LoginForm.module.scss';

type Props = { returnTo?: string | string[] };

export default function LoginForm(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function login() {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });

    const data: LoginResponseBodyPost = await response.json();

    if ('error' in data) {
      setError(data.error);
      console.log('error', data.error);
      return;
    }

    // if credentials correct, redirect to HomePageWhenLoggedIn
    router.push(
      getSafeReturnToPath(props.returnTo) || `/profile/${data.user.username}`,
    );
    // we may have in the future revalidatePath()
    router.refresh();
  }

  return (
    <div className={styles.loginContainer}>
      <div>
        <h4>Welcome back</h4>

        <form
          onSubmit={(event) => event.preventDefault()}
          className={styles.form}
        >
          <label htmlFor="username">Username:</label>
          <input
            value={username}
            onChange={(event) => setUsername(event.currentTarget.value)}
          />

          <div className={styles.div}>
            <label htmlFor="username">Password:</label>
            <input
              value={password}
              type="password"
              onChange={(event) => setPassword(event.currentTarget.value)}
            />
          </div>
          <button onClick={async () => await login()} className={styles.button}>
            log in
          </button>
          {error !== '' && <div className={styles.error}>{error}</div>}
        </form>
      </div>
      <div>
        <p className={styles.p}>
          Don't have an account yet?
          <Link href="/register" className={styles.body}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
