import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {PBInputText} from "../../../components/form-elements/field-classes/pb-input-text";
import {PBButton} from "../../../components/form-elements/field-classes/pb-button";
import {TranslateService} from "@ngx-translate/core";
import {FormService} from "../../../services/form-service/form.service";
import {Router} from "@angular/router";

@Component({
  selector: 'ngx-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  myForm: FormGroup;
  emailField: PBInputText;
  resetPasswordBtn: PBButton;

  constructor(
    private changeRef: ChangeDetectorRef,
    private translate: TranslateService,
    private formService: FormService,
    private router: Router,
  ) {
    this.myForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.makeFields();
    this.detectChange();
  }

  makeFields() {
    this.makeEmailField();
    this.makeResetPswdBtnField();
  }

  makeEmailField() {
    this.emailField = new PBInputText({
      fieldName: 'email',
      placeholder: this.translate.instant('COMMON.LABEL.EMAIL').toLowerCase()
    });
    this.emailField.setValidation({
      required: {
        message: this.translate.instant('COMMON.MESSAGE.FIELD_REQUIRED')
      }
    });
  }

  makeResetPswdBtnField() {
    this.resetPasswordBtn = new PBButton({
      fieldName: 'reset',
      btnText: this.translate.instant('AUTH.LABEL.RESET'),
      class: 'btn-xs'
    });
  }

  resetPassword(event) {
    console.log(this.myForm.value);
    this.router.navigate(['/admin/signin']);
  }

  detectChange() {
    try {
      this.changeRef.detectChanges();
    } catch (e) {
      console.log(e);
    }
  }

}
