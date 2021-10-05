import {BaseFormInterface} from "../base-form/base-form.interface";
import {BaseForm} from "../base-form/base-form";

export class PBCheckbox extends BaseForm<any> {
  controlType = 'checkbox';

  constructor(options: BaseFormInterface<any>) {
    super(options);
  }
}
