import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient) { }

  private URL:string = "https://pickmeup-api-123.herokuapp.com/photos"

  public getPhotos():Observable<Object> {
    return this.http.get(this.URL);
  }

  public addPhoto(data: FormData) {
    return this.http.post(this.URL, data);

  }
  
}