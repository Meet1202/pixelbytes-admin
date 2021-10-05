import {BaseForm} from '../base-form/base-form';
import {SelectSettingsInterface} from '../base-form/base-form.interface';
import {BaseFormInterface} from '../base-form/base-form.interface';

export class PBSelectBox extends BaseForm<any> {
  controlType = 'selectbox';
  selectSettings: SelectSettingsInterface<any>;
  maxHeight: number;
  isMultiple: boolean;

  constructor(options: BaseFormInterface<any>) {
    super(options);
    this.selectSettings = options.selectSettings || {};
    this.maxHeight = options.maxHeight || 100;
    this.placeholder = options.placeholder || 'Type here...';
    this.isMultiple = options.isMultiple || false;
  }
}
