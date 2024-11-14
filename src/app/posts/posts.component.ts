import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PostDetailComponent } from "../post-detail/post-detail.component";
import { PostCardComponent } from '../post-card/post-card.component';
import { AllPostDetails, PostApiService, PostDetail } from '../post-api.service';
import {  Userinformation, userService } from '../userService.service';


@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [PostCardComponent, MatCardModule, MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule, FormsModule, RouterLink, PostDetailComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements OnInit {
  private postApi = inject(PostApiService)
  private UserApi = inject(userService)

  postData: { post: PostDetail, user: Userinformation }[] = []
  limit = 3
  skip = -1
  like?: number
  getLike?: AllPostDetails
  search = ""
  ngOnInit(): void {
    this.morPost()
  }

  morPost() {
    this.skip += 1
    this.postApi.getPost(this.limit ?? 0, this.skip ?? 0, this.search).subscribe((data) => {
      console.log(data)
      for (let i = 0; i < data.posts.length; i++) {
        this.UserApi.getUserDetail(data.posts[i].userId).subscribe((user) => {
          console.log(user)
          this.postData.push({ post: data.posts[i], user: user })
        })
      }
    })
  }

  clickFilter() {
    this.skip = -1
    this.postData = []
    this.morPost()
  }
}
