'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RegisterResponseBodyPost } from '../../api/(auth)/register/route';
import styles from './register.module.scss';

export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function register() {
    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });

    const data: RegisterResponseBodyPost = await response.json();

    if ('error' in data) {
      setError(data.error);
      return;
    }

    console.log(data.user);
    router.push(`/profile/${data.user.username}`);
    // we may have in the future revalidatePath()
    router.refresh();
  }

  return (
    <form onSubmit={(event) => event.preventDefault()} className={styles.form}>
      <h4>Create an account</h4>
      <label>
        Username:
        <input
          value={username}
          onChange={(event) => setUsername(event.currentTarget.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
      </label>
      <button onClick={async () => await register()} className={styles.button}>
        sign up
      </button>
      {error !== '' && <div className={styles.error}>{error}</div>}
    </form>
  );
}
