import {
  AfterViewInit, ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {BaseFormInterface} from '../base-form/base-form.interface';

const _ = {
  forEach: require('lodash/forEach')
};
@Component({
  selector: 'form-generator',
  templateUrl: './form-generator.component.html'
})
export class FormGeneratorComponent implements OnInit, AfterViewInit {

  @Input() formGroup: FormGroup;
  @Input() fieldMetas: any;
  @ViewChild('dynamicFormsRef', { read: ViewContainerRef }) dynamicFormsRef: any;
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    private changeRef: ChangeDetectorRef) {
  }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.loadForms();
    this.detectChanges();
  }
  loadForms() {
    _.forEach(this.fieldMetas, (fieldMeta: any) => {
      if (fieldMeta && fieldMeta.fieldName) {
        this.loadFormElement(fieldMeta);
      }
    });
  }

  loadFormElement(fieldMeta: BaseFormInterface<any>) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(fieldMeta.uiComponentName);
    const componentRef = this.dynamicFormsRef.createComponent(componentFactory);
    componentRef.instance.formGroup = this.formGroup;
    componentRef.instance.fieldMeta = fieldMeta;
    componentRef.instance.value = '';
  }

  detectChanges() {
    try {
      this.changeRef.detectChanges();
    } catch (error) {
    }
  }

}
