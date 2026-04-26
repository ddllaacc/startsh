export interface DailyChallenge {
  date: string; // MM/DD/YYYY format
  teams: {
    team1: string;
    team2: string;
  };
  hotTake: string;
  puzzle: {
    category: string;
    answer: string;
    puzzle: string;
  };
}

export const dailyChallenges: DailyChallenge[] = [
  { date: '10/20/2025', teams: { team1: 'Ketchup', team2: 'Mustard' }, hotTake: 'Job interviews reward liars', puzzle: { category: 'Video Game', answer: 'Minecraft', puzzle: 'M------f-' } },
  { date: '10/21/2025', teams: { team1: 'Crunchy', team2: 'Smooth' }, hotTake: 'matching PJs scream emotional instability', puzzle: { category: 'Movie', answer: 'Everything Everywhere All at Once', puzzle: '-------i-g -----w---- --- -- O-c-' } },
  { date: '10/22/2025', teams: { team1: 'Texting', team2: 'Calling' }, hotTake: 'Typing "k" is rude', puzzle: { category: 'Quote', answer: 'Et tu, Brute?', puzzle: '-- --, Br---?' } },
  { date: '10/23/2025', teams: { team1: 'Sunrise', team2: 'Sunset' }, hotTake: 'New car smell is gross', puzzle: { category: 'Book', answer: 'To Kill a Mockingbird', puzzle: 'T- ---- a M-c--ngb-rd' } },
  { date: '10/24/2025', teams: { team1: 'Cats', team2: 'Dogs' }, hotTake: 'Breakfast is a scam', puzzle: { category: 'Video Game', answer: 'Portal 2', puzzle: 'P----- 2' } },
  { date: '10/25/2025', teams: { team1: 'Early Bird', team2: 'Night Owl' }, hotTake: 'Tattoos are addictive', puzzle: { category: 'Movie', answer: 'Back to the Future', puzzle: 'Back -o -h- F---r-' } },
  { date: '10/26/2025', teams: { team1: 'Trick', team2: 'Treat' }, hotTake: 'Water is best carbonated', puzzle: { category: 'Book', answer: 'The Fault in Our Stars', puzzle: '-he F--l- in O-- -----' } },
  { date: '10/27/2025', teams: { team1: 'Beach', team2: 'Mountains' }, hotTake: "Don't trust iced coffee", puzzle: { category: 'Video Game', answer: 'Super Mario Sunshine', puzzle: '--p-- Ma--o ----h---' } },
  { date: '10/28/2025', teams: { team1: 'Android', team2: 'iPhone' }, hotTake: 'Video games are more art than movies.', puzzle: { category: 'Quote', answer: 'I am the danger', puzzle: 'I -m th- d-ng-r' } },
  { date: '10/29/2025', teams: { team1: 'Flip Flops', team2: 'Sneakers' }, hotTake: 'Success is mostly connections', puzzle: { category: 'Movie', answer: 'The Silence of the Lambs', puzzle: '--- -i--nc- of --- -amb-' } },
  { date: '10/30/2025', teams: { team1: 'Spicy', team2: 'Mild' }, hotTake: 'Bullet journals are performative', puzzle: { category: 'Book', answer: 'A Game of Thrones', puzzle: '- G-m- -f Thr-n-s' } },
  { date: '10/31/2025', teams: { team1: 'Reality TV', team2: 'Prestige TV' }, hotTake: 'Tipping should be banned', puzzle: { category: 'Video Game', answer: 'Animal Crossing: New Horizons', puzzle: '---m-l C------g: -ew H---z---' } },
  { date: '11/01/2025', teams: { team1: 'Stay In', team2: 'Go Out' }, hotTake: 'Candy is a snack', puzzle: { category: 'Movie', answer: 'Eternal Sunshine of the Spotless Mind', puzzle: '---r-a- -u------ -f --- -p------ M--d' } },
  { date: '11/02/2025', teams: { team1: 'Chaos', team2: 'Order' }, hotTake: 'Cereal is soup', puzzle: { category: 'Quote', answer: 'I volunteer as tribute', puzzle: '- vol-n---- as ---b---' } },
  { date: '11/03/2025', teams: { team1: 'SpongeBob', team2: 'Patrick' }, hotTake: 'Spicy food is childish', puzzle: { category: 'Book', answer: 'The Cat in the Hat', puzzle: '--- C-- in --- ---' } },
  { date: '11/04/2025', teams: { team1: 'Art', team2: 'Science' }, hotTake: 'Milk goes in first', puzzle: { category: 'Video Game', answer: 'The Legend of Zelda', puzzle: 'Th- --g-n- of Z---a' } },
  { date: '11/05/2025', teams: { team1: 'Family', team2: 'Friends' }, hotTake: 'Blue bubbles are classist', puzzle: { category: 'Movie', answer: 'Raiders of the Lost Ark', puzzle: '--id--- -f -h- L--- --k' } },
  { date: '11/06/2025', teams: { team1: 'Flight', team2: 'Invisibility' }, hotTake: 'Remote work is lonely', puzzle: { category: 'Book', answer: 'The Girl with the Dragon Tattoo', puzzle: '--- ---l w--- --- D----n ------' } },
  { date: '11/07/2025', teams: { team1: 'Action', team2: 'Comedy' }, hotTake: 'Salad is a scam', puzzle: { category: 'Video Game', answer: 'Dark Souls', puzzle: 'Dark -oul-' } },
  { date: '11/08/2025', teams: { team1: 'Super Mushroom', team2: 'Super Star' }, hotTake: 'One pillow is enough', puzzle: { category: 'Quote', answer: 'I\'ll have what she\'s having', puzzle: '-\'-- ---- w--t ---\'- ----ng' } },
  { date: '11/09/2025', teams: { team1: 'Early Bird', team2: 'Night Owl' }, hotTake: 'Coffee is a crutch', puzzle: { category: 'Movie', answer: '10 Things I Hate About You', puzzle: '10 ---ngs - ---e -b--- Y--' } },
  { date: '11/10/2025', teams: { team1: 'Eating', team2: 'Sleeping' }, hotTake: 'Communism sounds good in theory', puzzle: { category: 'Book', answer: 'The Catcher in the Rye', puzzle: '--- -a----- in --- -y-' } },
  { date: '11/11/2025', teams: { team1: 'Raphael', team2: 'Leonardo' }, hotTake: 'Privacy is overrated in the digital age.', puzzle: { category: 'Video Game', answer: 'Final Fantasy VII', puzzle: '----l ---t-sy V--' } },
  { date: '11/12/2025', teams: { team1: 'Retro', team2: 'Modern' }, hotTake: 'Not everyone deserves a platform', puzzle: { category: 'Movie', answer: 'The Fast and the Furious', puzzle: '--- ---- -nd --- --rio--' } },
  { date: '11/13/2025', teams: { team1: 'Messy', team2: 'Tidy' }, hotTake: "People who use metaphors aren't to be trusted", puzzle: { category: 'Quote', answer: 'If you build it, they will come', puzzle: '-f --- b---d --, -h-- w--- c-m-' } },
  { date: '11/14/2025', teams: { team1: 'With Lemon', team2: 'Without Lemon' }, hotTake: 'Journaling is cringe', puzzle: { category: 'Book', answer: "The Hitchhiker's Guide to the Galaxy", puzzle: "--- ---c---k-r's -u-d- -o --- --l-xy" } },
  { date: '11/15/2025', teams: { team1: 'Salty', team2: 'Sweet' }, hotTake: 'Intelligence is mostly luck', puzzle: { category: 'Video Game', answer: 'Fortnite Battle Royale', puzzle: 'F---ni-- B----- --y---' } },
  { date: '11/16/2025', teams: { team1: 'Warm Breakfast', team2: 'Cold Breakfast' }, hotTake: 'Electric cars are ugly', puzzle: { category: 'Movie', answer: 'When Harry Met Sally', puzzle: 'W--n ----- M-t S----' } },
  { date: '11/17/2025', teams: { team1: 'Fries', team2: 'Nuggies' }, hotTake: 'Pizza crust is trash', puzzle: { category: 'Book', answer: "Harry Potter and the Sorcerer's Stone", puzzle: "----y P----- --d --- ---c----'- -----" } },
  { date: '11/18/2025', teams: { team1: 'Pickles', team2: 'No Pickles' }, hotTake: 'Rain is better than sun for mood.', puzzle: { category: 'Video Game', answer: 'God of War', puzzle: 'G-d -f War' } },
  { date: '11/19/2025', teams: { team1: 'Kid', team2: 'Grown-Up' }, hotTake: "Maple syrup should be America's national food", puzzle: { category: 'Quote', answer: 'Life finds a way', puzzle: 'L--e --nds - w-y' } },
  { date: '11/20/2025', teams: { team1: 'Autobots', team2: 'Decepticons' }, hotTake: 'Cereal goes in first, not milk', puzzle: { category: 'Movie', answer: "Don't Worry Darling", puzzle: "---'t W---y -a-li-g" } },
  { date: '11/21/2025', teams: { team1: 'Past', team2: 'Future' }, hotTake: 'Ketchup is for children', puzzle: { category: 'Book', answer: 'The House on Mango Street', puzzle: '--- --u-- -- Ma-g- --r---' } },
  { date: '11/22/2025', teams: { team1: 'Pirates', team2: 'Ninjas' }, hotTake: 'Reality shows are more entertaining than documentaries.', puzzle: { category: 'Video Game', answer: 'Call of Duty: Modern Warfare', puzzle: 'C--- -- -uty: M----n W------' } },
  { date: '11/23/2025', teams: { team1: 'Salsa', team2: 'Guacamole' }, hotTake: 'Coffee after 4PM is fine', puzzle: { category: 'Movie', answer: 'The Devil Wears Prada', puzzle: 'Th- --vil W---s P----' } },
  { date: '11/24/2025', teams: { team1: 'Flowers', team2: 'Dumplings' }, hotTake: 'Pizza is better cold', puzzle: { category: 'Quote', answer: 'May the Force be with you', puzzle: 'Ma- --- F-rc- b- wi-- --u' } },
  { date: '11/25/2025', teams: { team1: 'Hero', team2: 'Villain' }, hotTake: 'No one really likes jazz', puzzle: { category: 'Book', answer: 'The Perks of Being a Wallflower', puzzle: 'Th- P--ks -- B-ing - ----------' } },
  { date: '11/26/2025', teams: { team1: 'Cake', team2: 'Ice Cream' }, hotTake: 'Music festivals are hell', puzzle: { category: 'Movie', answer: 'Mean Girls', puzzle: 'M--n G---s' } },
  { date: '11/27/2025', teams: { team1: 'Pokémon Red', team2: 'Pokémon Blue' }, hotTake: 'Luck matters more than effort', puzzle: { category: 'Video Game', answer: 'Apex Legends', puzzle: 'Ap-x L-g-nds' } },
  { date: '11/28/2025', teams: { team1: 'Hare', team2: 'Tortoise' }, hotTake: 'Friends was never funny', puzzle: { category: 'Movie', answer: 'Scott Pilgrim vs. The World', puzzle: '-c--- P--g--m v-. -he W---d' } },
  { date: '11/29/2025', teams: { team1: 'Film', team2: 'Book' }, hotTake: 'Gender reveals should be illegal', puzzle: { category: 'Book', answer: 'Lord of the Flies', puzzle: '--rd -- th- --i-s' } },
  { date: '11/30/2025', teams: { team1: 'Sweater', team2: 'Socks' }, hotTake: 'Google Docs is ugly', puzzle: { category: 'Video Game', answer: 'Grand Theft Auto: Vice City', puzzle: 'Gr-nd -h-f- -u-o: V--- ---y' } },
  { date: '12/01/2025', teams: { team1: 'Chicken', team2: 'Egg' }, hotTake: 'Let the battery hit zero', puzzle: { category: 'Quote', answer: 'Say hello to my little friend', puzzle: 'Sa- h---- -- m- ------ fr--nd' } },
  { date: '12/02/2025', teams: { team1: 'Vampire', team2: 'Werewolf' }, hotTake: 'Naps are productivity', puzzle: { category: 'Movie', answer: 'How to Lose a Guy in 10 Days', puzzle: 'H-w t- L--e - Gu- in 10 D---' } },
  { date: '12/03/2025', teams: { team1: 'Grasshopper', team2: 'Ant' }, hotTake: 'The book is never better', puzzle: { category: 'Book', answer: 'Where the Wild Things Are', puzzle: '----- --- --ld ---ngs A--' } },
  { date: '12/04/2025', teams: { team1: 'Sci-Fi', team2: 'Fantasy' }, hotTake: 'Streaming songs devalues music.', puzzle: { category: 'Video Game', answer: 'Mario Kart Double Dash', puzzle: 'M--i- K--t --uble --sh' } },
  { date: '12/05/2025', teams: { team1: 'Cars', team2: 'Planes' }, hotTake: '4-day week isn\'t enough', puzzle: { category: 'Movie', answer: 'My Big Fat Greek Wedding', puzzle: 'My B-- Fat -r--k W----n-' } },
  { date: '12/06/2025', teams: { team1: 'Roller Coasters', team2: 'Water Slides' }, hotTake: 'Coffee shops are just daytime bars.', puzzle: { category: 'Book', answer: 'Chicken Soup for the Soul', puzzle: '--i-k-n ---p f-r t-- ---l' } },
  { date: '12/07/2025', teams: { team1: 'Rock', team2: 'Pop' }, hotTake: 'Milk is for children', puzzle: { category: 'Video Game', answer: 'The Last of Us', puzzle: '-he La-- of U-' } },
  { date: '12/08/2025', teams: { team1: 'Baseball', team2: 'Soccer' }, hotTake: 'Voice notes are a crime', puzzle: { category: 'Quote', answer: 'That\'s one small step for man', puzzle: '-h--\'- --- ----- ---p f-r ---' } },
  { date: '12/09/2025', teams: { team1: 'Cats', team2: 'Dogs' }, hotTake: 'Cursive is pointless', puzzle: { category: 'Movie', answer: 'The Nightmare Before Christmas', puzzle: '--- N-g------ B-fo-- C--------' } },
  { date: '12/10/2025', teams: { team1: 'Pancakes', team2: 'Waffles' }, hotTake: '"Follow your passion" is toxic', puzzle: { category: 'Book', answer: "Are You There God? It's Me, Margaret", puzzle: "--- Y-u -h--- --d? I-'s --, --------" } },
  { date: '12/11/2025', teams: { team1: 'Time Travel', team2: 'Teleportation' }, hotTake: 'Disneyland is overrated', puzzle: { category: 'Video Game', answer: 'Red Dead Redemption', puzzle: '--- --a- ----mption' } },
  { date: '12/12/2025', teams: { team1: 'Fancy Party', team2: 'Costume Party' }, hotTake: 'Ban all group texts', puzzle: { category: 'Movie', answer: 'Gone Girl', puzzle: '-one -irl' } },
  { date: '12/13/2025', teams: { team1: 'Adventure', team2: 'Relax' }, hotTake: 'Cold showers are the best', puzzle: { category: 'Quote', answer: 'This is the way', puzzle: '---- -- --e way' } },
  { date: '12/14/2025', teams: { team1: 'Naughty', team2: 'Nice' }, hotTake: 'Ranch is disgusting', puzzle: { category: 'Book', answer: 'The Very Hungry Caterpillar', puzzle: '--- V--- -ung-- C----pi----' } },
  { date: '12/15/2025', teams: { team1: 'Hoverboard', team2: 'Jet Pack' }, hotTake: 'Being busy is a flex', puzzle: { category: 'Video Game', answer: 'Sonic the Hedgehog', puzzle: 'S-nic t-- --d-----' } },
  { date: '12/16/2025', teams: { team1: 'Unicorn', team2: 'Narwhal' }, hotTake: 'Candles suck', puzzle: { category: 'Movie', answer: 'Barbie', puzzle: '-ar-ie' } },
  { date: '12/17/2025', teams: { team1: 'Eat It First', team2: 'Save It for Last' }, hotTake: 'Stand desks are cringe', puzzle: { category: 'Book', answer: 'Of Mice and Men', puzzle: 'Of -ic- a-d ---' } },
  { date: '12/18/2025', teams: { team1: 'Snowman', team2: 'Sandcastle' }, hotTake: 'The internet is already boring', puzzle: { category: 'Video Game', answer: 'Stardew Valley', puzzle: 'St-rd-w V----y' } },
  { date: '12/19/2025', teams: { team1: 'Pulp', team2: 'No Pulp' }, hotTake: 'Free speech is overused', puzzle: { category: 'Movie', answer: 'Kill Bill: Volume 1', puzzle: 'K--- B---: Vo-ume 1' } },
  { date: '12/20/2025', teams: { team1: 'Burgers', team2: 'Pizza' }, hotTake: '"Quiet quitting" is just good sense.', puzzle: { category: 'Book', answer: 'The 7 Habits of Highly Effective People', puzzle: '--- 7 -ab--s -- --g--y ----c--v- ------' } },
  { date: '12/21/2025', teams: { team1: 'Fork', team2: 'Spoon' }, hotTake: 'iPads aren\'t for adults', puzzle: { category: 'Video Game', answer: "Tony Hawk's Pro Skater", puzzle: "--ny H-w-'- P-- ----e-" } },
  { date: '12/22/2025', teams: { team1: 'The Champion', team2: 'The Challenger' }, hotTake: 'Skipping breakfast is better for focus.', puzzle: { category: 'Quote', answer: 'We were on a break', puzzle: '-- ---- on - b---k' } },
  { date: '12/23/2025', teams: { team1: 'Knight', team2: 'Wizard' }, hotTake: 'Spotify Wrapped is cringe', puzzle: { category: 'Movie', answer: 'Fight Club', puzzle: 'F---- C---' } },
  { date: '12/24/2025', teams: { team1: 'Rain', team2: 'Snow' }, hotTake: 'Astrology is actively harmful', puzzle: { category: 'Book', answer: 'The Secret Life of Bees', puzzle: '-h- --cr-- Li-- o- B---' } },
  { date: '12/25/2025', teams: { team1: 'Sitcoms', team2: 'Dramas' }, hotTake: 'Common sense is a myth', puzzle: { category: 'Video Game', answer: 'The Oregon Trail', puzzle: '-h- ---g-n --ail' } },
  { date: '12/26/2025', teams: { team1: 'Mac', team2: 'PC' }, hotTake: 'Smart homes are stupid', puzzle: { category: 'Book', answer: 'Me Talk Pretty One Day', puzzle: 'M- --lk Pr---- On- D--' } },
  { date: '12/27/2025', teams: { team1: 'Front Seat', team2: 'Back Seat' }, hotTake: 'Typing periods is aggressive', puzzle: { category: 'Video Game', answer: 'Untitled Goose Game', puzzle: 'Un-i-l-d ---s- -am-' } },
  { date: '12/28/2025', teams: { team1: 'Hoodie', team2: 'Jacket' }, hotTake: 'Minimalism is performative', puzzle: { category: 'Book', answer: 'Goodnight Moon', puzzle: '---d-i-ht M---' } },
  { date: '12/29/2025', teams: { team1: 'City', team2: 'Country' }, hotTake: 'No job should last decades', puzzle: { category: 'Quote', answer: 'Why so serious?', puzzle: 'Why -- -eri-u-?' } },
  { date: '12/30/2025', teams: { team1: 'Zombies', team2: 'Aliens' }, hotTake: 'Astrology is harmless fun', puzzle: { category: 'Quote', answer: 'You can\'t sit with us', puzzle: 'Yo- can\'- --- w--h --' } },
  { date: '03/15/2026', teams: { team1: 'Planner', team2: 'Wing It' }, hotTake: 'To-do lists are procrastination in disguise', puzzle: { category: 'Book', answer: 'The Maze Runner', puzzle: '-he M-z- R-nn-r' } },
  { date: '03/16/2026', teams: { team1: 'Indoor', team2: 'Outdoor' }, hotTake: 'Nature is overrated', puzzle: { category: 'Book', answer: 'The Hunger Games', puzzle: '--- H-ng-r G-m-s' } },
  { date: '03/17/2026', teams: { team1: 'Vanilla', team2: 'Chocolate' }, hotTake: 'Vanilla is actually the boldest flavor', puzzle: { category: 'Book', answer: 'Looking for Alaska', puzzle: 'L--k-ng f-r Al-sk-' } },
  { date: '03/18/2026', teams: { team1: 'Paper Books', team2: 'E-Reader' }, hotTake: 'Physical books are just nostalgia', puzzle: { category: 'Book', answer: 'Brave New World', puzzle: 'Br-v- N-w W-rld' } },
  { date: '03/19/2026', teams: { team1: 'Pineapple', team2: 'No Pineapple' }, hotTake: 'Hawaiian pizza is objectively correct', puzzle: { category: 'Book', answer: 'Where the Crawdads Sing', puzzle: 'Wh-r- th- Cr-wd-ds S-ng' } },
  { date: '03/20/2026', teams: { team1: 'Marvel', team2: 'DC' }, hotTake: 'Superhero movies peaked in 2012', puzzle: { category: 'Book', answer: 'The Outsiders', puzzle: '--- -uts-d-rs' } },
  { date: '03/21/2026', teams: { team1: 'Hot Dog', team2: 'Burger' }, hotTake: 'A hot dog is a sandwich', puzzle: { category: 'Book', answer: 'Animal Farm', puzzle: 'An-m-l F-rm' } },
  { date: '03/22/2026', teams: { team1: 'Introvert', team2: 'Extrovert' }, hotTake: 'Extroverts drain every room', puzzle: { category: 'Book', answer: 'Ender\'s Game', puzzle: 'End-r\'s G-m-' } },
  { date: '03/23/2026', teams: { team1: 'Morning Shower', team2: 'Night Shower' }, hotTake: 'Showering every day is excessive', puzzle: { category: 'Book', answer: 'The Glass Castle', puzzle: '--- Gl-ss C-stl-' } },
  { date: '03/24/2026', teams: { team1: 'Window Seat', team2: 'Aisle Seat' }, hotTake: 'Middle seat people deserve respect', puzzle: { category: 'Book', answer: 'The Alchemist', puzzle: '--- Alch-m-st' } },
  { date: '03/25/2026', teams: { team1: 'Gym', team2: 'Run Outside' }, hotTake: 'Gyms are expensive procrastination', puzzle: { category: 'Book', answer: 'The Shining', puzzle: '--- Sh-n-ng' } },
  { date: '03/26/2026', teams: { team1: 'Tacos', team2: 'Burritos' }, hotTake: 'Hard shell tacos are for cowards', puzzle: { category: 'Book', answer: 'Frankenstein', puzzle: 'Fr-nk-nst--n' } },
  { date: '03/27/2026', teams: { team1: 'Netflix', team2: 'Hulu' }, hotTake: 'Streaming has ruined cinema', puzzle: { category: 'Book', answer: 'A Wrinkle in Time', puzzle: '- Wr-nkl- -n T-m-' } },
  { date: '03/28/2026', teams: { team1: 'Leftovers', team2: 'Fresh Only' }, hotTake: 'Leftovers are always better the next day', puzzle: { category: 'Book', answer: 'Tuesday\'s with Morrie', puzzle: 'Tu-sd-y\'s w-th M-rr--' } },
  { date: '03/29/2026', teams: { team1: 'Thin Crust', team2: 'Deep Dish' }, hotTake: 'Deep dish is a casserole, not pizza', puzzle: { category: 'Book', answer: 'The Color Purple', puzzle: '--- C-l-r P-rpl-' } },
  { date: '03/30/2026', teams: { team1: 'Luke', team2: 'Han' }, hotTake: 'Han shot first and that was fine', puzzle: { category: 'Book', answer: 'Their Eyes Were Watching God', puzzle: 'Th--r -y-s W-r- W-tch-ng G-d' } },
  { date: '03/31/2026', teams: { team1: 'Hot Sauce', team2: 'Plain' }, hotTake: 'If you can\'t handle heat, you\'re soft', puzzle: { category: 'Book', answer: 'Invisible Man', puzzle: '-nv-s-bl- M-n' } },
  { date: '04/01/2026', teams: { team1: 'Podcasts', team2: 'Music' }, hotTake: 'Podcasts are just radio for anxious people', puzzle: { category: 'Book', answer: 'A Raisin in the Sun', puzzle: '- R--s-n -n th- S-n' } },
  { date: '04/02/2026', teams: { team1: 'Soup', team2: 'Sandwich' }, hotTake: 'Soup is just wet food', puzzle: { category: 'Book', answer: 'Man\'s Search for Meaning', puzzle: 'M-n\'s S--rch f-r M--n-ng' } },
  { date: '04/03/2026', teams: { team1: 'All Caps', team2: 'No Caps' }, hotTake: 'Typing in all caps is digital aggression', puzzle: { category: 'Book', answer: 'All the Light We Cannot See', puzzle: '-ll th- L-ght W- C-nn-t S--' } },
  { date: '04/04/2026', teams: { team1: 'Camping', team2: 'Hotel' }, hotTake: 'Camping is suffering with no WiFi', puzzle: { category: 'Movie', answer: 'The Princess Bride', puzzle: '--- Pr-nc-ss Br-d-' } },
  { date: '04/05/2026', teams: { team1: 'Hugs', team2: 'Handshakes' }, hotTake: 'Hugging strangers should be illegal', puzzle: { category: 'Movie', answer: 'Ferris Bueller\'s Day Off', puzzle: 'F-rr-s B--ll-r\'s D-y -ff' } },
  { date: '04/06/2026', teams: { team1: 'Latte', team2: 'Black Coffee' }, hotTake: 'A latte is just warm sugar milk', puzzle: { category: 'Movie', answer: 'The Breakfast Club', puzzle: '--- Br--kf-st Cl-b' } },
  { date: '04/07/2026', teams: { team1: 'Going Out', team2: 'Staying In' }, hotTake: 'Bar culture peaked in the 90s', puzzle: { category: 'Movie', answer: 'Dirty Dancing', puzzle: 'D-rty D-nc-ng' } },
  { date: '04/08/2026', teams: { team1: 'Weighted Blanket', team2: 'No Blanket' }, hotTake: 'Cold bedrooms are the only way to sleep', puzzle: { category: 'Movie', answer: 'Home Alone', puzzle: 'H-m- Al-n-' } },
  { date: '04/09/2026', teams: { team1: 'Spender', team2: 'Saver' }, hotTake: 'You can\'t take money with you', puzzle: { category: 'Movie', answer: 'Goodfellas', puzzle: 'G--df-ll-s' } },
  { date: '04/10/2026', teams: { team1: 'Originals', team2: 'Remakes' }, hotTake: 'Every remake is an insult to the original', puzzle: { category: 'Movie', answer: 'The Truman Show', puzzle: '--- Tr-m-n Sh-w' } },
  { date: '04/11/2026', teams: { team1: 'Dating Apps', team2: 'Meeting IRL' }, hotTake: 'Dating apps have made dating worse', puzzle: { category: 'Movie', answer: 'Good Will Hunting', puzzle: 'G--d W-ll H-nt-ng' } },
  { date: '04/12/2026', teams: { team1: 'Romantic', team2: 'Realist' }, hotTake: 'Grand romantic gestures are a red flag', puzzle: { category: 'Movie', answer: 'The Shawshank Redemption', puzzle: '--- Sh-wsh-nk R-d-mpt--n' } },
  { date: '04/13/2026', teams: { team1: 'Gift Giver', team2: 'Gift Receiver' }, hotTake: 'Receiving gifts is more stressful than giving', puzzle: { category: 'Movie', answer: 'Little Miss Sunshine', puzzle: 'L-ttl- M-ss S-nsh-n-' } },
  { date: '04/14/2026', teams: { team1: 'Science', team2: 'Art' }, hotTake: 'Art is just science that failed', puzzle: { category: 'Movie', answer: 'A Beautiful Mind', puzzle: '- B--ut-f-l M-nd' } },
  { date: '04/15/2026', teams: { team1: 'Lucky', team2: 'Unlucky' }, hotTake: 'Superstitions actually work', puzzle: { category: 'Movie', answer: 'La La Land', puzzle: 'L- L- L-nd' } },
  { date: '04/16/2026', teams: { team1: 'Lefty', team2: 'Righty' }, hotTake: 'Left-handed people are secretly smarter', puzzle: { category: 'Movie', answer: 'Pulp Fiction', puzzle: 'P-lp F-ct--n' } },
  { date: '04/17/2026', teams: { team1: 'Democracy', team2: 'Monarchy' }, hotTake: 'Democracy is too slow to actually work', puzzle: { category: 'Movie', answer: 'The Grand Budapest Hotel', puzzle: '--- Gr-nd B-d-p-st H-t-l' } },
  { date: '04/18/2026', teams: { team1: 'Chili with Beans', team2: 'No Beans' }, hotTake: 'Beans ruin everything they touch', puzzle: { category: 'Movie', answer: 'Knives Out', puzzle: 'Kn-v-s O-t' } },
  { date: '04/19/2026', teams: { team1: 'Raisins', team2: 'No Raisins' }, hotTake: 'Raisins in cookies are a betrayal', puzzle: { category: 'Movie', answer: 'Whiplash', puzzle: 'Wh-pl-sh' } },
  { date: '04/20/2026', teams: { team1: 'Morning Shower', team2: 'Night Shower' }, hotTake: 'Pineapple on pizza is actually the correct way to eat pizza', puzzle: { category: 'TV Show', answer: 'Penny Dreadful', puzzle: 'P---y D---d---' } },
  { date: '04/21/2026', teams: { team1: 'Team Coffee', team2: 'Team Tea' }, hotTake: 'Working from home has made people worse at their jobs', puzzle: { category: 'Book', answer: 'To Kill a Mockingbird', puzzle: '-- K--- - M-c------d' } },
  { date: '04/22/2026', teams: { team1: 'Crunchy Peanut Butter', team2: 'Smooth Peanut Butter' }, hotTake: 'Earth Day is just guilt-tripping with better branding', puzzle: { category: 'TV Show', answer: 'The Amazing Race', puzzle: '--- A--z--- R---' } },
  { date: '04/23/2026', teams: { team1: 'Cats', team2: 'Dogs' }, hotTake: 'Tattoos are basically just expensive regrets you paid for in advance', puzzle: { category: 'Book', answer: 'The Catcher in the Rye', puzzle: '--- C--c--- -- --- R--' } },
  { date: '04/24/2026', teams: { team1: 'Sneakers', team2: 'Sandals' }, hotTake: 'Reality TV competitions produce better talent than traditional record labels', puzzle: { category: 'TV Show', answer: 'True Detective', puzzle: 'T--- D-----t--e' } },
  { date: '04/25/2026', teams: { team1: 'Mountains', team2: 'Beach' }, hotTake: 'Every movie longer than two hours should be split into two films', puzzle: { category: 'Movie', answer: 'Oppenheimer', puzzle: 'O---e-h---e-' } },
  { date: '04/26/2026', teams: { team1: 'Texting', team2: 'Calling' }, hotTake: 'Professional athletes are paid too much while teachers are paid too little and nobody actually does anything about it', puzzle: { category: 'TV Show', answer: 'Person of Interest', puzzle: 'P-rs-- -- I-----e-t' } }
,
  { date: '04/27/2026', teams: { team1: 'Morning Shower', team2: 'Night Shower' }, hotTake: 'Pineapple on pizza is actually a culinary masterpiece', puzzle: { category: 'TV Show', answer: 'Penny Dreadful', puzzle: 'P---y D---d---' } },
  { date: '04/28/2026', teams: { team1: 'Team Coffee', team2: 'Team Tea' }, hotTake: 'Working from home has made people worse at their jobs', puzzle: { category: 'Book', answer: 'To Kill a Mockingbird', puzzle: '-- K--- - M-ck------d' } },
  { date: '04/29/2026', teams: { team1: 'Aisle Seat', team2: 'Window Seat' }, hotTake: 'Tattoos are just expensive regrets you have to live with forever', puzzle: { category: 'TV Show', answer: 'The Amazing Race', puzzle: '--- A-----g R---' } },
  { date: '04/30/2026', teams: { team1: 'Texting', team2: 'Calling' }, hotTake: 'Breakfast is completely overrated and should be skipped', puzzle: { category: 'Book', answer: 'The Catcher in the Rye', puzzle: '--- C---c--- -- --- R--' } },
  { date: '05/01/2026', teams: { team1: 'Summer', team2: 'Winter' }, hotTake: 'Social media has done more damage to society than any war', puzzle: { category: 'TV Show', answer: 'Person of Interest', puzzle: 'P--s-- -f I-------t' } },
  { date: '05/02/2026', teams: { team1: 'Cats', team2: 'Dogs' }, hotTake: 'Movie theaters are a dying experience and nobody should mourn them', puzzle: { category: 'TV Show', answer: 'Under the Dome', puzzle: 'U---r --- D---' } },
  { date: '05/03/2026', teams: { team1: 'Night Owl', team2: 'Early Bird' }, hotTake: 'True crime podcasts have made everyone way too paranoid to function', puzzle: { category: 'TV Show', answer: 'True Detective', puzzle: 'T--- D-----t--e' } }
];

/**
 * Get daily challenge data for a specific date
 * @param date - Date object to get challenge for
 * @returns DailyChallenge object or null if not found
 */
export function getDailyChallengeForDate(date: Date): DailyChallenge | null {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  const dateString = `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;
  
  const challenge = dailyChallenges.find(c => c.date === dateString);
  return challenge || null;
}

/**
 * Check if a date has a challenge available
 * @param date - Date object to check
 * @returns boolean indicating if challenge exists
 */
export function hasChallengeForDate(date: Date): boolean {
  return getDailyChallengeForDate(date) !== null;
}
