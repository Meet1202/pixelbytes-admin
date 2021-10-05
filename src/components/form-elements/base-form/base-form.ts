import {BaseFormInterface} from "./base-form.interface";
import {CustomValidators, ValidatorInterFace} from "./custom-validators";

export class BaseForm<T> {
  value?: T;
  fieldName: string;
  required: boolean;
  order: number;
  controlType: string;
  type: string;
  options: any;
  labelClass: string;
  placeholder: string;
  inputClass: string;
  displayLabel: string;
  disabled: boolean;
  col: number;
  uiComponentName: any;
  validators: any = [];

  constructor(options: BaseFormInterface<T>) {
    this.value = options.value;
    this.displayLabel = options.displayLabel || '';
    this.inputClass = options.inputClass || '';
    this.fieldName = options.fieldName || '';
    this.labelClass = options.labelClass || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.type = options.type || '';
    this.options = options.options;
    this.placeholder = options.placeholder || '';
    this.disabled = !!options.disabled || false;
    this.col = options.col || 6;
    this.uiComponentName = options.uiComponentName || {};
    this.validators = options.validators || [];
  }

  setValidation(validators: ValidatorInterFace<any>) {
    if (validators) {
      if (validators.required) {
        this.validators.push(CustomValidators.required(validators.required.message))
      }
      if (validators.max) {
        this.validators.push(CustomValidators.max(validators.max.value, validators.max.message));
      }
      if (validators.min) {
        this.validators.push(CustomValidators.min(validators.min.value, validators.min.message));
      }
      if (validators.pattern) {
        this.validators.push(CustomValidators.pattern(validators.pattern.value, validators.pattern.message));
      }
    }
  }

  clearValidation() {
    this.validators = [];
  }
}


