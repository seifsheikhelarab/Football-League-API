import express, { type Request, type Response } from "express";
import {
  changeShirtColor,
  createTeam,
  getOneTeam,
  listAllTeams
} from "./controllers/team.controller.js";
import {
  addNewPlayer,
  changePlayerActivity,
  changePlayerSalary,
  getPlayerById,
  getPlayerByName,
  transferPlayer,
  getPlayersByTeam
} from "./controllers/player.controller.js";

const router = express.Router();

// Team routes
router.route("/teams")
  .get(listAllTeams)
  .post(createTeam);
router.get("/teams/:id", getOneTeam);
router.post("/teams/:id/shirt-color/", changeShirtColor);

// Player routes
router.route("/players")
  .get(getPlayerByName)
  .post(addNewPlayer);

router.get("/players/:id", getPlayerById);
router.post("/players/:id/activity", changePlayerActivity);
router.post("/players/:id/transfer", transferPlayer);
router.post("/players/:id/salary", changePlayerSalary);
router.get("/players/team/:id/", getPlayersByTeam);

router.use((_req: Request, res: Response) => {
  res.status(404).json({ "message": "Route not found" })
});

export default router;