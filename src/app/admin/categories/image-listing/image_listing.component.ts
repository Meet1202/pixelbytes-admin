import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {PBButton} from "../../../../components/form-elements/field-classes/pb-button";
import {TranslateService} from "@ngx-translate/core";
import {FormService} from "../../../../services/form-service/form.service";
import {BaseList} from "../../../../components/form-elements/base-list/base-list";
import {NotificationService} from "../../../../services/notification-service/notification.service";
import {PBConfirmPromptComponent} from "../../../../components/form-elements/pb-confirm-prompt/pb-confirm-prompt.component";
import {CommonService} from "../../../../services/common-service/common.service";
import {ButtonRendererComponent} from "../../../../components/renderers/button-renderer";
import {of} from "rxjs";
import {ManageImageListingComponent} from "../manage-image-listing/manage-image-listing.component";
import {PBInputText} from "../../../../components/form-elements/field-classes/pb-input-text";

@Component({
  selector: 'ngx-menu',
  templateUrl: './image_listing.component.html',
  styleUrls: ['./image_listing.component.scss']
})
export class ImageListingComponent extends BaseList implements OnInit {

  myForm: FormGroup;
  addBtnField: PBButton;
  searchField: PBInputText;
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
    this.makeSearchField();
  }

  makeAddBtnField() {
    this.addBtnField = new PBButton({
      fieldName: 'Add',
      btnText: this.translate.instant('COMMON.LABEL.ADD'),
      class: 'btn-xs'
    });
  }

  makeSearchField() {
    this.searchField = new PBInputText({
      fieldName: 'search',
      placeholder: this.translate.instant('COMMON.LABEL.SEARCH'),
    });
  }

  getItems() {}

  add(event) {
    const data = {
      data: {

      }
    }
    this.commonService.openDialog(ManageImageListingComponent, {
      modalDialogClass: 'p-lg-3'
    }, data).then((res: any) => {
      if (res) {
        console.log(res);
        // call remove api
      }
    });
  }

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
