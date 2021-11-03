import { Post } from "./post.model";

export class User {
    userId: number | any;
    posts: Array<Post> = [];
    liked: boolean = false;
    likes: number = 0;
    shares: number = 0;
    comments: Array<Comment> = [];
    details: Array<any> = [];
}
