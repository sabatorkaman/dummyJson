import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {
  readonly api = inject(ApiService)

  ngOnInit(): void {
    this.api.getPost(1, 3).subscribe((data) => {
      console.log(data)
    })
  }

}
