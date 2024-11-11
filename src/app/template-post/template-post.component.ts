import { Component, Input, OnInit } from '@angular/core';
import { DetailComment, PostDetail, Userinformation } from '../api.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PostDetailComponent } from '../post-detail/post-detail.component';

@Component({
  selector: 'app-template-post',
  standalone: true,
  imports: [MatCardModule,RouterLink, MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule, FormsModule],

  templateUrl: './template-post.component.html',
  styleUrl: './template-post.component.scss'
})
export class TemplatePostComponent implements OnInit {
  @Input() postData?: { post: PostDetail, user: Userinformation }[] = []

  ngOnInit(): void {

    console.log(this.postData)
  }

  clickLike(item :PostDetail){
  console.log(item)
    item.reactions.likes++
  }
}
