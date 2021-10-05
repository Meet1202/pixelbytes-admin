import {Injectable} from '@angular/core';
import Noty from 'noty';

const NOTY_THEME = 'metroui';
const DEFAULT_TIMEOUT = 3000;
const _ = {
  assign: require('lodash/assign')
};

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() {
  }

  static showSuccessNotification(message, extraOptions?: any) {
    if (!extraOptions || !extraOptions.timeout) {
      extraOptions = {timeout: DEFAULT_TIMEOUT};
    }
    new Noty(_.assign({
      theme: NOTY_THEME,
      progressBar: false,
      closeWith: ['button'],
      type: 'success',
      text: `<div class="mt-2">
              <div class="row">
                  <div class="col-2">
                     <span class="success-child-circle common-child-circle"><i class="far fas fa-check"></i></span>
                  </div>
                  <div class="col-10">
                    <p class="noty-message">${message}</p>
                  </div>
                </div>
            </div>`,
      killer: true
    }, extraOptions)).show();
  }

  static showErrorNotification(message, extraOptions?: any) {
    if (!extraOptions || !extraOptions.timeout) {
      extraOptions = {timeout: DEFAULT_TIMEOUT};
    }
    new Noty(_.assign({
      theme: NOTY_THEME,
      closeWith: ['button'],
      type: 'error',
      progressBar: false,
      text: `<Hiii></Hiii><div class="mt-2">
              <div class="row">
                  <div class="col-2">
                     <span class="error-child-circle common-child-circle"><i class="fas fa-exclamation-triangle"></i></span>
                  </div>
                  <div class="col-10">
                    <p class="noty-message">${message}</p>
                  </div>
                </div>
            </div>`,
      killer: true
    }, extraOptions)).show();
  }

  static showInfoNotification(message, extraOptions?: any) {
    if (!extraOptions || !extraOptions.timeout) {
      extraOptions = {timeout: DEFAULT_TIMEOUT};
    }
    new Noty(_.assign({
      theme: NOTY_THEME,
      progressBar: false,
      type: 'info',
      closeWith: ['button'],
      text: `<div class="mt-2">
              <div class="row">
                  <div class="col-2">
                     <span class="info-child-circle common-child-circle"><i class="fas fa-info"></i></span>
                  </div>
                  <div class="col-10">
                    <p class="noty-message">${message}</p>
                  </div>
                </div>
            </div>`,
      killer: true,
    }, extraOptions)).show();
  }

  static showWarningNotification(message, extraOptions?: any) {
    if (!extraOptions || !extraOptions.timeout) {
      extraOptions = {timeout: DEFAULT_TIMEOUT};
    }
    new Noty(_.assign({
      theme: NOTY_THEME,
      progressBar: false,
      type: 'warning',
      closeWith: ['button'],
      text: `<div class="mt-2">
              <div class="row">
                  <div class="col-2">
                     <span class="warning-child-circle common-child-circle"><i class="fas fa-exclamation"></i></span>
                  </div>
                  <div class="col-10">
                    <p class="noty-message">${message}</p>
                  </div>
                </div>
            </div>`,
      killer: true
    }, extraOptions)).show();
  }
}

// cross, icon, msg

// showSuccess, showError, showInfo, showWarning
