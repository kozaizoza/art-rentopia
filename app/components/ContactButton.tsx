'use client';
import Link from 'next/link';
import styles from './contactButton.module.scss';
import { AiOutlineMail } from 'react-icons/ai';

export default function ContactButton() {
  return (
    <Link
      className={styles.contactButton}
      href="mailto:abc@example.com?subject = Feedback&body = Message"
    >
      Contact the artist
      <div className={styles.mail}>
        <AiOutlineMail />
      </div>
    </Link>
  );
}
