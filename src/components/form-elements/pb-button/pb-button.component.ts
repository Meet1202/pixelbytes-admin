import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {PBButton} from '../field-classes/pb-button';

@Component({
  selector: 'pb-button',
  templateUrl: './pb-button.component.html'
})
export class PBButtonComponent implements OnInit {

  @Output() btnClicked: EventEmitter<any> = new EventEmitter<any>();
  @Input() formGroup: FormGroup;
  @Input() fieldMeta: PBButton;

  constructor() { }

  ngOnInit(): void {
  }

  onClick(event) {
    this.btnClicked.emit({formData: this.formGroup, event, btnData: this.fieldMeta});
  }

}
