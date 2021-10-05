import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ngx-logo-viewer',
  templateUrl: './logo-viewer.component.html',
  styleUrls: ['./logo-viewer.component.scss']
})
export class LogoViewerComponent implements OnInit {

  @Input() logo: any;
  constructor() { }

  ngOnInit(): void {
  }

}
