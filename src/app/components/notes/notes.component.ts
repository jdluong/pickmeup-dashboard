import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Tag } from 'src/app/models/tag';
import { TagService } from 'src/app/services/tag.service';
import { Note } from 'src/app/models/note';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  notes:Note[];
  tags:Tag[];

  noteForm = new FormGroup({
    message: new FormControl('', [Validators.required]),
    tag: new FormControl(''),
    attachPhoto: new FormControl('')
  });

  constructor(private tagService: TagService, private noteService: NotesService) { }

  ngOnInit() {
    this.initNotes();
    this.initTags();
  }

  initNotes() {
    this.noteService.getNotes().subscribe(
      data => {
        this.notes = data["notes"];
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

  onSubmit() {
    let attachPhoto = (this.noteForm.get("attachPhoto").value) ? 1 : 0
    let data = {
      "message": this.noteForm.get("message").value,
      "attachPhoto": attachPhoto
    };
    if (this.noteForm.get("tag").value != "") {
      data["tagId"] = this.noteForm.get("tag").value;
    }
    console.log(data);

    this.noteService.addNote(data).subscribe(
      data => {
        this.initNotes();
        this.noteForm.reset();
      }
    );
  }

}
