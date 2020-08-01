import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Photo } from 'src/app/models/photo';
import { PhotoService } from 'src/app/services/photo.service';


@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  photos:Photo[];
  currPhoto:Photo;

  photoForm = new FormGroup({
    file: new FormControl('', [Validators.required])
    // tagId: new FormControl(''),
  })
  photoFormSource: File;

  constructor(private photoService: PhotoService) { }

  ngOnInit() {
    this.getPhotos();
    // change currPhoto.photoURL to a random stock grey image
    this.currPhoto = {
                      id:1,
                      photoName:"skooby.jpg",
                      tagId:1,
                      usedCount:0,
                      photoURL:"https://pickmeup-images.s3-us-west-2.amazonaws.com/pp/skooby.jpg"
                     };
  }

  onFileChange($event) {
    this.photoFormSource = $event.target.files[0]; 
  }

  getPhotos() {
    this.photoService.getPhotos().subscribe(
      data => {
        this.photos = data["photos"];
      }
    );
  }

  onClick(photo: Photo) {
    this.currPhoto = photo;
  }
  
  onSubmit() {
    const formData = new FormData();
    formData.append("photo", this.photoFormSource, this.photoFormSource.name);
    // if (this.photoForm.get("tagId") != "") {
    //   console.log("ejfioajwefoaiwefjawef");
    //   formData.append("tagId", this.photoForm.get("tagId").value);
    // }
    
    this.photoService.addPhoto(formData).subscribe(
      data => {
        this.getPhotos();
      }
    );

  }

}
