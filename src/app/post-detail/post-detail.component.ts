import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  public user: any;
  public userId: any;
  public seed: any;
  public comments: Array<any> = [];
  commentForm: FormGroup | any;
  public post: Post = new Post();

  constructor(
    public postService: PostService,
    public route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.seed = params['id'];
      this.userId = params['uid'];
    });
    console.log(this.userId + " " + this.seed);
    this.getUserDetails();
    this.commentForm = this.formBuilder.group({
      comment: new FormControl(null,Validators.required),
      userId: new FormControl(this.seed,Validators.required),
      postId: new FormControl(this.seed, Validators.required)
    });
  }

  async getUserDetails():Promise<any> {
    let response = await this.postService.getUser(this.seed);
    this.user = response.results[0];
    this.post.postId = this.seed;
    this.post.user = this.user;
  }

  addComment(): any {
    if(this.commentForm.valid){
      this.comments.push({userId:this.seed,postId:this.seed,message:this.commentForm.value['comment']});
      let control: AbstractControl;
      this.commentForm.reset();
      this.commentForm.markAsUntouched();
    Object.keys(this.commentForm.controls).forEach((name) => {
      control = this.commentForm.controls[name];
      control.setErrors(null);
    });
    }
  }

  likePost(): any {
    if(this.post.liked){
      --this.post.likes;
      this.post.liked = false;
    } else {
      this.post.likes++;
      this.post.liked = true;
    }
  }

}
