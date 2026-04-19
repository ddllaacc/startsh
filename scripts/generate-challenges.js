#!/usr/bin/env node

/**
 * Weekly Challenge Generator
 *
 * Fetches data from:
 * - Currents API (news/entertainment)
 * - OMDb API (movies)
 * - TVMaze API (TV shows)
 * - NYT Books API (bestsellers)
 * - RAWG API (video games)
 *
 * Uses Claude API to generate 7 days of challenges (21 total)
 * Appends to src/utils/dailyData.ts
 */

import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// API Keys from environment
const CURRENTS_API_KEY = process.env.CURRENTS_API_KEY;
const OMDB_API_KEY = process.env.OMDB_API_KEY;
const RAWG_API_KEY = process.env.RAWG_API_KEY;
const NYT_API_KEY = process.env.NYT_API_KEY;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

if (!ANTHROPIC_API_KEY) {
  console.error('❌ ANTHROPIC_API_KEY is required');
  process.exit(1);
}

const anthropic = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

/**
 * Fetch news and entertainment from Currents API
 */
async function fetchNews() {
  if (!CURRENTS_API_KEY) {
    console.warn('⚠️  CURRENTS_API_KEY not set, skipping news fetch');
    return null;
  }

  try {
    const response = await fetch(
      `https://api.currentsapi.services/v1/latest-news?apiKey=${CURRENTS_API_KEY}&language=en&category=entertainment,politics,sports`
    );
    const data = await response.json();
    return data.news?.slice(0, 20) || [];
  } catch (error) {
    console.error('Error fetching news:', error.message);
    return null;
  }
}

/**
 * Fetch trending movies from OMDb
 */
async function fetchMovies() {
  if (!OMDB_API_KEY) {
    console.warn('⚠️  OMDB_API_KEY not set, using fallback movies');
    return ['The Shawshank Redemption', 'The Godfather', 'The Dark Knight'];
  }

  try {
    // OMDb doesn't have a "trending" endpoint, so we'll search for recent popular films
    const searches = ['Dune', 'Barbie', 'Oppenheimer', 'Avatar', 'Spider-Man'];
    const movies = [];

    for (const search of searches) {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${encodeURIComponent(search)}&type=movie`
      );
      const data = await response.json();
      if (data.Title) {
        movies.push(data.Title);
      }
    }

    return movies;
  } catch (error) {
    console.error('Error fetching movies:', error.message);
    return ['The Shawshank Redemption', 'The Godfather'];
  }
}

/**
 * Fetch TV shows from TVMaze
 */
async function fetchTVShows() {
  try {
    const response = await fetch('https://api.tvmaze.com/shows');
    const shows = await response.json();
    return shows.slice(0, 20).map(show => show.name);
  } catch (error) {
    console.error('Error fetching TV shows:', error.message);
    return ['Breaking Bad', 'The Office', 'Stranger Things'];
  }
}

/**
 * Fetch bestselling books from NYT
 */
async function fetchBooks() {
  if (!NYT_API_KEY) {
    console.warn('⚠️  NYT_API_KEY not set, using fallback books');
    return ['The Catcher in the Rye', '1984', 'To Kill a Mockingbird'];
  }

  try {
    const response = await fetch(
      `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${NYT_API_KEY}`
    );
    const data = await response.json();
    return data.results?.books?.slice(0, 10).map(book => book.title) || [];
  } catch (error) {
    console.error('Error fetching books:', error.message);
    return ['The Catcher in the Rye', '1984'];
  }
}

/**
 * Fetch popular video games from RAWG
 */
async function fetchGames() {
  if (!RAWG_API_KEY) {
    console.warn('⚠️  RAWG_API_KEY not set, using fallback games');
    return ['Minecraft', 'The Last of Us', 'God of War'];
  }

  try {
    const response = await fetch(
      `https://api.rawg.io/api/games?key=${RAWG_API_KEY}&page_size=20&ordering=-rating`
    );
    const data = await response.json();
    return data.results?.map(game => game.name) || [];
  } catch (error) {
    console.error('Error fetching games:', error.message);
    return ['Minecraft', 'The Last of Us'];
  }
}

/**
 * Use Claude to generate a week of challenges
 */
