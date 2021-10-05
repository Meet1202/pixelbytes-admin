import {Component, Input, OnInit} from '@angular/core';
import {CommonService} from "../../../services/common-service/common.service";

@Component({
  selector: 'pb-confirm-prompt',
  templateUrl: './pb-confirm-prompt.component.html'
})
export class PBConfirmPromptComponent implements OnInit {

  @Input() data: any;
  confirmTitle: any;
  confirmMessage: string;
  okBtnText: any;
  cancelBtnText: any;

  constructor(private commonService: CommonService) {
  }

  ngOnInit(): void {
    this.confirmTitle = this.data && this.data.confirmTitle || 'Confirm Prompt';
    this.confirmMessage = this.data && this.data.confirmMessage || 'Are you sure?';
    this.okBtnText = this.data && this.data.okBtnText || 'Yes';
    this.cancelBtnText = this.data && this.data.cancelBtnText || 'No';
  }

  cancelDialog() {
    this.commonService.closeDialog();
  }

  confirmDialog() {
    this.commonService.closeDialog('confirm');
  }
}
