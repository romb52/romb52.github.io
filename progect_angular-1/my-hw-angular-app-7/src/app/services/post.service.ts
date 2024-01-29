import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { IPosts, IPost } from '../share/post.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { URL } from '../share/backend';
import { IError } from '../share/error.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  public posts: IPosts = { articles: [], articlesCount: 0 };
  constructor(private http: HttpClient) {
    this.getPosts().subscribe((data) => {
      this.posts = data;
    })
  }
  getPosts(): Observable<IPosts> {
    const url = URL + '/articles';
    return this.http.get<IPosts>(url);
  }

  createPost(
    title: string,
    description: string,
    body: string,
    tagList: string[],
  ): Observable<IPost | IError> {
    const url = URL + '/articles';
    return this.http
      .post<IPost>(
        url,
        { article: { title, description, body, tagList } },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `token ${localStorage.getItem('token')}`,
          },
        }
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
          } else {
            console.error(
              `Backend returned code ${error.status}, body was:`,
              error.error
            );
          }
          return of(error.error as IError);
        })
      );
  }
}
