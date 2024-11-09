import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AllPostDetails, ApiService, PostDetail } from '../api.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {
  readonly api = inject(ApiService)
  postData?: AllPostDetails
  limit=1
  skip?: number
  avator?: string
  like=20

  ngOnInit(): void {
    this.api.getPost(this.limit, this.skip ?? 0).subscribe((data) => {
      console.log(data)
      this.postData = data
    })
    this.api.getAllUser(this.limit ?? 0, this.skip ?? 0, "").subscribe((users) => {
      console.log(users)
      users.users.map((item) => {
        this.avator = item.image
      })
    })
  
  }
  morPost(){
      console.log(this.limit)
      this.limit+=1
      console.log(this.limit)
      this.api.getPost(this.limit??0, this.skip??0).subscribe((data) => {
        console.log(data)
        this.postData = data
      })
  }
  clickLike(){
    // this.api.getPost(this.limit ?? 0 ,this.skip ?? 0 ).subscribe((item)=>{
    //   item.posts.map((item=>{
    //     console.log(item.reactions.likes)
    //     this.like=item.reactions.likes
    //     this.like +=1
    //     console.log(this.like)
    //   }))
    // })
    // this.postData?.posts.map((item)=>{
    //   console.log(item.reactions.likes + 1) 
    // })

      this.api.getPost(this.limit ?? 0 ,this.skip ?? 0 ).subscribe((item)=>{
      // item.posts.map((item=>{
      //   console.log(item.reactions.likes)
      //   this.like=item.reactions.likes
      //   this.like +=1
      //   console.log(this.like+=1)
      // }))
    })
    this.like+=1
    console.log(this.like)
  }
}
