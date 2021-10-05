import {AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output} from '@angular/core';
import {BaseFormComponent} from '../base-form/base-form.component';
import {FormControl} from '@angular/forms';
import {AngularEditorConfig} from "@kolkov/angular-editor";

declare const $: any;
const _ = {
  assign: require('lodash/assign'),
  cloneDeep: require('lodash/cloneDeep'),
  forEach: require('lodash/forEach')
};

@Component({
  selector: 'pb-editor',
  templateUrl: './pb-editor.component.html'
})
export class PBEditorComponent extends BaseFormComponent implements OnInit, AfterViewInit {

  @Output() blur: EventEmitter<any> = new EventEmitter<any>();

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '100px',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      {class: 'arial', name: 'Arial'},
      {class: 'times-new-roman', name: 'Times New Roman'},
      {class: 'calibri', name: 'Calibri'},
      {class: 'comic-sans-ms', name: 'Comic Sans MS'}
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      }
    ],
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      [
        'insertImage',
        'insertVideo',
        'toggleEditorMode'
      ]
    ]
  };

  toolbars: any = {
    textToolbar: {
      className: 'text-toolbar-container',
      isOpen: false
    },
    paragraphToolbar: {
      className: 'paragraph-toolbar-container',
      isOpen: false
    }
  };

  constructor(private elementRef: ElementRef) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.configEditor();
  }

  ngAfterViewInit(): void {}

  // open(toolbarName: string) {
  //   _.forEach(this.toolbars, (value: any, key: any) => {
  //     if (key && key == toolbarName) {
  //       this.toolbars[key].isOpen = !this.toolbars[key].isOpen;
  //     } else {
  //       this.toolbars[key].isOpen = false;
  //     }
  //   });
  //   if (this.toolbars[toolbarName].isOpen) {
  //     this.openToolbar(this.toolbars[toolbarName].className);
  //   } else {
  //     this.closeToolbar(this.toolbars[toolbarName].className);
  //   }
  // }
  //
  // openToolbar(toolbarContainerName: string) {
  //   const parentToolbar = $(this.elementRef.nativeElement).find('.' + toolbarContainerName);
  //   parentToolbar.removeClass('close-toolbar');
  //   parentToolbar.addClass('open-toolbar');
  // }
  //
  // closeToolbar(toolbarContainerName: string) {
  //   const parentToolbar = $(this.elementRef.nativeElement).find('.' + toolbarContainerName);
  //   parentToolbar.removeClass('open-toolbar');
  //   parentToolbar.addClass('close-toolbar');
  // }

  configEditor() {
    if (this.fieldMeta && this.fieldMeta.editorSettings) {
      this.editorConfig = _.assign(this.editorConfig, this.fieldMeta.editorSettings);
    }
  }

  getFormControl() {
    return new FormControl(this.fieldMeta.value, this.setValidations(this.fieldMeta));
  }
  onBlur(event: any) {
    this.isBlur = true;
    console.log('log from blur')
    this.blur.emit({
      formControl: this.formGroup.controls[this.fieldMeta.fieldName],
      fieldName: this.fieldMeta.fieldName
    });
    this.detectChanges();
  }

}
