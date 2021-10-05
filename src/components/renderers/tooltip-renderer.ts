import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'button-renderer',
  template: `
    <div tooltip="{{params.value}}" placement="bottom" showDelay="15">{{params.value}}</div>
    `
})

export class TooltipRendererComponent implements ICellRendererAngularComp {

  params: any;

  agInit(params): void {
    this.params = params;
  }

  refresh(params?: any): boolean {
    return true;
  }

}
