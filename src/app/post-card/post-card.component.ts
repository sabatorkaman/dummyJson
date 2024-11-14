import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PostDetail } from '../post-api.service';
import { Userinformation } from '../userService.service';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [MatCardModule, RouterLink, MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule, FormsModule],

  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss'
})
export class PostCardComponent implements OnInit {
  @Input() post?: PostDetail
  @Input() user?: Userinformation
  ngOnInit(): void {

  }

  clickLike(item: PostDetail) {
    console.log(item)
    item.reactions.likes++
  }
}
