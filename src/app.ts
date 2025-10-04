import express from "express";
import router from "./router.js";
import { logger, loggerSetup } from "./config/logger.config.js";
import swaggerSetup from "./config/swagger.config.js";


const app = express();

loggerSetup(app);
swaggerSetup(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

const PORT = process.env["PORT"] || 4221;
app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});