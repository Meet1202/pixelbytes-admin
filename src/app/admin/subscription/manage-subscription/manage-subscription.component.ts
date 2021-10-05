import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {PBButton} from "../../../../components/form-elements/field-classes/pb-button";
import {PBSelectBox} from "../../../../components/form-elements/field-classes/pb-select-box";
import {PBEditor} from "../../../../components/form-elements/field-classes/pb-editor";
import {PBInputText} from "../../../../components/form-elements/field-classes/pb-input-text";
import {ActivatedRoute} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'ngx-manage-subscription',
  templateUrl: './manage-subscription.component.html',
  styleUrls: ['./manage-subscription.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageSubscriptionComponent implements OnInit {

  myForm: FormGroup;
  addEditField: PBButton;
  termField: PBSelectBox;
  descriptionField: PBEditor;
  priceField: PBInputText;
  subscriptionDetails: any
  userId: number;
  term: any;
  price: any;
  description: any;

  constructor(
    private changeRef: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    private elementRef: ElementRef
  ) {
    this.myForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.subscriptionDetails = params;
    });
    this.makeFields();
    if (this.subscriptionDetails) {
      this.setSubscriptionDetails();
    }
    this.detectChange();
  }

  makeFields() {
    this.makeAddEditField();
    this.makeTermField();
    this.makeDescriptionField();
    this.makePriceField();
  }

  makeAddEditField() {
    this.addEditField = new PBButton({
      fieldName: 'addEdit',
      btnText: this.userId ? this.translate.instant('COMMON.LABEL.EDIT') : this.translate.instant('COMMON.LABEL.ADD'),
      class: 'btn-xs m-t-md'
    });
  }

  makeTermField() {
    this.termField = new PBSelectBox({
      fieldName: 'term',
      displayLabel: this.translate.instant('ADMIN.SUBSCRIPTION.LABEL.SELECT_TERM'),
      options: [
        {label: this.translate.instant('ADMIN.SUBSCRIPTION.LABEL.MONTHLY'), value: 'MONTHLY'},
        {label: this.translate.instant('ADMIN.SUBSCRIPTION.LABEL.YEARLY'), value: 'YEARLY'},
      ]
    });
  }

  makeDescriptionField() {
    this.descriptionField = new PBEditor({
      fieldName: 'description',
      displayLabel: this.translate.instant('COMMON.LABEL.DESCRIPTION')
    });
  }

  makePriceField() {
    this.priceField = new PBInputText({
      fieldName: 'price',
      displayLabel: this.translate.instant('ADMIN.SUBSCRIPTION.LABEL.PRICE')
    });
  }

  setPreviewData(event) {
    if (event.fieldName == 'term') {
      this.term = event.formControl.value[0].value;
    } else if (event.fieldName == 'description') {
      document.querySelector('.description').innerHTML = event.formControl.value;
    } else if (event.fieldName == 'price') {
      this.price = event.formControl.value;
    }
    this.detectChange();
  }

  setSubscriptionDetails() {
    if (this.subscriptionDetails) {
      this.termField.value = this.subscriptionDetails['term'];
      this.term = this.subscriptionDetails['term'] || "None";
      this.descriptionField.value = this.subscriptionDetails['description'];
      document.querySelector('.description').innerHTML = this.subscriptionDetails['description'] || 'test';
      this.priceField.value = this.subscriptionDetails['price'];
      this.price = this.subscriptionDetails['price'] || 0;
    }
  }

  addEdit(event) {
    if (this.userId) {
      console.log('Edit mode::', this.myForm.value)
    } else {
      console.log('Add mode::', this.myForm.value);
    }
  }

  goBack() {
    window.history.back();
  }

  detectChange() {
    try {
      this.changeRef.detectChanges();
    } catch (e) {
      console.log(e);
    }
  }
}
