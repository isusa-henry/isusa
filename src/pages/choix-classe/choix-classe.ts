import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import * as firebase from 'firebase';
import { snapshotToArray } from '../../app/app.firebase.config';
import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the ChoixClassePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-choix-classe',
  templateUrl: 'choix-classe.html',
})
export class ChoixClassePage {

  
  CorrespondantClassList= []

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    let recieved_user_classes = this.navParams.get('user_classes_param')
    console.log("(choix classes page) => recieved users's classes list from login page :",recieved_user_classes,"test data ",this.navParams.data);
    this.CorrespondantClassList=recieved_user_classes
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChoixClassePage');
  }
  cancel() {
    this.viewCtrl.dismiss();
  }
  MovingToApp(id_classe_query)
  {
      console.log("(choix claase page) choosed classes_id : ", id_classe_query,"\n ===> moving to app ...");
      this.navCtrl.push(TabsPage, { Choosed_classe_id:id_classe_query });
  }

}
