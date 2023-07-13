'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Artwork } from '../../../migrations/1687366122-createTableArtworks';
import { User } from '../../../migrations/1687365778-createTableUsers';
import styles from './singleArtwork.module.scss';

type Props = {
  artwork: Artwork;

  user?: User;
};

export default function DeleteArtworks(props: Props) {
  const [error, setError] = useState('');
  const router = useRouter();

  if (!props.user) return null;

  return (
    <div>
      {props.artwork.userId === props.user.id && (
        <button
          className={styles.deleteButton}
          onClick={async () => {
            const response = await fetch(`/api/artworks/${props.artwork.id}`, {
              method: 'DELETE',
            });

            const data = await response.json();

            if (data.error) {
              setError(data.error);
              console.log(error);
              router.refresh();
              return;
            }
            router.refresh();
            router.push('/artworks');
          }}
        >
          x
        </button>
      )}
    </div>
  );
}
