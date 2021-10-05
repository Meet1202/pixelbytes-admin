import {AbstractControl, ValidatorFn} from '@angular/forms';

export interface ValidatorInterFace<T> {
  required?: ValidatorValueObjectInterface<string>;
  min?: ValidatorValueObjectInterface<string>;
  max?: ValidatorValueObjectInterface<string>;
  pattern?: ValidatorValueObjectInterface<string>;
}

export interface ValidatorValueObjectInterface<T> {
  value?: any;
  message?: T;
}

export class CustomValidators {
  static PATTERNS = {
    POSITIVE_NUMBER: /^[1-9]+[0-9]*$/,
    DECIMAL_NUMBER: /^\d+(\.\d{1,})?$/,
    WHOLE_NUMBER: /^-{1,1}\d+(\.\d{1,})?$/,
    EMAIL: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    ONLY_ALPHABETS_AND_NUMBER: /^[^0][A-Za-z0-9]*$/
  }

  static required(msg: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control && control.value && control.value != '') {
        return null;
      }
      return {required: {message: msg, isValid: false}};
    };
  }

  static max(max: number, msg: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control && control.value.toString().length <= max) {
        return null;
      }
      return {max: {message: msg, isValid: false}};
    };
  }

  static min(min: number, msg: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control && control.value.toString().length >= min) {
        return null;
      }
      return {min: {message: msg, isValid: false}};
    };
  }

  static pattern(pattern: any, msg: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control && (control.value == '' || pattern.test(control.value))) {
        return null;
      }
      return {pattern: {message: msg, isValid: false}};
    };
  }
}
