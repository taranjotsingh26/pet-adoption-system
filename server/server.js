require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/config/db");
const seedAdmin = require("./src/utils/seedAdmin");

const PORT = process.env.PORT || 5001;

const startServer = async () => {
  try {
    await connectDB();
    await seedAdmin();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();