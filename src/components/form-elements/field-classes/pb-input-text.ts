import {BaseForm} from '../base-form/base-form';
import {BaseFormInterface} from '../base-form/base-form.interface';

export class PBInputText extends BaseForm<any> {
  controlType = 'textbox';
  fieldSize: string;
  isMultipleFieldUpload: boolean
  constructor(options: BaseFormInterface<any>) {
    super(options);
    this.type = options.type || '';
    this.placeholder = options.placeholder || 'Type here...';
    this.fieldSize = options.fieldSize || 'medium';
    this.isMultipleFieldUpload = options.isMultipleFieldUpload || false;
  }
}
