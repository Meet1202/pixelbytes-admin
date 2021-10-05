import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {FormService} from "../../../services/form-service/form.service";
import {FormGroup} from "@angular/forms";
import {PBButton} from "../../../components/form-elements/field-classes/pb-button";
import {PBInputText} from "../../../components/form-elements/field-classes/pb-input-text";

@Component({
  selector: 'ngx-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  myForm: FormGroup;
  updateBtnField: PBButton;
  emailField: PBInputText;
  phoneField: PBInputText;
  facebookField: PBInputText;
  whatsappField: PBInputText;
  instaField: PBInputText;

  constructor(
    private changeRef: ChangeDetectorRef,
    private translate: TranslateService,
    private formService: FormService
  ) {
    this.myForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.makeFields();
    this.setFormData();
    this.detectChange();
  }

  makeFields() {
    this.makeUpdateBtnField();
    this.makeEmailField();
    this.makePhoneField();
    this.makeFacebookField();
    this.makeWhatsappField();
    this.makeInstaField();
  }

  makeEmailField() {
    this.emailField = new PBInputText({
      fieldName: 'email',
      displayLabel: this.translate.instant('COMMON.LABEL.EMAIL')
    });
  }

  makePhoneField() {
    this.phoneField = new PBInputText({
      fieldName: 'phone',
      displayLabel: this.translate.instant('ADMIN.CONTACT.LABEL.PHONE')
    });
  }

  makeFacebookField() {
    this.facebookField = new PBInputText({
      fieldName: 'facebook_link',
      displayLabel: this.translate.instant('ADMIN.CONTACT.LABEL.FACEBOOK')
    });
  }

  makeWhatsappField() {
    this.whatsappField = new PBInputText({
      fieldName: 'whatsapp_number',
      displayLabel: this.translate.instant('ADMIN.CONTACT.LABEL.WHATSAPP')
    });
  }

  makeInstaField() {
    this.instaField = new PBInputText({
      fieldName: 'insta_link',
      displayLabel: this.translate.instant('ADMIN.CONTACT.LABEL.INSTAGRAM')
    });
  }

  makeUpdateBtnField() {
    this.updateBtnField = new PBButton({
      fieldName: 'update',
      btnText: this.translate.instant('COMMON.LABEL.UPDATE'),
      class: 'btn-xs'
    });
  }

  update(event) {
    this.formService.showButtonLoader(event, this.changeRef);
    console.log(this.myForm.value);
    setTimeout(() => {
      this.formService.hideButtonLoader(event, this.changeRef);
    }, 1000);
  }

  setFormData() {
    this.emailField.value = 'meet@gmail.com';
    this.phoneField.value = '123456780';
    this.facebookField.value = 'https://www.facebook.com';
    this.instaField.value = 'https://www.instagram.com';
    this.whatsappField.value = '1234567890';
  }

  detectChange() {
    try {
      this.changeRef.detectChanges();
    } catch (e) {
      console.log(e);
    }
  }

}
