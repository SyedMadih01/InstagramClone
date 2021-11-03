import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-share-post',
  templateUrl: './share-post.component.html',
  styleUrls: ['./share-post.component.css']
})
export class SharePostComponent implements OnInit {
  @Input() post: Post | any;
  @Input() user: any;
  @ViewChild('exampleModal') modal: ElementRef | any;

  public fbUrl: any;
  public twUrl: any;
  public pinUrl: any;

  constructor(
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.fbUrl = 'https://www.facebook.com/sharer/sharer.php?u='+window.location.origin+
    "/post/"+this.post.postId+"/user/"+this.user.userId;
    this.twUrl = 'http://twitter.com/share?url='+window.location.origin+
    "/post/"+this.post.postId+"/user/"+this.user.userId;
    this.pinUrl = 'http://pinterest.com/pin/create/button/?url='+window.location.origin+
    "/post/"+this.post.postId+"/user/"+this.user.userId;
  }

}
