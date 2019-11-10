import { ThemePage } from './../theme/theme';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ElevesPage } from '../eleves/eleves'

import * as firebase from 'firebase';
import { snapshotToArray } from '../../app/app.firebase.config';
/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  HomePage = HomePage;
  ElevesPage = ElevesPage;
  ThemePage = ThemePage;

  ActiveClassId: any
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let ActiveClassIdReciever = this.navParams.data;
    this.ActiveClassId = ActiveClassIdReciever.Choosed_classe_id;
    console.log('recieved classe id in tabs  ', ActiveClassIdReciever);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
