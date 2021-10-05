import {Injectable, ChangeDetectorRef, ElementRef} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {FormGroup} from '@angular/forms';

declare const $;

@Injectable({
  providedIn: 'root',
})
export class FormService {

  constructor(private router: Router) {
  }

  isValid(myForm: FormGroup, elementRef: ElementRef, changRef: ChangeDetectorRef) {
    for (const key in myForm.controls) {
      if (myForm.controls[key] && myForm.controls[key].invalid) {
        myForm.controls[key].markAsTouched({onlySelf: true});
        const el = elementRef.nativeElement.querySelector('#' + key + '');
        el.focus();
        return;
      }
    }
    this.changeDetection(changRef);
  }

  showButtonLoader(event, changRef: ChangeDetectorRef) {
    if (event && event.btnData) {
      event.btnData.showLoading = true;
      event.btnData.showCompleted = false;
      event.btnData.disable = true;
      this.changeDetection(changRef);
    }
  }

  hideButtonLoader(event, changeRef: ChangeDetectorRef) {
    if (event && event.btnData) {
      event.btnData.showLoading = false;
      event.btnData.showCompleted = false;
      event.btnData.disable = false;
      this.changeDetection(changeRef);
    }
  }

  showCompletedMark(event, changeRef?: any) {
    if (event && event.btnData) {
      event.btnData.showLoading = false;
      event.btnData.showCompleted = true;
      event.btnData.disable = false;
      this.changeDetection(changeRef);

      setTimeout(() => {
        event.btnData.showLoading = false;
        event.btnData.showCompleted = false;
        this.changeDetection(changeRef);
      }, 2000);
    }
  }

  changeDetection(changeRef: any) {
    if (changeRef) {
      try {
        changeRef.detectChanges();
      } catch (e) {
      }
    }
  }
}
