import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    }),
  };

  constructor(private http: HttpClient) {}

  createPost(postData: any): Observable<any> {
    return this.http.post<any>('/post/create', postData, this.httpOptions).pipe(
      map(({ data }) => {
        return data;
      })
    );
  }

  getAllPosts(params: any): Observable<any> {
    return this.http.get<any>('/post/all', {...this.httpOptions, params}).pipe(
      map((data) => {
        return data;
      })
    );
  }
}
