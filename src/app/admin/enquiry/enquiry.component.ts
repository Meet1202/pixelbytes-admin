import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BaseList} from "../../../components/form-elements/base-list/base-list";
import {NotificationService} from "../../../services/notification-service/notification.service";
import {HttpClient} from "@angular/common/http";
import {of} from "rxjs";
import {ButtonRendererComponent} from "../../../components/renderers/button-renderer";
import {CommonService} from "../../../services/common-service/common.service";
import {PBConfirmPromptComponent} from "../../../components/form-elements/pb-confirm-prompt/pb-confirm-prompt.component";
import {TranslateService} from "@ngx-translate/core";
import {DropDownRenderer} from "../../../components/renderers/drop-down-renderer";
import {FormGroup} from "@angular/forms";
import {PBInputText} from "../../../components/form-elements/field-classes/pb-input-text";

@Component({
  selector: 'ngx-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.scss']
})
export class EnquiryComponent extends BaseList implements OnInit {

  myForm: FormGroup;
  searchField: PBInputText;
  frameworkComponents: any;

  constructor(
    notificationService: NotificationService,
    changeRef: ChangeDetectorRef,
    private http: HttpClient,
    private commonService: CommonService,
    private translate: TranslateService
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
    this.gridOptions.rowHeight = 48;
    this.makeSearchField();
  }

  makeSearchField() {
    this.searchField = new PBInputText({
      fieldName: 'search',
      placeholder: this.translate.instant('COMMON.LABEL.SEARCH'),
    });
  }

  prepareColumnDef() {
    this.columnDef = [
      {headerName: this.translate.instant('COMMON.LABEL.SR_NO'), field: 'sr_no'},
      {headerName: this.translate.instant('ADMIN.ENQUIRY.LABEL.PHONE'), field: 'phone'},
      {headerName: this.translate.instant('COMMON.LABEL.EMAIL'), field: 'email'},
      {headerName: this.translate.instant('ADMIN.ENQUIRY.LABEL.MESSAGE'), field: 'message'},
      {
        headerName: this.translate.instant('ADMIN.ENQUIRY.LABEL.STATUS'),
        field: 'status',
        minWidth: 200,
        cellRenderer: 'dropDownRenderer',
        cellRendererParams: {
          onClick: this.onChangeStatus.bind(this),
          options: [
            {label: "Pending", value: 'pending'},
            {label: "Completed", value: 'completed'},
          ]
        }
      },
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

  onChangeStatus(params) {
    console.log(params);
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

  searchData(params) {
    return of([
      {sr_no: 1, phone: 12345678, email: 'abc@gmail.com', message: 'text', status: 'completed'},
    ]);
  }

}
