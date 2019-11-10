import { Component } from '@angular/core';
import { ToastController, IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import * as firebase from 'firebase';
import { snapshotToArray } from '../../app/app.firebase.config';
/**
 * Generated class for the ThemeDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-theme-details',
  templateUrl: 'theme-details.html',
})
export class ThemeDetailsPage {
  items = [

  ];
  showhidefavorite = 0;
  showtitle = 0;
  showstart = 0;
  showend = 0;
  showtyperepas = 0;
  showaliment = 0;
  showquantiterepas = 0;
  showtypecouche = 0;
  shownotes = 0;
  ref: any;
  selectedType = "";
  selectedID = "";
  selectedclass = "";
  event = { startTime: new Date().toISOString(), endTime: new Date().toISOString(), title: "", allDay: false };
  minDate = new Date().toISOString();

  constructor(public navCtrl: NavController, private navParams: NavParams, public viewCtrl: ViewController, public toastController: ToastController) {


    this.selectedID = this.navParams.get('selectedId');
    this.selectedType = this.navParams.get('type');

    this.event.startTime = this.navParams.get('startTime').toISOString();
    this.event.endTime = this.navParams.get('endTime').toISOString();
    this.event.title = this.navParams.get('title');
    this.selectedclass = this.navParams.get("selectedClasse");

    console.log('test from details ', this.event, " ++ key : ", this.selectedID, "class id ", this.selectedclass);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ThemeDetailsPage');
  }

  cancel() {
    this.viewCtrl.dismiss();
  }


  editItem(item) {

    console.log('test item to update', item);
    firebase.database().ref("/classes/"+this.selectedclass+"/themes/" + this.selectedID).update({ startTime: item.startTime, endTime: item.endTime, title: item.title });
    this.presentToast("activité modifiée avec succés!");
    this.viewCtrl.dismiss();
  }
  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000
    });
    toast.present();
  }
  deleteItem() {
    firebase.database().ref("/classes/" + this.selectedclass + "/themes/" + this.selectedID).remove();
    this.presentToast("activité supprimée avec succés!");
    this.viewCtrl.dismiss();
  }

}
