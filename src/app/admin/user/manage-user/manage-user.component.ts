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
  myForm: FormGroup;
  manageField: PBButton;
  emailField: PBInputText;
  passwordField: PBInputText;
  phoneField: PBInputText;
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
    console.log(this.isEditMode)
    this.detectChange();
  }

  makeFields() {
    this.makeManageField();
    this.makeEmailField();
    this.makePasswordField();
    this.makePhoneField();
  }

  makeManageField() {
    this.manageField = new PBButton({
      fieldName: 'add_edit_user',
      btnText: this.isEditMode ? 'Edit User' : 'Add User',
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
      displayLabel: 'Password',
      type: 'password'
    });
  }

  makePhoneField() {
    this.phoneField = new PBInputText({
      fieldName: 'phone',
      displayLabel: this.translate.instant('ADMIN.CONTACT.LABEL.PHONE')
    });
  }

  manageUser(event) {
      this.closeDialog(this.myForm.value);
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
