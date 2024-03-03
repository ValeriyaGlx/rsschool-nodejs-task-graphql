import { Profile } from "@prisma/client";
import { PrismaType } from "../routes/graphql/types/prisma.js";

export const getAllProfiles = async (prisma: PrismaType) => {
  const profiles = await prisma.profile.findMany();
  return profiles;
};

export const getProfile = async (prisma: PrismaType, id: string) => {
  const profile = await prisma.profile.findUnique({where: { id },});
  return profile;
};

export const createProfile = async (prisma: PrismaType, dto: Profile) => {
  const post = await prisma.profile.create({ data: dto });
  return post;
};

export const deleteProfile = async (prisma: PrismaType, id: string) => {
  await prisma.profile.delete({ where: {id}});

  return null;
};

 