import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {PBInputText} from "../../../components/form-elements/field-classes/pb-input-text";
import {TranslateService} from "@ngx-translate/core";
import {PBEditor} from "../../../components/form-elements/field-classes/pb-editor";
import {PBButton} from "../../../components/form-elements/field-classes/pb-button";
import {FormService} from "../../../services/form-service/form.service";

@Component({
  selector: 'ngx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  myForm: FormGroup;
  companyNameField: PBInputText;
  logoField: PBInputText;
  termAndConditionField: PBEditor;
  bannerImageField: PBInputText;
  updateBtnField: PBButton;
  logo: any;
  bannerImage: any;
  adminDetails = {};

  constructor(
    private changeRef: ChangeDetectorRef,
    private translate: TranslateService,
    private formService: FormService) {
    this.myForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.makeFields();
    this.detectChange();
  }

  makeFields() {
    this.makeCompanyNameField();
    this.makeLogoField();
    this.makeTermAndConditionField();
    this.makeBannerImageField();
    this.makeUpdateBtnField();
    this.getDetails();
  }

  makeCompanyNameField() {
    this.companyNameField = new PBInputText({
      fieldName: 'company_name',
      displayLabel: this.translate.instant('ADMIN.HOME.LABEL.COMPANY_NAME')
    });
  }

  makeLogoField() {
    this.logoField = new PBInputText({
      fieldName: 'logo',
      type: 'file',
      displayLabel: this.translate.instant('ADMIN.HOME.LABEL.UPLOAD_LOGO'),
    });
  }

  makeTermAndConditionField() {
    this.termAndConditionField = new PBEditor({
      fieldName: 'term_and_condition',
      displayLabel: this.translate.instant('ADMIN.HOME.LABEL.TERMS_AND_CONDITIONS')
    });
  }

  makeBannerImageField() {
    this.bannerImageField = new PBInputText({
      fieldName: 'banner_image',
      type: 'file',
      displayLabel: this.translate.instant('ADMIN.HOME.LABEL.UPLOAD_BANNER_IMAGE')
    });
  }

  makeUpdateBtnField() {
    this.updateBtnField = new PBButton({
      fieldName: 'update',
      btnText: this.translate.instant('COMMON.LABEL.UPDATE'),
      class: 'btn-xs'
    });
  }

  chooseLogoFile(event) {
    if (event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        this.logo = e.target.result;
      }
    }
    console.log(this.logo);
  }

  chooseBannerFile(event) {
    if (event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        this.bannerImage = e.target.result;
      }
    }
  }

  onChangeTermsAndCondition(event) {
    console.log(event);
  }

  getDetails() {
    this.adminDetails = {
      company_name: 'Pixel Bytes',
      logo: 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      term_and_condition: 'data',
      banner_image: 'https://images.unsplash.com/photo-1543343237-46595db0588c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
    this.setDetails();
  }

  setDetails() {
    if (this.adminDetails) {
      this.companyNameField.value = this.adminDetails['company_name'];
      this.logo = this.adminDetails['logo'];
      this.termAndConditionField.value = this.adminDetails['term_and_condition'];
      this.bannerImage = this.adminDetails['banner_image'];
    }
  }

  update(event) {
    this.formService.showButtonLoader(event, this.changeRef);
    console.log('hiii')
    console.log(this.myForm.value);
    setTimeout(() => {
      this.formService.hideButtonLoader(event, this.changeRef);
    }, 1000);
  }

  detectChange() {
    try {
      this.changeRef.detectChanges();
    } catch (e) {
      console.log(e);
    }
  }
}
