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
    const player = await prisma.player.findFirst({ where: { id: Number(id) } });
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

export async function addNewPlayer(
  req: Request<object, object, Player>,
  res: Response<{ message: string; player?: Player; error?: unknown }>
): Promise<void> {
  try {
    const { playerName, playerSalary, teamId } = req.body;
    const newPlayer = await prisma.player.create({
      data: {
        playerName,
        playerSalary,
        teamId
      }
    });
    res.status(200).json({ "message": "Player added successfully", player: newPlayer });
  } catch (error: unknown) {
    logger.error(error);
    res.status(500).json({ "message": "Internal server error.", error });
    return;
  }
}

export async function changePlayerActivity(
  req: Request<{ id: number }, object, { isActive: boolean }>,
  res: Response<{ message: string; player?: Player; error?: unknown }>
): Promise<void> {
  try {
    const id = req.params['id'];
    const { isActive } = req.body;
    const player = await prisma.player.findFirst({ where: { id: Number(id) } });
    if (!player) {
      res.status(404).json({ "message": "No player found" });
      return;
    }
    await prisma.player.update({ where: { id: Number(id) }, data: { isActive } });
    res.status(200).json({ "message": "Player activity updated successfully", player });
  } catch (error: unknown) {
    logger.error(error);
    res.status(500).json({ "message": "Internal server error.", error });
    return;
  }
}

export async function transferPlayer(
  req: Request<{ id: number }, object, { teamId: number }>,
  res: Response<{ message: string; player?: Player; error?: unknown }>
): Promise<void> {
  try {
    const id = req.params['id'];
    const { teamId } = req.body;
    const player = await prisma.player.findFirst({ where: { id: Number(id) } });
    if (!player) {
      res.status(404).json({ "message": "No player found" });
      return;
    }
    await prisma.player.update({ where: { id: Number(id) }, data: { teamId: Number(teamId) } });
    res.status(200).json({ "message": "Player transferred successfully", player });
  } catch (error: unknown) {
    logger.error(error);
    res.status(500).json({ "message": "Internal server error.", error });
    return;
  }
}

export async function changePlayerSalary(
  req: Request<{ id: number }, object, { playerSalary: number }>,
  res: Response<{ message: string; player?: Player; error?: unknown }>
): Promise<void> {
  try {
    const id = req.params['id'];
    const { playerSalary } = req.body;
    const player = await prisma.player.findFirst({ where: { id: Number(id) } });
    if (!player) {
      res.status(404).json({ "message": "No player found" });
      return;
    }
    await prisma.player.update({ where: { id: Number(id) }, data: { playerSalary } });
    res.status(200).json({ "message": "Player salary updated successfully", player });
  } catch (error: unknown) {
    logger.error(error);
    res.status(500).json({ "message": "Internal server error.", error });
    return;
  }
}

export async function getPlayersByTeam(
  req: Request<{ id: string }, object, object>,
  res: Response<{ message: string; players?: object; error?: unknown }>
): Promise<void> {
  try {
    const id = req.params["id"];

    const players = await prisma.player.findMany({ where: { teamId: Number(id) } });

    if (players.length === 0) {
      res.status(404).json({ "message": "No players found" });
      return;
    } else {
      res.status(200).json({ "message": "Players retrieved successfully", players });
      return;
    }

  } catch (error: unknown) {
    logger.error(error);
    res.status(500).json({ "message": "Internal server error.", error });
  }
}
