import { User } from "@prisma/client";
import { PrismaType } from "../routes/graphql/types/prisma.js";


export const getAllUsers = async (prisma: PrismaType) => {
  const users = await prisma.user.findMany();
  return users;
};

export const getUser = async (prisma: PrismaType, id: string) => {
  const user = await prisma.user.findUnique({where: { id },});
  return user;
};

export const createUser = async (prisma: PrismaType, dto: User) => {
  const user = await prisma.user.create({ data: dto });
  return user;
};

export const deleteUser = async (prisma: PrismaType, id: string) => {
  await prisma.user.delete({ where: {id}});

  return null;
};

export const updateUser = async (prisma: PrismaType, dto: User, id: string) => {
  const user = await prisma.user.update({
    where: { id },
    data: dto,
  });

  return user;
}
