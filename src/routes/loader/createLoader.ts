import DataLoader from 'dataloader';
import { PrismaType } from '../graphql/types/prisma.js';
import { MemberType, Post, Profile, User } from '@prisma/client';


const createLoader = {
  getUserPosts: (prisma: PrismaType) => {
    return new DataLoader<string, Post[]>(
      async (ids: readonly string[] ) => {
        const posts = await prisma.post.findMany({
          where: {
            authorId: { in: ids as string[] },
          },
        });
  
        return ids.map((id) => posts.filter((post) => post.authorId === id));
      },
    )
  },
  getUserProfiles: (prisma: PrismaType) => {
    return new DataLoader<string, Profile[]>(
      async (ids: readonly string[] ) => {
        const profiles = await prisma.profile.findMany({
          where: {
            userId: { in: ids as string[] },
          },
        });
  
        return ids.map((id) => profiles.filter((profile) => profile.userId === id));
      },
    )
  },
  getProfileMemberType: (prisma: PrismaType) => {
    return new DataLoader<string, MemberType[]>(
      async (ids: readonly string[] ) => {
        const members = await prisma.memberType.findMany({
          where: {
            id: { in: ids as string[] },
          },
        });
  
        return ids.map((id) => members.filter((member) => member.id === id));
      },
    )
  },
  getUserSubscription: (prisma: PrismaType) => {
    return new DataLoader<string, User[]>(
      async (ids: readonly string[]) => {
        const users = await prisma.user.findMany({
          where: {
            subscribedToUser: {
              some: {
                subscriberId: { in: ids as string[] },
              },
            },
          },
          include: {
            subscribedToUser: true,
          },
        });
  
        return ids.map((id) =>
          users.filter((user) =>
            user.subscribedToUser.some((sub) => sub.subscriberId === id),
          ),
        );
      },
    );
  },
  getUserSubscribers: (prisma: PrismaType) => {
    return new DataLoader<string, User[]>(
      async (ids: readonly string[]) => {
        const users = await prisma.user.findMany({
          where: {
            userSubscribedTo: {
              some: {
                authorId: { in: ids as string[] },
              },
            },
          },
          include: {
            userSubscribedTo: true,
          },
        });
  
        return ids.map((id) =>
          users.filter((user) => user.userSubscribedTo.some((sub) => sub.authorId === id)),
        );
      },
    );
  }
};

const {getUserProfiles, getUserPosts, getProfileMemberType, getUserSubscribers, getUserSubscription} = createLoader;


export const loader = (prisma: PrismaType) => ({
userProfiles: getUserProfiles(prisma),
userPosts: getUserPosts(prisma),
profileMemberType: getProfileMemberType(prisma),
userSubscribers: getUserSubscribers(prisma),
userSubscription: getUserSubscription(prisma),
});
