import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {PBInputText} from "../../../components/form-elements/field-classes/pb-input-text";
import {TranslateService} from "@ngx-translate/core";
import {FormService} from "../../../services/form-service/form.service";
import {PBButton} from "../../../components/form-elements/field-classes/pb-button";
import {Router} from "@angular/router";

@Component({
  selector: 'ngx-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  myForm: FormGroup;
  emailField: PBInputText;
  passwordField: PBInputText;
  signInBtn: PBButton;

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
    this.makePasswordField();
    this.makeSignUpBtnField();
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

  makePasswordField() {
    this.passwordField = new PBInputText({
      fieldName: 'password',
      placeholder: this.translate.instant('AUTH.LABEL.PASSWORD'),
      type: 'password'
    });
    this.passwordField.setValidation({
      required: {
        message: this.translate.instant('COMMON.MESSAGE.FIELD_REQUIRED')
      }
    });
  }

  makeSignUpBtnField() {
    this.signInBtn = new PBButton({
      fieldName: 'Sign in',
      btnText: this.translate.instant('AUTH.LABEL.SIGN_IN'),
      class: 'btn-xs'
    });
  }

  signIn(event) {
    console.log(this.myForm.value);
    localStorage.setItem('loggedIn', '1');
    this.router.navigate(['/admin']);
  }

  detectChange() {
    try {
      this.changeRef.detectChanges();
    } catch (e) {
      console.log(e);
    }
  }

}
