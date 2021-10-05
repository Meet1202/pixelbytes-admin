import {AfterViewInit, Component, ElementRef, Input, OnInit, Output, ViewChild, EventEmitter} from '@angular/core';
import {IDropdownSettings} from 'ng-multiselect-dropdown';
import {BaseFormComponent} from '../base-form/base-form.component';
import {FormControl} from '@angular/forms';

declare const $: any;
const _ = {
  get: require('lodash/get'),
  compact: require('lodash/compact'),
  filter: require('lodash/filter'),
  forEach: require('lodash/forEach'),
  map: require('lodash/map')
};

@Component({
  selector: 'pb-select-box',
  templateUrl: './pb-select-box.component.html'
})
export class PBSelectBoxComponent extends BaseFormComponent implements OnInit, AfterViewInit {

  @Input() isMultiple: boolean;
  @Input() dropdownSettings: IDropdownSettings;
  @ViewChild('multiSelectComponent') multiSelectComponent: ElementRef;
  @Output() onSelectChange = new EventEmitter();
  @Output() blur: EventEmitter<any> = new EventEmitter<any>();
  dropDownButtonRef: any;

  /*value: any;*/

  constructor(private elementRef: ElementRef) {
    super();
  }

  ngOnInit(): void {
    this.isMultiple = this.fieldMeta.isMultiple || false;
    this.setValue();
    super.ngOnInit();
    this.setDropDownSettings();
  }

  ngAfterViewInit(): void {
    this.setDefaultStyles();
    this.onChange(this.value);
  }

  setValue() {
    const value = _.filter(this.fieldMeta.options, (option: any) => {
      if (this.isMultiple && this.fieldMeta.value) {
        return this.fieldMeta.value.includes(option.value);
      } else {
        return option.value == this.fieldMeta.value;
      }
    });
    this.value = value;
    this.detectChanges();
  }

  setDefaultStyles() {
    $('.dropdown-list .no-data').addClass('no-data-find-in-select');
    this.dropDownButtonRef = $(this.elementRef.nativeElement).find('#' + this.fieldMeta.fieldName).find('.dropdown-btn');
    this.dropDownButtonRef.addClass('form-control');
    this.dropDownButtonRef.addClass('default-input-border-color');
    this.dropDownButtonRef.html(`<span class="selected-item-text">${this.fieldMeta.placeholder}</span><span class="drop-down-arrow"><i class="fas fa-caret-down"></i></span>`);

  }

  setDropDownSettings() {
    const selectSettings: any = this.fieldMeta.selectSettings || {};
    console.log(this.fieldMeta.selectSettings);
    this.dropdownSettings = {
      singleSelection: !(!!this.isMultiple),
      idField: 'value',
      textField: 'label',
      enableCheckAll: !!this.isMultiple,
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      allowSearchFilter: !!selectSettings.enableSearch,
      clearSearchFilter: !!selectSettings.enableSearch,
      maxHeight: selectSettings.maxHeight || 100,
      /*itemsShowLimit?: number;
      limitSelection?: number;*/
      searchPlaceholderText: selectSettings.searchPlaceholder || 'Search',
      noDataAvailablePlaceholderText: selectSettings.noDataFoundPlaceholder || 'No Data Found',
      closeDropDownOnSelection: !this.isMultiple,
      showSelectedItemsAtTop: !!selectSettings.showSelectedItemsAtTop,
      defaultOpen: !!selectSettings.defaultOpen,
      allowRemoteDataSearch: !!selectSettings.allowRemoteDataSearch
    };
    console.log(this.dropdownSettings);
    this.detectChanges();
  }


  getFormControl() {
    return new FormControl(this.value, this.setValidations());
  }

  onBlur(event: any) {
    this.isBlur = true;
    this.detectChanges();

  }

  checkValidation() {
    // @ts-ignore
    const invalid = this.formGroup.controls[this.fieldMeta.fieldName].touched && this.formGroup.controls[this.fieldMeta.fieldName].invalid;
    if (invalid) {
      this.dropDownButtonRef.addClass(this.errorBorderClassName);
    } else {
      this.dropDownButtonRef.removeClass(this.errorBorderClassName);
    }
  }

  onItemSelect(event: any) {
    console.log('onItemSelect', event);
    this.blur.emit({
      formControl: this.formGroup.controls[this.fieldMeta.fieldName],
      fieldName: this.fieldMeta.fieldName
    });
  }

  onChange(event: any) {
    let label = this.fieldMeta.placeholder || 'Select';
    const selectedData = event;
    if (this.isMultiple) {
      if (selectedData && selectedData.length > 0) {
        if (selectedData.length === 1) {
          label = selectedData[0].label;
        } else {
          if (this.fieldMeta.selectSettings && this.fieldMeta.selectSettings.multipleSelectedText) {
            label = `${this.fieldMeta.selectSettings.multipleSelectedText} [${selectedData.length}]`;
          } else {
            label = `Selected Items: [${selectedData.length}]`;
          }
        }
      }
    } else if (selectedData && selectedData.length > 0) {
      label = selectedData[0].label;
    }

    this.dropDownButtonRef.html(`<span class="selected-item-text">${label}</span><span class="drop-down-arrow"><i class="fas fa-caret-down"></i></span>`);
    this.checkValidation();
    this.onSelectChange.emit(event);
  }

  onDropDownClose(event: any) {
    const icon = $(this.dropDownButtonRef).find('.fas.fa-caret-up');
    icon.addClass('fa-caret-down');
    icon.removeClass('fa-caret-up');
  }

  onOpenDropDownList(event: any) {
    this.setDropDownWidth(event);
    const list = $(this.elementRef.nativeElement).find('.multiselect-item-checkbox.ng-star-inserted');
    _.forEach(list, (listObject: any) => {
      if (listObject) {
        const listRef = $(listObject);
        const children = listObject.children;
        if (children && children.length > 0 && children[0] && children[0].checked) {
          listRef.addClass('selected-item');
        } else {
          listRef.removeClass('selected-item');
        }
      }
    });
  }

  setDropDownWidth(event: any) {
    if (!$(this.elementRef.nativeElement).find('.dropdown-list')[0].hidden) {
      const dropRef = $(this.elementRef.nativeElement).find('.dropdown-list');
      const dropRefWidth = dropRef.width();
      const parentRefWidth = $(event.target).width();
      console.log(dropRefWidth, parentRefWidth);
      if (dropRefWidth < parentRefWidth) {
        const widthToSet = parentRefWidth + 25;
        dropRef.attr('style', 'width:' + widthToSet + 'px !important');
      }
      const icon = $(this.dropDownButtonRef).find('.fas.fa-caret-down');
      icon.removeClass('fa-caret-down');
      icon.addClass('fa-caret-up');
    }
  }

}
