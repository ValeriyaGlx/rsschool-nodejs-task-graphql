import { MemberTypeId } from "../../member-types/schemas.js";

export type createPostInput = {
  title: string;
  content: string;
  authorId: string;
}

export type createProfileInput = {
  isMale: boolean;
  yearOfBirth: number;
  memberTypeId: MemberTypeId;
  userId: string;
}

export type createUserInput = {
  name: string;
  balance: number;
}
