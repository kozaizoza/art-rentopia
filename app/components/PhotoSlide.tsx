'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import landingpage1 from '../../public/landingpage1.jpg';
import landingpage2 from '../../public/landingpage2.jpg';
import landingpage3 from '../../public/landingpage3.jpg';
import landingpage4 from '../../public/landingpage4.jpg';
import styles from './photoSlide.module.scss';

const photos = [
  { id: 1, src: landingpage1 },
  { id: 2, src: landingpage2 },
  { id: 3, src: landingpage3 },
  { id: 4, src: landingpage4 },
];

const transitionDuration = 2500;

const PhotoSlide: React.FC = () => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovering) {
        setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
      }
    }, transitionDuration);

    return () => clearInterval(interval);
  }, [isHovering]);

  return (
    <main className={styles.container}>
      <div className={styles.photoSlide}>
        {photos.map((photo, index) => (
          <div
            key={`photo-div-${photo.id}`}
            style={{
              opacity: index === currentPhotoIndex ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out',
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Image
              src={photo.src}
              alt={`Image ${index + 2}`}
              layout="fill"
              quality={100}
            />
          </div>
        ))}
      </div>
      <div className={styles.text}>
        <h2 className={styles.heading2}>Artist of the month</h2>
        <p className={styles.p2}>Sonia Alins</p>
        <p className={styles.p1}>
          Sonia Alins is an illustrator and artist focused on the creation of
          pieces of art (often three-dimensional) with a poetic narrative of a
          surreal nature with which she addresses her feelings, desires, dreams
          and nightmares. Sonia makes extensive use of the human figure (mostly
          feminine) and, at the same time, she explores the expressiveness of
          elements such as transparency and blur. Sonia's work incorporates
          textures with elements such as fabric, feathers, wool, printed paper
          or plastic to create pieces with ethereal atmospheres and a delicate
          representation of tridimensionality.
        </p>
      </div>
    </main>
  );
};

export default PhotoSlide;
