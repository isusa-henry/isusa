import { ThemePage } from './../pages/theme/theme';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/Login/Login';

import { RegisterPage } from '../pages/Register/Register';

import {AngularFireModule} from'angularfire2';
import {FIREBASE_CONFIG} from './app.firebase.config';
import{AngularFireAuthModule} from"angularfire2/auth"
import * as moment from 'moment';
import {NgCalendarModule} from 'ionic2-calendar'
import { registerLocaleData } from '@angular/common';
import localeFR from '@angular/common/locales/fr';
import {TabsPage} from '../pages/tabs/tabs';
import {ElevesPage} from '../pages/eleves/eleves';


registerLocaleData(localeFR);

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    TabsPage,
    ElevesPage,
    ThemePage
  ],
  imports: [
    NgCalendarModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    TabsPage,
    ElevesPage,
    ThemePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
   
  ]
})
export class AppModule {}
