import Link from 'next/link';
import styles from './artworks.module.scss';

export default function ArtworksPage() {
  return (
    <main>
      <nav className={styles.link}>
        <Link href="/">Home</Link>
      </nav>
      <div className={styles.artworkPage}>This is Artwork page 🎆</div>
    </main>
  );
}
