import { Component, OnInit } from '@angular/core';
import {PBInputText} from "../../../../components/form-elements/field-classes/pb-input-text";
import {PBSelectBox} from "../../../../components/form-elements/field-classes/pb-select-box";
import {FormGroup} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {PBButton} from "../../../../components/form-elements/field-classes/pb-button";
import {CommonService} from "../../../../services/common-service/common.service";

@Component({
  selector: 'ngx-manage-image-listing',
  templateUrl: './manage-image-listing.component.html',
  styleUrls: ['./manage-image-listing.component.scss']
})
export class ManageImageListingComponent implements OnInit {

  myForm: FormGroup;
  itemImageField: PBInputText;
  categoryField: PBSelectBox;
  subCategoryField: PBSelectBox;
  saveBtnField: PBButton;
  cancelBtnField: PBButton;
  logo: any;
  tags: Array<any> = [];
  constructor(
    private translate: TranslateService,
    private commonService: CommonService,
  ) {
    this.myForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.makeFields();
  }

  makeFields() {
    this.makeItemImageField();
    this.makeCategoryField();
    this.makeSubCategoryField();
    this.makeSaveBtnField();
    this.makeCancelBtnField();
  }


  makeItemImageField() {
    this.itemImageField = new PBInputText({
      fieldName: 'item_image',
      type: 'file',
      displayLabel: this.translate.instant('ADMIN.HOME.LABEL.UPLOAD_LOGO')
    });
  }

  makeCategoryField() {
    this.categoryField = new PBSelectBox({
      fieldName: 'category',
      displayLabel: this.translate.instant('ADMIN.CATEGORY.LABEL.SELECT_CATEGORY'),
      options: [
        {label: 'Icon', value: 'icon'}
      ]
    });
  }

  makeSubCategoryField() {
    this.subCategoryField = new PBSelectBox({
      fieldName: 'sub_category',
      displayLabel: this.translate.instant('ADMIN.CATEGORY.LABEL.SELECT_SUB_CATEGORY'),
      options: [
        {label: 'Test', value: 'test'}
      ]
    });
  }

  makeSaveBtnField() {
    this.saveBtnField = new PBButton({
      fieldName: 'Save',
      btnText: this.translate.instant('COMMON.LABEL.SAVE'),
      class: 'btn-xs'
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

  chooseLogoFile(event) {
    if (event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        this.logo = e.target.result;
      }
    }
  }

  onSelect(event) {
    console.log('tag select::', event);
  }
  onTagBlur(event) {
    console.log('tag blur::', event)
  }
  onTagRemoved(event) {
    console.log('tag remove::', event)
  }

  save(event) {
    this.myForm.value['item_image'] = this.logo;
    console.log(this.myForm.value);
  }

  cancel(event) {
    this.commonService.closeDialog(event);
  }

}
