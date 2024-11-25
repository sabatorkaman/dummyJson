import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'highlightSearch',
  standalone: true
})
export class HighlightSearchPipe implements PipeTransform {
  constructor(private _sanitizer: DomSanitizer) { }

  transform(text?: string, searchText?: string): any {

    if (!text) { return text }
    if (!searchText) { return text; }

    const regex = new RegExp(searchText, 'gi');
    const match = text.match(regex);

    if (!match) {
      return text;
    }
    // return this._sanitizer.bypassSecurityTrustHtml(value);
    return text.replace(regex, `<span class='highlight-text'>${searchText}</span>`);

  }
}
