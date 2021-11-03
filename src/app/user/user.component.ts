import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { User } from '../user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public userId: any;
  public user: User | any;
  public posts: Array<Post> | any = [];

  constructor(
    public postService: PostService,
    public route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
    });
    this.getUserDetails();
  }

  async getUserDetails():Promise<any> {
    let response = await this.postService.getUser(this.userId);
    this.user = response.results[0];

    // generating random user posts
    for(let j = 1 ; j <= 10 ; j++) {
      let post = new Post();
      post.postId = parseInt(""+this.userId+j);
      post.user = this.user;
      this.posts.push(post);
    }
  }
}
