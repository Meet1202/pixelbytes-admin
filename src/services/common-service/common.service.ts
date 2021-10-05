import {EventEmitter, Injectable} from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgbModalOptions} from '@ng-bootstrap/ng-bootstrap/modal/modal-config';

const _ = {
  forEach: require('lodash/forEach')
};

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private modalService: NgbModal) {
  }
  dialogList: any = [];
  onChangeTitle: EventEmitter<any> = new EventEmitter<any>();

  openDialog(component: any, dialogConfig: NgbModalOptions, dialogInput: any = {}) {
    const dialogRef = this.modalService.open(component, dialogConfig);
    _.forEach(dialogInput, (value: any, key: any) => {
      dialogRef.componentInstance[key] = value;
    });
    this.dialogList.push(dialogRef);
    return dialogRef.result;
  }

  closeDialog(send?: any) {
    const index = this.dialogList.length - 1;
    if (index > -1) { // Here we are closing the current active dialog
      this.dialogList[index].close(send);
    }
  }

  closeAllDialog() {
    _.forEach(this.dialogList, (dialogRef: any) => {
      if (dialogRef) {
        dialogRef.close('close-all');
      }
    });
  }

  setTitle(title: string) {
    this.onChangeTitle.emit(title);
  }

}
