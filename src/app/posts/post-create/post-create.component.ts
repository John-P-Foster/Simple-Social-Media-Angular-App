import { Component } from "@angular/core";
import { Post } from "../post.model";
import { NgForm } from "@angular/forms";
import { PostsService } from "../post.service";

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})


export class PostCreateComponent {
 
    enteredContent = '';
    enteredTitle = '';

    onAddPost(form: NgForm){
        if (form.invalid){
            return;
        }
        const post: Post = {id: '', title: form.value.title, content: form.value.content};
        this.postService.addPost(post)
        form.resetForm();
    }

    constructor(public postService: PostsService){};
}