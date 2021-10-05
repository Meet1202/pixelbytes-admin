import {Component, OnInit} from '@angular/core';
import {BaseFormComponent} from "../base-form/base-form.component";
import {FormArray, FormControl} from "@angular/forms";

const _ = {
  compact: require('lodash/compact'),
  map: require('lodash/map'),
  forEach: require('lodash/forEach'),
  cloneDeep: require('lodash/cloneDeep')
}

@Component({
  selector: 'pb-checkbox',
  templateUrl: './pb-checkbox.component.html'
})
export class PBCheckboxComponent extends BaseFormComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  getFormControl(): any {
    if (this.fieldMeta.options && this.fieldMeta.options.length > 1) {
      return new FormArray(
        _.compact(_.map(this.fieldMeta.options, (option: any) => {
          const data: any = option;
          data.selected = data.selected || false;
          return new FormControl(data, this.setValidations());
        }))
      );
    } else if (!this.fieldMeta.options || (this.fieldMeta.options && this.fieldMeta.options.length == 0)) {
      return new FormControl(this.fieldMeta.value || false, this.setValidations());
    }
  }

  onChange(event: any, fieldMetaData: any) {
    if (this.fieldMeta.options && this.fieldMeta.options.length > 1) {
      _.forEach(this.fieldMeta.options, (option: any) => {
        if (fieldMetaData.label == option.label) {
          option.selected = !option.selected;
        }
      });
    } else if (!this.fieldMeta.options || (this.fieldMeta.options && this.fieldMeta.options.length == 0)) {
      fieldMetaData.value = !fieldMetaData.value;
      // @ts-ignore
      this.formGroup.controls[this.fieldMeta.fieldName].setValue(fieldMetaData.value);
    }
  }

}
