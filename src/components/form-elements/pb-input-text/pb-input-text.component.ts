import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseFormComponent} from '../base-form/base-form.component';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'pb-input-text',
  templateUrl: './pb-input-text.component.html'
})
export class PBInputTextComponent extends BaseFormComponent implements OnInit {
  @Output() blur: EventEmitter<any> = new EventEmitter<any>();
  @Input() displayLink = false;
  @Input() linkUrl = '';
  isLinkLabelVisible: boolean = false;

  constructor() {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.prepareLinks();
    this.manageLinkVisibility();
  }

  prepareLinks() {
    if (this.displayLink) {
      this.linkUrl = (this.formGroup.controls[this.fieldMeta.fieldName].value).trim();
    }
  }

  manageLinkVisibility() {
    this.isLinkLabelVisible = this.formGroup.controls[this.fieldMeta.fieldName].value;
  }

  getFormControl() {
    return new FormControl(this.value || this.fieldMeta.value, this.setValidations(this.fieldMeta));
  }

  onBlur(event: any) {
    this.isBlur = true;
    this.blur.emit({
      formControl: this.formGroup.controls[this.fieldMeta.fieldName],
      fieldName: this.fieldMeta.fieldName
    });
    this.manageLinkVisibility();
    this.prepareLinks();
    this.detectChanges();

  }

}
