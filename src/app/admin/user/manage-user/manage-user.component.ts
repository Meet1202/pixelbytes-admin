import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {PBButton} from "../../../../components/form-elements/field-classes/pb-button";
import {FormGroup} from "@angular/forms";
import {PBInputText} from "../../../../components/form-elements/field-classes/pb-input-text";
import {TranslateService} from "@ngx-translate/core";
import {FormService} from "../../../../services/form-service/form.service";
import {PBCheckbox} from "../../../../components/form-elements/field-classes/pb-checkbox";
import {CommonService} from "../../../../services/common-service/common.service";

@Component({
  selector: 'ngx-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {

  @Input() isEditMode: boolean = false;
  @Input() user: any;
  myForm: FormGroup;
  manageField: PBButton;
  emailField: PBInputText;
  passwordField: PBInputText;
  phoneField: PBInputText;
  cancelBtnField: PBButton;
  constructor(
    private changeRef: ChangeDetectorRef,
    private translate: TranslateService,
    private commonService: CommonService,
    private formService: FormService
  ) {
    this.myForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.makeFields();
    this.detectChange();
  }

  makeFields() {
    this.makeManageField();
    this.makeEmailField();
    this.makePasswordField();
    this.makePhoneField();
    this.makeCancelBtnField();
    if (this.user) {
      this.setFormValues();
    }
  }

  makeManageField() {
    this.manageField = new PBButton({
      fieldName: 'add_edit_user',
      btnText: this.isEditMode ? this.translate.instant('COMMON.LABEL.UPDATE') : this.translate.instant('COMMON.LABEL.SAVE'),
      class: 'btn-xs'
    });
  }

  makeEmailField() {
    this.emailField = new PBInputText({
      fieldName: 'email',
      displayLabel: this.translate.instant('COMMON.LABEL.EMAIL')
    });
  }

  makePasswordField() {
    this.passwordField = new PBInputText({
      fieldName: 'password',
      displayLabel: this.translate.instant('AUTH.LABEL.PASSWORD'),
      type: 'password'
    });
  }

  makePhoneField() {
    this.phoneField = new PBInputText({
      fieldName: 'phone',
      displayLabel: this.translate.instant('ADMIN.CONTACT.LABEL.PHONE')
    });
  }

  makeCancelBtnField() {
    this.cancelBtnField = new PBButton({
      fieldName: 'Cancel',
      btnText: this.translate.instant('COMMON.LABEL.CANCEL'),
      status: 'btn-light',
      class: 'btn-xs'
    });
  }

  manageUser(event) {
    if (this.user) {
      this.user.email[0] = this.myForm.value.email;
      this.user.phone[0] = this.myForm.value.phone;
      this.closeDialog(this.user);
    } else {
      this.closeDialog(this.myForm.value);
    }
  }

  setFormValues() {
    this.phoneField.value = this.user.phone[0];
    this.emailField.value = this.user.email[0];
  }

  togglePasswordFun(event) {
    console.log(event.target.checked);
    if (this.passwordField.type === "password") {
      this.passwordField.type = "text";
    } else {
      this.passwordField.type = "password";
    }
  }

  goBack() {
    window.history.back();
  }

  closeDialog(data?) {
    this.commonService.closeDialog(data);
  }

  detectChange() {
    try {
      this.changeRef.detectChanges();
    } catch (e) {
      console.log(e);
    }
  }
}
