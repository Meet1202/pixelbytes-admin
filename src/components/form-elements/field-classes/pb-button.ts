export class PBButton {
  fieldName: string;
  btnText: string;
  disable: boolean;
  class: string;
  type: string;
  iconClass: string;
  iconCssClass: string;
  showLoading: boolean;
  showCompleted: boolean;
  status: string;

  constructor(options: {
    fieldName?: string,
    btnText?: string,
    disable?: boolean,
    class?: string,
    type?: string,
    iconClass?: string,
    iconCssClass?: string,
    showLoading?: boolean,
    showCompleted?: boolean,
    status?: string,
  } = {}) {
    this.fieldName = options.fieldName || '';
    this.btnText = options.btnText || '';
    this.disable = options.disable || false;
    this.class = options.class || 'btn';
    this.type = options.type || 'button';
    this.iconClass = options.iconClass || '';
    this.iconCssClass = options.iconCssClass || '';
    this.showCompleted = options.showCompleted || false;
    this.showLoading = options.showLoading || false;
    this.status = options.status || 'primary';
  }

}
