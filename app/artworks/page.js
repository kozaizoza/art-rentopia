import Image from 'next/image';
import Link from 'next/link';
import styles from './artworks.module.scss';
import { getArtworks } from '../../database/artworks';

export const dynamic = 'force-dynamic';

export default async function ArtworksPage() {
  const artworks = await getArtworks();
  return (
    <main>
      <div className={styles.artworksContainer}>
        {artworks.map((artwork) => {
          return (
            <div key={`artwork-div-${artwork.id}`} className={styles.artwork}>
              <Link href={`/artworks/${artwork.id}`}>
                {' '}
                <Image
                  alt="artworks"
                  src={artwork.imageUrl}
                  width={0}
                  sizes="100vw"
                  height={0}
                  className={`${styles.artworkImage} ${styles.hoverEffect}`}
                />
              </Link>
              <br />
              <div>
                <Link href={`/artworks/${artwork.id}`}>
                  <p className={styles.artworkName}>{artwork.author}</p>
                  <p className={styles.artworkName}>{artwork.artworkName}</p>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
