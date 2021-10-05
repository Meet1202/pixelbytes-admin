import {BaseFormInterface} from "../base-form/base-form.interface";
import {BaseForm} from "../base-form/base-form";

export class PBTextarea extends BaseForm<any> {
  controlType = 'textarea';
  fieldSize: string;
  constructor(options: BaseFormInterface<any>) {
    super(options);
    this.type = options.type || '';
    this.placeholder = options.placeholder || 'Type here...';
    this.fieldSize = options.fieldSize || 'medium';
  }
}
