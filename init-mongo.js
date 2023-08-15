// Function to generate an array of posts for a user
function generatePostsForUser(userId, postDates, userName) {
  let posts = [];

  for (let [index, date] of postDates.entries()) {
    posts.push({
      title: "Post Title of " + userName,
      message: "This is a sample post message",
      date: date,
      user: new ObjectId(userId)
    });
  }

  return posts;
}

// Define 5 sample dates
const dates = [
  new Date(2023, 7, 14),
  new Date(2023, 7, 15),
  new Date(2023, 7, 16),
  new Date(2023, 7, 17),
  new Date(2023, 7, 18)
];

// Define 3 sample users
const users = [
  { name: "Luis García", email: "luis@example.com", password: "$2b$10$hR1/3ctlk2O8uS6a5e/4Pe74ncHHp1.x96DQZek0KBPHiWIkpa3Ke" },
  { name: "Sofía Rodríguez", email: "sofia@example.com", password: "$2b$10$hR1/3ctlk2O8uS6a5e/4Pe74ncHHp1.x96DQZek0KBPHiWIkpa3Ke" },
  { name: "Diego Morales", email: "diego@example.com", password: "$2b$10$hR1/3ctlk2O8uS6a5e/4Pe74ncHHp1.x96DQZek0KBPHiWIkpa3Ke" },
];

// Insert users
let userInsertResult = db.users.insertMany(users);

// For each inserted user, generate and insert posts
let allPosts = [];

for (let i = 0; i < Object.keys(userInsertResult.insertedIds).length; i++) {
  let userId = userInsertResult.insertedIds[i];
  const posts = generatePostsForUser(userId, dates, users[i].name);
  allPosts.push(...posts);
}

db.posts.insertMany(allPosts);
