import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library.js";

type PrismaType = PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>

export const getAllProfiles = async (prisma: PrismaType) => {
  const posts = await prisma.profile.findMany();
  return posts;
};

export const getProfile = async (prisma: PrismaType, id: string) => {
  const post = await prisma.profile.findUnique({where: { id },});
  return post;
}
 