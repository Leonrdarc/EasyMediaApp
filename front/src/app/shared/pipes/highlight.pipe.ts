import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(text: string, search: string): string {
    if (search && text) {
      let pattern = search.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
      pattern = pattern.split(' ').filter((t) => t.length > 0).join('|');
      const regex = new RegExp(pattern, 'gi');
      return text.replace(regex, (match) => `<mark>${match}</mark>`);
    } else {
      return text;
    }
  }

}
