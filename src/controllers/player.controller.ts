import type { Request, Response } from "express";
import { PrismaClient, type Player } from "../generated/prisma/index.js";
import { logger } from "../config/logger.config.js";

const prisma = new PrismaClient();

export async function getPlayerById(
  req: Request<{ id: number }>,
  res: Response<{ message: string; player?: Player; error?: unknown }>
): Promise<void> {
  try {
    const id = req.params['id'];
    const player = await prisma.player.findFirst({ where: { id } });
    if (!player) {
      res.status(404).json({ "message": "No player found" })
      return;
    }
  } catch (error: unknown) {
    logger.error(error);
    res.status(500).json({ "message": "Internal server error.", error });
    return;
  }
}

export async function getPlayerByName(
  req: Request<{ playerName: string }>,
  res: Response<{ message: string; player?: Player; error?: unknown }>
): Promise<void> {
  try {

    const playerName = req.params['playerName'];
    const player = await prisma.player.findFirst({ where: { playerName } });
    if (!player) {
      res.status(404).json({ "message": "No player found" })
      return;
    }
    res.status(200).json({ "message": "Player fetched successfully", player });

  } catch (error: unknown) {
    logger.error(error);
    res.status(500).json({ "message": "Internal server error.", error });
    return;
  }
}