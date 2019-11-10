import { type } from 'os';
import { Component } from '@angular/core';
import { ToastController, IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import * as firebase from 'firebase';
import * as moment from 'moment';
import { snapshotToArray } from '../../app/app.firebase.config';
import undefined from 'firebase/empty-import';
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
  showhstart=1;
  recievedType=""

  constructor(public navCtrl: NavController, private navParams: NavParams, public viewCtrl: ViewController, public toastController: ToastController) {
    let activeClasse = this.navParams.get('selectedClasse');
    this.recievedType = this.navParams.get('type');
    if(this.recievedType=="activite")
    {
      this.showhstart=0;
    }
    console.log('from theme form selected id ', activeClasse,"type recieved ",this.recievedType);

    this.ref = firebase.database().ref('/classes/' + activeClasse + '/themes');
    let preselectedDate = moment(this.navParams.get('selectedDay')).format();
    this.event.startTime = preselectedDate;
    this.event.endTime = preselectedDate;
 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ThemeFormPage');
  }
  cancel() {
    this.viewCtrl.dismiss();
  }
  addItem(item) 
  {
    var s :any;
    if(item.type=='activite')
    s = { startTime: item.startTime, endTime: item.endTime, title: item.title,description:item.description,note:item.note,type:this.recievedType};  
    else
    s = { startTime: item.startTime, endTime: item.endTime, title: item.title,description:item.description,type:this.recievedType};

    let newItem = this.ref.push();
  //  let s = { startTime: item.startTime, endTime: item.endTime, title: item.title,description:item.description,note:item.note,type:this.recievedType};
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