async function generateChallenges(news, movies, tvShows, books, games) {
  const startDate = getNextMonday();

  const prompt = `You are generating daily challenges for a fun web app. Generate exactly 7 days of challenges starting from ${startDate}.

Each day needs 3 challenges:
1. "Pick a Team" - two fun options to choose between (e.g., "Ketchup vs Mustard", "Cats vs Dogs")
2. "Hot Take" - a provocative statement users weigh in on (e.g., "Breakfast is a scam", "Tattoos are addictive")
3. "Fill in the Blank" - a puzzle from pop culture with strategic blanking

CRITICAL REQUIREMENTS FOR FILL-IN-THE-BLANK:
- Use titles from the provided lists (movies, TV, books, games)
- Prioritize LONGER titles (25-40 characters ideal)
- Create strategic blanks - don't just remove vowels
- Blank out significant portions to make it challenging
- Examples of good blanking:
  * "Eternal Sunshine of the Spotless Mind" → "---r-a- -u------ -f --- -p------ M--d"
  * "The Hitchhiker's Guide to the Galaxy" → "--- ---c---k-r's -u-d- -o --- --l-xy"
- Avoid consecutive days with same category

DATA:
Movies: ${movies.join(', ')}
TV Shows: ${tvShows.join(', ')}
Books: ${books.join(', ')}
Games: ${games.join(', ')}
Recent news topics: ${news?.map(n => n.title).join('; ').slice(0, 500) || 'Use general current events'}

Return ONLY a valid JSON array with this structure:
[
  {
    "date": "MM/DD/YYYY",
    "teams": {"team1": "Option A", "team2": "Option B"},
    "hotTake": "Provocative statement",
    "puzzle": {
      "category": "Movie|Book|Video Game|Quote",
      "answer": "Full title",
      "puzzle": "Blanked version"
    }
  }
]

Generate 7 days starting ${startDate}. Vary categories across days. Make it fun and engaging!`;

  console.log('🤖 Asking Claude to generate challenges...');

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 4000,
    messages: [{ role: 'user', content: prompt }]
  });

  const responseText = message.content[0].text;

  // Extract JSON from response
  const jsonMatch = responseText.match(/\[[\s\S]*\]/);
  if (!jsonMatch) {
    throw new Error('Failed to extract JSON from Claude response');
  }

  return JSON.parse(jsonMatch[0]);
}

/**
 * Get next Monday's date
 */
function getNextMonday() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysUntilMonday = dayOfWeek === 0 ? 1 : (8 - dayOfWeek);
  const nextMonday = new Date(today);
  nextMonday.setDate(today.getDate() + daysUntilMonday);

  const month = String(nextMonday.getMonth() + 1).padStart(2, '0');
  const day = String(nextMonday.getDate()).padStart(2, '0');
  const year = nextMonday.getFullYear();

  return `${month}/${day}/${year}`;
}

/**
 * Append challenges to dailyData.ts
 */
function appendChallenges(challenges) {
  const dataFilePath = path.join(__dirname, '../src/utils/dailyData.ts');
  let content = fs.readFileSync(dataFilePath, 'utf8');

  // Find the last challenge entry
  const lastBracketIndex = content.lastIndexOf('];');
  if (lastBracketIndex === -1) {
    throw new Error('Could not find end of dailyChallenges array');
  }

  // Format new challenges
  const newChallenges = challenges.map(c =>
    `  { date: '${c.date}', teams: { team1: '${c.teams.team1}', team2: '${c.teams.team2}' }, hotTake: '${c.hotTake}', puzzle: { category: '${c.puzzle.category}', answer: '${c.puzzle.answer}', puzzle: '${c.puzzle.puzzle}' } }`
  ).join(',\n');

  // Insert new challenges before the closing bracket
  const newContent =
    content.slice(0, lastBracketIndex) +
    ',\n' + newChallenges + '\n' +
    content.slice(lastBracketIndex);

  fs.writeFileSync(dataFilePath, newContent, 'utf8');
  console.log(`✅ Added ${challenges.length} challenges to dailyData.ts`);
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 Starting challenge generation...\n');

  console.log('📡 Fetching data from APIs...');
  const [news, movies, tvShows, books, games] = await Promise.all([
    fetchNews(),
    fetchMovies(),
    fetchTVShows(),
    fetchBooks(),
    fetchGames()
  ]);

  console.log(`✓ News articles: ${news?.length || 0}`);
  console.log(`✓ Movies: ${movies.length}`);
  console.log(`✓ TV Shows: ${tvShows.length}`);
  console.log(`✓ Books: ${books.length}`);
  console.log(`✓ Games: ${games.length}\n`);

  const challenges = await generateChallenges(news, movies, tvShows, books, games);

  console.log(`\n📝 Generated ${challenges.length} challenges`);
  console.log('Challenges:', JSON.stringify(challenges, null, 2));

  appendChallenges(challenges);

  console.log('\n✨ Done! New challenges ready for the week.\n');
}

main().catch(error => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});
