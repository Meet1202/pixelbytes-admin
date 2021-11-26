import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {PBButton} from "../../../components/form-elements/field-classes/pb-button";
import {TranslateService} from "@ngx-translate/core";
import {FormService} from "../../../services/form-service/form.service";
import {BaseList} from "../../../components/form-elements/base-list/base-list";
import {ButtonRendererComponent} from "../../../components/renderers/button-renderer";
import {NotificationService} from "../../../services/notification-service/notification.service";
import {PBConfirmPromptComponent} from "../../../components/form-elements/pb-confirm-prompt/pb-confirm-prompt.component";
import {of} from "rxjs";
import {CommonService} from "../../../services/common-service/common.service";
import {LogoViewerComponent} from "./logo-viewer/logo-viewer.component";
import {Router} from "@angular/router";
import {DropDownRenderer} from "../../../components/renderers/drop-down-renderer";
import {ManageUserComponent} from "./manage-user/manage-user.component";
import {PBInputText} from "../../../components/form-elements/field-classes/pb-input-text";

@Component({
  selector: 'ngx-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent extends BaseList implements OnInit {

  myForm: FormGroup;
  addBtnField: PBButton;
  searchField: PBInputText;
  frameworkComponents: any;

  constructor(
    private translate: TranslateService,
    private formService: FormService,
    private commonService: CommonService,
    private router: Router,
    changeRef: ChangeDetectorRef,
    notificationService: NotificationService
  ) {
    super(notificationService, changeRef);
    this.myForm = new FormGroup({});
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
      dropDownRenderer: DropDownRenderer,
    };
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.makeFields();
    this.gridOptions.rowHeight = 48;
    this.detectChange();
  }

  makeFields() {
    this.addBtnField = new PBButton({
      fieldName: 'add-btn',
      btnText: this.translate.instant('COMMON.LABEL.ADD'),
      class: 'btn-xs',
      iconCssClass: 'fas fa-plus'
    });
    this.searchField = new PBInputText({
      fieldName: 'search',
      placeholder: 'search'
    });
  }

  addUser(event) {
    this.commonService.openDialog(ManageUserComponent, {}).then((response) => {
      console.log(response);
    });
  }

  prepareColumnDef() {
    this.columnDef = [
      {headerName: this.translate.instant('COMMON.LABEL.SR_NO'), field: 'sr_no', minWidth: 80, pinned: 'left'},
      {headerName: this.translate.instant('ADMIN.USER.LABEL.USER_ID'), field: 'user_id', minWidth: 120, pinned: 'left'},
      {headerName: this.translate.instant('ADMIN.USER.LABEL.ROLE'), field: 'role', minWidth: 100},
      {headerName: this.translate.instant('ADMIN.USER.LABEL.BUSINESS_NAME'), field: 'business_name', minWidth: 150},
      {headerName: this.translate.instant('COMMON.LABEL.PHONE'), field: 'phone', minWidth: 150},
      {headerName: this.translate.instant('COMMON.LABEL.EMAIL'), field: 'email', minWidth: 150},
      {
        headerName: this.translate.instant('ADMIN.USER.LABEL.TERM'),
        field: 'term',
        minWidth: 170,
        cellRenderer: 'dropDownRenderer',
        cellRendererParams: {
          onClick: this.onChangeTerm.bind(this),
          options: [
            {label: this.translate.instant('ADMIN.SUBSCRIPTION.LABEL.MONTHLY'), value: 'MONTHLY'},
            {label: this.translate.instant('ADMIN.SUBSCRIPTION.LABEL.YEARLY'), value: 'YEARLY'},
          ]
        }
      },
      {
        headerName: this.translate.instant('ADMIN.USER.LABEL.DETAILS'),
        field: 'logo',
        minWidth: 100,
        cellRenderer: 'buttonRenderer',
        cellRendererParams: {
          onClick: this.onRedirectDetail.bind(this),
          label: this.translate.instant('COMMON.LABEL.VIEW'),
          btnClass: 'btn btn-primary btn-xs'
        }
      },
      {
        headerName: this.translate.instant('COMMON.LABEL.REMOVE'),
        minWidth: 150,
        cellRenderer: 'buttonRenderer',
        cellRendererParams: {
          onClick: this.onRemove.bind(this),
          isBtnIcon: true,
          iconClass: 'fas fa-trash text-danger'
        }
      }
    ]
  }

  onRemove(params) {
    const data = {
      data: {
        confirmMessage: this.translate.instant('ADMIN.ENQUIRY.MESSAGE.REMOVE_MESSAGE_OF_ENQUIRY', {"EMAIL": params.rowData.email})
      }
    }
    this.commonService.openDialog(PBConfirmPromptComponent, {}, data).then((res: any) => {
      if (res) {
        console.log(params);
        // call remove api
      }
    });
  }

  onViewLogo(params) {
    console.log(params);
    const data = {
      logo: params.rowData.logo
    }
    this.commonService.openDialog(LogoViewerComponent, {}, data).then((res: any) => {
      if (res) {
        console.log(params);
        // call remove api
      }
    });
  }

  onChangeTerm(params) {
    console.log(params.event);
  }

  onRedirectDetail(params) {
    this.router.navigate([`/admin/user/detail/${params.rowData.user_id}`])
  }

  searchData(params) {
    return of([
      {
        sr_no: 1,
        user_id: 123,
        role: 'USER',
        business_name: 'ABC',
        phone: 1234567890,
        email: 'abc@gmail.com',
        logo: 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        address: 'hiii address',
        tagline: 'tagline',
        website: 'www.google.com',
        term: 'YEARLY'
      }
    ]);
  }

  detectChange() {
    try {
      this.changeRef.detectChanges();
    } catch (e) {
      console.log(e);
    }
  }
}
