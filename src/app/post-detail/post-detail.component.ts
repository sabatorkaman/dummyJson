import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
// import { ApiService, DetailComment, PostComment, PostDetail, Userinformation, userService } from '../userService.service';

import { ActivatedRoute } from '@angular/router';
import { MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PostCardComponent } from "../post-card/post-card.component";
import { DetailComment, PostApiService, PostDetail } from '../post-api.service';
import { Userinformation, userService } from '../userService.service';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [MatIconModule, PostCardComponent],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss'
})
export class PostDetailComponent implements OnInit {
  private userApi = inject(userService)
  private postApi = inject(PostApiService)

  private route = inject(ActivatedRoute)
  id?: number
  dataComment?: DetailComment[]
  dataComment2: { image: string, comment: DetailComment }[] = []
  newPostDetail?: PostDetail
  postId?: number
  getUser?: Userinformation
  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.id = param["id"]
      this.postApi.getPostComment(this.id ?? 0, 10, 0).subscribe((item) => {
        this.dataComment = item.comments
        item.comments.forEach((commment) => {
          let userId = commment.user.id
          this.userApi.getUserDetail(userId).subscribe((resUser) => {
            this.dataComment2.push({ image: resUser.image, comment: commment })
          })
        })
      })
      this.postApi.getPostDetail(this.id ?? 0).subscribe((itemPost) => {
        console.log(itemPost)
        this.newPostDetail = itemPost
        this.userApi.getUserDetail(itemPost.userId).subscribe((userDetail) => {
          this.getUser = userDetail
        })
      })

    })
  }
  likeClicked(item: DetailComment) {
    item.likes++

  }
}
