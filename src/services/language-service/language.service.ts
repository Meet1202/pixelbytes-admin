import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';
import {NotificationService} from '../notification-service/notification.service';

const FILES = {
  en: 'en.json'
};
@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private http: HttpClient) { }

  setTranslation(translationService: TranslateService, lang?: string) {
    lang = lang || 'en';
    const file = FILES[lang];
    this.http.get(`assets/i18n/${file}`).subscribe((response: any) => {
      translationService.setTranslation(lang, response, false);
      translationService.use(lang);
    }, (error: any) => {
      NotificationService.showErrorNotification(error);
    });
  }
}
