const { Client } = require("pg");

// PostgreSQL connection setup
const client = new Client({
  user: "stefanland", // Replace with your PostgreSQL username
  host: "localhost", // Database host
  database: "members", // Database name
  password: "pass", // Replace with your PostgreSQL password
  port: 5432, // Default PostgreSQL port
});

async function populateMessages() {
  try {
    await client.connect();

    // Create the messages table if it doesn't already exist
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        title VARCHAR(255) NOT NULL,
        timestamp TIMESTAMPTZ NOT NULL,
        message_content VARCHAR(280) NOT NULL
      );
    `;

    await client.query(createTableQuery);

    // Generate 15 mock Twitter-like messages
    const titles = [
      "Morning Motivation 🌞",
      "Tech News 🚀",
      "Food for Thought 💭",
      "Daily Fitness Tips 💪",
      "Current Mood 🎧",
      "Random Fact 🧠",
      "Weekend Plans 🎉",
      "Book Recommendation 📚",
      "Productivity Hacks ⏰",
      "Self-Care Reminder 💆",
      "Travel Dreams ✈️",
      "Life Update 🌱",
      "Creative Spark 💡",
      "Positive Vibes Only ✨",
      "Tech Talk 💻",
    ];

    const messages = [
      "Start your day with a goal in mind. Every action counts! 💯 #Motivation #DailyGrind",
      "New advancements in AI are transforming industries. Stay ahead of the curve! 🚀💡 #TechNews #Innovation",
      "The greatest ideas often come in moments of silence. Take time to reflect. 💭 #Mindfulness #Growth",
      "Consistency is key! Make small, daily changes to see big results. 💪 #FitnessGoals #HealthyLiving",
      "In a chill mood, listening to some lo-fi beats. What’s on your playlist today? 🎧 #MusicMood #Relaxation",
      "Did you know? Honey never spoils. You can eat 3,000-year-old honey! 🧠 #RandomFact #Trivia",
      "Looking forward to a weekend full of rest and good vibes. What’s on your agenda? 🎉 #WeekendVibes #Unwind",
      "Just finished reading ‘Deep Work’ by Cal Newport. Highly recommend! 📚 #BookClub #Focus",
      "Breaking tasks into smaller chunks is the secret to staying productive all day. ⏰ #ProductivityHacks #Efficiency",
      "You are worthy of rest and relaxation. Take care of yourself. 💆 #SelfCare #MentalHealth",
      "Daydreaming about my next travel adventure. Where would you go if you could fly anywhere? ✈️ #TravelGoals #Wanderlust",
      "Life is all about evolving and growing. What’s one thing you've learned this week? 🌱 #PersonalGrowth #LifeLessons",
      "Feeling a surge of creativity today! Can’t wait to see what ideas come to life. 💡 #CreativeMind #Inspiration",
      "Good vibes only! Surround yourself with positivity and watch how your energy changes. ✨ #Positivity #GoodVibes",
      "Blockchain, quantum computing, and AI… the future is now! What tech excites you most? 💻 #TechTalk #FutureTech",
    ];

    // Insert mock data into the messages table
    for (let i = 0; i < 15; i++) {
      const query = `
        INSERT INTO messages (user_id, title, timestamp, message_content)
        VALUES ($1, $2, $3, $4)
      `;

      const values = [
        Math.floor(Math.random() * 10) + 1,
        titles[i], // Random user_id between 1 and 10
        new Date().toISOString(), // Current timestamp
        messages[i], // Message content
      ];

      await client.query(query, values);
    }

    console.log("15 messages successfully inserted into the messages table.");
  } catch (err) {
    console.error("Error executing query", err.stack);
  } finally {
    await client.end();
  }
}

// Call the function to populate the table
populateMessages();
