import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library.js";

type PrismaType = PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>

export const getAllMembers = async (prisma: PrismaType) => {
  const members = await prisma.memberType.findMany();
  return members;
};

export const getMember = async (prisma: PrismaType, id: string) => {
  const member = await prisma.memberType.findUnique({where: { id },});
  return member;
}
 