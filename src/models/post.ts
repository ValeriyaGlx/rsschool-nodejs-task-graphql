import { Post } from "@prisma/client";
import { PrismaType } from "../routes/graphql/types/prisma.js";


export const getAllPosts = async (prisma: PrismaType) => {
  const posts = await prisma.post.findMany();
  return posts;
};

export const getPost = async (prisma: PrismaType, id: string) => {
  const post = await prisma.post.findUnique({where: { id },});
  return post;
};

export const createPost =  async (prisma: PrismaType, dto: Post) => {
  const post = await prisma.post.create({ data: dto });
  return post;
};

export const deletePost = async (prisma: PrismaType, id: string) => {
  await prisma.post.delete({ where: {id}});

  return null;
};

export const updatePost = async (prisma: PrismaType, dto: Post, id: string) => {
  const user = await prisma.post.update({
    where: { id },
    data: dto,
  });

  return user;
}
 