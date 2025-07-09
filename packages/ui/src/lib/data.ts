export interface Actor {
  id: string;
  name: string;
  birthYear: number;
  birthPlace: string;
  bio: string;
  image: string;
  knownFor: string[];
  totalMovies: number;
}

export interface CastMember {
  id: string;
  name: string;
  character: string;
  image: string;
}

export interface Movie {
  id: string;
  title: string;
  year: number;
  director: string;
  rating: number;
  totalRatings: number;
  runtime: string;
  genres: string[];
  description: string;
  poster: string;
  backdrop: string;
  cast: CastMember[];
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";
const POSTER_SIZE = "w500";
const BACKDROP_SIZE = "w1280";
const PROFILE_SIZE = "w185";

const buildImageUrl = (size: string, path: string) => `${IMAGE_BASE_URL}/${size}${path}`;

export const movies: Movie[] = [
  {
    id: "1",
    title: "Pulp Fiction",
    year: 1994,
    director: "Quentin Tarantino",
    rating: 4.3,
    totalRatings: 10600000,
    runtime: "154 mins",
    genres: ["CRIME", "DRAMA", "THRILLER"],
    description:
      "A burger-loving hit man, his philosophical partner, a drug-addled gangster's moll and a washed-up boxer converge in this sprawling, comedic crime caper. Their adventures unfurl in three stories that ingeniously trip back and forth in time.",
    poster: buildImageUrl(POSTER_SIZE, "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg"),
    backdrop: buildImageUrl(BACKDROP_SIZE, "/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg"),
    cast: [
      {
        id: "101",
        name: "John Travolta",
        character: "Vincent Vega",
        image: buildImageUrl(PROFILE_SIZE, "/vVwpxkU5bZt9H4N5Jj2P0bB7nLw.jpg"),
      },
      {
        id: "1",
        name: "Samuel L. Jackson",
        character: "Jules Winnfield",
        image: buildImageUrl(PROFILE_SIZE, "/npzyxYqD7sT4sF1L6xXnE5K1e7k.jpg"),
      },
      {
        id: "2",
        name: "Uma Thurman",
        character: "Mia Wallace",
        image: buildImageUrl(PROFILE_SIZE, "/k7rVvG8B5k79f7p0y1N5Wd8XJ9K.jpg"),
      },
      {
        id: "102",
        name: "Bruce Willis",
        character: "Butch Coolidge",
        image: buildImageUrl(PROFILE_SIZE, "/hrzB0J2v7tP10mN2Q2j8bB3n5Wz.jpg"),
      },
    ],
  },
  {
    id: "2",
    title: "Parasite",
    year: 2019,
    director: "Bong Joon-ho",
    rating: 4.5,
    totalRatings: 890000,
    runtime: "132 mins",
    genres: ["COMEDY", "DRAMA", "THRILLER"],
    description:
      "All unemployed, Ki-taek's family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get entangled in an unexpected incident.",
    poster: buildImageUrl(POSTER_SIZE, "/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg"),
    backdrop: buildImageUrl(BACKDROP_SIZE, "/ApiBzeaa95TNYliSbQ8pJv4Fje7.jpg"),
    cast: [
      {
        id: "103",
        name: "Song Kang-ho",
        character: "Kim Ki-taek",
        image: buildImageUrl(PROFILE_SIZE, "/o2wN7qG9w6R3tQ0l7j3v1b8w4Sg.jpg"),
      },
      {
        id: "104",
        name: "Choi Woo-shik",
        character: "Kim Ki-woo",
        image: buildImageUrl(PROFILE_SIZE, "/8p00T9jX0iPj8SjW7YQ5h1b6j2.jpg"),
      },
      {
        id: "105",
        name: "Park So-dam",
        character: "Kim Ki-jung",
        image: buildImageUrl(PROFILE_SIZE, "/uE0D1zG5Y3u2u0K1e6p2z4j4P2W.jpg"),
      },
    ],
  },
  {
    id: "3",
    title: "Blade Runner 2049",
    year: 2017,
    director: "Denis Villeneuve",
    rating: 4.2,
    totalRatings: 750000,
    runtime: "164 mins",
    genres: ["SCIENCE FICTION", "DRAMA", "MYSTERY"],
    description:
      "A young blade runner's discovery of a long-buried secret leads him to track down former blade runner Rick Deckard, who's been missing for thirty years.",
    poster: buildImageUrl(POSTER_SIZE, "/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg"),
    backdrop: buildImageUrl(BACKDROP_SIZE, "/mVr0UiqyltcfqxbAUcLl9zWL8ah.jpg"),
    cast: [
      {
        id: "3",
        name: "Ryan Gosling",
        character: "K",
        image: buildImageUrl(PROFILE_SIZE, "/kCqTzNPhq1H0GqLqF8fL4z2r20i.jpg"),
      },
      {
        id: "106",
        name: "Harrison Ford",
        character: "Rick Deckard",
        image: buildImageUrl(PROFILE_SIZE, "/5M8Qx2yD42tK6E4dGjGq3k6t6.jpg"),
      },
    ],
  },
  {
    id: "4",
    title: "La La Land",
    year: 2016,
    director: "Damien Chazelle",
    rating: 4.1,
    totalRatings: 920000,
    runtime: "128 mins",
    genres: ["MUSICAL", "DRAMA", "ROMANCE"],
    description:
      "A jazz musician and an aspiring actress meet and fall in love in Los Angeles while pursuing their dreams.",
    poster: buildImageUrl(POSTER_SIZE, "/ihx4f9DbyfC2e6cplD0s0C9S6c.jpg"),
    backdrop: buildImageUrl(BACKDROP_SIZE, "/mAX7XJ8D9e6tY1D5y4KjY9fL6jQ.jpg"),
    cast: [
      {
        id: "3",
        name: "Ryan Gosling",
        character: "Sebastian Wilder",
        image: buildImageUrl(PROFILE_SIZE, "/kCqTzNPhq1H0GqLqF8fL4z2r20i.jpg"),
      },
      {
        id: "5",
        name: "Emma Stone",
        character: "Mia Dolan",
        image: buildImageUrl(PROFILE_SIZE, "/zYxNOs6N2b2fMhI2fD1k8Xm0o0y.jpg"),
      },
    ],
  },
  {
    id: "5",
    title: "Inception",
    year: 2010,
    director: "Christopher Nolan",
    rating: 4.4,
    totalRatings: 12000000,
    runtime: "148 mins",
    genres: ["SCIENCE FICTION", "ACTION", "ADVENTURE"],
    description:
      "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    poster: buildImageUrl(POSTER_SIZE, "/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg"),
    backdrop: buildImageUrl(BACKDROP_SIZE, "/s2bT29y0ngXxxu2IA8AOzzXTRhd.jpg"),
    cast: [
      {
        id: "4",
        name: "Leonardo DiCaprio",
        character: "Dom Cobb",
        image: buildImageUrl(PROFILE_SIZE, "/wo1NnS8s6M2oPq1Yp5g4vN5p7pW.jpg"),
      },
      {
        id: "107",
        name: "Joseph Gordon-Levitt",
        character: "Arthur",
        image: buildImageUrl(PROFILE_SIZE, "/dG2Rk9D3Yy5Qv2z7e6D2f9Fp8rQ.jpg"),
      },
    ],
  },
  {
    id: "6",
    title: "The Dark Knight",
    year: 2008,
    director: "Christopher Nolan",
    rating: 4.6,
    totalRatings: 15000000,
    runtime: "152 mins",
    genres: ["ACTION", "CRIME", "DRAMA"],
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
    poster: buildImageUrl(POSTER_SIZE, "/qJ2tW6WMUDux911r6m7haRef0WH.jpg"),
    backdrop: buildImageUrl(BACKDROP_SIZE, "/dqK9Hag1054tghRQSqLSfrkvQnA.jpg"),
    cast: [
      {
        id: "6",
        name: "Christian Bale",
        character: "Bruce Wayne / Batman",
        image: buildImageUrl(PROFILE_SIZE, "/oD5NbnwI8w6S59a9GZJ5qJ9z2u.jpg"),
      },
      {
        id: "108",
        name: "Heath Ledger",
        character: "The Joker",
        image: buildImageUrl(PROFILE_SIZE, "/s49Q8fS3S0fF0Yh6K9h4W4J2g0x.jpg"),
      },
    ],
  },
];

export const actors: Actor[] = [
  {
    id: "1",
    name: "Samuel L. Jackson",
    birthYear: 1948,
    birthPlace: "Washington, D.C., USA",
    bio: "Samuel Leroy Jackson is an American actor and producer. One of the most widely recognized actors of his generation, the films in which he has appeared have collectively grossed over $27 billion worldwide, making him the highest-grossing actor of all time.",
    image: buildImageUrl(POSTER_SIZE, "/npzyxYqD7sT4sF1L6xXnE5K1e7k.jpg"),
    knownFor: ["Pulp Fiction", "Django Unchained", "The Avengers", "Jurassic Park"],
    totalMovies: 150,
  },
  {
    id: "2",
    name: "Uma Thurman",
    birthYear: 1970,
    birthPlace: "Boston, Massachusetts, USA",
    bio: "Uma Karuna Thurman is an American actress and model. She has performed in a variety of films, from romantic comedies and dramas to science fiction and action films.",
    image: buildImageUrl(POSTER_SIZE, "/k7rVvG8B5k79f7p0y1N5Wd8XJ9K.jpg"),
    knownFor: ["Pulp Fiction", "Kill Bill: Vol. 1", "Kill Bill: Vol. 2", "Gattaca"],
    totalMovies: 45,
  },
  {
    id: "3",
    name: "Ryan Gosling",
    birthYear: 1980,
    birthPlace: "London, Ontario, Canada",
    bio: "Ryan Thomas Gosling is a Canadian actor. He began his career as a child actor on the Disney Channel's The Mickey Mouse Club and went on to appear in other family entertainment programs.",
    image: buildImageUrl(POSTER_SIZE, "/kCqTzNPhq1H0GqLqF8fL4z2r20i.jpg"),
    knownFor: ["La La Land", "Blade Runner 2049", "Drive", "The Notebook"],
    totalMovies: 35,
  },
  {
    id: "4",
    name: "Leonardo DiCaprio",
    birthYear: 1974,
    birthPlace: "Los Angeles, California, USA",
    bio: "Leonardo Wilhelm DiCaprio is an American actor and film producer. Known for his work in biographical and period films, he has received numerous accolades throughout his career.",
    image: buildImageUrl(POSTER_SIZE, "/wo1NnS8s6M2oPq1Yp5g4vN5p7pW.jpg"),
    knownFor: ["Inception", "The Revenant", "Titanic", "The Wolf of Wall Street"],
    totalMovies: 40,
  },
  {
    id: "5",
    name: "Emma Stone",
    birthYear: 1988,
    birthPlace: "Scottsdale, Arizona, USA",
    bio: "Emily Jean 'Emma' Stone is an American actress. She is the recipient of various accolades, including an Academy Award, a British Academy Film Award, and a Golden Globe Award.",
    image: buildImageUrl(POSTER_SIZE, "/zYxNOs6N2b2fMhI2fD1k8Xm0o0y.jpg"),
    knownFor: ["La La Land", "Easy A", "The Help", "Birdman or (The Unexpected Virtue of Ignorance)"],
    totalMovies: 25,
  },
  {
    id: "6",
    name: "Christian Bale",
    birthYear: 1974,
    birthPlace: "Haverfordwest, Wales",
    bio: "Christian Charles Philip Bale is an English actor. Known for his versatility and physical transformations for his roles, he has been a leading man in films of several genres.",
    image: buildImageUrl(POSTER_SIZE, "/oD5NbnwI8w6S59a9GZJ5qJ9z2u.jpg"),
    knownFor: ["The Dark Knight", "American Psycho", "The Machinist", "Ford v Ferrari"],
    totalMovies: 50,
  },
  {
    id: "101",
    name: "John Travolta",
    birthYear: 1954,
    birthPlace: "Englewood, New Jersey, USA",
    bio: "John Joseph Travolta is an American actor, singer, and dancer. He rose to fame during the 1970s, appearing in films such as Carrie (1976), Saturday Night Fever (1977), and Grease (1978).",
    image: buildImageUrl(POSTER_SIZE, "/vVwpxkU5bZt9H4N5Jj2P0bB7nLw.jpg"),
    knownFor: ["Pulp Fiction", "Grease", "Saturday Night Fever", "Face/Off"],
    totalMovies: 80,
  },
  {
    id: "102",
    name: "Bruce Willis",
    birthYear: 1955,
    birthPlace: "Idar-Oberstein, West Germany",
    bio: "Walter Bruce Willis is an American actor. His career began on the Off-Broadway stage in the early 1980s. He achieved fame with his role as David Addison in the television series Moonlighting (1985–1989).",
    image: buildImageUrl(POSTER_SIZE, "/hrzB0J2v7tP10mN2Q2j8bB3n5Wz.jpg"),
    knownFor: ["Die Hard", "Pulp Fiction", "The Sixth Sense", "Armageddon"],
    totalMovies: 120,
  },
  {
    id: "103",
    name: "Song Kang-ho",
    birthYear: 1967,
    birthPlace: "Gimhae, South Korea",
    bio: "Song Kang-ho is a South Korean actor. He made his acting debut in The Day a Pig Fell into the Well (1996) and gained critical recognition for his performances in films like Joint Security Area (2000), Memories of Murder (2003), The Host (2006), Snowpiercer (2013), and Parasite (2019).",
    image: buildImageUrl(POSTER_SIZE, "/o2wN7qG9w6R3tQ0l7j3v1b8w4Sg.jpg"),
    knownFor: ["Parasite", "Memories of Murder", "The Host", "Snowpiercer"],
    totalMovies: 35,
  },
  {
    id: "104",
    name: "Choi Woo-shik",
    birthYear: 1990,
    birthPlace: "Seoul, South Korea",
    bio: "Choi Woo-shik is a South Korean actor. He first gained widespread recognition for his leading role in the film Set Me Free (2014). He is also known for his roles in Train to Busan (2016), Okja (2017), and Parasite (2019).",
    image: buildImageUrl(POSTER_SIZE, "/8p00T9jX0iPj8SjW7YQ5h1b6j2.jpg"),
    knownFor: ["Parasite", "Train to Busan", "Okja", "Set Me Free"],
    totalMovies: 20,
  },
  {
    id: "105",
    name: "Park So-dam",
    birthYear: 1991,
    birthPlace: "Seoul, South Korea",
    bio: "Park So-dam is a South Korean actress. She is best known for her roles in the films The Priests (2015) and Parasite (2019), and the television series Cinderella with Four Knights (2016).",
    image: buildImageUrl(POSTER_SIZE, "/uE0D1zG5Y3u2u0K1e6p2z4j4P2W.jpg"),
    knownFor: ["Parasite", "The Priests", "Veteran", "The Silenced"],
    totalMovies: 15,
  },
  {
    id: "106",
    name: "Harrison Ford",
    birthYear: 1942,
    birthPlace: "Chicago, Illinois, USA",
    bio: "Harrison Ford is an American actor. He gained worldwide fame for his starring roles as Han Solo in the Star Wars film series and as the title character in the Indiana Jones film series.",
    image: buildImageUrl(POSTER_SIZE, "/5M8Qx2yD42tK6E4dGjGq3k6t6.jpg"),
    knownFor: ["Star Wars", "Indiana Jones", "Blade Runner", "Air Force One"],
    totalMovies: 70,
  },
  {
    id: "107",
    name: "Joseph Gordon-Levitt",
    birthYear: 1981,
    birthPlace: "Los Angeles, California, USA",
    bio: "Joseph Leonard Gordon-Levitt is an American actor and filmmaker. He began his career as a child actor, appearing in the films A River Runs Through It (1992), Angels in the Outfield (1994), and 10 Things I Hate About You (1999).",
    image: buildImageUrl(POSTER_SIZE, "/dG2Rk9D3Yy5Qv2z7e6D2f9Fp8rQ.jpg"),
    knownFor: ["Inception", "500 Days of Summer", "The Dark Knight Rises", "Looper"],
    totalMovies: 50,
  },
  {
    id: "108",
    name: "Heath Ledger",
    birthYear: 1979,
    birthPlace: "Perth, Western Australia, Australia",
    bio: "Heath Andrew Ledger was an Australian actor. After performing roles in several Australian television and film productions, Ledger left for the United States in 1998 to further his career.",
    image: buildImageUrl(POSTER_SIZE, "/s49Q8fS3S0fF0Yh6K9h4W4J2g0x.jpg"),
    knownFor: ["The Dark Knight", "Brokeback Mountain", "10 Things I Hate About You", "A Knight's Tale"],
    totalMovies: 19,
  },
];
// API functions
export async function getAllMovies(): Promise<Movie[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));
  return movies;
}

export async function getMovieById(id: string): Promise<Movie | null> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return movies.find((movie) => movie.id === id) || null;
}

export async function searchMovies(query: string): Promise<Movie[]> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase()) ||
      movie.director.toLowerCase().includes(query.toLowerCase())
  );
}

//ACTORS
export async function getAllActors(): Promise<Actor[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return actors;
}
