import { Review } from "@prisma/client";
import { MemberDetailsRepoDto } from "./member-types";

export type ReviewCreateRepoDto = Omit<Review, "id" | "postedAt">;

export type ReviewDetailsRepoDto = Review
    & { member: MemberDetailsRepoDto };

export type ReviewCreateServiceDto = Omit<Review, "id" | "postedAt">;