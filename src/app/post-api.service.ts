import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostApiService {
  private http=inject( HttpClient)

  constructor() { }


  getPost(limit: number, skip: number, search: string): Observable<AllPostDetails> {
    return this.http.get<AllPostDetails>(`https://dummyjson.com/posts/search?limit=${limit}&skip=${skip}&q=${search}`)
  }
  getPostComment(id: number, limit: number, skip: number): Observable<PostComment> {
    return this.http.get<PostComment>(`https://dummyjson.com/posts/${id}/comments?limit=${limit}&skip=${skip}`)
  }
  getPostDetail(id:number):Observable<PostDetail>{
    return this.http.get<PostDetail>(`https://dummyjson.com/posts/${id}`)
  }
}


export interface AllPostDetails {

  posts: PostDetail[],
  total: number,
  skip: number,
  limit: number
}
export interface PostDetail {
  id: number,
  title: string,
  body: string,
  tags: string[],
  reactions: {
    likes: number,
    dislikes: number
  },
  views: number,
  userId: number

}

export interface PostComment {
  comments: DetailComment[]
  total: number,
  skip: number,
  limit: number
}
export interface DetailComment {
  id: number,
  body: string,
  postId: number, // post id is 1
  likes: number,
  user: {
    id: number,
    username: string,
    fullName: string
  }
}
