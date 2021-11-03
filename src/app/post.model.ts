import { User } from "./user.model";

export class Post {
    postId: number | any;
    user: User | any;
    liked: boolean = false;
    likes: number = 0;
    shares: number = 0;
    comments: Array<Comment> = [];
}
