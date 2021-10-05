import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {PBButton} from "../../../../components/form-elements/field-classes/pb-button";
import {TranslateService} from "@ngx-translate/core";
import {FormService} from "../../../../services/form-service/form.service";
import {PBInputText} from "../../../../components/form-elements/field-classes/pb-input-text";
import {PBSelectBox} from "../../../../components/form-elements/field-classes/pb-select-box";
import {BaseList} from "../../../../components/form-elements/base-list/base-list";
import {NotificationService} from "../../../../services/notification-service/notification.service";
import {PBConfirmPromptComponent} from "../../../../components/form-elements/pb-confirm-prompt/pb-confirm-prompt.component";
import {CommonService} from "../../../../services/common-service/common.service";
import {ButtonRendererComponent} from "../../../../components/renderers/button-renderer";
import {of} from "rxjs";

@Component({
  selector: 'ngx-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent extends BaseList implements OnInit {

  myForm: FormGroup;
  addBtnField: PBButton;
  itemImageField: PBInputText;
  categoryField: PBSelectBox;
  subCategoryField: PBSelectBox;
  logo: any;
  frameworkComponents: any;

  constructor(
    private translate: TranslateService,
    private formService: FormService,
    private commonService: CommonService,
    notificationService: NotificationService,
    changeRef: ChangeDetectorRef,
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
    this.gridOptions.rowHeight = 60;
    this.getItems();
    this.detectChange();
  }

  makeFields() {
    this.makeAddBtnField();
    this.makeItemImageField();
    this.makeCategoryField();
    this.makeSubCategoryField();
  }

  makeAddBtnField() {
    this.addBtnField = new PBButton({
      fieldName: 'Add',
      btnText: this.translate.instant('COMMON.LABEL.ADD'),
      class: 'btn-xs'
    });
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

  chooseLogoFile(event) {
    if (event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        this.logo = e.target.result;
      }
    }
  }

  getItems() {}

  add(event) {}

  prepareColumnDef() {
    this.columnDef = [
      {headerName: this.translate.instant('COMMON.LABEL.SR_NO') , field: 'sr_no'},
      {
        headerName: this.translate.instant('ADMIN.CATEGORY.LABEL.ITEM_IMAGES'),
        field: 'item_images',
        cellRenderer: (params) => {
          return `<img class="grid-img-100" src="${params.value}">`
        }
      },
      {field: 'category'},
      {field: 'sub_category'},
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
      {sr_no: 1, item_images: 'assets/images/camera1.jpg', category: 'icon', sub_category: 'test'}
    ]);
  }

  onRemove(params) {
    const data = {
      data: {
        confirmMessage: this.translate.instant('ADMIN.CATEGORY.MESSAGE.REMOVE_MESSAGE_OF_ITEM_IMAGE')
      }
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
