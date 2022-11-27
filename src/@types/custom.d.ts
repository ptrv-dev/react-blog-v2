export interface IGetMeResponse {
  _id: string;
  username: string;
  email: string;
  token: string;
  avatar: string;
}
export interface IAuthor {
  _id: string;
  username: string;
  email: string;
  avatar: string;
}

export interface IComment {
  _id: string;
  author: Author;
  post: string;
  text: string;
  likes: string[];
  dislikes: string[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface IPost {
  _id: string;
  author: Author;
  image: string;
  title: string;
  text: string;
  likes: Map<string, boolean>;
  dislikes: Map<string, boolean>;
  views: number;
  comments: IComment[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
  posts: IPost[];
  comments: IComment[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
