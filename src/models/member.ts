import { PrismaType } from "../routes/graphql/types/prisma.js";


export const getAllMembers = async (prisma: PrismaType) => {
  const members = await prisma.memberType.findMany();
  return members;
};

export const getMember = async (prisma: PrismaType, id: string) => {
  const member = await prisma.memberType.findUnique({where: { id },});
  return member;
}
 