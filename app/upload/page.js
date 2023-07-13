import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { getUserByToken } from '../../database/users';

import { getValidSessionByToken } from '../../database/sessions';
import styles from './upload.module.scss';
import UploadForm from './UploadForm';

export default async function UploadPage() {
  // allowing access to only authorised user
  const token = cookies().get('sessionToken');
  console.log(token);
  const session = token && (await getValidSessionByToken(token.value));

  if (!session) redirect(`/login?returnTo=/upload`);

  const user = !token.value ? undefined : await getUserByToken(token.value);

  if (!user) {
    redirect('/login');
  }

  const userId = user.id;
  // const artworks = await getArtworks();
  // const artwork = artworks.find(
  //   (singleArtwork) => singleArtwork.userId === userId,
  // );

  return (
    <main className={styles.mainContainer}>
      <div className={styles.container}>
        <h3>Hello {user.username}!</h3>
        <p>
          Discover, showcase, and connect with our artist platform. Upload your
          artwork and engage with interested individuals who appreciate your
          talent.{' '}
        </p>
      </div>
      <div>
        <UploadForm userId={userId} />
      </div>
    </main>
  );
}
