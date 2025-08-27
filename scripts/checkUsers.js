const mongoose = require("mongoose");
const User = require("../models/User");

// Connect to MongoDB
mongoose
  .connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/ecommerce-admin"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

async function checkUsers() {
  try {
    const users = await User.find({}).select("-password");
    console.log("Existing users:");
    console.log(JSON.stringify(users, null, 2));

    const adminUsers = await User.find({ role: "admin" }).select("-password");
    console.log("\nAdmin users:");
    console.log(JSON.stringify(adminUsers, null, 2));
  } catch (error) {
    console.error("Error:", error);
  } finally {
    mongoose.connection.close();
  }
}

checkUsers();
