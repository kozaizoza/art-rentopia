'use client';

import { useState } from 'react';
import { AiOutlineHeart, AiTwotoneHeart } from 'react-icons/ai';
import styles from './like.module.scss';

interface LikeProps {
  isAuthenticated: boolean;
}

export default function Like({ isAuthenticated }: LikeProps) {
  const [like, setLike] = useState(false);
  const [message, setMessage] = useState('');

  const toggleLike = () => {
    if (!isAuthenticated) {
      setMessage('Please log in to like this product.');
    } else {
      setLike(!like);
      setMessage('');
    }
  };

  return (
    <div>
      <button onClick={toggleLike} className={styles.likeButton}>
        <div>
          <p
            className={`${styles.heartShape} ${
              like ? styles.heartShapeRed : ''
            }`}
          >
            {like ? <AiTwotoneHeart /> : <AiOutlineHeart />}
          </p>
          <p className={styles.message}>{message}</p>
        </div>
      </button>
    </div>
  );
}
