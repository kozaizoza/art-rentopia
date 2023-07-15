import { cookies } from 'next/headers';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getArtworkById } from '../../../database/artworks';
import { getUserByToken } from '../../../database/users';
import styles from './singleArtwork.module.scss';
import Like from '../../components/Like';
import DeleteArtworks from './DeleteArtworks';
import ContactMeButton from '../../components/ContactButton';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Art Rentopia',
  description: 'Explore the creativity of different Artists.',
};

type Props = {
  params: {
    artworkId: string;
  };
};

export default async function ArtworkPage(props: Props) {
  const singleArtwork = await getArtworkById(Number(props.params.artworkId)); // Convert the string into a number

  if (!singleArtwork) {
    notFound();
  }

  const sessionTokenCookie = cookies().get('sessionToken');

  // 2. check if the sessionToken has a valid session
  const user =
    sessionTokenCookie && (await getUserByToken(sessionTokenCookie.value));
  console.log('user', user);

  const isAuthenticated = !!user; // Determine the authentication status

  return (
    <main className={styles.artworkContainer}>
      <Image
        src={singleArtwork.imageUrl}
        alt="picture"
        width={0}
        sizes="100vw"
        height={0}
        style={{ width: '100%', height: 'auto' }}
        className={styles.image}
      />

      <div className={styles.text}>
        <Like isAuthenticated={isAuthenticated} />
        <h4>{singleArtwork.author}</h4>
        <p className={styles.title}>Title: {singleArtwork.artworkName}</p>
        <p>{singleArtwork.description}</p>
        <DeleteArtworks artwork={singleArtwork} user={user} />
        <ContactMeButton />
      </div>
    </main>
  );
}
