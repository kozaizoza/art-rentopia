import styles from './page.module.scss';
import Link from 'next/link';

import PhotoSlide from './components/PhotoSlide';

export default function HomePage() {
  return (
    <main>
      <section>
        <PhotoSlide />
      </section>
      <section className={styles.background}>
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            src="https://res.cloudinary.com/dgb5gkfjb/image/upload/v1688409968/d88aecdc505e5a5df5596b8230b100ae_i2vcwy.gif"
            loading="eager"
            alt="Surge Select Still"
          />
        </div>
        <div className={styles.overlay}>
          {/* <p>Discover and Support Artists</p> */}
          <Link href="/artworks" className={styles.collectionLink}>
            Discover and support Artists
          </Link>
        </div>
      </section>
    </main>
  );
}
