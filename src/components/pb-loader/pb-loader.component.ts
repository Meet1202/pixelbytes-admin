import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'pb-loader',
  templateUrl: './pb-loader.component.html',
})
export class PBLoaderComponent implements OnInit {

  @Input() cssClass = '';

  constructor() { }

  ngOnInit(): void {
  }

}
