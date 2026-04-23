const bcrypt = require("bcryptjs");
const User = require("../models/User");

const seedAdmin = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminName = process.env.ADMIN_NAME || "Admin";

    if (!adminEmail || !adminPassword) {
      console.log("Admin credentials not found in .env");
      return;
    }

    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log("Default admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await User.create({
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
      role: "admin"
    });

    console.log("Default admin created successfully");
  } catch (error) {
    console.log("Admin seed skipped:", error.message);
  }
};

module.exports = seedAdmin;