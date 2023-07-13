'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import Image from 'next/image';
import styles from './upload.module.scss';

type Props = {
  userId: number;
};

export default function UploadForm(props: Props) {
  const [author, setAuthor] = useState('');
  const [artworkName, setArtworkName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  // change image
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target?.result as string);
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      setImageUrl(null);
    }
  };
  // upload image
  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const fileInput = Array.from(form.elements)
      .filter(
        (element) =>
          element instanceof HTMLInputElement && element.type === 'file',
      )
      .pop() as HTMLInputElement | undefined;
    if (fileInput) {
      const formData = new FormData();
      if (fileInput.files !== null) {
        for (const file of fileInput.files) {
          formData.append('file', file);
        }
      }
      formData.append('upload_preset', 'slcmfvwb');

      const artworkImage = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        },
      ).then((r) => r.json());

      const response = await fetch('/api/artworks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          author: author,
          artworkName: artworkName,
          description: description,
          userId: props.userId,
          imageUrl: artworkImage.secure_url,
        }),
      });

      const data = await response.json();

      if ('error' in data) {
        setError(data.error);
        return;
      }

      router.refresh();
      router.push(`/artworks`);
    }
  };

  return (
    <main className={styles.main}>
      <form onSubmit={handleOnSubmit}>
        <div>
          <input
            placeholder="Author"
            value={author}
            onChange={(event) => setAuthor(event.currentTarget.value)}
          />

          <input
            placeholder="Artwork Name"
            value={artworkName}
            onChange={(event) => setArtworkName(event.currentTarget.value)}
          />

          <input
            placeholder="Description"
            value={description}
            onChange={(event) => setDescription(event.currentTarget.value)}
          />
          <div>
            <label htmlFor="imageUrl">
              Artwork picture <span>*</span>
            </label>
            <input
              id="imageUrl"
              type="file"
              name="file"
              ref={fileInputRef}
              onChange={handleOnChange}
              className="file-input"
            />
          </div>
          <div className={styles.imagePreview}>
            {!!imageUrl && (
              <Image src={imageUrl} height={100} width={100} alt="Artwork" />
            )}
          </div>
          <button
          // onClick={async () => await uploadArtwork()}
          >
            Upload Artwork
          </button>
          {error !== '' && <div className={styles.error}>{error}</div>}
        </div>
      </form>
    </main>
  );
}
