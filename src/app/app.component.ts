import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Observable } from 'rxjs';

declare const sbutility;


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  private sharedPreferences;
  // tslint:disable-next-line:align

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.sharedPreferences = window['plugins'].SharedPreferences.getInstance('org.ekstep.genieservices.preference_file');
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.getUtmParameter();

    });

  }

  async getUtmParameter() {

    await this.getUtmInfo().then(response => {
      console.log('data................');
      if (response) {
        const utmTelemetry = new Map();
        utmTelemetry['utm_data'] = response;
        console.log('play Store Install referrer is : ', utmTelemetry);
        this.clearUtmInfo();
      }
    })
      .catch(error => {
        this.sharedPreferences.putString('utm_data', 'blank');
        console.log('Error is', error);
      });
  }

  getUtmInfo(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      try {
        (<any>window).sbutility.getUtmInfo((utmInfo: any) => {
          console.log('utm parameter', utmInfo);
          alert(JSON.stringify(utmInfo));
          resolve(utmInfo);
        }, err => {
          console.error('utm err', err);
          reject(err);
        });
      } catch (xc) {
        reject(xc);
      }
    });
  }

  clearUtmInfo(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      try {
        (<any>window).sbutility.clearUtmInfo(() => {
          console.log('utm paramter clear');
          resolve();
        }, err => {
          reject(err);
        });
      } catch (xc) {
        console.error(xc);
        reject(xc);
      }
    });
  }
}
