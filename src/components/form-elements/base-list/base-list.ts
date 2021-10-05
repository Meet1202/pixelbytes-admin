import {ChangeDetectorRef, Directive, OnInit} from '@angular/core';
import {of} from "rxjs";
import {GridOptions, IGetRowsParams} from "ag-grid-community";
import {NotificationService} from "../../../services/notification-service/notification.service";

@Directive()
export class BaseList implements OnInit{

  pageSize: number = 25;
  gridOptions: GridOptions = {};
  columnDef: any = [];
  rowData: any = [];
  from: number = 1;
  pagination = true;
  maxRecordsToShow: number = Infinity;

  notificationMsgService: NotificationService;
  changeRef: ChangeDetectorRef;

  constructor(notificationMsgService: NotificationService,
              changeRef: ChangeDetectorRef) {
    this.notificationMsgService = notificationMsgService;
    this.changeRef = changeRef;
  }

  ngOnInit() {
    this.initializeGridOption();
    this.prepareColumnDef();
  }

  initializeGridOption() {
    this.gridOptions = {
      suppressContextMenu: true,
      rowHeight: 48,
      headerHeight: 44,
      rowModelType: 'infinite',
      paginationPageSize: this.pageSize,
      cacheOverflowSize: 100,
      // maxConcurrentDatasourceRequests: 1,
      infiniteInitialRowCount: 0,
      pagination: this.pagination,
      maxBlocksInCache: 100,
      cacheBlockSize: this.pageSize,
      rowGroupPanelShow: 'always',
      // suppressMovableColumns: true,
      // suppressDragLeaveHidesColumns: true,
      // suppressScrollOnNewData: true,
      // suppressPropertyNamesCheck: true,
      defaultColDef: {
        resizable: true,
        sortable: true,
        filter: false,
      },
      overlayLoadingTemplate: '<span class="ag-overlay-loading-center">Loading...</span>',
      overlayNoRowsTemplate: '<span class="ag-overlay-loading-center">No records found.</span>',
      onGridReady: (params) => {
        params.api.sizeColumnsToFit();
        this.setDataSource();
      },
      onSortChanged: (params) => {
      }
    };
  }

  setDataSource() {
    const datasource = {
      rowCount: null,
      getRows: (params: IGetRowsParams) => {
        this.showLoadingOverlay();
        this.searchData({from: this.from, rows: this.pageSize}).subscribe((data: any) => {
          this.rowData = this.rowData.concat(data);
          this.from = params.startRow;
          this.hideOverlay();
          setTimeout(() => {
            const rowsThisPage = data;
            let lastRow = -1;
            if (data.length <= params.endRow) {
              lastRow = data.length;
            }
            params.successCallback(rowsThisPage, lastRow);
          }, 500);
        }, (error) => {
          this.hideOverlay();
        });
      }
    };
    if (this.gridOptions && this.gridOptions.api) {
      this.gridOptions.api.setDatasource(datasource);
    }
  }

  showLoadingOverlay() {
    if (this.gridOptions && this.gridOptions.api) {
      this.gridOptions.api.showLoadingOverlay();
    }
  }

  hideOverlay() {
    if (this.gridOptions && this.gridOptions.api) {
      this.gridOptions.api.hideOverlay();
      if (!this.rowData || !this.rowData.length) {
        this.gridOptions.api.showNoRowsOverlay();
      }
    }
  }

  // Override from parent component..

  prepareColumnDef() {
  }

  searchData(params) {
    return of([]);
  }
}
