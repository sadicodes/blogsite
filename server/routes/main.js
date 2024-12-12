const express = require("express");
const router = express.Router();
const Post = require("../models/post");

/** Get Home */
router.get("/", async (req, res) => {
  const locals = {
    title: "Blog",
    description: "Simple Blog Website",
  };

  // Fetch posts from the database and pass them to the view
  try {
    const posts = await Post.find({});
    res.render("index", { locals, posts }); // Pass posts to the template
  } catch (error) {
    console.error(`Error fetching posts: ${error.message}`);
    res.status(500).send("Server Error");
  }
});

router.get("/about", (req, res) => {
  const locals = {
    title: "About Us",
    description: "Learn more about our blog.",
  };
  res.render("about", { locals });
});

module.exports = router;

// Function to insert initial post data
async function insertPostData() {
  try {
    // Check if posts already exist
    const existingPosts = await Post.countDocuments({});
    if (existingPosts > 0) {
      console.log("Posts already exist. Skipping insertion.");
      return; // If posts already exist, don't insert again
    }

    // Insert initial post data if no posts exist
    await Post.insertMany([
      {
        title: "Building a Blog",
        body: "This is the body text",
      },
      {
        title: "2nd Blog Post",
        body: "This is the body text",
      },
      {
        title: "3rd Blog Post",
        body: "This is the body text",
      },
      {
        title: "4th Blog Post",
        body: "This is the body text",
      },
    ]);
    console.log("Post data inserted successfully!");
  } catch (error) {
    console.error(`Error inserting post data: ${error.message}`);
  }
}

// Call insertPostData once, preferably outside your main server logic
// Only call this function during development or initial database setup
// Uncomment below line only when necessary, e.g., when seeding the database initially
// insertPostData();
