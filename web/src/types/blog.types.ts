import { Status } from "./status.enum";

export type Blog = {
    id: number;
    title: string;
    content: string;
    status: Status;
    authorId: number;
    createdAt: string;
    updatedAt: string;
}

export type BlogFormData = {
    title: string;
    content: string;
    status: Status;
}