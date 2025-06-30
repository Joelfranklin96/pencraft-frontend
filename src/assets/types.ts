export type BlogCardType = {
    id: string,
    authorId: string,
    authorName: string,
    date: string,
    title: string,
    content: string
}

export type Blog = {
    id: string,
    authorId: string,
    author: {name: string, id: string},
    date: string,
    title: string,
    content: string
}

export type BlogCardResponse = Blog[];

export type HomeType = {
    authorName: string;
    date: string;
    title: string;
    content: string;
}

export type UserType = {
    id: string,
    email: string,
    name: string,
    password: string
}