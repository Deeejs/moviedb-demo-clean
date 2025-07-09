import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
const POSTER_SIZE = 'w500';
const BACKDROP_SIZE = 'w1280';
const PROFILE_SIZE = 'w185';

const buildImageUrl = (size: string, path: string): string =>
  `${IMAGE_BASE_URL}/${size}${path}`;

async function main(): Promise<void> {
  try {
    console.log('🌱 Starting database seed...');

    // Delete in correct order (dependencies first)
    console.log('🧹 Cleaning existing data...');

    try {
      await prisma.castMember.deleteMany({});
      console.log('  ✓ Cleared cast members');
    } catch (error: unknown) {
      if (
        error &&
        typeof error === 'object' &&
        'code' in error &&
        error.code === 'P2021'
      ) {
        console.log('  ⚠️  Cast members table does not exist yet');
      } else throw error;
    }

    try {
      await prisma.rating.deleteMany({});
      console.log('  ✓ Cleared ratings');
    } catch (error: unknown) {
      if (
        error &&
        typeof error === 'object' &&
        'code' in error &&
        error.code === 'P2021'
      ) {
        console.log('  ⚠️  Ratings table does not exist yet');
      } else throw error;
    }

    try {
      await prisma.movie.deleteMany({});
      console.log('  ✓ Cleared movies');
    } catch (error: unknown) {
      if (
        error &&
        typeof error === 'object' &&
        'code' in error &&
        error.code === 'P2021'
      ) {
        console.log('  ⚠️  Movies table does not exist yet');
      } else throw error;
    }

    try {
      await prisma.actor.deleteMany({});
      console.log('  ✓ Cleared actors');
    } catch (error: unknown) {
      if (
        error &&
        typeof error === 'object' &&
        'code' in error &&
        error.code === 'P2021'
      ) {
        console.log('  ⚠️  Actors table does not exist yet');
      } else throw error;
    }

    console.log('✅ Cleanup completed');

    // Create Actors
    console.log('🎭 Creating actors...');
    const actorsData = [
      {
        id: '21e3e439-b3a0-4f97-8a1e-3e89d53f74e9',
        name: 'Samuel L. Jackson',
        birthYear: 1948,
        birthPlace: 'Washington, D.C., USA',
        bio: 'Samuel Leroy Jackson is an American actor and producer. One of the most widely recognized actors of his generation, the films in which he has appeared have collectively grossed over $27 billion worldwide, making him the highest-grossing actor of all time.',
        image: buildImageUrl(PROFILE_SIZE, '/AiAYAqwpM5xmiFrAIeQvUXDCVvo.jpg'),
        knownFor: [
          'Pulp Fiction',
          'Django Unchained',
          'The Avengers',
          'Jurassic Park',
        ],
        totalMovies: 150,
      },
      {
        id: '2fa0063f-b174-4689-8cd0-aa9da6877408',
        name: 'Uma Thurman',
        birthYear: 1970,
        birthPlace: 'Boston, Massachusetts, USA',
        bio: 'Uma Karuna Thurman is an American actress and model. She has performed in a variety of films, from romantic comedies and dramas to science fiction and action films.',
        image: buildImageUrl(PROFILE_SIZE, '/lg04iEqT6TC40H1jz10Z99OFMXx.jpg'),
        knownFor: [
          'Pulp Fiction',
          'Kill Bill: Vol. 1',
          'Kill Bill: Vol. 2',
          'Gattaca',
        ],
        totalMovies: 45,
      },
      {
        id: 'bd7a2521-7505-4923-9c61-099ababa1209',
        name: 'Ryan Gosling',
        birthYear: 1980,
        birthPlace: 'London, Ontario, Canada',
        bio: "Ryan Thomas Gosling is a Canadian actor. He began his career as a child actor on the Disney Channel's The Mickey Mouse Club and went on to appear in other family entertainment programs.",
        image: buildImageUrl(PROFILE_SIZE, '/asoKC7CLCqpZKZDL6iovNurQUdf.jpg'),
        knownFor: ['La La Land', 'Blade Runner 2049', 'Drive', 'The Notebook'],
        totalMovies: 35,
      },
      {
        id: 'b8ba805b-ef07-4f44-a9d2-e87e85160d7e',
        name: 'John Travolta',
        birthYear: 1954,
        birthPlace: 'Englewood, New Jersey, USA',
        bio: 'John Joseph Travolta is an American actor, producer, dancer, and singer. He rose to fame during the 1970s, appearing on the television sitcom Welcome Back, Kotter and starring in the box office successes Carrie, Saturday Night Fever, and Grease.',
        image: buildImageUrl(PROFILE_SIZE, '/ap8eEYfBKTLixmVVpRlq4NslDD5.jpg'),
        knownFor: [
          'Pulp Fiction',
          'Grease',
          'Saturday Night Fever',
          'Hairspray',
        ],
        totalMovies: 65,
      },
      {
        id: 'ddffbcab-c558-4b3d-bcd2-a181dc0c3dcc',
        name: 'Emma Stone',
        birthYear: 1988,
        birthPlace: 'Scottsdale, Arizona, USA',
        bio: 'Emily Jean Stone, known professionally as Emma Stone, is an American actress. The recipient of various accolades, including an Academy Award, a British Academy Film Award, and a Golden Globe Award.',
        image: buildImageUrl(PROFILE_SIZE, '/cZ8a3QvAnj2cgcgVL6g4XaqPzpL.jpg'),
        knownFor: ['La La Land', 'Easy A', 'The Help', 'Birdman'],
        totalMovies: 30,
      },
      {
        id: '46d05b4e-f3ca-4710-bcc8-9dbdd94b009f',
        name: 'Leonardo DiCaprio',
        birthYear: 1974,
        birthPlace: 'Los Angeles, California, USA',
        bio: 'Leonardo Wilhelm DiCaprio is an American actor and film producer. Known for his work in biographical and period films, he is the recipient of numerous accolades.',
        image: buildImageUrl(PROFILE_SIZE, '/wo2hJpn04vbtmh0B9utCFdsQhxM.jpg'),
        knownFor: [
          'Titanic',
          'Inception',
          'The Wolf of Wall Street',
          'The Revenant',
        ],
        totalMovies: 40,
      },
      {
        id: 'd952e144-d463-454b-9aa7-a02aed6602b0',
        name: 'Christian Bale',
        birthYear: 1974,
        birthPlace: 'Haverfordwest, Pembrokeshire, Wales',
        bio: 'Christian Charles Philip Bale is an English actor. Known for his versatility and physical transformations for his roles, he has been a leading man in films of several genres.',
        image: buildImageUrl(PROFILE_SIZE, '/3qx2QFUbG6t6IlzR0F9k3Z6Yhf7.jpg'),
        knownFor: [
          'The Dark Knight',
          'American Psycho',
          'The Machinist',
          'Ford v Ferrari',
        ],
        totalMovies: 50,
      },
      {
        id: '96fceb7a-d59e-4b07-b83a-3d9351f04bba',
        name: 'Heath Ledger',
        birthYear: 1979,
        birthPlace: 'Perth, Western Australia, Australia',
        bio: 'Heath Andrew Ledger was an Australian actor and music video director. His work consisted of twenty films, including The Dark Knight and Brokeback Mountain.',
        image: buildImageUrl(PROFILE_SIZE, '/5Y9HnYYa9jF4NunY9lSgJGjSe8E.jpg'),
        knownFor: [
          'The Dark Knight',
          'Brokeback Mountain',
          '10 Things I Hate About You',
          "A Knight's Tale",
        ],
        totalMovies: 20,
      },
      {
        id: '022c85bd-b986-4218-8eff-e3044d98ccdf',
        name: 'Keanu Reeves',
        birthYear: 1964,
        birthPlace: 'Beirut, Lebanon',
        bio: 'Keanu Charles Reeves is a Canadian actor. Born in Beirut and raised in Toronto, Reeves began acting in theatre productions and in television films before making his feature film debut.',
        image: buildImageUrl(PROFILE_SIZE, '/4D0PpNI0kmP58hgrwGC3wCjxhnm.jpg'),
        knownFor: ['The Matrix', 'John Wick', 'Speed', 'Point Break'],
        totalMovies: 75,
      },
      {
        id: '742995b8-701a-4bbe-bf9f-3c9949f8e15a',
        name: 'Laurence Fishburne',
        birthYear: 1961,
        birthPlace: 'Augusta, Georgia, USA',
        bio: 'Laurence John Fishburne III is an American actor, playwright, producer, screenwriter, and film director. He is known for playing Morpheus in The Matrix trilogy.',
        image: buildImageUrl(PROFILE_SIZE, '/8suOhUmPbfKqDQ17jQ1Gy0mI3P4.jpg'),
        knownFor: [
          'The Matrix',
          'Apocalypse Now',
          'Boyz n the Hood',
          'Event Horizon',
        ],
        totalMovies: 100,
      },
      {
        id: '38170a62-a131-4919-acb4-ce2d6ee24b78',
        name: 'Song Kang-ho',
        birthYear: 1967,
        birthPlace: 'Gimhae, South Gyeongsang Province, South Korea',
        bio: 'Song Kang-ho is a South Korean actor. He made his debut as a movie actor in The Day a Pig Fell into the Well, and came to national prominence with a series of critically acclaimed films.',
        image: buildImageUrl(PROFILE_SIZE, '/7dw9wIpFZ5nJZ3zqrue8t7hUUgQ.jpg'),
        knownFor: ['Parasite', 'The Host', 'Memories of Murder', 'Snowpiercer'],
        totalMovies: 40,
      },
      {
        id: '543e16da-36cd-4eab-bb9a-95c2cb9ef659',
        name: 'Tom Hardy',
        birthYear: 1977,
        birthPlace: 'Hammersmith, London, England',
        bio: "Edward Thomas Hardy is an English actor and producer. After studying acting at the Drama Centre London, he made his film debut in Ridley Scott's Black Hawk Down.",
        image: buildImageUrl(PROFILE_SIZE, '/d81K0RH8UX7tZj49tZaQhZ9ewH.jpg'),
        knownFor: [
          'Mad Max: Fury Road',
          'Inception',
          'The Dark Knight Rises',
          'Venom',
        ],
        totalMovies: 45,
      },
      {
        id: '5e583002-7aae-46cb-b8d3-c5b016d8aba4',
        name: 'Charlize Theron',
        birthYear: 1975,
        birthPlace: 'Benoni, South Africa',
        bio: "Charlize Theron is a South African and American actress and producer. One of the world's highest-paid actresses, she is the recipient of numerous accolades.",
        image: buildImageUrl(PROFILE_SIZE, '/gd7ShD0yt4bsR2STeQ19KQ6hvXL.jpg'),
        knownFor: [
          'Mad Max: Fury Road',
          'Monster',
          'Atomic Blonde',
          'The Old Guard',
        ],
        totalMovies: 55,
      },

      {
        id: 'a1111111-1111-1111-1111-111111111111',
        name: 'Michael B. Jordan',
        birthYear: 1987,
        birthPlace: 'Santa Ana, California, USA',
        bio: 'Michael Bakari Jordan II is an American actor and producer. He is best known for his film roles as shooting victim Oscar Grant in the drama Fruitvale Station (2013), boxer Adonis Creed in Creed (2015), and Erik Killmonger in Black Panther (2018).',
        image:
          'https://image.tmdb.org/t/p/w185/hz9AOUWZ2zzS0dpPJ1yQv2grA35.jpg',
        knownFor: ['Black Panther', 'Creed', 'Fruitvale Station'],
        totalMovies: 20,
      },
      {
        id: 'a2222222-2222-2222-2222-222222222222',
        name: 'Hailee Steinfeld',
        birthYear: 1996,
        birthPlace: 'Tarzana, Los Angeles, California, USA',
        bio: 'Hailee Steinfeld is an American actress and singer. She is the recipient of various accolades, including a Peabody Award, and has been nominated for an Academy Award, a British Academy Film Award, and a Golden Globe Award.',
        image:
          'https://image.tmdb.org/t/p/w185/tb7zwVSmI2CDLU1Tc39c4ECO3jm.jpg',
        knownFor: ['True Grit', 'Pitch Perfect', 'Bumblebee'],
        totalMovies: 15,
      },
      {
        id: 'a3333333-3333-3333-3333-333333333333',
        name: 'Zendaya',
        birthYear: 1996,
        birthPlace: 'Oakland, California, USA',
        bio: 'Zendaya Maree Stoermer Coleman is an American actress and singer. She has received various accolades, including a Primetime Emmy Award. Time magazine named her one of the 100 most influential people in the world on their annual list in 2022.',
        image:
          'https://image.tmdb.org/t/p/w185/3WdOloHpjtjL96uVOhFRRCcYSwq.jpg',
        knownFor: ['Spider-Man', 'Dune', 'Euphoria'],
        totalMovies: 12,
      },
      {
        id: 'a4444444-4444-4444-4444-444444444444',
        name: 'Timothée Chalamet',
        birthYear: 1995,
        birthPlace: 'New York City, New York, USA',
        bio: 'Timothée Hal Chalamet is an American actor. He has received various accolades, including nominations for an Academy Award, two Golden Globe Awards, and three BAFTA Film Awards.',
        image: 'https://image.tmdb.org/t/p/w185/BE2sdjpgsa2rNTFa66f7upkaOP.jpg',
        knownFor: ['Call Me by Your Name', 'Dune', 'Little Women'],
        totalMovies: 15,
      },
      {
        id: 'a5555555-5555-5555-5555-555555555555',
        name: 'Ana de Armas',
        birthYear: 1988,
        birthPlace: 'Havana, Cuba',
        bio: 'Ana Celia de Armas Caso is a Cuban and Spanish actress.',
        image:
          'https://image.tmdb.org/t/p/w185/14uxt0jH28J9zn4vNQNTae3Bmr7.jpg',
        knownFor: ['Knives Out', 'Blade Runner 2049', 'No Time to Die'],
        totalMovies: 20,
      },
      {
        id: 'a6666666-6666-6666-6666-666666666666',
        name: 'Brad Pitt',
        birthYear: 1963,
        birthPlace: 'Shawnee, Oklahoma, USA',
        bio: 'William Bradley Pitt is an American actor and film producer.',
        image:
          'https://image.tmdb.org/t/p/w185/kU3B75TyRiCgE270EyZnHjfivoq.jpg',
        knownFor: [
          'Fight Club',
          "Ocean's Eleven",
          'Once Upon a Time in Hollywood',
        ],
        totalMovies: 60,
      },
      {
        id: 'a7777777-7777-7777-7777-777777777777',
        name: 'Tom Cruise',
        birthYear: 1962,
        birthPlace: 'Syracuse, New York, USA',
        bio: 'Thomas Cruise Mapother IV is an American actor and producer. He has received various accolades throughout his career, including three Golden Globe Awards and three nominations for Academy Awards.',
        image:
          'https://image.tmdb.org/t/p/w185/3mShHjSQR7NXOVbdTu5rT2Qd0MN.jpg',
        knownFor: ['Mission: Impossible', 'Top Gun', 'Jerry Maguire'],
        totalMovies: 50,
      },

      {
        id: 'a8888888-8888-8888-8888-888888888888',
        name: 'Cillian Murphy',
        birthYear: 1976,
        birthPlace: 'Douglas, Cork, Ireland',
        bio: 'Cillian Murphy is an Irish actor. Born in Douglas, Cork, he is the eldest of four children. His father, Brendan, works for the Irish Department of Education and his mother is a French teacher.',
        image: buildImageUrl(PROFILE_SIZE, '/ycZpLjHxsNPvsB6ndu2D9qsx94X.jpg'),
        knownFor: ['Peaky Blinders', 'Oppenheimer', 'The Dark Knight Trilogy'],
        totalMovies: 45,
      },
      {
        id: 'a9999999-9999-9999-9999-999999999999',
        name: 'Naomie Harris',
        birthYear: 1976,
        birthPlace: 'Islington, London, England, UK',
        bio: 'Naomie Melanie Harris is an English screen actress. She is best known for her roles as Moneypenny in the recent James Bond films and Tia Dalma/Calypso in the Pirates of the Caribbean films.',
        image: buildImageUrl(PROFILE_SIZE, '/41TVAcYqKKF7PGf3x7QfaLvkLSW.jpg'),
        knownFor: ['James Bond films', 'Moonlight', 'Pirates of the Caribbean'],
        totalMovies: 30,
      },
      {
        id: 'b1111111-1111-1111-1111-111111111111',
        name: 'Brendan Gleeson',
        birthYear: 1955,
        birthPlace: 'Dublin, Ireland',
        bio: 'Brendan Gleeson is an Irish actor. His best-known films include Braveheart, Gangs of New York, In Bruges, 28 Days Later, the Harry Potter film series, and the role of Alastor Moody in the Harry Potter films.',
        image: buildImageUrl(PROFILE_SIZE, '/ctPPJu5ZYDZr1IPmzoNpezczrm0.jpg'),
        knownFor: [
          'Harry Potter films',
          'In Bruges',
          'The Banshees of Inisherin',
        ],
        totalMovies: 80,
      },
      {
        id: 'b2222222-2222-2222-2222-222222222222',
        name: 'Megan Burns',
        birthYear: 1986,
        birthPlace: 'Liverpool, England, UK',
        bio: 'Megan Burns, also known as Betty Curse, is an English musician and actress. She is best known for her role as Hannah in 28 Days Later.',
        image: buildImageUrl(PROFILE_SIZE, '/xOZbpZH5E6YlUvsM2DDd6iYpsnk.jpg'),
        knownFor: ['28 Days Later', 'Liam', 'Music career as Betty Curse'],
        totalMovies: 5,
      },
      {
        id: 'b3333333-3333-3333-3333-333333333333',
        name: 'Florence Pugh',
        birthYear: 1996,
        birthPlace: 'Oxford, Oxfordshire, England UK',
        bio: 'Florence Pugh is an English actress. She made her acting debut in 2014 in the drama film The Falling. Pugh gained recognition in 2016 for her leading role as a young bride in the independent drama Lady Macbeth.',
        image: buildImageUrl(PROFILE_SIZE, '/6Sjz9teWjrMY9lF2o9FCo4XmoRh.jpg'),
        knownFor: ['Black Widow', 'Midsommar', 'Little Women'],
        totalMovies: 25,
      },
      {
        id: 'b4444444-4444-4444-4444-444444444444',
        name: 'Sebastian Stan',
        birthYear: 1982,
        birthPlace: 'Constanța, Romanian SR [now Romania]',
        bio: 'Sebastian Stan is a Romanian-American actor. On television, he has played Carter Baizen in Gossip Girl, Prince Jack Benjamin in Kings, Jefferson in Once Upon a Time, and T.J. Hammond in Political Animals.',
        image: buildImageUrl(PROFILE_SIZE, '/nKZgixTbHFXpkzzIpMFdLX98GYh.jpg'),
        knownFor: ['Marvel Cinematic Universe', 'I, Tonya', 'Gossip Girl'],
        totalMovies: 40,
      },
      {
        id: 'b5555555-5555-5555-5555-555555555555',
        name: 'Julia Louis-Dreyfus',
        birthYear: 1961,
        birthPlace: 'New York City, New York, USA',
        bio: 'Julia Scarlett Elizabeth Louis-Dreyfus is an American actress and comedian. She is known for her work in the comedy television series Saturday Night Live, Seinfeld, The New Adventures of Old Christine, and Veep.',
        image: buildImageUrl(PROFILE_SIZE, '/sXpjQoFoYqNehfWhlkScF8lo9vc.jpg'),
        knownFor: ['Seinfeld', 'Veep', 'Saturday Night Live'],
        totalMovies: 20,
      },
      {
        id: 'b6666666-6666-6666-6666-666666666666',
        name: 'Lewis Pullman',
        birthYear: 1993,
        birthPlace: 'Los Angeles, California, USA',
        bio: 'Lewis James Pullman is an American actor. He is the son of actor Bill Pullman. He is known for his roles in the films Bad Times at the El Royale and Top Gun: Maverick.',
        image: buildImageUrl(PROFILE_SIZE, '/jAo0Rxl9EYVxLnhUlBww5Uxl89v.jpg'),
        knownFor: [
          'Top Gun: Maverick',
          'Outer Range',
          'Bad Times at the El Royale',
        ],
        totalMovies: 15,
      },
      {
        id: 'b7777777-7777-7777-7777-777777777777',
        name: 'Mason Thames',
        birthYear: 2007,
        birthPlace: 'Phoenix, Arizona, USA',
        bio: 'Mason Thames is an American actor. He is known for his starring role in the supernatural horror film The Black Phone.',
        image: buildImageUrl(PROFILE_SIZE, '/2BLyvOUZbjsH83bdpFLqFkMY7pl.jpg'),
        knownFor: ['The Black Phone', 'How to Train Your Dragon'],
        totalMovies: 5,
      },
      {
        id: 'b8888888-8888-8888-8888-888888888888',
        name: 'Nico Parker',
        birthYear: 2004,
        birthPlace: 'Kensal Green, London, UK',
        bio: 'Nico Parker is a British actress. She is the daughter of actress Thandiwe Newton and director Ol Parker. She made her film debut in the 2019 live-action film Dumbo.',
        image: buildImageUrl(PROFILE_SIZE, '/gt0NJClVSCPCEfcPgcLj3f85uLa.jpg'),
        knownFor: ['Dumbo', 'The Last of Us', 'The Third Day'],
        totalMovies: 8,
      },
      {
        id: 'b9999999-9999-9999-9999-999999999999',
        name: 'Gerard Butler',
        birthYear: 1969,
        birthPlace: 'Paisley, Scotland, UK',
        bio: 'Gerard James Butler is a Scottish actor and producer. After studying law, he turned to acting in the mid-1990s with small roles in productions such as Mrs Brown, the James Bond film Tomorrow Never Dies, and Tale of the Mummy.',
        image: buildImageUrl(PROFILE_SIZE, '/n7sTgAGHyL3u9KIOVWjVLRA1fyi.jpg'),
        knownFor: ['300', 'Law Abiding Citizen', 'Has Fallen series'],
        totalMovies: 60,
      },
      {
        id: 'c1111111-1111-1111-1111-111111111111',
        name: 'Nick Frost',
        birthYear: 1972,
        birthPlace: 'Dagenham, London, UK',
        bio: 'Nicholas John Frost is an English actor, comedian, screenwriter, producer and author. He is best known for his work in the Three Flavours Cornetto trilogy of films.',
        image: buildImageUrl(PROFILE_SIZE, '/2CHS4t6miNGLgMQAjhFqb4fFuKS.jpg'),
        knownFor: ['Shaun of the Dead', 'Hot Fuzz', "The World's End"],
        totalMovies: 25,
      },
      {
        id: 'c2222222-2222-2222-2222-222222222222',
        name: 'Jason Momoa',
        birthYear: 1979,
        birthPlace: 'Honolulu, Hawaii, USA',
        bio: 'Joseph Jason Namakaeha Momoa is an American actor. He became known for his television roles as Ronon Dex on the military science fiction television series Stargate Atlantis and as Khal Drogo in the HBO fantasy television series Game of Thrones.',
        image: buildImageUrl(PROFILE_SIZE, '/3troAR6QbSb6nUFMDu61YCCWLKa.jpg'),
        knownFor: ['Aquaman', 'Game of Thrones', 'Dune'],
        totalMovies: 35,
      },
      {
        id: 'c3333333-3333-3333-3333-333333333333',
        name: 'Jack Black',
        birthYear: 1969,
        birthPlace: 'Santa Monica, California, USA',
        bio: 'Thomas Jacob Black is an American actor, comedian, musician, and songwriter. Black is known for his roles in the films High Fidelity, Shallow Hal, School of Rock, King Kong, The Holiday, and the Jumanji franchise.',
        image: buildImageUrl(PROFILE_SIZE, '/59IhgCtiWI5yTfzPhsjzg7GjCjm.jpg'),
        knownFor: ['School of Rock', 'Kung Fu Panda', 'Jumanji'],
        totalMovies: 50,
      },
      {
        id: 'c4444444-4444-4444-4444-444444444444',
        name: 'Sebastian Eugene Hansen',
        birthYear: 2010,
        birthPlace: 'USA',
        bio: 'Sebastian Eugene Hansen is an American actor.',
        image: buildImageUrl(PROFILE_SIZE, '/40HNkoB3RKPMPgLhTyKQU6kG0sc.jpg'),
        knownFor: ['A Minecraft Movie'],
        totalMovies: 3,
      },
      {
        id: 'c5555555-5555-5555-5555-555555555555',
        name: 'Emma Myers',
        birthYear: 2002,
        birthPlace: 'Orlando, Florida, USA',
        bio: 'Emma Elizabeth Myers is an American actress. She began her career as a child actress in 2010, when she appeared in The Glades.',
        image: buildImageUrl(PROFILE_SIZE, '/v1Y8RP39135ZOary9M4MbkrCAdn.jpg'),
        knownFor: [
          'Wednesday',
          'Family Switch',
          "A Good Girl's Guide to Murder",
        ],
        totalMovies: 10,
      },
      {
        id: 'c6666666-6666-6666-6666-666666666666',
        name: 'Glen Powell',
        birthYear: 1988,
        birthPlace: 'Austin, Texas, USA',
        bio: 'Glen Thomas Powell Jr. is an American actor. He began his career with guest roles on television and small roles in films such as The Dark Knight Rises and The Expendables 3 before making his breakthrough performance as Chad Radwell in the Fox comedy-horror series Scream Queens.',
        image: buildImageUrl(PROFILE_SIZE, '/lRbbndkwOXyvep9Y7kHiwbh9Ji5.jpg'),
        knownFor: ['Top Gun: Maverick', 'Anyone but You', 'Hidden Figures'],
        totalMovies: 25,
      },
      {
        id: 'c7777777-7777-7777-7777-777777777777',
        name: 'Adria Arjona',
        birthYear: 1992,
        birthPlace: 'San Juan, Puerto Rico',
        bio: 'Adria Arjona Torres is an American actress. She played the role of Anathema Device in the BBC/Amazon Prime Video series Good Omens and Mercedes "Mercy" Graves in Batman v Superman: Dawn of Justice.',
        image: buildImageUrl(PROFILE_SIZE, '/5ODbfZboGeO36Q5GMYqTmiDy0kM.jpg'),
        knownFor: ['Andor', 'Pacific Rim Uprising', '6 Underground'],
        totalMovies: 20,
      },
      {
        id: 'c8888888-8888-8888-8888-888888888888',
        name: 'Austin Amelio',
        birthYear: 1988,
        birthPlace: 'Austin, Texas, USA',
        bio: 'Austin Amelio is an American actor. He is best known for his role as Dwight in The Walking Dead, its spin-off Fear the Walking Dead, and his role as Nesbit in Everybody Wants Some!!',
        image: buildImageUrl(PROFILE_SIZE, '/y4QTXuSSmD99n8dinMiTRBkUnAp.jpg'),
        knownFor: [
          'The Walking Dead',
          'Fear the Walking Dead',
          'Everybody Wants Some!!',
        ],
        totalMovies: 15,
      },
      {
        id: 'c9999999-9999-9999-9999-999999999999',
        name: 'Retta',
        birthYear: 1978,
        birthPlace: 'New Jersey, U.S.',
        bio: "Marietta Sirleaf, better known simply as Retta, is an American stand-up comedian and actress. She is best known for her roles of Donna Meagle on NBC's Parks and Recreation and Ruby Hill on NBC's Good Girls.",
        image: buildImageUrl(PROFILE_SIZE, '/bIo8tjdn48wIPEdcJ0UCqqTzClV.jpg'),
        knownFor: ['Parks and Recreation', 'Good Girls', 'Stand-up comedy'],
        totalMovies: 20,
      },
      {
        id: 'd1111111-1111-1111-1111-111111111111',
        name: 'Mike Faist',
        birthYear: 1992,
        birthPlace: 'Gahanna, Ohio, USA',
        bio: 'Michael David Faist is an American actor, dancer, and singer. He is known for starring as Connor Murphy in the Broadway musical Dear Evan Hansen, for which he received a Tony Award nomination for Best Featured Actor in a Musical.',
        image: buildImageUrl(PROFILE_SIZE, '/xRl1Pa8a80L3QUT7LrTtlTZv1l4.jpg'),
        knownFor: ['West Side Story', 'Dear Evan Hansen', 'Newsies'],
        totalMovies: 8,
      },
      {
        id: 'd2222222-2222-2222-2222-222222222222',
        name: "Josh O'Connor",
        birthYear: 1990,
        birthPlace: 'Southampton, Hampshire, England, UK',
        bio: "Joshua O'Connor is a British actor. He is known for his portrayal of Johnny Saxby in the 2017 film God's Own Country, for which he won a British Independent Film Award for Best Actor, and for his portrayal of Prince Charles in the Netflix drama series The Crown.",
        image: buildImageUrl(PROFILE_SIZE, '/fiDjDWCGSZ7xDaN1rKAP4gvRn1a.jpg'),
        knownFor: ['The Crown', "God's Own Country", 'Emma'],
        totalMovies: 15,
      },
      {
        id: 'd3333333-3333-3333-3333-333333333333',
        name: 'Darnell Appling',
        birthYear: 1985,
        birthPlace: 'East Cleveland, Ohio, USA',
        bio: 'Darnell Appling is an American actor and crew member.',
        image: buildImageUrl(PROFILE_SIZE, '/g4unqS1W07uKzoVIaQAEnVyk6W0.jpg'),
        knownFor: ['Crew work', 'Challengers'],
        totalMovies: 5,
      },
      // DAN DA DAN Voice Actors
      {
        id: 'e1111111-1111-1111-1111-111111111111',
        name: 'Natsuki Hanae',
        birthYear: 1991,
        birthPlace: 'Kanagawa, Japan',
        bio: 'Natsuki Hanae is a Japanese voice actor from Kanagawa Prefecture. He is known for his roles in anime series such as Demon Slayer: Kimetsu no Yaiba, Tokyo Ghoul, and DAN DA DAN.',
        image: buildImageUrl(PROFILE_SIZE, '/alTb0DlcPIbcwM08WSmxFai58sd.jpg'),
        knownFor: [
          'Demon Slayer: Kimetsu no Yaiba',
          'Tokyo Ghoul',
          'DAN DA DAN',
        ],
        totalMovies: 25,
      },
      {
        id: 'e2222222-2222-2222-2222-222222222222',
        name: 'Shion Wakayama',
        birthYear: 1998,
        birthPlace: 'Japan',
        bio: 'Shion Wakayama is a Japanese voice actress known for her role as Momo Ayase in the anime series DAN DA DAN.',
        image: buildImageUrl(PROFILE_SIZE, '/b697ggFreuliEfl4TjLgxhJCQXr.jpg'),
        knownFor: ['DAN DA DAN', 'Voice acting work'],
        totalMovies: 8,
      },
      {
        id: 'e3333333-3333-3333-3333-333333333333',
        name: 'Mayumi Tanaka',
        birthYear: 1955,
        birthPlace: 'Tokyo, Japan',
        bio: 'Mayumi Tanaka is a Japanese voice actress known for her role as Monkey D. Luffy in One Piece and Turbo Granny in DAN DA DAN.',
        image: buildImageUrl(PROFILE_SIZE, '/by4t1tYtEXsfbFj9TvOjozBmQla.jpg'),
        knownFor: ['One Piece', 'DAN DA DAN', 'Dragon Ball GT'],
        totalMovies: 50,
      },
      {
        id: 'e4444444-4444-4444-4444-444444444444',
        name: 'Kaito Ishikawa',
        birthYear: 1993,
        birthPlace: 'Tokyo, Japan',
        bio: 'Kaito Ishikawa is a Japanese voice actor known for his roles in anime series such as Haikyuu!!, Your Name, and DAN DA DAN.',
        image: buildImageUrl(PROFILE_SIZE, '/fzjIkotjUHHs3wgftM9tqdsG8ph.jpg'),
        knownFor: ['Haikyuu!!', 'Your Name', 'DAN DA DAN'],
        totalMovies: 30,
      },
      // Additional Cast Members
      {
        id: 'f1111111-1111-1111-1111-111111111111',
        name: 'Joseph Gordon-Levitt',
        birthYear: 1981,
        birthPlace: 'Los Angeles, California, USA',
        bio: 'Joseph Leonard Gordon-Levitt is an American actor and filmmaker. He is known for his roles in Inception, The Dark Knight Rises, and 500 Days of Summer.',
        image: buildImageUrl(PROFILE_SIZE, '/4U9G4YwTlIEbAymBaseltS38eH4.jpg'),
        knownFor: ['Inception', '500 Days of Summer', 'The Dark Knight Rises'],
        totalMovies: 40,
      },
      {
        id: 'f2222222-2222-2222-2222-222222222222',
        name: 'Carrie-Anne Moss',
        birthYear: 1967,
        birthPlace: 'Burnaby, British Columbia, Canada',
        bio: 'Carrie-Anne Moss is a Canadian actress. She is best known for her role as Trinity in The Matrix film series.',
        image: buildImageUrl(PROFILE_SIZE, '/gc7JwuLDD0kXHUlGx5vWzdlqSIT.jpg'),
        knownFor: ['The Matrix', 'Memento', 'Jessica Jones'],
        totalMovies: 35,
      },
      {
        id: 'f3333333-3333-3333-3333-333333333333',
        name: 'Bruce Willis',
        birthYear: 1955,
        birthPlace: 'Idar-Oberstein, West Germany',
        bio: 'Walter Bruce Willis is an American actor and film producer. Known for his roles in Die Hard, Pulp Fiction, and The Sixth Sense.',
        image: buildImageUrl(PROFILE_SIZE, '/w3aXr1e7gQCn8MSp1vW4sXHn99P.jpg'),
        knownFor: ['Die Hard', 'Pulp Fiction', 'The Sixth Sense'],
        totalMovies: 100,
      },
      {
        id: 'f4444444-4444-4444-4444-444444444444',
        name: 'Hugo Weaving',
        birthYear: 1960,
        birthPlace: 'Ibadan, Nigeria',
        bio: 'Hugo Wallace Weaving is an English actor. He is best known for playing Agent Smith in The Matrix trilogy and Elrond in The Lord of the Rings.',
        image: buildImageUrl(PROFILE_SIZE, '/t4ScpYIHlXVD41scEyiGdQDYflX.jpg'),
        knownFor: ['The Matrix', 'The Lord of the Rings', 'V for Vendetta'],
        totalMovies: 50,
      },
      {
        id: 'f5555555-5555-5555-5555-555555555555',
        name: 'Marion Cotillard',
        birthYear: 1975,
        birthPlace: 'Paris, France',
        bio: 'Marion Cotillard is a French actress. She is known for her roles in Inception, La Vie en Rose, and The Dark Knight Rises.',
        image: buildImageUrl(PROFILE_SIZE, '/biitzOF0GffIqFYLyOPkoiaOngQ.jpg'),
        knownFor: ['Inception', 'La Vie en Rose', 'The Dark Knight Rises'],
        totalMovies: 45,
      },
      {
        id: 'f6666666-6666-6666-6666-666666666666',
        name: 'Lee Sun-kyun',
        birthYear: 1975,
        birthPlace: 'Seoul, South Korea',
        bio: 'Lee Sun-kyun was a South Korean actor. He was known for his role in Parasite and the television series Coffee Prince.',
        image: buildImageUrl(PROFILE_SIZE, '/nHFBbSFohzOUOvMxPVwe3Es2nJw.jpg'),
        knownFor: ['Parasite', 'Coffee Prince', 'My Mister'],
        totalMovies: 25,
      },
      {
        id: 'f7777777-7777-7777-7777-777777777777',
        name: 'Jonah Hill',
        birthYear: 1983,
        birthPlace: 'Los Angeles, California, USA',
        bio: 'Jonah Hill Feldstein is an American actor, comedian, and filmmaker. He is known for his comedic roles in films including Superbad, Knocked Up, and 21 Jump Street.',
        image: buildImageUrl(PROFILE_SIZE, '/dq11yEJiM2VTGydL3paD5ExCxD.jpg'),
        knownFor: ['Superbad', 'The Wolf of Wall Street', '21 Jump Street'],
        totalMovies: 30,
      },
      {
        id: 'f8888888-8888-8888-8888-888888888888',
        name: 'Margot Robbie',
        birthYear: 1990,
        birthPlace: 'Dalby, Queensland, Australia',
        bio: 'Margot Elise Robbie is an Australian actress and producer. Known for her roles in The Wolf of Wall Street, Suicide Squad, and Barbie.',
        image: buildImageUrl(PROFILE_SIZE, '/euDPyqLnuwaWMHajcU3oZ9uZezR.jpg'),
        knownFor: ['The Wolf of Wall Street', 'Barbie', 'I, Tonya'],
        totalMovies: 25,
      },
      {
        id: 'f9999999-9999-9999-9999-999999999999',
        name: 'Michael Caine',
        birthYear: 1933,
        birthPlace: 'Rotherhithe, London, England, UK',
        bio: 'Sir Michael Caine is an English actor. Known for his distinctive Cockney accent, he has appeared in more than 160 films over a career spanning seven decades.',
        image: buildImageUrl(PROFILE_SIZE, '/bVZRMlpjTAO2pJK6v90buFgVbSW.jpg'),
        knownFor: ['The Dark Knight Trilogy', 'The Italian Job', 'Inception'],
        totalMovies: 160,
      },
      {
        id: 'g1111111-1111-1111-1111-111111111111',
        name: 'Aaron Eckhart',
        birthYear: 1968,
        birthPlace: 'Cupertino, California, USA',
        bio: 'Aaron Edward Eckhart is an American actor. Born in Cupertino, California, Eckhart moved to the United Kingdom at age 13, when his father relocated the family.',
        image: buildImageUrl(PROFILE_SIZE, '/u5JjnRMr9zKEVvOP7k3F6gdcwT6.jpg'),
        knownFor: [
          'The Dark Knight',
          'Thank You for Smoking',
          'Olympus Has Fallen',
        ],
        totalMovies: 40,
      },
      {
        id: 'g2222222-2222-2222-2222-222222222222',
        name: 'Matthew McConaughey',
        birthYear: 1969,
        birthPlace: 'Uvalde, Texas, USA',
        bio: 'Matthew David McConaughey is an American actor. He first gained notice for his supporting performance in the coming-of-age comedy Dazed and Confused.',
        image: buildImageUrl(PROFILE_SIZE, '/lCySuYjhXix3FzQdS4oceDDrXKI.jpg'),
        knownFor: ['Dallas Buyers Club', 'Interstellar', 'True Detective'],
        totalMovies: 50,
      },
    ];

    for (const actor of actorsData) {
      await prisma.actor.create({
        data: actor,
      });
    }
    console.log(`✅ Created ${actorsData.length} actors`);

    // Map actors by name for easy reference (using fixed UUIDs)
    const actorMap: Record<string, string> = actorsData.reduce(
      (acc, actor) => {
        acc[actor.name] = actor.id;
        return acc;
      },
      {} as Record<string, string>,
    );

    console.log('🎬 Creating movies, cast members, and ratings...');
    const moviesData = [
      {
        id: '31275281-09f7-4758-90a7-dcf758db6ec3',
        title: 'Pulp Fiction',
        year: 1994,
        director: 'Quentin Tarantino',
        runtime: '154 mins',
        genres: ['CRIME', 'DRAMA', 'THRILLER'],
        description:
          "A burger-loving hit man, his philosophical partner, a drug-addled gangster's moll and a washed-up boxer converge in this sprawling, comedic crime caper. Their adventures unfurl in three stories that ingeniously trip back and forth in time.",
        poster: buildImageUrl(POSTER_SIZE, '/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg'),
        backdrop: buildImageUrl(
          BACKDROP_SIZE,
          '/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg',
        ),
        cast: [
          { characterName: 'Vincent Vega', actorId: actorMap['John Travolta'] },
          {
            characterName: 'Jules Winnfield',
            actorId: actorMap['Samuel L. Jackson'],
          },
          { characterName: 'Mia Wallace', actorId: actorMap['Uma Thurman'] },
          {
            characterName: 'Butch Coolidge',
            actorId: actorMap['Bruce Willis'],
          },
        ],
      },
      {
        id: '99d4ecda-b069-4f06-b005-1246b1013b15',
        title: 'La La Land',
        year: 2016,
        director: 'Damien Chazelle',
        runtime: '128 mins',
        genres: ['MUSICAL', 'DRAMA', 'ROMANCE'],
        description:
          'Mia, an aspiring actress, serves lattes to movie stars in between auditions and Sebastian, a jazz musician, scrapes by playing cocktail party gigs. The two meet and fall in love in Los Angeles.',
        poster: buildImageUrl(POSTER_SIZE, '/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg'),
        backdrop: buildImageUrl(
          BACKDROP_SIZE,
          '/qJeU7KM4nT2C1WpOrwPcSDGFUWE.jpg',
        ),
        cast: [
          {
            characterName: 'Sebastian Wilder',
            actorId: actorMap['Ryan Gosling'],
          },
          { characterName: 'Mia Dolan', actorId: actorMap['Emma Stone'] },
        ],
      },
      {
        id: '5249c14f-880a-4ccb-828e-568398f749b6',
        title: 'The Wolf of Wall Street',
        year: 2013,
        director: 'Martin Scorsese',
        runtime: '180 mins',
        genres: ['BIOGRAPHY', 'CRIME', 'DRAMA'],
        description:
          'Based on the true story of Jordan Belfort, from his rise to a wealthy stock-broker living the high life to his fall involving crime, corruption and the federal government.',
        poster: buildImageUrl(POSTER_SIZE, '/34m2tygAYBGqA9MXKhRDtzYd4MR.jpg'),
        backdrop: buildImageUrl(
          BACKDROP_SIZE,
          '/2nLfHZn5RRqI94MZFlBEclU1Srp.jpg',
        ),
        cast: [
          {
            characterName: 'Jordan Belfort',
            actorId: actorMap['Leonardo DiCaprio'],
          },
          { characterName: 'Donnie Azoff', actorId: actorMap['Jonah Hill'] },
          {
            characterName: 'Naomi Lapaglia',
            actorId: actorMap['Margot Robbie'],
          },
          {
            characterName: 'Mark Hanna',
            actorId: actorMap['Matthew McConaughey'],
          },
        ],
      },
      {
        id: '60b5b07b-e7a7-429e-9cc6-01a30363d027',
        title: 'The Avengers',
        year: 2012,
        director: 'Joss Whedon',
        runtime: '143 mins',
        genres: ['ACTION', 'ADVENTURE', 'SCIFI'],
        description:
          "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
        poster: buildImageUrl(POSTER_SIZE, '/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg'),
        backdrop: buildImageUrl(
          BACKDROP_SIZE,
          '/hbn46fQaRmlpBuUrEiFqv0GDL6Y.jpg',
        ),
        cast: [
          {
            characterName: 'Nick Fury',
            actorId: actorMap['Samuel L. Jackson'],
          },
        ],
      },
      {
        id: 'b711f2e2-afae-4714-9f1b-237413fe3206',
        title: 'Django Unchained',
        year: 2012,
        director: 'Quentin Tarantino',
        runtime: '165 mins',
        genres: ['WESTERN', 'DRAMA', 'ACTION'],
        description:
          'With the help of a German bounty hunter, a freed slave sets out to rescue his wife from a brutal Mississippi plantation owner.',
        poster: buildImageUrl(POSTER_SIZE, '/7oWY8VDWW7thTzWh3OKYRkWUlD5.jpg'),
        backdrop: buildImageUrl(
          BACKDROP_SIZE,
          '/2oZklIzUbvZXXzIFzv7Hi68d6xf.jpg',
        ),
        cast: [
          { characterName: 'Stephen', actorId: actorMap['Samuel L. Jackson'] },
          {
            characterName: 'Calvin Candie',
            actorId: actorMap['Leonardo DiCaprio'],
          },
        ],
      },
      {
        id: '458c728c-3cfe-454d-8c3a-aedf4e3e9b66',
        title: 'Kill Bill: Vol. 1',
        year: 2003,
        director: 'Quentin Tarantino',
        runtime: '111 mins',
        genres: ['ACTION', 'CRIME', 'THRILLER'],
        description:
          'An assassin is shot by her ruthless employer, Bill, and other members of their assassination circle. But she lives to plot her vengeance.',
        poster: buildImageUrl(POSTER_SIZE, '/v7TaX8kXMXs5yFFGR41guUDNcnB.jpg'),
        backdrop: buildImageUrl(
          BACKDROP_SIZE,
          '/kkS8PKa8c134vXsj2fQkNqOaCXU.jpg',
        ),
        cast: [
          { characterName: 'The Bride', actorId: actorMap['Uma Thurman'] },
        ],
      },
      {
        id: '74d4cecd-9c88-4e3f-9e50-e97192435bc0',
        title: 'Inception',
        year: 2010,
        director: 'Christopher Nolan',
        runtime: '148 mins',
        genres: ['ACTION', 'SCIFI', 'THRILLER'],
        description:
          'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
        poster: buildImageUrl(POSTER_SIZE, '/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg'),
        backdrop: buildImageUrl(
          BACKDROP_SIZE,
          '/s3TBrRGB1iav7gFOCNx3H31MoES.jpg',
        ),
        cast: [
          { characterName: 'Dom Cobb', actorId: actorMap['Leonardo DiCaprio'] },
          {
            characterName: 'Arthur',
            actorId: actorMap['Joseph Gordon-Levitt'],
          },
          { characterName: 'Mal', actorId: actorMap['Marion Cotillard'] },
          { characterName: 'Eames', actorId: actorMap['Tom Hardy'] },
        ],
      },
      {
        id: '3d238d61-8d7b-467b-9eae-17e52b7b93df',
        title: 'Blade Runner 2049',
        year: 2017,
        director: 'Denis Villeneuve',
        runtime: '164 mins',
        genres: ['SCIFI', 'DRAMA', 'MYSTERY'],
        description:
          "Young Blade Runner K's discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, who's been missing for thirty years.",
        poster: buildImageUrl(POSTER_SIZE, '/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg'),
        backdrop: buildImageUrl(
          BACKDROP_SIZE,
          '/ilRyazdMJwN05exqhwK4tMKBYZs.jpg',
        ),
        cast: [{ characterName: 'K', actorId: actorMap['Ryan Gosling'] }],
      },
      {
        id: '06cdbea6-46b6-4b07-83ba-7b81918ca5ef',
        title: 'The Dark Knight',
        year: 2008,
        director: 'Christopher Nolan',
        runtime: '152 mins',
        genres: ['ACTION', 'CRIME', 'DRAMA'],
        description:
          'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
        poster: buildImageUrl(POSTER_SIZE, '/qJ2tW6WMUDux911r6m7haRef0WH.jpg'),
        backdrop: buildImageUrl(
          BACKDROP_SIZE,
          '/hkBaDkMWbLaf8B1lsWsKX7Ew3Xq.jpg',
        ),
        cast: [
          {
            characterName: 'Bruce Wayne / Batman',
            actorId: actorMap['Christian Bale'],
          },
          { characterName: 'Joker', actorId: actorMap['Heath Ledger'] },
          { characterName: 'Harvey Dent', actorId: actorMap['Aaron Eckhart'] },
          { characterName: 'Alfred', actorId: actorMap['Michael Caine'] },
        ],
      },
      {
        id: '62e16ac8-124a-40a8-8b2c-75412966760a',
        title: 'The Matrix',
        year: 1999,
        director: 'The Wachowskis',
        runtime: '136 mins',
        genres: ['ACTION', 'SCIFI'],
        description:
          'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
        poster: buildImageUrl(POSTER_SIZE, '/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg'),
        backdrop: buildImageUrl(
          BACKDROP_SIZE,
          '/l4QHerTSbMI7qgvasqxP36pqjN6.jpg',
        ),
        cast: [
          { characterName: 'Neo', actorId: actorMap['Keanu Reeves'] },
          {
            characterName: 'Morpheus',
            actorId: actorMap['Laurence Fishburne'],
          },
          { characterName: 'Trinity', actorId: actorMap['Carrie-Anne Moss'] },
          { characterName: 'Agent Smith', actorId: actorMap['Hugo Weaving'] },
        ],
      },
      {
        id: '1ddbd72e-765a-4fe2-9080-ef9a441d90a0',
        title: 'Parasite',
        year: 2019,
        director: 'Bong Joon-ho',
        runtime: '132 mins',
        genres: ['COMEDY', 'DRAMA', 'THRILLER'],
        description:
          'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
        poster: buildImageUrl(POSTER_SIZE, '/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg'),
        backdrop: buildImageUrl(
          BACKDROP_SIZE,
          '/TU9NIjwzjoKPwQHoHshkFcQUCG.jpg',
        ),
        cast: [
          { characterName: 'Ki-taek', actorId: actorMap['Song Kang-ho'] },
          { characterName: 'Park Dong-ik', actorId: actorMap['Lee Sun-kyun'] },
        ],
      },
      {
        id: 'e649db76-7ae2-4ec8-b411-54783ecff24f',
        title: 'Mad Max: Fury Road',
        year: 2015,
        director: 'George Miller',
        runtime: '120 mins',
        genres: ['ACTION', 'ADVENTURE', 'SCIFI'],
        description:
          'In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners, a psychotic worshiper, and a drifter named Max.',
        poster: buildImageUrl(POSTER_SIZE, '/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg'),
        backdrop: buildImageUrl(
          BACKDROP_SIZE,
          '/gqrnQA6Xppdl8vIb2eJc58VC1tW.jpg',
        ),
        cast: [
          { characterName: 'Max Rockatansky', actorId: actorMap['Tom Hardy'] },
          {
            characterName: 'Imperator Furiosa',
            actorId: actorMap['Charlize Theron'],
          },
        ],
      },

      {
        id: 'm1111111-1111-1111-1111-111111111111',
        title: 'Sinners',
        year: 2025,
        director: 'Ryan Coogler',
        runtime: '138 min',
        genres: ['Horror', 'Action', 'Thriller'],
        description:
          'Trying to leave their troubled lives behind, twin brothers return to their hometown to start again, only to discover that an even greater evil is waiting to welcome them back.',
        poster:
          'https://image.tmdb.org/t/p/w500/yqsCU5XOP2mkbFamzAqbqntmfav.jpg',
        backdrop:
          'https://image.tmdb.org/t/p/w1280/nAxGnGHOsfzufThz20zgmRwKur3.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=l2h2lC0vlX4',
        cast: [
          {
            characterName: 'Smoke / Stack',
            actorId: actorMap['Michael B. Jordan'],
          },
          { characterName: 'Mary', actorId: actorMap['Hailee Steinfeld'] },
        ],
      },
      {
        id: 'm2222222-2222-2222-2222-222222222222',
        title: 'Dune: Part Two',
        year: 2024,
        director: 'Denis Villeneuve',
        runtime: '166 min',
        genres: ['Science Fiction', 'Adventure'],
        description:
          'Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family.',
        poster:
          'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
        backdrop:
          'https://image.tmdb.org/t/p/w1280/o869RihWTdTyBcEZBjz0izvEsVf.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=Way9Dexny3w',
        cast: [
          {
            characterName: 'Paul Atreides',
            actorId: actorMap['Timothée Chalamet'],
          },
          { characterName: 'Chani', actorId: actorMap['Zendaya'] },
        ],
      },
      {
        id: 'm3333333-3333-3333-3333-333333333333',
        title: 'Ballerina',
        year: 2025,
        director: 'Len Wiseman',
        runtime: 'TBD',
        genres: ['Action', 'Thriller'],
        description:
          'Taking place during the events of John Wick: Chapter 3 – Parabellum, Eve Macarro begins her training in the assassin traditions of the Ruska Roma.',
        poster:
          'https://image.tmdb.org/t/p/w500/2VUmvqsHb6cEtdfscEA6fqqVzLg.jpg',
        backdrop:
          'https://image.tmdb.org/t/p/w1280/sItIskd5xpiE64bBWYwZintkGf3.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=rCSvYXnHpO8',
        cast: [
          { characterName: 'Eve Macarro', actorId: actorMap['Ana de Armas'] },
          { characterName: 'John Wick', actorId: actorMap['Keanu Reeves'] },
        ],
      },
      {
        id: 'm4444444-4444-4444-4444-444444444444',
        title: 'F1',
        year: 2025,
        director: 'Joseph Kosinski',
        runtime: 'TBD',
        genres: ['Action', 'Drama', 'Sport'],
        description:
          'A Formula One driver comes out of retirement to mentor a young driver.',
        poster:
          'https://image.tmdb.org/t/p/w500/vqBmyAj0Xm9LnS1xe1MSlMAJyHq.jpg',
        backdrop:
          'https://image.tmdb.org/t/p/w1280/8PHTO4a11JuZwYko7QPBUWq45wJ.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=3Q5WEFPr0NM',
        cast: [
          { characterName: 'Sonny Hayes', actorId: actorMap['Brad Pitt'] },
        ],
      },
      {
        id: 'm5555555-5555-5555-5555-555555555555',
        title: 'Mission: Impossible - The Final Reckoning',
        year: 2025,
        director: 'Christopher McQuarrie',
        runtime: 'TBD',
        genres: ['Action', 'Adventure', 'Thriller'],
        description:
          'The eighth installment of the Mission: Impossible film series.',
        poster:
          'https://image.tmdb.org/t/p/w500/z53D72EAOxGRqdr7KXXWp9dJiDe.jpg',
        backdrop:
          'https://image.tmdb.org/t/p/w1280/xPNDRM50a58uvv1il2GVZrtWjkZ.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=avEhEZ2wm6U',
        cast: [
          { characterName: 'Ethan Hunt', actorId: actorMap['Tom Cruise'] },
        ],
      },

      {
        id: 'm6666666-6666-6666-6666-666666666666',
        title: '28 Days Later',
        year: 2002,
        director: 'Danny Boyle',
        runtime: '113 min',
        genres: ['Horror', 'Thriller', 'Science Fiction'],
        description:
          "Twenty-eight days after a killer virus was accidentally unleashed from a British research facility, a small group of London survivors are caught in a desperate struggle to protect themselves from the infected. Carried by animals and humans, the virus turns those it infects into homicidal maniacs -- and it's absolutely impossible to contain.",
        poster: buildImageUrl(POSTER_SIZE, '/sQckQRt17VaWbo39GIu0TMOiszq.jpg'),
        backdrop: buildImageUrl(
          BACKDROP_SIZE,
          '/aJFwk1clMal1prxAvKAgHxKPAf.jpg',
        ),
        videoUrl: 'https://www.youtube.com/watch?v=mWEhfF27O0c',
        cast: [
          { characterName: 'Jim', actorId: actorMap['Cillian Murphy'] },
          { characterName: 'Selena', actorId: actorMap['Naomie Harris'] },
          { characterName: 'Frank', actorId: actorMap['Brendan Gleeson'] },
          { characterName: 'Hannah', actorId: actorMap['Megan Burns'] },
        ],
      },
      {
        id: 'm7777777-7777-7777-7777-777777777777',
        title: 'Thunderbolts*',
        year: 2025,
        director: 'Jake Schreier',
        runtime: '127 min',
        genres: ['Action', 'Science Fiction', 'Adventure'],
        description:
          'After finding themselves ensnared in a death trap, seven disillusioned castoffs must embark on a dangerous mission that will force them to confront the darkest corners of their pasts.',
        poster: buildImageUrl(POSTER_SIZE, '/hqcexYHbiTBfDIdDWxrxPtVndBX.jpg'),
        backdrop: buildImageUrl(
          BACKDROP_SIZE,
          '/rthMuZfFv4fqEU4JVbgSW9wQ8rs.jpg',
        ),
        videoUrl: 'https://www.youtube.com/watch?v=mbCDMwmiGng',
        cast: [
          {
            characterName: 'Yelena Belova',
            actorId: actorMap['Florence Pugh'],
          },
          {
            characterName: 'Bucky Barnes',
            actorId: actorMap['Sebastian Stan'],
          },
          {
            characterName: 'Valentina Allegra de Fontaine',
            actorId: actorMap['Julia Louis-Dreyfus'],
          },
          {
            characterName: 'Robert Reynolds',
            actorId: actorMap['Lewis Pullman'],
          },
        ],
      },
      {
        id: 'm8888888-8888-8888-8888-888888888888',
        title: 'How to Train Your Dragon',
        year: 2025,
        director: 'Dean DeBlois',
        runtime: '125 min',
        genres: ['Fantasy', 'Family', 'Action'],
        description:
          'On the rugged isle of Berk, where Vikings and dragons have been bitter enemies for generations, Hiccup stands apart, defying centuries of tradition when he befriends Toothless, a feared Night Fury dragon. Their unlikely bond reveals the true nature of dragons, challenging the very foundations of Viking society.',
        poster: buildImageUrl(POSTER_SIZE, '/3lwlJL8aW6Wor9tKvME8VoMnBkn.jpg'),
        backdrop: buildImageUrl(
          BACKDROP_SIZE,
          '/7HqLLVjdjhXS0Qoz1SgZofhkIpE.jpg',
        ),
        videoUrl: 'https://www.youtube.com/watch?v=aApqoAOPJSY',
        cast: [
          {
            characterName: 'Hiccup Horrendous Haddock III',
            actorId: actorMap['Mason Thames'],
          },
          {
            characterName: 'Astrid Hofferson',
            actorId: actorMap['Nico Parker'],
          },
          {
            characterName: 'Stoick the Vast',
            actorId: actorMap['Gerard Butler'],
          },
          {
            characterName: 'Gobber the Belch',
            actorId: actorMap['Nick Frost'],
          },
        ],
      },
      {
        id: 'm9999999-9999-9999-9999-999999999999',
        title: 'A Minecraft Movie',
        year: 2025,
        director: 'Jared Hess',
        runtime: '101 min',
        genres: ['Family', 'Comedy', 'Adventure', 'Fantasy'],
        description:
          "Four misfits find themselves struggling with ordinary problems when they are suddenly pulled through a mysterious portal into the Overworld: a bizarre, cubic wonderland that thrives on imagination. To get back home, they'll have to master this world while embarking on a magical quest with an unexpected, expert crafter, Steve.",
        poster: buildImageUrl(POSTER_SIZE, '/yFHHfHcUgGAxziP1C3lLt0q2T4s.jpg'),
        backdrop: buildImageUrl(
          BACKDROP_SIZE,
          '/2Nti3gYAX513wvhp8IiLL6ZDyOm.jpg',
        ),
        videoUrl: 'https://www.youtube.com/watch?v=aSh_L6bvaCQ',
        cast: [
          { characterName: 'Garrett', actorId: actorMap['Jason Momoa'] },
          { characterName: 'Steve', actorId: actorMap['Jack Black'] },
          {
            characterName: 'Henry',
            actorId: actorMap['Sebastian Eugene Hansen'],
          },
          { characterName: 'Natalie', actorId: actorMap['Emma Myers'] },
        ],
      },
      {
        id: 'n1111111-1111-1111-1111-111111111111',
        title: 'Hit Man',
        year: 2024,
        director: 'Richard Linklater',
        runtime: '116 min',
        genres: ['Comedy', 'Romance', 'Crime'],
        description:
          'A mild-mannered professor moonlighting as a fake hit man in police stings ignites a chain reaction of trouble when he falls for a potential client.',
        poster: buildImageUrl(POSTER_SIZE, '/5BfcYFhRVlgWLFo4SCkQNsIWzyy.jpg'),
        backdrop: buildImageUrl(
          BACKDROP_SIZE,
          '/nv6F6tz7r61DUhE7zgHwLJFcTYp.jpg',
        ),
        videoUrl: 'https://www.youtube.com/watch?v=PiAzJsQtYSA',
        cast: [
          { characterName: 'Gary Johnson', actorId: actorMap['Glen Powell'] },
          {
            characterName: 'Madison Figueroa Masters',
            actorId: actorMap['Adria Arjona'],
          },
          { characterName: 'Jasper', actorId: actorMap['Austin Amelio'] },
          { characterName: 'Claudette', actorId: actorMap['Retta'] },
        ],
      },
      {
        id: 'n2222222-2222-2222-2222-222222222222',
        title: 'Challengers',
        year: 2024,
        director: 'Luca Guadagnino',
        runtime: '132 min',
        genres: ['Drama', 'Romance'],
        description:
          "Tennis player turned coach Tashi has taken her husband, Art, and transformed him into a world-famous Major champion. To jolt him out of his recent losing streak, she signs him up for a 'Challenger' event — close to the lowest level of pro tournament — where he finds himself standing across the net from his former best friend and Tashi's former boyfriend.",
        poster: buildImageUrl(POSTER_SIZE, '/H6vke7zGiuLsz4v4RPeReb9rsv.jpg'),
        backdrop: buildImageUrl(
          BACKDROP_SIZE,
          '/4CcUgdiGe83MeqJW1NyJVmZqRrF.jpg',
        ),
        videoUrl: 'https://www.youtube.com/watch?v=rpUlYM1i2mg',
        cast: [
          { characterName: 'Tashi Donaldson', actorId: actorMap['Zendaya'] },
          { characterName: 'Art Donaldson', actorId: actorMap['Mike Faist'] },
          {
            characterName: 'Patrick Zweig',
            actorId: actorMap["Josh O'Connor"],
          },
          {
            characterName: 'Umpire (New Rochelle Final)',
            actorId: actorMap['Darnell Appling'],
          },
        ],
      },
      {
        id: 'o1111111-1111-1111-1111-111111111111',
        title: 'DAN DA DAN: Evil Eye',
        year: 2025,
        director: 'Fuga Yamashiro, Abel Góngora',
        runtime: '93 mins',
        genres: ['ANIMATION', 'FANTASY', 'ADVENTURE', 'COMEDY'],
        description:
          "Momo and Okarun set out on their latest adventure, traveling to a hot springs town home rented by Jiji, Momo's childhood friend and former crush, with the goal to solve the mystery surrounding his family. When they arrive, strange locals derail their investigation before it can properly begin, and the group soon learns there's more lurking under the surface of the town than they could possibly have imagined. Theatrical event featuring four episodes of the anime, including the first three episodes of the second season, and an exclusive interview with series co-directors Fuga Yamashiro and Abel Góngora.",
        poster: buildImageUrl(POSTER_SIZE, '/qXwBSbBUIHLIoUCnfC0sjEjZ4Rw.jpg'),
        backdrop: buildImageUrl(
          BACKDROP_SIZE,
          '/oo8GVyvODffulZtxx6QWzRkrBxK.jpg',
        ),
        videoUrl: 'https://www.youtube.com/watch?v=gGLxz3xQgLM',
        cast: [
          {
            characterName: 'Ken "Okarun" Takakura (voice)',
            actorId: actorMap['Natsuki Hanae'],
          },
          {
            characterName: 'Momo Ayase (voice)',
            actorId: actorMap['Shion Wakayama'],
          },
          {
            characterName: 'Turbo Granny (voice)',
            actorId: actorMap['Mayumi Tanaka'],
          },
          {
            characterName: 'Jin "Jiji" Enjoji (voice)',
            actorId: actorMap['Kaito Ishikawa'],
          },
        ],
      },
    ];

    for (const movie of moviesData) {
      const { cast, ...movieDetails } = movie;

      // 1. Generate two random scores for the movie between 4.0 and 5.0
      const randomScore1 = Math.round((Math.random() + 4) * 10) / 10;
      const randomScore2 = Math.round((Math.random() + 4) * 10) / 10;

      // 2. Calculate the total and average rating
      const totalRatings = 2;
      const averageRating = (randomScore1 + randomScore2) / totalRatings;

      console.log(`  Creating movie: ${movieDetails.title}`);

      // 3. Create the movie, its cast, and its ratings in a single transaction
      await prisma.movie.create({
        data: {
          ...movieDetails,
          // Use the calculated values directly
          rating: averageRating,
          totalRatings: totalRatings,
          cast: {
            create: cast.map((castMember) => ({
              characterName: castMember.characterName,
              actor: {
                connect: { id: castMember.actorId },
              },
            })),
          },
          // Create the two associated Rating records
          ratings: {
            create: [{ score: randomScore1 }, { score: randomScore2 }],
          },
        },
      });
    }

    console.log(
      `✅ Created ${moviesData.length} movies with calculated ratings`,
    );

    console.log(
      `✅ Created ${moviesData.length} movies with calculated ratings`,
    );
    console.log(`✅ Created ${moviesData.length} movies with random ratings`);

    const actorCount = await prisma.actor.count();
    const movieCount = await prisma.movie.count();
    const castMemberCount = await prisma.castMember.count();
    const ratingCount = await prisma.rating.count();

    console.log('\n📊 Database seeding summary:');
    console.log(`    🎭 Actors: ${actorCount}`);
    console.log(`    🎬 Movies: ${movieCount}`);
    console.log(`    🎪 Cast Members: ${castMemberCount}`);
    console.log(`    ⭐ Ratings: ${ratingCount}`);

    console.log('\n🎉 Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .then(() => {
    console.log('✅ Seed script completed');
  })
  .catch((error: Error) => {
    console.error('❌ Seed script failed:', error);
    process.exit(1);
  });
