const express = require("express");
const cors = require("cors");
const weatherRoutes = require("./routes/weather");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/weather", weatherRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
