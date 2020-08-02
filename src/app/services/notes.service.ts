import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private http: HttpClient) { }

  private URL:string = "https://pickmeup-api-123.herokuapp.com/notes";

  public getNotes():Observable<Object> {
    return this.http.get(this.URL);
  }

  public addNote(data:any):Observable<Object> {
    return this.http.post(this.URL, data);
  }

}
