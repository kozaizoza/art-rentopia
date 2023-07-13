import { Sql } from 'postgres';

export const artworks = [
  {
    id: 1,
    author: 'Lola Dupre',
    artworkName: 'Buttons',
    description:
      'Duprés collage featuring a cat showcases her distinctive manual manipulation technique of cutting and pasting paper onto canvas, resulting in a mesmerizing artwork that defies conventional perceptions. By meticulously altering the original images, Dupré creates a surreal and captivating reality where the feline subject takes on a whole new dimension. The intricate layering and rearrangement of the cats image evoke a sense of curiosity and wonder, inviting viewers to explore the artists imaginative world where the familiar transforms into an enigmatic and intriguing presence.',
    userId: null,
    imageUrl:
      'https://res.cloudinary.com/dgb5gkfjb/image/upload/v1687451167/1200-buttons-lola-dupre_cfljwn.jpg',
    // categoryId: null,
  },

  {
    id: 2,
    author: 'Emma Larsson',
    artworkName: 'Native Beings',
    description:
      'This watercolor artwork explores the interplay of translucent layers, capturing the essence of light and depth. Through skillful brushwork, the artist effortlessly creates a mesmerizing dance of colors, evoking a sense of fluidity and movement. The paintings abstract nature invites viewers to immerse themselves in the experience, as it generates new forms and emotions with each contemplation.',
    userId: null,
    imageUrl:
      'https://res.cloudinary.com/dgb5gkfjb/image/upload/v1688228477/emma_larsson1_fr4tas.jpg',
    // categoryId: null,
  },

  {
    id: 3,
    author: 'Will Barnet',
    artworkName: 'Woman reading',
    description:
      'Will Barne is known for flat stylisation and his fondness for portraying isolated protagonists accompanied by animals—have often been described as ominous or haunting. But this oil on canvas scene of a reclining reader and her contentedly curled cat is anything but: the epitome of Sunday cosiness if ever we saw it.',
    userId: null,
    imageUrl:
      'https://res.cloudinary.com/dgb5gkfjb/image/upload/v1688228850/Will_Barnet_Woman_Reading_o7hhqv.jpg',
    // categoryId: null,
  },

  {
    id: 4,
    author: 'Yosuke Yamaguchi',
    artworkName: 'Take me to the airport',
    description:
      'This captivating illustration by Japanese artist Yosuke Yamaguchi enchants viewers with its distinctive style and intricate details. From the delicately rendered figures to the meticulously crafted elements, the artwork invites close examination and appreciation. Yamaguchis skillful use of colors and meticulous attention to detail leave a lasting impression, making this illustration a true work of art.',
    userId: null,
    imageUrl:
      'https://res.cloudinary.com/dgb5gkfjb/image/upload/v1688229387/yosuke_yamaguchi-take_me_to_the_airport_saxnjq.jpg',
    // categoryId: null,
  },

  {
    id: 5,
    author: 'Geoff McFetridge',
    artworkName: 'Swimmer',
    description:
      'Geoff McFetridges prints exemplify a unique fusion of traditional painting and illustration, influenced by his background as a graphic designer. With spare compositions and vibrant color palettes, his artworks exude a distinct visual language. The inclusion of human figures, sometimes contorted and transformed into repetitive motifs and patterns, adds an intriguing element of abstraction and depth to his captivating prints.',
    userId: null,
    imageUrl:
      'https://res.cloudinary.com/dgb5gkfjb/image/upload/v1688230569/geooff_McFetridge_bsslrb.jpg',
    // categoryId: null,
  },

  {
    id: 6,
    author: 'Katherine Bradford',
    artworkName: 'Night vision',
    description:
      'This painting  reveal a shift in tone, as swimmers and night skies evoke a sense of anxiety and dread. The once-expressed feelings of wonder and connection under starry skies have given way to a darker imagination. Through poignant imagery such as a grimacing head submerged in water, a clock replacing the moon, and an exhausted swimmer on land, Bradford conveys a narrative of discomfort, impending time constraints, and the instability of foundations.',
    userId: null,
    imageUrl:
      'https://res.cloudinary.com/dgb5gkfjb/image/upload/v1688231050/katherine_bradford_ukiiz0.jpg',
    // categoryId: null,
  },

  {
    id: 7,
    author: 'Quentin Monge',
    artworkName: 'Summer in Provence',
    description:
      'Quentin, a digital illustrator, skillfully maintains a winning formula by depicting themes of sun, sea, and surfing throughout his artwork. With techniques that mimic traditional media, his digital illustrations resemble the texture and depth of gouache or acrylic paintings. Through minimalist characters and beautifully composed patterns, Quentin creates a captivating world that sparks a collective longing for an idealized and tranquil existence.',
    userId: null,
    imageUrl:
      'https://res.cloudinary.com/dgb5gkfjb/image/upload/v1688231362/Quentin_Monge_Summer_in_Provence_glifaf.png',
    // categoryId: null,
  },

  {
    id: 8,
    author: 'Tom Hammick',
    artworkName: 'Hypnagogic',
    description:
      'With an emotive handling of colour, Hammick creates psychologically charged spaces in which figures, alone or in groups, are cast adrift. Playing out uncertain narratives, his characters anxiously occupy private worlds, facing away from the viewer, giving the sence of detachment from reality.',
    userId: null,
    imageUrl:
      'https://res.cloudinary.com/dgb5gkfjb/image/upload/v1688231934/53769_f31sy9.jpg',
    // categoryId: null,
  },

  {
    id: 9,
    author: 'Joakim Ojanen',
    artworkName: 'How is your spirit',
    description:
      'Ojanen continues the evolution of his diverse array of endearing and surreal characters, creating sculptural and pictorial scenes where his cast of oddballs and misfits are released from isolation and increasingly begin to interact with one another.',
    userId: null,
    imageUrl:
      'https://res.cloudinary.com/dgb5gkfjb/image/upload/v1688233291/jo-45.1_ocr2gr.jpg',
    // categoryId: null,
  },
];

export async function up(sql: Sql) {
  for (const artwork of artworks) {
    await sql`
    INSERT INTO artworks
      (author, artwork_name, description, user_id, image_url)
    VALUES
      (${artwork.author}, ${artwork.artworkName}, ${artwork.description}, ${artwork.userId}, ${artwork.imageUrl})
  `;
  }
}

export async function down(sql: Sql) {
  for (const artwork of artworks) {
    await sql`
      DELETE FROM artworks WHERE id = ${artwork.id}
  `;
  }
}
