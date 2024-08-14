import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription} from 'rxjs'

import { Post } from "../post.model";
import { PostsService } from "../post.service";


@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy{
    posts: Post[] = [];
    isVisible = true;
    private postsSub!: Subscription;
   
    constructor(public postsServices: PostsService){}


    ngOnInit() {
        this.postsServices.getPosts();
        this.postsSub = this.postsServices.getPostUpdateListener()
          .subscribe((posts: Post[]) => {
            this.posts = posts;
          });
        this.postsServices.firstCall();
      }

      onDelete(postId: string){
        this.postsServices.deletePost(postId);
      }

    ngOnDestroy(){
        this.postsSub.unsubscribe();
    }
    
}

