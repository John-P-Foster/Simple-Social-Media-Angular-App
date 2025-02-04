import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Post, ServerPost } from "./post.model";
import { Subject } from "rxjs";
import {map} from "rxjs/operators"



@Injectable({providedIn: 'root'})

export class PostsService{
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();

    constructor(private http: HttpClient){}

    getPosts(){
        /*Sending the http request*/
        this.http.get<{message: string, posts: ServerPost[]}>('http://localhost:3000/api/posts')
        .pipe(map((postData)=>{
            return postData.posts.map(post => {
                return{
                    title: post.title,
                    content: post.content,
                    id: post._id
                }
            })
        }))
        .subscribe((transformedPosts)=>{
            this.posts = transformedPosts;
            this.postsUpdated.next([...this.posts]);
        });
        
    }

    getPostUpdateListener(){
        return this.postsUpdated.asObservable();
    }

    addPost(post: Post) {
        this.http.post<{message: string, postId: string}>('http://localhost:3000/api/posts', post)
        .subscribe((responseData)=> {
            console.log(responseData.message);
            const id = responseData.postId;
            post.id = id; 
            this.posts.push(post);
            this.postsUpdated.next([...this.posts]);
        })
    }

    deletePost(postId: string){
        this.http.delete('http://localhost:3000/api/posts/' + postId)
        .subscribe(()=>{
            const updatedPosts = this.posts.filter(post => post.id !== postId);
            this.posts = updatedPosts;
            this.postsUpdated.next([...this.posts]);
            console.log("Deleted!");
        });
    }

    firstCall(){
        this.postsUpdated.next([...this.posts]);
    }

}