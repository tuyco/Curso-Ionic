import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { LoginPage } from '../pages/login/login';
import { MyApp } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { CarrosServiceProvider } from '../providers/carros-service/carros-service';
import { AgendamentosServiceProvider } from '../providers/agendamentos-service/agendamentos-service';
import { AgendamentoDaoProvider } from '../providers/agendamento-dao/agendamento-dao';
import { IonicStorageModule } from '@ionic/storage';
import { Vibration } from '@ionic-native/vibration'
import { DatePicker } from '@ionic-native/date-picker'

import 'rxjs/add/operator/finally'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/catch'
import 'rxjs/add/Observable/fromPromise'
import 'rxjs/add/Observable/of'
import { UserDaoProvider } from '../providers/user-dao/user-dao';
import { HomePage } from '../pages/home/home';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {}),
    IonicStorageModule.forRoot({
      name:  'aluraCar',
      storeName: 'agendamentos',
      driverOrder: ['indexeddb']
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CarrosServiceProvider,
    AgendamentosServiceProvider,
    AgendamentoDaoProvider,
    UserDaoProvider,
    Vibration,
    DatePicker
  ]
})
export class AppModule {}
