export interface IPost {
  id: number;
  title: string;
  body: string;  
  tagList: string[];
  description: string;
  author: IAuthor;
}

export interface IPosts {
  articles: IPost[];
  articlesCount: number;  
}

export interface IAuthor{
  id: number;
  email: string;
  username: string;
}