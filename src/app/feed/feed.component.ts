import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { User } from '../user.model';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  public users: Array<Post> | any = [];
  public isLoading: boolean = true;
  public loadingMore = false;
  public userCounter = 1;
  public postsPerLoad = 7;
  public selectedPostId = null;   
  public selectedPost: Post | any;
  public selectedUser: User | any;

  constructor(private postService: PostService) {
    this.isLoading = true;
    this.getUsers();
  }
  async getUsers():Promise<any>{
    let postCounter = this.postsPerLoad + this.userCounter;
    for(let i = this.userCounter; i<= postCounter; i++){
      // getting user details
      let response = await this.postService.getUser(this.userCounter++);
      let user = new User();
      user.userId = i;
      user.details = response.results[0];

      // creating user posts and assigning to the user
      let userPosts = [];
      for(let j = 1 ; j <= 10 ; j++) {
        let post = new Post();
        post.postId = parseInt(""+i+j);
        post.user = user;
        userPosts.push(post);
      }
      user.posts = userPosts;
      this.users.push(user);
    }
    this.isLoading = false;
  }

  async onScrollingFinished() {
    this.loadingMore = true;
    await this.getUsers();
    this.loadingMore = false;
  }

  ngOnInit(): void {
  }

  showModal (event: any) {
    this.selectedPost = event;
    this.selectedUser = event.user;
    this.selectedPostId = event.postId;
  }

}
