import mongoose from "mongoose";
import { users, posts, userIds } from "./data/index.js";

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://prasanna09112001:vVITVrqzrJbwnVcl@prasanna0911.ohnd3.mongodb.net/?retryWrites=true&w=majority&appName=Prasanna0911",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Define User Schema
const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  picturePath: String,
  friends: [mongoose.Schema.Types.ObjectId],
  location: String,
  occupation: String,
  viewedProfile: Number,
  impressions: Number,
  createdAt: Number,
  updatedAt: Number,
  __v: Number,
});

// Define Post Schema
const postSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: mongoose.Schema.Types.ObjectId,
  firstName: String,
  lastName: String,
  location: String,
  description: String,
  picturePath: String,
  userPicturePath: String,
  likes: Map,
  comments: [String],
});

// Create Models
const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

// Insert Users and Posts
const insertData = async () => {
  try {
    await User.insertMany(users);
    await Post.insertMany(posts);
    console.log("Data successfully inserted!");
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    mongoose.connection.close(); // Close the connection after the operation
  }
};

// Call the insert function
insertData();
