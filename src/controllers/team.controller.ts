import type { Request, Response } from "express";
import { type Team } from "../generated/prisma/index.js";
import { PrismaClient } from "../generated/prisma/index.js";
import { logger } from "../config/logger.config.js";

const prisma = new PrismaClient();

export async function listAllTeams(
  _req: Request,
  res: Response<{ message: string; teams?: Team[]; error?: unknown }>
): Promise<void> {

  try {
    const teams = await prisma.team.findMany();

    if (teams.length === 0) {
      res.status(404).json({ "message": "No teams found." });
      return;
    } else {
      res.status(200).json({ "message": "Teams fetched successfully.", teams })
      return
    };
  } catch (error: unknown) {
    logger.error(error);
    res.status(500).json({ "message": "Internal server error.", error });
  }
};

export async function getOneTeam(
  req: Request,
  res: Response<{ message: string; team?: Team; error?: unknown }>
): Promise<void> {

  try {
    const teamId = req.params['id'];

    const team = await prisma.team.findUnique({ where: { id: Number(teamId) } });

    if (team === null) {
      res.status(404).json({ "message": "No team found" });
      return;
    } else {
      res.status(200).json({ "message": "Team fetched successfully", team });
      return;
    }
  } catch (error: unknown) {
    logger.error(error);
    res.status(500).json({ "message": "Internal server error.", error });

  }
}

export async function changeShirtColor(
  req: Request<{ id: number }, object, { "shirtColor": string }>,
  res: Response<{ message: string; team?: Team; error?: unknown }>
): Promise<void> {
  try {
    const id = req.params['id'];
    const { shirtColor } = req.body;

    if (!shirtColor) {
      res.status(400).json({ "message": "Shirt color is required in the request body." });
      return;
    }

    const team = await prisma.team.findFirst({ where: { id: Number(id) } });
    if (!team) {
      res.status(404).json({ "message": "No team found." })
    } else {
      await prisma.team.update({ where: { id: Number(id) }, data: { shirtColor } })

      res.status(200).json({ "message": "Shirt color updated successfully.", team });
      return;
    }
  } catch (error: unknown) {
    logger.error(error);
    res.status(500).json({ "message": "Internal server error.", error });
    return;
  }
}


export async function createTeam(
  req: Request<object, object, Team>,
  res: Response<{ message: string; team?: Team; error?: unknown }>
): Promise<void> {
  try {
    const { teamName, shirtColor } = req.body;
    if (!teamName || !shirtColor) {
      res.status(400).json({ "message": "teamName and shirtColor are required in the request body." });
      return;
    }

    const newTeam = await prisma.team.create({ data: { teamName, shirtColor } });
    res.status(200).json({ "message": "Team created successfully", team: newTeam });
  } catch (error: unknown) {
    logger.error(error);
    res.status(500).json({ "message": "Internal server error.", error });
  }
}
