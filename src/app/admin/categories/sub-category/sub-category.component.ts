import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {PBInputText} from "../../../../components/form-elements/field-classes/pb-input-text";
import {PBButton} from "../../../../components/form-elements/field-classes/pb-button";
import {TranslateService} from "@ngx-translate/core";
import {FormService} from "../../../../services/form-service/form.service";
import {CommonService} from "../../../../services/common-service/common.service";
import {NotificationService} from "../../../../services/notification-service/notification.service";
import {ButtonRendererComponent} from "../../../../components/renderers/button-renderer";
import {of} from "rxjs";
import {PBConfirmPromptComponent} from "../../../../components/form-elements/pb-confirm-prompt/pb-confirm-prompt.component";
import {BaseList} from "../../../../components/form-elements/base-list/base-list";

@Component({
  selector: 'ngx-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponent extends BaseList implements OnInit {

  myForm: FormGroup;
  subCategoryField: PBInputText;
  addBtnField: PBButton;
  frameworkComponents: any;
  constructor(
    private translate: TranslateService,
    private formService: FormService,
    private commonService: CommonService,
    notificationService: NotificationService,
    changeRef: ChangeDetectorRef
  ) {
    super(notificationService, changeRef);
    this.myForm = new FormGroup({});
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
    }
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.makeFields();
    this.detectChange();
  }

  makeFields() {
    this.makeCategoryField();
    this.makeAddBtnField();
  }

  makeCategoryField() {
    this.subCategoryField = new PBInputText({
      fieldName: 'category',
      displayLabel: this.translate.instant('ADMIN.CATEGORY.LABEL.SUB_CATEGORY')
    });
    this.subCategoryField.setValidation({
      required: {
        message: this.translate.instant('COMMON.MESSAGE.FIELD_REQUIRED')
      }
    });
  }

  makeAddBtnField() {
    this.addBtnField = new PBButton({
      fieldName: 'Add',
      btnText: this.translate.instant('COMMON.LABEL.ADD'),
      class: 'btn-xs'
    });
  }

  add(event) {}

  prepareColumnDef() {
    this.columnDef = [
      {headerName: this.translate.instant('COMMON.LABEL.SR_NO'), field: 'sr_no'},
      {headerName: this.translate.instant('ADMIN.CATEGORY.LABEL.SUB_CATEGORY'), field: 'sub_category'},
      {
        headerName: this.translate.instant('COMMON.LABEL.ACTION'),
        cellRenderer: 'buttonRenderer',
        cellRendererParams: {
          onClick: this.onRemove.bind(this),
          label: this.translate.instant('COMMON.LABEL.REMOVE'),
          btnClass: 'btn btn-fill btn-danger btn-xs'
        }
      }
    ]
  }

  searchData(params) {
    return of([
      {sr_no: 1, sub_category: 'icon'}
    ]);
  }

  onRemove(params) {
    const data = {
      data: {confirmMessage: this.translate.instant('ADMIN.CATEGORY.MESSAGE.REMOVE_MESSAGE_OF_CATEGORY')}
    }
    this.commonService.openDialog(PBConfirmPromptComponent, {}, data).then((res: any) => {
      if (res) {
        console.log(params);
        // call remove api
      }
    });
  }

  detectChange() {
    try {
      this.changeRef.detectChanges();
    } catch (e) {
      console.log(e);
    }
  }

}
