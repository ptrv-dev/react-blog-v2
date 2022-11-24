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

export interface IPost {
  _id: string;
  author: Author;
  image: string;
  title: string;
  text: string;
  likes: string[];
  dislikes: string[];
  views: number;
  comments: string[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
