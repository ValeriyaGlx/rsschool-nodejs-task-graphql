import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library.js";

type PrismaType = PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>

export const getAllUsers = async (prisma: PrismaType) => {
  const users = await prisma.user.findMany();
  return users;
};

export const getUser = async (prisma: PrismaType, id: string) => {
  const user = await prisma.user.findUnique({where: { id },});
  return user;
}
