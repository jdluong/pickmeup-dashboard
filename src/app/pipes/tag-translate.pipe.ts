import { Pipe, PipeTransform } from '@angular/core';
import { Tag } from '../models/tag';
import { TagService } from '../services/tag.service';

@Pipe({
  name: 'tagTranslate'
})
export class TagTranslatePipe implements PipeTransform {

tags:Tag[];
constructor(private tagService: TagService) { 
  this.tagService.getTags().subscribe(
    data => {
      this.tags = data["tags"];
    }
  );
}

transform(value: any): any {
  if (value == null) {
    return "n/a";
  }
  for (let tag of this.tags) {
    if (value == tag.id) {
      return tag.name;
    } 
  }
}

}
