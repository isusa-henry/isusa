import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {User} from "../../models/user";
import {RegisterPage} from '../Register/Register';
import{AngularFireAuth} from"angularfire2/auth";
import {HomePage} from '../home/home';
import {TabsPage} from '../tabs/tabs'


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

  user = {} as User;

  constructor(private afAuth:AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
  }

  async login(user: User){
     try{
      const res= await this.afAuth.auth.signInWithEmailAndPassword(user.email,user.password);
      console.log(res);
      if (res)
      {
        this.navCtrl.push(TabsPage);
      }
     }
     catch(e){
      console.error(e);
     }

  }
  register(){
    this.navCtrl.push(RegisterPage);
  }
}
