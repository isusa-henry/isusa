import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ToastController } from 'ionic-angular';


import * as firebase from 'firebase';
import { snapshotToArray } from '../../app/app.firebase.config';
import { ThemePage } from '../theme/theme';
//import { ChoixClassePage } from './../choix-classe/choix-classe';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = { email: "", password: "" };
  //ref = firebase.database().ref('users/');

  constructor(
    public navCtrl: NavController,
    private modalCtrl: ModalController,
    public navParams: NavParams,
    public toastController: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  login(user) {
    console.log('sent user from login form : ', user);
    firebase.database().ref('users').orderByChild("email").equalTo(user.email).once('value').then(
      (data) => {
        let usernode = snapshotToArray(data);
        let user_classes = usernode[0].classes;
        console.log(' Recieved searched user from firebase : ', usernode, "\n user's classes list : ", user_classes);
        let modal = this.modalCtrl.create('ChoixClassePage', { user_classes_param: user_classes });
        modal.present();
      }, (error) => {
        this.presentToast("Erreur lors de la récuperation des données users ");
      }
    );
  }


  presentToast(text) {
    const toast = this.toastController.create({
      message: text,
      duration: 2000
    });
    toast.present();
  }
}
