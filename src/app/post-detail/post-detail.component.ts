import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { ApiService, DetailComment, PostComment } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss'
})
export class PostDetailComponent implements OnInit {
  private api = inject(ApiService)
  private route = inject(ActivatedRoute)
  id?: number
  dataComment?: DetailComment[]
  // // @Output() dataCommentSend: {image:string , comment:DetailComment}[]=EventEmitter
  // pass data in post commponent
  dataComment2:{image:string , comment:DetailComment}[]=[]
  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.id = param["id"]


      this.api.getPostComment(this.id ?? 0, 10, 0).subscribe((item) => {
        console.log(item)
        this.dataComment = item.comments
        item.comments.forEach((commment) => {
          let userId = commment.user.id
          this.api.getUserDetail(userId).subscribe((resUser) => {
            console.log(resUser)
            this.dataComment2.push({image:resUser.image , comment:commment})
          })
        })
      })
    })

  }
  likeClicked(item: DetailComment) {
    item.likes++
  
  }
}
