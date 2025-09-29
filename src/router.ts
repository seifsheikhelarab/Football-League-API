import express from "express";
import { listAllPlayers } from "./controllers/player.controller.js";
import {
  changeShirtColor,
  getOneTeam,
  getPlayersByTeam,
  listAllTeams
} from "./controllers/team.controller.js";

const router = express.Router();

router.route("/players")
  .get(listAllPlayers);

router.get("/teams", listAllTeams);
router.route("/teams/:id")
  .get(getOneTeam)
  .post(changeShirtColor);
router.get("/teams/:id/players", getPlayersByTeam);

export default router;