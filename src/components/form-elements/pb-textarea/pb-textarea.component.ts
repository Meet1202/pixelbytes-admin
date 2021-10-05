import { Component, OnInit } from '@angular/core';
import {BaseFormComponent} from '../base-form/base-form.component';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'pb-textarea',
  templateUrl: './pb-textarea.component.html'
})
export class PBTextareaComponent extends BaseFormComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  getValue() {
    return new FormControl('', this.setValidations(this.fieldMeta));
  }
  onBlur(event: any) {
    this.isBlur = true;
    this.detectChanges();

  }

}
