import { Component } from '@angular/core';
import { ToastController, IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import * as firebase from 'firebase';
import * as moment from 'moment';
import { snapshotToArray } from '../../app/app.firebase.config';
/**
 * Generated class for the ThemeFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-theme-form',
  templateUrl: 'theme-form.html',
})
export class ThemeFormPage {

  ref: any;
  event = { startTime: new Date().toISOString(), endTime: new Date().toISOString(), title: "", allDay: false };
  showhidefavorite = 0;
  showtitle = 0;
  showstart = 0;
  showend = 0;
  showtyperepas = 0;
  showaliment = 0;
  showquantiterepas = 0;
  showtypecouche = 0;
  shownotes = 0;

  constructor(public navCtrl: NavController, private navParams: NavParams, public viewCtrl: ViewController, public toastController: ToastController) {
    var test = this.navParams.get('selectedClasse');
    console.log('from theme form selected id ', test);

    this.ref = firebase.database().ref('/classes/' + test + '/themes');
    let preselectedDate = moment(this.navParams.get('selectedDay')).format();
    this.event.startTime = preselectedDate;
    this.event.endTime = preselectedDate;
    this.showtitle = 1;
    this.showtyperepas = 1;
    this.showaliment = 1;
    this.showquantiterepas = 1;
    this.showtypecouche = 1;
    this.shownotes = 1;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ThemeFormPage');
  }
  cancel() {
    this.viewCtrl.dismiss();
  }
  addItem(item) {

    let newItem = this.ref.push();
    let s = { startTime: item.startTime, endTime: item.endTime, title: item.title };
    newItem.set(s);
    this.presentToast("Sieste ajoutée avec succés!");
    this.viewCtrl.dismiss();
  }
  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000
    });
    toast.present();
  }

}
