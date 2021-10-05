import {OnInit, Input, ChangeDetectorRef, Directive, Output, EventEmitter} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {BaseFormInterface} from './base-form.interface';

const _ = {
  compact: require('lodash/compact'),
  map: require('lodash/map'),
  cloneDeep: require('lodash/cloneDeep'),
  find: require('lodash/find')
};

@Directive()
export class BaseFormComponent implements OnInit {
  @Input() value = '';
  @Input() cssClassName = '';
  @Input() fieldMeta: BaseFormInterface<any> = {};
  @Input() formGroup: FormGroup;
  @Output() blur: EventEmitter<any> = new EventEmitter<any>();
  errorMessage = 'This field is required.';
  errorBorderClassName = 'input-error-border';
  changeRef: ChangeDetectorRef;
  isBlur: boolean;

  constructor() {
  }

  ngOnInit(): void {
    this.formGroup.addControl(this.fieldMeta.fieldName, this.getFormControl());
  }

  getFormControl(): any {
    return new FormControl('', this.setValidations(this.fieldMeta));
  }

  setValidations(options?) {
    return this.fieldMeta.validators || [];
  }

  getValidators() {
  }

  getErrorMessage() {
    if (this.formGroup && this.formGroup.controls && this.formGroup.controls[this.fieldMeta.fieldName]) {
      let message = this.errorMessage;
      _.find(this.formGroup.controls[this.fieldMeta.fieldName].errors, (errorObj: any) => {
        if (errorObj && !errorObj.isValid) {
          message = errorObj.message;
          return true;
        }
      });
      return message;
    }
  }

  getErrorBorderClass() {
    return (this.isBlur && this.formGroup.controls[this.fieldMeta.fieldName].touched)
    && this.formGroup.controls[this.fieldMeta.fieldName].invalid ? this.errorBorderClassName : '';
  }

  onBlur(event) {
    this.isBlur = true;
    this.blur.emit({
      formControl: this.formGroup.controls[this.fieldMeta.fieldName],
      fieldName: this.fieldMeta.fieldName
    });
    this.detectChanges();
  }

  detectChanges() {
    try {
      this.changeRef.detectChanges();
    } catch (error) {
    }
  }

}
