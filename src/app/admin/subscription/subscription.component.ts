import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {PBButton} from "../../../components/form-elements/field-classes/pb-button";
import {TranslateService} from "@ngx-translate/core";
import {FormService} from "../../../services/form-service/form.service";
import {of} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'ngx-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {

  myForm: FormGroup;
  subscriptions: any = [];
  removeBtnField: PBButton;
  editBtnField: PBButton;

  constructor(
    private translate: TranslateService,
    private formService: FormService,
    private changeRef: ChangeDetectorRef,
    private router: Router
  ) {
    this.myForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.getSubscriptions();
    this.makeField();
    this.detectChange();
  }

  makeField() {
    this.removeBtnField = new PBButton({
      fieldName: 'removeBtn',
      btnText: this.translate.instant('COMMON.LABEL.REMOVE'),
      status: 'danger',
      class: 'btn-xs'
    });
    this.editBtnField = new PBButton({
      fieldName: 'editBtn',
      btnText: this.translate.instant('COMMON.LABEL.EDIT'),
      class: 'btn-xs'
    });
  }

  onEdit(event, subscription) {
    this.router.navigate(['/admin/subscription/manage', subscription]);
  }

  onRemove(event) {}

  getSubscriptions() {
    of([
      {term: 'MONTHLY', description: 'abcd', price: 200},
      {term: 'YEARLY', description: 'abcd', price: 1000}
    ]).subscribe((response) => {
      this.subscriptions = response;
      this.detectChange();
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
