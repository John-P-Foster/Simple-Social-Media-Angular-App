import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http'
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input'
import {MatButtonModule} from '@angular/material/button'
import {MatCardModule} from '@angular/material/card'
import{MatToolbarModule} from '@angular/material/toolbar'
import{MatExpansionModule} from '@angular/material/expansion'
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { HeaderComponent } from './header/header.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostsService } from './posts/post.service';


@NgModule({
  declarations: 
  [
    PostCreateComponent, 
    HeaderComponent, 
    PostListComponent
  ],
  imports: 
  [
    AppComponent,
    CommonModule, 
    FormsModule, 
    MatInputModule, 
    MatCardModule, 
    MatButtonModule, 
    MatToolbarModule, 
    MatExpansionModule,
    HttpClientModule
  ],
  providers:[PostsService],
  exports: [PostCreateComponent, HeaderComponent, PostListComponent]
})
export class AppModule { }