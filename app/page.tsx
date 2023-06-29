import Image from 'next/image';
import styles from './page.module.scss';
import Link from 'next/link';
import buttons from '../public/buttons.jpg';

export default function HomePage() {
  return (
    <main>
      <h1 className={styles.h1}>Art Rentopia</h1>
      <div className={styles.body}>
        <Image src={buttons} alt="cute cat" width={800} height={500} />
      </div>
      <section className={styles.supportSection}>
        <p>Discover and Support Artists</p>
        <Link href="/artworks" className={styles.collectionLink}>
          View Collection
        </Link>
      </section>
    </main>
  );
}
