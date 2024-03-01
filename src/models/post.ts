import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library.js";

type PrismaType = PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>

export const getAllPosts = async (prisma: PrismaType) => {
  const posts = await prisma.post.findMany();
  return posts;
};

export const getPost = async (prisma: PrismaType, id: string) => {
  const post = await prisma.post.findUnique({where: { id },});
  return post;
}
 