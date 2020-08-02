import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  private URL:string = "https://pickmeup-api-123.herokuapp.com/tags"

  constructor(private http: HttpClient) { }

  public getTags():Observable<Object> {
    return this.http.get(this.URL);
  }

  public getTagById(id:number):Observable<Object> {
    return this.http.get(this.URL+"/"+id);
  }

  public addTag(data:any):Observable<Object> {
    return this.http.post(this.URL, data);
  }

}
