import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from '../interfaces/blog';
import { environment } from '../../environments/environment';

export interface CreateBlogBody {
  title: string;
  description: string;
  authors: string[];
  tags: string[];
  urls: string[];
  imageBase64?: string;
}

@Injectable({
  providedIn: 'root',
})
export class BlogHttpService {
  private readonly API_URL = `${environment.apiUrl}/blogs`;

  constructor(private http: HttpClient) { }

  getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.API_URL);
  }

  getBlogById(id: number): Observable<Blog> {
    return this.http.get<Blog>(`${this.API_URL}/${id}`);
  }

  createBlog(body: CreateBlogBody, apiKey?: string): Observable<Blog> {
    let headers = new HttpHeaders();
    if (apiKey) {
      headers = headers.set('x-api-key', apiKey);
    }
    return this.http.post<Blog>(this.API_URL, body, { headers });
  }

  updateBlog(id: number, body: CreateBlogBody, apiKey?: string): Observable<Blog> {
    let headers = new HttpHeaders();
    if (apiKey) {
      headers = headers.set('x-api-key', apiKey);
    }
    return this.http.put<Blog>(`${this.API_URL}/${id}`, body, { headers });
  }

  deleteBlog(id: number, apiKey?: string): Observable<void> {
    let headers = new HttpHeaders();
    if (apiKey) {
      headers = headers.set('x-api-key', apiKey);
    }
    return this.http.delete<void>(`${this.API_URL}/${id}`, { headers });
  }
}
