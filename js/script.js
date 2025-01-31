var timeouts = [];
const BING_AUTOSEARCH = {
  elements: {
    button: {
      start: document.getElementById("btn-start"),
      stop: document.getElementById("btn-stop"),
      copy_autostart: document.getElementById("btn-autostart-copy")
    },
    select: {
      limit: document.getElementById("slc-limit"),
      interval: document.getElementById("slc-interval"),
      multitab: document.getElementById("slc-multitab"),
      random: document.getElementById("slc-random"),
      audio: document.getElementById("slc-audio"),
    },
    span: {
      progress: document.getElementById("span-progress"),
      silence: document.getElementById("silence"),
    },
    div: {
      bing: document.getElementById("div-bing")
    },
    countdown: {
      div: document.getElementById("countdown-div"),
      header: document.getElementById("countdown-header"),
      header_final: document.getElementById("countdown-final-header"),
    },
    link: {
      multi_test: document.getElementById("link-test-multi"),
      autostart: document.getElementById("autostart-link"),
    }
  },
  localStorage: {
    set: (name, value) => {
      try {
        localStorage.setItem(name, value)
        BING_AUTOSEARCH.localStorage.reload();
      }
      catch (e) { }
    },
    get: (name) => {
      let value = localStorage.getItem(name);
      return { name, value };
    },
    load: () => {
      let modal_help = new bootstrap.Modal(document.getElementById('modal-help'), {});

      let _multitab_mode = BING_AUTOSEARCH.localStorage.get("_multitab_mode");
      let _search_interval = BING_AUTOSEARCH.localStorage.get("_search_interval");
      let _search_limit = BING_AUTOSEARCH.localStorage.get("_search_limit");
      let _randomized_intervals = BING_AUTOSEARCH.localStorage.get("_randomized_intervals");
      let _background_audio = BING_AUTOSEARCH.localStorage.get("_background_audio");

      if (!_search_interval.value) {
        modal_help.show();
        BING_AUTOSEARCH.localStorage.set("_search_interval", BING_AUTOSEARCH.search.interval.toString());
      }
      else {
          BING_AUTOSEARCH.elements.select.interval.value = BING_AUTOSEARCH.search.interval = parseInt(_search_interval.value.toString());
      }

      if (!_search_limit.value) {
        modal_help.show();
        BING_AUTOSEARCH.localStorage.set("_search_limit", BING_AUTOSEARCH.search.limit.toString());
      }
      else {
        BING_AUTOSEARCH.elements.select.limit.value = BING_AUTOSEARCH.search.limit = parseInt(_search_limit.value.toString());
      }

      if (!_randomized_intervals.value) {
        BING_AUTOSEARCH.localStorage.set("_randomized_intervals", BING_AUTOSEARCH.search.random.toString());
      }
      else {
        BING_AUTOSEARCH.elements.select.random.value = BING_AUTOSEARCH.search.random = (_randomized_intervals.value === "true");
      }

      if (!_background_audio.value) {
        BING_AUTOSEARCH.localStorage.set("_background_audio", BING_AUTOSEARCH.search.audio.toString());
      }
      else {
        BING_AUTOSEARCH.elements.select.audio.value = BING_AUTOSEARCH.search.audio = (_background_audio.value === "true");
      }

      if (!_multitab_mode.value) {
        BING_AUTOSEARCH.localStorage.set("_multitab_mode", BING_AUTOSEARCH.search.multitab.toString());
      }
      else {
        BING_AUTOSEARCH.elements.select.multitab.value = _multitab_mode.value;
        BING_AUTOSEARCH.search.multitab = (_multitab_mode.value === "true");
      }

      BING_AUTOSEARCH.elements.link.autostart.value = getAutostartLink();
    },
    reload: () => {
      let _multitab_mode = BING_AUTOSEARCH.localStorage.get("_multitab_mode");
      let _search_interval = BING_AUTOSEARCH.localStorage.get("_search_interval");
      let _search_limit = BING_AUTOSEARCH.localStorage.get("_search_limit");
      let _randomized_intervals = BING_AUTOSEARCH.localStorage.get("_randomized_intervals");
      let _background_audio = BING_AUTOSEARCH.localStorage.get("_background_audio");

      if(_search_interval.value)
        BING_AUTOSEARCH.elements.select.interval.value = BING_AUTOSEARCH.search.interval = parseInt(_search_interval.value.toString());
      if(_search_limit.value)
        BING_AUTOSEARCH.elements.select.limit.value = BING_AUTOSEARCH.search.limit = parseInt(_search_limit.value.toString());
      if(_multitab_mode.value)
        BING_AUTOSEARCH.elements.select.multitab.value = BING_AUTOSEARCH.search.multitab = (_multitab_mode.value === "true");
      if(_randomized_intervals.value)
        BING_AUTOSEARCH.elements.select.random.value = BING_AUTOSEARCH.search.random = (_randomized_intervals.value === "true");
      if(_background_audio.value)
        BING_AUTOSEARCH.elements.select.audio.value = BING_AUTOSEARCH.search.audio = (_background_audio.value === "true");
      BING_AUTOSEARCH.elements.link.autostart.value = getAutostartLink();
    }
  },
  search: {
    terms: {
      lists: [
            ["weather", "news", "sports", "movies", "music", "games", "recipes", "restaurants", "shopping", "travel", "jobs", "real estate", "education", "health", "finance", "technology", "politics", "fashion", "beauty", "art", "culture", "history", "science", "nature", "animals", "DIY", "gardening", "cooking", "parenting", "fitness", "humor", "love", "life hacks", "quotes", "books", "celebrities", "social media", "current events", "translate", "maps", "email", "calendar", "flight tickets", "hotels", "weather forecast", "stock prices", "sports scores", "movie times", "song lyrics", "game reviews", "online shopping", "news headlines", "job openings", "house prices", "school ratings", "health insurance", "financial news", "tech news", "political polls", "fashion trends", "beauty tips", "art exhibitions", "cultural events", "historical facts", "scientific discoveries", "natural wonders", "animal facts", "DIY projects", "gardening tips", "cooking tutorials", "parenting advice", "fitness routines", "funny videos", "love poems", "life hacks videos", "inspirational quotes", "book reviews", "celebrity gossip", "social media trends", "latest news"],
            ["music", "song", "album", "artist", "band", "singer", "musician", "composer", "genre", "pop", "rock", "hip hop", "rap", "R&B", "country", "electronic", "classical", "jazz", "blues", "metal", "indie", "folk", "punk", "Latin", "K-pop", "J-pop", "reggae", "soul", "funk", "disco", "techno", "house", "trance", "dubstep", "EDM", "instrumental", "acoustic", "vocal", "lyrics", "melody", "harmony", "rhythm", "beat", "tempo", "key", "chord", "scale", "instrument", "guitar", "piano", "drums", "bass", "violin", "cello", "trumpet", "saxophone", "flute", "synthesizer", "DJ", "producer", "songwriter", "concert", "live music", "festival", "tour", "ticket", "venue", "streaming", "Spotify", "Apple Music", "YouTube Music", "Amazon Music", "Tidal", "Deezer", "SoundCloud", "Pandora", "radio", "playlist", "podcast", "music video", "MTV", "Grammy Awards", "Billboard Music Awards", "American Music Awards", "BRIT Awards", "chart", "hit", "single", "top 10", "new release", "classic", "oldies", "cover", "remix", "mashup", "karaoke", "music theory", "music history", "music education", "music industry", "record label", "A&R", "talent scout", "music journalist", "music critic", "music blog", "audiophile", "hi-fi", "vinyl", "CD", "MP3", "streaming service", "music app", "music technology", "MIDI", "DAW", "audio engineering", "sound design", "music production", "home studio", "recording studio", "Taylor Swift", "BTS", "The Beatles", "Drake", "Bad Bunny", "Beyoncé", "Billie Eilish", "Ariana Grande", "Ed Sheeran", "Justin Bieber", "Kanye West", "Eminem", "Metallica", "Queen", "Coldplay", "Imagine Dragons", "Maroon 5", "Lady Gaga", "Rihanna", "Dua Lipa", "The Weeknd", "Harry Styles", "Adele", "Bruno Mars", "One Direction", "Red Hot Chili Peppers", "Linkin Park", "Green Day", "Nirvana", "Foo Fighters", "AC/DC", "Guns N' Roses", "Pink Floyd", "Led Zeppelin", "Rolling Stones", "David Bowie", "Michael Jackson", "Elton John", "Stevie Wonder", "Bob Dylan", "Prince", "Whitney Houston", "Mariah Carey", "Celine Dion", "Madonna", "Cher"],
            ["PlayStation", "Xbox", "Nintendo", "PC gaming", "Steam", "Epic Games Store", "GOG", "Origin", "Ubisoft Connect", "Battle.net", "Nintendo Switch", "PlayStation 5", "Xbox Series X", "Xbox Series S", "gaming PC", "graphics card", "CPU", "GPU", "RAM", "SSD", "hard drive", "monitor", "keyboard", "mouse", "headset", "controller", "VR", "virtual reality", "AR", "augmented reality", "eSports", "Twitch", "YouTube Gaming", "Discord", "streamer", "pro gamer", "speedrun", "mod", "cheat code", "DLC", "expansion pack", "season pass", "microtransaction", "loot box", "battle pass", "early access", "open world", "sandbox", "RPG", "FPS", "TPS", "MOBA", "MMORPG", "RTS", "puzzle", "platformer", "action", "adventure", "horror", "survival", "simulation", "sports", "racing", "fighting", "strategy", "indie game", "AAA game", "retro game", "classic game", "gameplay", "story", "graphics", "sound", "music", "multiplayer", "online", "co-op", "single-player", "campaign", "quest", "mission", "level", "boss", "enemy", "character", "skill", "ability", "weapon", "armor", "item", "inventory", "health", "mana", "experience", "level up", "achievement", "trophy", "leaderboard", "clan", "guild", "community", "forum", "review", "rating", "trailer", "demo", "release date", "pre-order", "GOTY", "Game of the Year", "esports tournament", "speedrunning competition", "gaming convention", "E3", "Gamescom", "PAX", "Fortnite", "Call of Duty", "Minecraft", "League of Legends", "Grand Theft Auto", "Valorant", "Apex Legends", "Overwatch", "Rocket League", "CS:GO", "Dota 2", "Rainbow Six Siege", "PUBG", "Among Us", "Genshin Impact", "Elden Ring", "God of War", "Horizon Forbidden West", "Spider-Man", "The Last of Us", "Red Dead Redemption", "Cyberpunk 2077", "Assassin's Creed", "The Witcher", "Elder Scrolls", "Fallout", "Halo", "Forza Horizon", "Gears of War", "Metroid", "Zelda", "Mario", "Pokémon", "Animal Crossing", "Super Smash Bros.", "Splatoon", "Kirby", "Fire Emblem", "Blizzard", "EA", "Ubisoft", "Activision", "Bethesda", "Square Enix", "Capcom", "Bandai Namco", "Sega", "Konami", "2K Games", "Rockstar Games", "Nintendo Entertainment System", "Super Nintendo", "Sega Genesis", "PlayStation 1", "PlayStation 2", "Xbox 360", "PlayStation 3", "Wii", "Nintendo DS", "PlayStation Portable", "Game Boy", "Game Boy Advance", "GameCube", "Xbox One", "PlayStation 4", "Wii U", "3DS", "gaming laptop", "gaming mousepad", "gaming chair", "capture card", "streaming software", "OBS", "Streamlabs", "XSplit", "Discord server", "Twitch channel", "YouTube channel", "gaming forum", "Reddit community", "cosplay", "fan art", "lore", "speedrunning community", "modding community", "competitive gaming", "casual gaming", "mobile gaming", "cloud gaming", "cross-platform play"],
            ["weather", "news", "sports", "movies", "music", "games", "recipes", "restaurants", "shopping", "travel", "jobs", "real estate", "education", "health", "finance", "technology", "politics", "fashion", "beauty", "art", "culture", "history", "science", "nature", "animals", "DIY", "gardening", "cooking", "parenting", "fitness", "humor", "love", "life hacks", "quotes", "books", "celebrities", "social media", "current events", "translate", "maps", "email", "calendar", "flight tickets", "hotels", "weather forecast", "stock prices", "sports scores", "movie times", "song lyrics", "game reviews", "online shopping", "news headlines", "job openings", "house prices", "school ratings", "health insurance", "financial news", "tech news", "political polls", "fashion trends", "beauty tips", "art exhibitions", "cultural events", "historical facts", "scientific discoveries", "natural wonders", "animal facts", "DIY projects", "gardening tips", "cooking tutorials", "parenting advice", "fitness routines", "funny videos", "love poems", "life hacks videos", "inspirational quotes", "book reviews", "celebrity gossip", "social media trends", "latest news", "NFL", "NBA", "soccer", "baseball", "hockey", "tennis", "golf", "Olympics", "World Cup", "Super Bowl", "Champions League", "Premier League", "La Liga", "Serie A", "Bundesliga", "Ligue 1", "Manchester United", "Real Madrid", "Barcelona", "Liverpool", "Bayern Munich", "Los Angeles Lakers", "Golden State Warriors", "Boston Celtics", "Brooklyn Nets", "New York Yankees", "Los Angeles Dodgers", "Houston Astros", "Atlanta Braves", "Tom Brady", "LeBron James", "Lionel Messi", "Cristiano Ronaldo", "Stephen Curry", "Serena Williams", "Roger Federer", "Rafael Nadal", "Novak Djokovic", "Tiger Woods", "iPhone", "Samsung Galaxy", "Google Pixel", "Xiaomi", "OnePlus", "laptop", "computer", "tablet", "smartwatch", "headphones", "TV", "camera", "printer", "gaming console", "software", "app", "website", "internet", "Wi-Fi", "cloud computing", "artificial intelligence", "machine learning", "virtual reality", "augmented reality", "blockchain", "cryptocurrency", "Bitcoin", "Ethereum", "NFT", "metaverse", "cybersecurity", "data science", "programming", "coding", "web development", "mobile development", "game development", "digital marketing", "social media marketing", "email marketing", "content marketing", "SEO", "SEM", "analytics", "e-commerce", "online banking", "online payments", "streaming", "Netflix", "Amazon Prime", "Disney+", "Spotify", "YouTube", "TikTok", "Instagram", "Facebook", "Twitter", "LinkedIn", "WhatsApp", "Telegram", "Snapchat", "Pinterest", "Reddit", "Quora", "Wikipedia", "Google Search", "Bing", "DuckDuckGo", "Yahoo", "AOL", "Gmail", "Outlook", "Yahoo Mail", "Zoom", "Microsoft Teams", "Google Meet", "Slack", "Discord", "Trello", "Asana", "Notion", "online games", "video games", "mobile games", "PC games", "PlayStation", "Xbox", "Nintendo", "Fortnite", "Call of Duty", "Minecraft", "League of Legends", "Grand Theft Auto", "FIFA", "Madden NFL", "NBA 2K", "Pokémon", "Super Mario", "The Legend of Zelda", "online courses", "online learning", "university", "college", "school", "degree", "diploma", "certificate", "exam", "test", "homework", "assignment", "essay", "research paper", "thesis", "dissertation", "scholarship", "student loan", "financial aid", "career", "job search", "resume", "cover letter", "interview", "salary", "benefits", "remote work", "freelance", "entrepreneur", "startup", "business", "marketing", "sales", "customer service", "management", "leadership", "communication", "teamwork", "problem-solving", "critical thinking", "creativity"],
            ["NFL", "NBA", "MLB", "NHL", "soccer", "football", "baseball", "basketball", "hockey", "golf", "tennis", "MMA", "boxing", "racing", "cricket", "rugby", "Olympics", "World Cup", "Super Bowl", "World Series", "Stanley Cup", "NBA Finals", "Wimbledon", "US Open", "Masters Tournament", "PGA Championship", "British Open", "Indianapolis 500", "Daytona 500", "Monaco Grand Prix", "Tour de France", "FIFA World Cup", "UEFA Champions League", "Premier League", "La Liga", "Serie A", "Bundesliga", "Ligue 1", "NFL Draft", "NBA Draft", "MLB Draft", "NHL Draft", "free agency", "trade", "injury", "score", "schedule", "standings", "stats", "highlights", "news", "fantasy sports", "sports betting", "eSports", "gaming", "athlete", "player", "coach", "team", "league", "tournament", "championship", "game", "match", "season", "playoffs", "record", "win", "loss", "tie", "goal", "touchdown", "home run", "point", "penalty", "foul", "offside", "red card", "yellow card", "knockout", "technical foul", "hat trick", "grand slam", "hole-in-one", "ace", "birdie", "eagle", "bogey", "par", "penalty kick", "free throw", "three-pointer", "slam dunk", "power play", "penalty kill", "faceoff", "check", "fight", "controversy", "GOAT", "MVP", "rookie", "legend", "hall of fame"],
            ["school", "student", "teacher", "principal", "classroom", "lesson", "homework", "exam", "test", "grade", "assignment", "education", "learning", "curriculum", "course", "subject", "math", "science", "English", "history", "geography", "language", "art", "music", "physical education", "technology", "computer science", "library", "book", "reading", "writing", "essay", "research", "project", "presentation", "study", "learn", "teach", "tutor", "mentor", "guidance counselor", "school counselor", "psychologist", "nurse", "cafeteria", "lunch", "breakfast", "bus", "transportation", "field trip", "assembly", "event", "club", "activity", "sports", "team", "competition", "extracurricular", "volunteer", "community service", "college", "university", "admission", "application", "scholarship", "financial aid", "student loan", "degree", "diploma", "graduate", "higher education", "elementary school", "middle school", "high school", "preschool", "kindergarten", "primary school", "secondary school", "private school", "public school", "charter school", "online school", "homeschooling", "special education", "gifted education", "STEM", "STEAM", "literacy", "numeracy", "critical thinking", "problem-solving", "communication", "collaboration", "creativity", "innovation", "assessment", "evaluation", "standardized test", "report card", "parent-teacher conference", "back to school", "open house", "graduation", "ceremony", "commencement", "valedictorian", "salutatorian", "honor roll", "dean's list", "academic achievement", "student success", "school safety", "bullying", "cyberbullying", "mental health", "wellness", "diversity", "inclusion", "equity", "social justice", "classroom management", "teaching strategies", "educational technology", "online learning", "distance learning", "virtual classroom", "educational resources", "textbook", "workbook", "worksheet", "flashcard", "educational game", "learning app", "Khan Academy", "Coursera", "edX", "Duolingo", "Quizlet", "Google Classroom", "Zoom", "Microsoft Teams", "Blackboard", "Canvas", "Moodle"],
            ["artificial intelligence", "AI", "machine learning", "deep learning", "neural network", "computer vision", "natural language processing", "NLP", "robotics", "automation", "big data", "cloud computing", "Internet of Things", "IoT", "cybersecurity", "data science", "blockchain", "cryptocurrency", "Bitcoin", "Ethereum", "NFT", "metaverse", "virtual reality", "VR", "augmented reality", "AR", "mixed reality", "MR", "5G", "Wi-Fi", "internet", "smartphone", "mobile app", "web development", "software engineering", "programming", "coding", "algorithm", "data structure", "database", "cloud storage", "server", "network", "hardware", "software", "operating system", "Windows", "macOS", "Linux", "Android", "iOS", "computer", "laptop", "tablet", "smartwatch", "wearable technology", "processor", "CPU", "GPU", "RAM", "storage", "hard drive", "SSD", "monitor", "display", "keyboard", "mouse", "printer", "scanner", "camera", "speaker", "headphones", "microphone", "sensor", "drone", "3D printing", "biotechnology", "nanotechnology", "quantum computing", "space technology", "rocket", "satellite", "telescope", "electric vehicle", "EV", "autonomous vehicle", "self-driving car", "renewable energy", "solar power", "wind power", "smart home", "home automation", "e-commerce", "online shopping", "social media", "Facebook", "Twitter", "Instagram", "TikTok", "YouTube", "streaming", "Netflix", "Amazon Prime Video", "Disney+", "Spotify", "video game", "gaming", "eSports", "virtual world", "online community", "digital marketing", "SEO", "SEM", "social media marketing", "email marketing", "content marketing", "analytics", "data analysis", "user experience", "UX", "user interface", "UI", "design thinking", "innovation", "technology trends", "future of technology", "tech news", "gadget", "device", "electronics", "semiconductor", "chip", "transistor", "circuit board", "battery", "wireless technology", "Bluetooth", "NFC", "GPS", "location tracking", "biometrics", "facial recognition", "fingerprint scanner", "cyberattack", "data breach", "privacy", "security", "encryption", "password", "two-factor authentication", "digital transformation", "digital literacy", "tech ethics", "artificial general intelligence", "AGI", "singularity", "transhumanism"],
            ["book", "novel", "author", "writer", "reader", "literature", "fiction", "nonfiction", "genre", "fantasy", "science fiction", "romance", "thriller", "mystery", "horror", "historical fiction", "contemporary", "young adult", "children's", "biography", "memoir", "autobiography", "history", "science", "philosophy", "psychology", "self-help", "business", "cookbook", "travel", "poetry", "drama", "classic", "bestseller", "ebook", "audiobook", "paperback", "hardcover", "library", "bookstore", "Amazon", "Goodreads", "publisher", "editor", "literary agent", "copyright", "ISBN", "title", "cover", "blurb", "prologue", "chapter", "epilogue", "plot", "character", "setting", "theme", "narrative", "point of view", "first person", "third person", "dialogue", "style", "tone", "voice", "prose", "verse", "review", "criticism", "literary theory", "reading list", "book club", "recommendation", "award", "prize", "Nobel Prize in Literature", "Pulitzer Prize", "Man Booker Prize", "New York Times bestseller", "Amazon Charts", "best books of the year", "classic literature", "modern literature", "contemporary literature", "world literature", "translated literature", "genre fiction", "literary fiction", "speculative fiction", "dystopian", "utopian", "magical realism", "graphic novel", "comic book", "manga", "poetry collection", "short story collection", "anthology", "essay collection", "textbook", "reference book", "dictionary", "encyclopedia", "thesaurus", "atlas", "guidebook", "manual", "journal", "notebook", "diary", "reading", "writing", "storytelling", "imagination", "creativity", "knowledge", "wisdom", "education", "entertainment", "escape", "inspiration", "motivation", "reflection", "personal growth", "cultural understanding"],
            ["The Shawshank Redemption", "The Godfather", "The Dark Knight", "The Godfather Part II", "12 Angry Men", "Schindler's List", "The Lord of the Rings: The Return of the King", "Pulp Fiction", "The Lord of the Rings: The Fellowship of the Ring", "The Good, the Bad and the Ugly", "Forrest Gump", "Fight Club", "Inception", "The Lord of the Rings: The Two Towers", "Star Wars: Episode V - The Empire Strikes Back", "The Matrix", "Goodfellas", "One Flew Over the Cuckoo's Nest", "Seven Samurai", "Se7en", "The Silence of the Lambs", "City of God", "Life Is Beautiful", "Spirited Away", "Saving Private Ryan", "Interstellar", "The Green Mile", "Parasite", "Léon: The Professional", "Hara-Kiri", "The Usual Suspects", "American History X", "Back to the Future", "Raiders of the Lost Ark", "Rear Window", "Psycho", "Casablanca", "Modern Times", "City Lights", "The Pianist", "The Departed", "Terminator 2: Judgment Day", "Whiplash", "Gladiator", "Memento", "The Prestige", "The Lion King", "Apocalypse Now", "Alien", "Sunset Boulevard", "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb", "The Shining", "Paths of Glory", "Django Unchained", "The Dark Knight Rises", "WALL·E", "American Beauty", "The Lives of Others", "Princess Mononoke", "Aliens", "Oldboy", "Once Upon a Time in the West", "Citizen Kane", "Das Boot", "North by Northwest", "Vertigo", "Star Wars: Episode VI - Return of the Jedi", "Reservoir Dogs", "Braveheart", "M", "Requiem for a Dream", "Amélie", "A Clockwork Orange", "Like Stars on Earth", "Taxi Driver", "Double Indemnity", "To Kill a Mockingbird", "Toy Story 3", "Lawrence of Arabia", "Eternal Sunshine of the Spotless Mind", "Inglourious Basterds", "Amadeus", "Snatch", "Monty Python and the Holy Grail", "2001: A Space Odyssey", "Singin' in the Rain", "Toy Story", "Bicycle Thieves", "The Kid", "Spider-Man: Into the Spider-Verse", "The Sting", "Coco", "Up", "Grave of the Fireflies", "Metropolis", "For a Few Dollars More", "The Treasure of the Sierra Madre", "Rashomon", "Yojimbo", "1917", "Batman Begins", "Some Like It Hot", "Unforgiven", "Die Hard", "Raging Bull", "Heat", "The Third Man", "Children of Men", "Pan's Labyrinth", "There Will Be Blood", "The Secret in Their Eyes", "Incendies", "Casino", "Gone Girl", "The Great Dictator", "The Hunt", "No Country for Old Men", "Judgment at Nuremberg", "A Separation", "The Bridge on the River Kwai", "Howl's Moving Castle", "The Wolf of Wall Street", "Warrior", "V for Vendetta", "Fargo", "The Handmaiden", "Deadpool", "Gran Torino", "Prisoners", "Andhadhun", "The Grand Budapest Hotel", "The Sixth Sense", "Mad Max: Fury Road", "Sherlock Jr.", "The General", "Wild Strawberries", "My Neighbor Totoro", "Ran", "The Gold Rush", "Inside Out", "The Thing", "L.A. Confidential", "Room", "Spotlight", "Hacksaw Ridge", "The 400 Blows", "Persona", "The Deer Hunter", "It Happened One Night", "Arrival", "Kill Bill: Vol. 1", "Rush", "Dial M for Murder", "The Apartment", "Logan", "Manchester by the Sea", "Gone with the Wind", "The Truman Show", "Blade Runner 2049", "The Silence of the Lambs", "Jurassic Park", "Avengers: Endgame", "Avengers: Infinity War", "Spider-Man: No Way Home"],
            ["Game of Thrones", "Stranger Things", "The Walking Dead", "Breaking Bad", "The Mandalorian", "The Witcher", "Squid Game", "Ted Lasso", "Friends", "The Office", "The Big Bang Theory", "Modern Family", "Grey's Anatomy", "This Is Us", "The Crown", "Bridgerton", "The Queen's Gambit", "WandaVision", "Loki", "The Boys", "Succession", "Euphoria", "Ozark", "Better Call Saul", "Peaky Blinders", "Money Heist", "Dark", "The Good Place", "Brooklyn Nine-Nine", "The Simpsons", "Rick and Morty", "Family Guy", "South Park", "BoJack Horseman", "Avatar: The Last Airbender", "Arcane", "The Umbrella Academy", "Cobra Kai", "Lucifer", "You", "Outer Banks", "The 100", "Riverdale", "The Flash", "Arrow", "Supergirl", "Legends of Tomorrow", "The Blacklist", "Yellowstone", "1883", "NCIS", "FBI", "Law & Order: SVU", "Chicago Fire", "Chicago Med", "Chicago P.D.", "The Rookie", "9-1-1", "S.W.A.T.", "Blue Bloods", "Magnum P.I.", "MacGyver", "Hawaii Five-0", "The Good Doctor", "New Amsterdam", "The Resident", "House M.D.", "Scrubs", "ER", "The Handmaid's Tale", "The Marvelous Mrs. Maisel", "Killing Eve", "Big Little Lies", "The Morning Show", "Westworld", "American Horror Story", "Fargo", "True Detective", "Mindhunter", "Sherlock", "Doctor Who", "Black Mirror", "The Twilight Zone", "Star Trek: Discovery", "The Expanse", "Lost", "Supernatural", "Buffy the Vampire Slayer", "The X-Files", "Smallville", "Gossip Girl", "The Vampire Diaries", "Pretty Little Liars", "One Tree Hill", "The O.C.", "Gilmore Girls", "Dawson's Creek", "Friends", "Seinfeld", "Curb Your Enthusiasm", "Arrested Development", "Parks and Recreation", "Community", "30 Rock", "It's Always Sunny in Philadelphia", "Veep", "Atlanta", "Insecure", "The Wire", "The Sopranos", "Mad Men", "Six Feet Under", "Deadwood", "Boardwalk Empire", "True Blood", "Dexter", "Sons of Anarchy", "Vikings", "Outlander", "The Last Kingdom", "Downton Abbey", "Poldark", "The Crown", "Victoria", "Planet Earth", "Blue Planet", "Our Planet", "Chef's Table", "The Great British Baking Show", "Queer Eye", "RuPaul's Drag Race", "Top Gear", "The Grand Tour", "MythBusters", "Shark Tank", "America's Got Talent", "The Voice", "Survivor", "The Amazing Race", "American Idol"],
            ["To Kill a Mockingbird", "Pride and Prejudice", "1984", "The Lord of the Rings", "The Great Gatsby", "Harry Potter and the Sorcerer's Stone", "The Hobbit", "The Catcher in the Rye", "The Da Vinci Code", "And Then There Were None", "The Girl with the Dragon Tattoo", "The Hunger Games", "The Book Thief", "Gone Girl", "The Help", "The Shining", "The Girl on the Train", "The Fault in Our Stars", "The Alchemist", "The Kite Runner", "The Martian", "The Nightingale", "Little Women", "Jane Eyre", "The Time Traveler's Wife", "The Secret Garden", "The Odyssey", "The Handmaid's Tale", "The Picture of Dorian Gray", "A Game of Thrones", "The Perks of Being a Wallflower", "The Road", "The Very Hungry Caterpillar", "Charlotte's Web", "The Giving Tree", "Where the Wild Things Are", "Goodnight Moon", "The Cat in the Hat", "Green Eggs and Ham", "Corduroy", "Click, Clack, Moo: Cows That Type", "The Lorax", "Oh, the Places You'll Go!", "The Chronicles of Narnia", "A Wrinkle in Time", "Matilda", "Charlie and the Chocolate Factory", "James and the Giant Peach", "The BFG", "The Wonderful Wizard of Oz", "Anne of Green Gables", "Alice's Adventures in Wonderland", "Peter Pan", "The Adventures of Huckleberry Finn", "The Adventures of Tom Sawyer", "Treasure Island", "Moby-Dick", "The Count of Monte Cristo", "War and Peace", "Anna Karenina", "Crime and Punishment", "The Brothers Karamazov", "Madame Bovary", "Don Quixote", "One Hundred Years of Solitude", "Love in the Time of Cholera", "The House of the Spirits", "The God of Small Things", "Life of Pi", "The Remains of the Day", "Atonement", "The Blind Assassin", "The English Patient", "Beloved", "The Color Purple", "Song of Solomon", "Their Eyes Were Watching God", "The Poisonwood Bible", "The Absolutely True Diary of a Part-Time Indian", "The Curious Incident of the Dog in the Night-Time", "The Secret Life of Bees", "Water for Elephants", "The Guernsey Literary and Potato Peel Pie Society", "The Book of Lost Things", "The Shadow of the Wind", "The Name of the Rose", "The Master and Margarita", "Slaughterhouse-Five", "Catch-22", "Fahrenheit 451", "Brave New World", "Animal Farm", "The Hitchhiker's Guide to the Galaxy", "The Princess Bride", "Ender's Game", "The Dune Chronicles", "The Foundation Series", "The Left Hand of Darkness", "The Dispossessed", "The Earthsea Cycle", "A Song of Ice and Fire", "The Kingkiller Chronicle", "The Stormlight Archive", "Mistborn: The Final Empire", "The Wheel of Time", "Jonathan Strange & Mr Norrell", "The Lies of Locke Lamora", "The Night Circus", "Ready Player One", "The Silent Patient", "The Guest List", "Where the Crawdads Sing", "Eleanor Oliphant Is Completely Fine", "Little Fires Everywhere", "The Seven Husbands of Evelyn Hugo", "Daisy Jones & The Six", "Circe", "The Song of Achilles", "Hamnet", "Frankenstein", "Dracula", "The Strange Case of Dr. Jekyll and Mr. Hyde", "Wuthering Heights", "Rebecca", "The Turn of the Screw", "The Woman in White", "The Haunting of Hill House", "The Exorcist", "Rosemary's Baby", "The Silence of the Lambs", "The Shining", "It", "Misery", "Gone Girl", "The Girl on the Train", "The Reversal", "The Girl with the Dragon Tattoo", "The Girl Who Played with Fire", "The Girl Who Kicked the Hornets' Nest", "The Snowman", "The Leopard", "The Talented Mr. Ripley", "In Cold Blood", "The Stranger", "The Metamorphosis", "The Trial", "The Castle"],
            ["NBA", "basketball", "player", "team", "game", "season", "playoffs", "finals", "championship", "score", "point", "assist", "rebound", "steal", "block", "dunk", "three-pointer", "free throw", "foul", "turnover", "draft", "trade", "free agency", "salary cap", "rookie", "veteran", "MVP", "All-Star", "Hall of Fame", "legend", "franchise", "coach", "referee", "arena", "court", "basket", "ball", "jersey", "sneakers", "league", "conference", "division", "Eastern Conference", "Western Conference", "Atlantic Division", "Central Division", "Southeast Division", "Northwest Division", "Pacific Division", "Southwest Division", "Boston Celtics", "Los Angeles Lakers", "Golden State Warriors", "Chicago Bulls", "Milwaukee Bucks", "Philadelphia 76ers", "Phoenix Suns", "Miami Heat", "Dallas Mavericks", "Denver Nuggets", "Brooklyn Nets", "Los Angeles Clippers", "Memphis Grizzlies", "Atlanta Hawks", "Cleveland Cavaliers", "Toronto Raptors", "New York Knicks", "Minnesota Timberwolves", "Portland Trail Blazers", "Sacramento Kings", "New Orleans Pelicans", "Washington Wizards", "Oklahoma City Thunder", "Orlando Magic", "Detroit Pistons", "Houston Rockets", "Utah Jazz", "San Antonio Spurs", "Indiana Pacers", "Charlotte Hornets", "LeBron James", "Michael Jordan", "Kobe Bryant", "Stephen Curry", "Kevin Durant", "Giannis Antetokounmpo", "Shaquille O'Neal", "Larry Bird", "Magic Johnson", "Tim Duncan", "Kareem Abdul-Jabbar", "Wilt Chamberlain", "Bill Russell", "Hakeem Olajuwon", "Scottie Pippen", "Charles Barkley", "Karl Malone", "John Stockton", "Steve Nash", "Dirk Nowitzki", "Dwyane Wade", "Allen Iverson", "Jason Kidd", "Russell Westbrook", "James Harden", "Kawhi Leonard", "Damian Lillard", "Anthony Davis", "Paul George", "Kyrie Irving", "Joel Embiid", "Nikola Jokic", "Luka Dončić", "Jayson Tatum", "Ja Morant", "Zion Williamson", "Trae Young", "Devin Booker", "Donovan Mitchell", "Bam Adebayo", "De'Aaron Fox", "draft pick", "lottery", "rookie contract", "max contract", "supermax contract", "qualifying offer", "restricted free agent", "unrestricted free agent", "sign-and-trade", "trade deadline", "buyout", "waivers", "G League", "two-way contract", "summer league", "training camp", "preseason", "regular season", "postseason", "play-in tournament", "seeding games", "first round", "second round", "conference finals", "NBA Finals", "Game 7", "overtime", "buzzer beater", "game-winner", "triple-double", "double-double", "scoring title", "assists title", "rebounding title", "steals title", "blocks title", "Defensive Player of the Year", "Sixth Man of the Year", "Most Improved Player", "Rookie of the Year", "Coach of the Year", "Executive of the Year"],
            ["NFL", "football", "American football", "National Football League", "AFC", "NFC", "Super Bowl", "Pro Bowl", "NFL Draft", "season", "playoffs", "regular season", "preseason", "offseason", "game", "match", "week", "schedule", "standings", "division", "conference", "team", "player", "coach", "quarterback", "running back", "wide receiver", "tight end", "offensive line", "defensive line", "linebacker", "cornerback", "safety", "special teams", "kicker", "punter", "kickoff", "punt", "field goal", "touchdown", "extra point", "two-point conversion", "safety", "interception", "fumble", "sack", "penalty", "flag", "replay", "challenge", "timeout", "overtime", "win", "loss", "tie", "score", "stats", "record", "passing yards", "rushing yards", "receiving yards", "touchdowns", "interceptions", "sacks", "tackles", "field position", "yard line", "end zone", "red zone", "goal line", "first down", "fourth down", "offensive play", "defensive play", "blitz", "coverage", "zone defense", "man-to-man defense", "play action", "screen pass", "hail mary", "trick play", "fumblitis", "pick-six", "helmet catch", "immaculate reception", "tuck rule", "catch rule", "roughing the passer", "pass interference", "holding", "false start", "offside", "delay of game", "personal foul", "unsportsmanlike conduct", "targeting", "concussion", "injury", "trade", "free agency", "salary cap", "franchise tag", "draft pick", "combine", "pro scout", "general manager", "head coach", "offensive coordinator", "defensive coordinator", "special teams coordinator", "training camp", "practice squad", "roster", "depth chart", "starting lineup", "jersey", "helmet", "shoulder pads", "cleats", "football field", "stadium", "fan", "cheerleader", "tailgate", "fantasy football", "sports betting", "NFL Network", "ESPN", "CBS", "Fox", "NBC", "Sunday Night Football", "Monday Night Football", "Thursday Night Football", "RedZone", "NFL app", "NFL website", "social media", "Twitter", "Instagram", "Facebook", "TikTok", "YouTube", "podcast", "sports news", "sports talk radio", "analyst", "commentator", "highlight", "replay", "interview", "press conference", "Super Bowl commercials", "halftime show", "national anthem", "NFL history", "Hall of Fame", "Pro Football Hall of Fame", "Canton", "Ohio", "NFL Films", "America's Game", "greatest players", "greatest teams", "greatest games", "rivalries", "traditions", "legends"],
            ["website", "webpage", "internet", "online", "browser", "URL", "domain", "hosting", "server", "HTML", "CSS", "JavaScript", "web design", "web development", "front-end", "back-end", "user interface", "user experience", "navigation", "menu", "link", "button", "form", "search", "content", "text", "image", "video", "audio", "download", "upload", "login", "register", "account", "profile", "password", "security", "privacy", "cookie", "analytics", "traffic", "SEO", "search engine optimization", "keyword", "ranking", "social media", "Facebook", "Twitter", "Instagram", "YouTube", "LinkedIn", "Pinterest", "blog", "article", "post", "comment", "forum", "community", "e-commerce", "online shopping", "cart", "checkout", "payment", "shipping", "customer service", "contact", "about us", "FAQ", "help", "support", "terms of service", "privacy policy", "sitemap", "mobile", "responsive", "app", "download", "install", "notification", "email", "subscribe", "newsletter", "advertising", "banner", "popup", "affiliate", "marketing", "analytics", "Google Analytics", "data", "tracking", "conversion", "website builder", "WordPress", "Wix", "Squarespace", "Shopify", "GoDaddy", "Namecheap", "Bluehost", "HostGator", "SiteGround", "DreamHost", "AWS", "Amazon Web Services", "Google Cloud Platform", "Microsoft Azure", "GitHub", "GitLab", "Bitbucket", "Stack Overflow", "developer", "programmer", "designer", "content creator", "blogger", "vlogger", "influencer", "online business", "entrepreneur", "startup", "digital marketing", "content marketing", "social media marketing", "email marketing", "affiliate marketing", "online advertising", "pay-per-click", "search engine marketing", "web design trends", "mobile first", "user-centered design", "accessibility", "performance", "speed", "security", "HTTPS", "SSL", "encryption", "cybersecurity", "data protection", "GDPR", "privacy regulations", "net neutrality", "open source", "web standards", "W3C", "internet governance", "domain name system", "DNS", "IP address", "TCP/IP", "HTTP", "HTTPS", "web server", "Apache", "Nginx", "IIS", "database", "MySQL", "PostgreSQL", "MongoDB", "cloud computing", "virtualization", "containerization", "Docker", "Kubernetes", "serverless", "microservices", "API", "application programming interface", "REST", "GraphQL", "JSON", "XML", "web scraping", "data mining", "machine learning", "artificial intelligence", "chatbot", "virtual assistant", "voice search", "augmented reality", "virtual reality", "blockchain", "cryptocurrency", "NFT", "metaverse"],
            ["Facebook", "YouTube", "WhatsApp", "Instagram", "TikTok", "Messenger", "Amazon", "Netflix", "Spotify", "Snapchat", "Twitter", "Telegram", "Pinterest", "Gmail", "Google Maps", "Google Chrome", "Uber", "Zoom", "Microsoft Teams", "Google Meet", "Disney+", "HBO Max", "Hulu", "Prime Video", "Apple Music", "SoundCloud", "Pandora", "iHeartRadio", "Shazam", "LinkedIn", "Reddit", "Quora", "Discord", "Twitch", "eBay", "Etsy", "Walmart", "Target", "AliExpress", "Shein", "Wish", "OfferUp", "Letgo", "Facebook Marketplace", "Craigslist", "Airbnb", "Booking.com", "Expedia", "Hotels.com", "Tripadvisor", "Google Translate", "Duolingo", "Babbel", "Memrise", "Rosetta Stone", "Khan Academy", "Coursera", "edX", "Udemy", "Skillshare", "MasterClass", "Quizlet", "Grammarly", "Duolingo", "Photomath", "Wikipedia", "Google Search", "Google Assistant", "Siri", "Alexa", "Bixby", "WeatherBug", "AccuWeather", "The Weather Channel", "Yahoo Weather", "MyFitnessPal", "Calorie Counter", "Fitbit", "Strava", "Nike Run Club", "Peloton", "Headspace", "Calm", "BetterMe", "Noom", "Period Tracker", "Clue", "Flo", "WebMD", "Mayo Clinic", "Healthline", "GoodRx", "Robinhood", "Coinbase", "Cash App", "Venmo", "PayPal", "Zelle", "Mint", "Personal Capital", "YNAB", "Credit Karma", "TurboTax", "H&R Block", "Indeed", "LinkedIn", "Glassdoor", "ZipRecruiter", "Monster", "Adobe Acrobat Reader", "DocuSign", "Dropbox", "Google Drive", "Microsoft OneDrive", "Box", "Evernote", "Notion", "Trello", "Asana", "Monday.com", "Slack", "Microsoft Outlook", "Gmail", "Yahoo Mail", "Spark", "Newton Mail", "Canva", "Picsart", "Adobe Lightroom", "VSCO", "Snapseed", "Facetune", "TikTok", "Instagram", "Snapchat", "YouTube", "Twitch", "Vimeo", "Netflix", "Disney+", "HBO Max", "Hulu", "Amazon Prime Video", "Peacock", "Paramount+", "Apple TV+", "ESPN", "DAZN", "MLB.TV", "NBA League Pass", "NFL Game Pass", "NHL Live", "WWE Network", "Crunchyroll", "Funimation", "VRV", "Tubi", "Pluto TV", "Crackle", "Plex", "Kodi", "VLC", "MX Player", "Spotify", "Apple Music", "YouTube Music", "Amazon Music", "Tidal", "Deezer", "Pandora", "iHeartRadio", "SoundCloud", "Shazam", "Audible", "Google Podcasts", "Spotify Podcasts", "Apple Podcasts", "Pocket Casts", "Overcast", "Castro", "Stitcher", "TuneIn Radio", "Waze", "Google Maps", "Apple Maps", "Citymapper", "Moovit", "Transit", "Lyft", "Uber", "Bolt", "Grab", "Ola", "Zomato", "DoorDash", "Grubhub", "Uber Eats", "Instacart", "Shipt", "Peapod", "Walmart Grocery", "Target", "Amazon", "eBay", "Etsy", "AliExpress", "Shein", "Wish", "OfferUp", "Letgo", "Facebook Marketplace", "Craigslist"],
      ],
      random: () => {
        let list = BING_AUTOSEARCH.search.terms.lists[Math.floor(Math.random() * BING_AUTOSEARCH.search.terms.lists.length)];
        return list[Math.floor(Math.random() * list.length)];
      }
    },
    limit: 30,
    interval: 60000,
    multitab: false,
    random: true,
    audio: false,
    window: {
      open: (url, window_close_delay = BING_AUTOSEARCH.interval) => {
        try {
          let w = window.open(url);

          if (w) {
            timeouts.push(setTimeout(() => {
              w.close();
            }, window_close_delay));
          }
        }
        catch (e) { }
      }
    },
    iframe: {
      add: (src, title) => {
        let iframe = document.createElement("iframe");

        iframe.setAttribute("src", src);
        iframe.setAttribute("title", title);

        if (BING_AUTOSEARCH.elements.div.bing.firstChild)
          BING_AUTOSEARCH.elements.div.bing.removeChild(BING_AUTOSEARCH.elements.div.bing.firstChild);

        BING_AUTOSEARCH.elements.div.bing.appendChild(iframe);
      }
    },
    start: () => {
      if(BING_AUTOSEARCH.search.audio) {
        BING_AUTOSEARCH.elements.span.silence.play();
        BING_AUTOSEARCH.elements.span.silence.style.display = "inline";
      }
      BING_AUTOSEARCH.elements.countdown.div.style.display = "block";
      var total_delay = 0;
      var delay_list = [];
      var countdown = undefined;
      for (let i = 1; i <= BING_AUTOSEARCH.search.limit; i++) {
        let term = BING_AUTOSEARCH.search.terms.random().toLowerCase();
        let url = `https://www.bing.com/search?q=${encodeURIComponent(term)}&PC=U316&FORM=CHROMN`;
        let rand = 0;
        let delay = 0
        if (i > 1) {
          delay = BING_AUTOSEARCH.search.interval;
          if (BING_AUTOSEARCH.search.random) {
            rand = getRandomInteger(0, Math.round(BING_AUTOSEARCH.search.interval/2));
            delay += rand;
          }
        }

        timeouts.push(setTimeout(() => {
          BING_AUTOSEARCH.elements.span.progress.innerText = `(${i}/${BING_AUTOSEARCH.search.limit})`;
          document.title = `(${i}/${BING_AUTOSEARCH.search.limit})` + " - Bing Auto Search for Microsoft Rewards"
            
          if (i === BING_AUTOSEARCH.search.limit) {
            timeouts.push(setTimeout(() => {
              BING_AUTOSEARCH.search.stop();
              countdown.clearInterval();
            }, 15000));
          }

          if (!BING_AUTOSEARCH.search.multitab)
            BING_AUTOSEARCH.search.iframe.add(url, term);
          else {
            if (BING_AUTOSEARCH.search.random) {
              BING_AUTOSEARCH.search.window.open(url, 10000 + getRandomInteger(0, 4000));
            } else {
              BING_AUTOSEARCH.search.window.open(url, 10000);
            }
          }
            
          // display countdown
          try {
            clearInterval(countdown);
          }
          catch(error) {}
          countdown = setInterval(function() {
            let now = new Date().getTime();
            let distance = delay_list[i] - now
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);
            BING_AUTOSEARCH.elements.countdown.header.innerText = "Next search in: " + minutes.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + ":" + seconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
            let distance_final = delay_list[delay_list.length - 1] - now
            var hours_final = Math.floor((distance_final % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes_final = Math.floor((distance_final % (1000 * 60 * 60)) / (1000 * 60));
            let seconds_final = Math.floor((distance_final % (1000 * 60)) / 1000);
            BING_AUTOSEARCH.elements.countdown.header_final.innerText = "Completion in: " + hours_final.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + ":" + minutes_final.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + ":" + seconds_final.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
          }, 200);
          timeouts.push(countdown);
        }, total_delay + delay));
        delay_list.push(new Date().getTime() + total_delay + delay);

        // add final delay
        if (i === BING_AUTOSEARCH.search.limit) {
          delay_list.push(new Date().getTime() + total_delay + delay + 15000)
        }
        total_delay += delay;
      }
    },
    stop: () => {
      if(BING_AUTOSEARCH.search.audio) {
        BING_AUTOSEARCH.elements.span.silence.pause();
      }
      window.open("https://rewards.bing.com/pointsbreakdown");
      for (let i = 0; i < timeouts.length; i++) {
        try {
          clearInterval(timeouts[i]);
        }
        catch(error) {}
      }
      timeouts = [];
      BING_AUTOSEARCH.reload();
      document.title = "Bing Auto Search for Microsoft Rewards"
    }
  },
  load: () => {
    BING_AUTOSEARCH.localStorage.load();

    BING_AUTOSEARCH.elements.button.start.addEventListener("click", () => {
      BING_AUTOSEARCH.elements.button.start.style.display = "none";
      BING_AUTOSEARCH.elements.button.stop.style.display = "inline-block";

      BING_AUTOSEARCH.search.start();
    });

    BING_AUTOSEARCH.elements.button.stop.addEventListener("click", () => {
      BING_AUTOSEARCH.search.stop();
    });

    BING_AUTOSEARCH.elements.select.multitab.addEventListener("change", () => {
      BING_AUTOSEARCH.localStorage.set("_multitab_mode", BING_AUTOSEARCH.elements.select.multitab.value);
    });

    BING_AUTOSEARCH.elements.select.limit.addEventListener("change", () => {
      BING_AUTOSEARCH.localStorage.set("_search_limit", BING_AUTOSEARCH.elements.select.limit.value);
    });

    BING_AUTOSEARCH.elements.select.interval.addEventListener("change", () => {
      BING_AUTOSEARCH.localStorage.set("_search_interval", BING_AUTOSEARCH.elements.select.interval.value);
    });

    BING_AUTOSEARCH.elements.select.random.addEventListener("change", () => {
      BING_AUTOSEARCH.localStorage.set("_randomized_intervals", BING_AUTOSEARCH.elements.select.random.value);
    });

    BING_AUTOSEARCH.elements.select.audio.addEventListener("change", () => {
      BING_AUTOSEARCH.localStorage.set("_background_audio", BING_AUTOSEARCH.elements.select.audio.value);
    });

    BING_AUTOSEARCH.elements.link.multi_test.addEventListener("click", testPopup);

    BING_AUTOSEARCH.elements.countdown.div.style.display = "none";

    BING_AUTOSEARCH.elements.button.copy_autostart.addEventListener("mouseout", () => {
      BING_AUTOSEARCH.elements.button.copy_autostart.setAttribute('data-bs-original-title', 'Copy to clipboard');
    });
  },
  reload: () => {
    BING_AUTOSEARCH.localStorage.load();
    BING_AUTOSEARCH.elements.button.start.style.display = "inline-block";
    BING_AUTOSEARCH.elements.button.stop.style.display = "none";
    BING_AUTOSEARCH.elements.countdown.div.style.display = "none";
    BING_AUTOSEARCH.elements.span.silence.style.display = "none";
    BING_AUTOSEARCH.elements.countdown.header.innerText = "Next search in: 00:00";
    BING_AUTOSEARCH.elements.countdown.header_final.innerText = "Completion in: 00:00";
  }
};

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function testPopup() {
  BING_AUTOSEARCH.elements.link.multi_test.innerHTML = "Testing...<br/>Please refrain from any mouse clicks or touch inputs during the test.";
  let timer = 7;
  BING_AUTOSEARCH.elements.link.multi_test.removeEventListener("click", testPopup);
  testInterval = setInterval(() => {
    if(timer >= 0 && timer <= 5) {
      BING_AUTOSEARCH.elements.link.multi_test.innerHTML = "Testing... Pop-up in: " + timer + "<br/>Please refrain from any mouse clicks or touch inputs during the test.";
    }
    if (timer === 0) {
      var popup = window.open("https://rewards.bing.com");
      BING_AUTOSEARCH.elements.link.multi_test.innerHTML = "Test <i class='fa-solid fa-arrow-right'></i>";
      if (popup == null || typeof(popup)=='undefined') {  
        BING_AUTOSEARCH.elements.link.multi_test.innerHTML += "<span class='text-danger'>&nbsp;Failed.<br/>Please check your permissions.</span>";
      } else {
        BING_AUTOSEARCH.elements.link.multi_test.innerHTML += "<span class='text-success'>&nbsp;Success.</span>";
      }
      clearInterval(testInterval);
      BING_AUTOSEARCH.elements.link.multi_test.addEventListener("click", testPopup);
    }
    timer--;
  }, 1000);
}

function getURLParameter(name) {
  var url = window.location;
  let params = new URLSearchParams(url.search);
  if (params.has(name)) {
    return params.get(name).toLowerCase();
  } else  {
    return '';
  }
}

function getAutostartLink() {
  var url = "https://autosearch.tailofleaves.dev?autostart=true";
  url += "&limit=" + BING_AUTOSEARCH.search.limit.toString();
  url += "&interval=" + BING_AUTOSEARCH.search.interval.toString();
  url += "&random=" + BING_AUTOSEARCH.search.random.toString();
  url += "&audio=" + BING_AUTOSEARCH.search.audio.toString();
  url += "&multitab=" + BING_AUTOSEARCH.search.multitab.toString();
  return url;
}

const copyAutostartLink = async () => {
  try {
    const element = document.getElementById("autostart-link");
    await navigator.clipboard.writeText(element.value);
    BING_AUTOSEARCH.elements.button.copy_autostart.setAttribute('data-bs-original-title', 'Copied!');
    bootstrap.Tooltip.getInstance(BING_AUTOSEARCH.elements.button.copy_autostart).show();
  } catch (error) {
    console.error("Failed to copy to clipboard:", error);
  }
};

window.addEventListener("load", () => {
  BING_AUTOSEARCH.load();

  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-ZXTCJY38CG');

  // initialize tooltips
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  })

  //check for limit parameter
  if(!isNaN(parseInt(getURLParameter('limit')))) {
    BING_AUTOSEARCH.localStorage.set("_search_limit", getURLParameter('limit'));
  }
  //check for interval parameter
  if(!isNaN(parseInt(getURLParameter('interval')))) {
    BING_AUTOSEARCH.localStorage.set("_search_interval", getURLParameter('interval'));
  }
  //check for random parameter
  if(getURLParameter('random') !== '') {
    if(getURLParameter('random') === 'true' || getURLParameter('random') === 'false') {
      BING_AUTOSEARCH.localStorage.set("_randomized_intervals", getURLParameter('random'));
    }
  }
  //check for audio parameter
  if(getURLParameter('audio') !== '') {
    if(getURLParameter('audio') === 'true' || getURLParameter('raaudiondom') === 'false') {
      BING_AUTOSEARCH.localStorage.set("_background_audio", getURLParameter('audio'));
    }
  }
  //check for multitab parameter
  if(getURLParameter('multitab') !== '') {
    if(getURLParameter('multitab') === 'true' || getURLParameter('multitab') === 'false') {
      BING_AUTOSEARCH.localStorage.set("_multitab_mode", getURLParameter('multitab'));
    }
  }
  //check for autostart parameter
  if(getURLParameter('autorun') === 'true' || getURLParameter('autostart') === 'true') {
    if (!isNaN(parseInt(getURLParameter('delay')))) {
      setTimeout(() => {
        BING_AUTOSEARCH.elements.button.start.click();
      }, parseInt(getURLParameter('delay')))
    } else {
      BING_AUTOSEARCH.elements.button.start.click();
    }
  }
});