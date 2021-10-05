import {AngularEditorConfig} from '@kolkov/angular-editor';
import {BaseForm} from "../base-form/base-form";
import {BaseFormInterface} from "../base-form/base-form.interface";

export class PBEditor extends BaseForm<any> {
  controlType = 'editor';
  editorSettings: AngularEditorConfig | undefined;

  constructor(options: BaseFormInterface<any>) {
    super(options);
    this.type = options.type || '';
    this.placeholder = options.placeholder || 'Type here...';
    this.editorSettings = options.editorSettings;
  }
}
