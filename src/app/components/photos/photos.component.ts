import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Photo } from 'src/app/models/photo';
import { PhotoService } from 'src/app/services/photo.service';
import { Tag } from 'src/app/models/tag';
import { TagService } from 'src/app/services/tag.service';


@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  photos:Photo[];
  currPhoto:Photo;

  photoForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
    tag: new FormControl(''),
  });
  photoFormSource: File;
  tags:Tag[];

  constructor(private photoService: PhotoService, private tagService: TagService) { }

  ngOnInit() {
    this.initPhotos();
    this.initTags();
    // change currPhoto.photoURL to a random stock grey image
    this.currPhoto = {
                      id:1,
                      name:"skooby.jpg",
                      tagId:1,
                      usedCount:0,
                      photoURL:"https://pickmeup-images.s3-us-west-2.amazonaws.com/pp/skooby.jpg"
                     };
  }

  initPhotos() {
    this.photoService.getPhotos().subscribe(
      data => {
        this.photos = data["photos"];
      }
    );
  }

  initTags() {
    this.tagService.getTags().subscribe(
      data => {
        this.tags = data["tags"];
      }
    );
  }

  onClick(photo: Photo) {
    this.currPhoto = photo;
  }

  onFileChange($event) {
    this.photoFormSource = $event.target.files[0];
  }

  debug($event) {
    console.log(this.photoForm.get("tag"));
  }
  
  onSubmit() {
    const formData = new FormData();
    formData.append("photo", this.photoFormSource, this.photoFormSource.name);
    if (this.photoForm.get("tag").value != "") {
      formData.append("tagId", this.photoForm.get("tag").value);
    }
    
    this.photoService.addPhoto(formData).subscribe(
      data => {
        this.initPhotos();
        this.photoForm.reset();
      }
    );

  }

}
