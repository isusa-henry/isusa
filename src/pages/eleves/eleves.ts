import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import * as firebase from 'firebase';
import { snapshotToArray } from '../../app/app.firebase.config';
import { type } from 'os';
/**
 * Generated class for the ElevesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-eleves',
  templateUrl: 'eleves.html',
})
export class ElevesPage {
  galleryType = 'regular';
  ActiveClassId: any;
  eleves_list = [];
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {

    this.ActiveClassId = this.navParams.data;
    console.log('Recieved active_classe_id in eleve page :', this.ActiveClassId);
    firebase.database().ref('/classes/' + this.ActiveClassId + '/eleves').on('value', resp => {
      this.eleves_list = snapshotToArray(resp);
      console.log('recieved eleves from eleves', this.eleves_list, typeof this.eleves_list);

    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ElevesPage');
  }
  nav(event) {
    console.log("from nav", event);
    this.navCtrl.push(HomePage, {
      id_classe_crud_event: this.ActiveClassId,
      selected_eleve: event
    });
  }

}
