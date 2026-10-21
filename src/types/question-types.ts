import { Question } from "@prisma/client";
import { MemberRepoDto } from "./member-types";

export type QuestionCreateRepoDto = Omit<Question, "id" | "postedAt">;

export type QuestionDetailsRepoDto = Question
    & { member: MemberRepoDto };

export type QuestionCreateServiceDto = Omit<Question, "id" | "postedAt"> & { mentionedUsernames: string[] };