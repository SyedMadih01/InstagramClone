import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-component',
  templateUrl: './post-component.component.html',
  styleUrls: ['./post-component.component.css']
})
export class PostComponentComponent implements OnInit {
  @Input() user: any;
  @Input() post: Post | any;
  @Output() postChange = new EventEmitter<Post>();
  @Output() showModal = new EventEmitter<Post>();

  constructor() { }

  ngOnInit(): void {
  }

  likePost(): any {
    if(this.post.liked){
      --this.post.likes;
      this.post.liked = false;
      this.postChange.emit(this.post);
    } else {
      this.post.likes++;
      this.post.liked = true;
    }
  }

  showSocialPopup() {
    this.showModal.emit(this.post);
  }

}
