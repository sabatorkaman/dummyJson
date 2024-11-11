import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AllPostDetails, ApiService, PostDetail, Userinformation } from '../api.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule, FormsModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {
  readonly api = inject(ApiService)
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
    this.api.getPost(this.limit ?? 0, this.skip ?? 0, this.search).subscribe((data) => {
      console.log(data)
      for (let i = 0; i < data.posts.length; i++) {
        this.api.getUserDetail(data.posts[i].userId).subscribe((user) => {
          console.log(user)
          this.postData.push({ post: data.posts[i], user: user })
        })
      }
    })
  }

  clickLike() {
    this.api.getPost(this.limit ?? 0, this.skip ?? 0, this.search)
    //   .subscribe((item)=>{
    //   item.posts.map((item=>{
    //     console.log(item.reactions.likes)
    //     this.like=item.reactions.likes
    //     this.like +=1
    //     console.log(this.like)
    //   }))

    // })
    // this.like+=1
    // console.log(this.like)
  }
  clickFilter() {
    this.skip = -1
    this.postData = []
    this.morPost()
  }
}
