import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import {User} from "../../models/user";
import{AngularFireAuth} from"angularfire2/auth";
import { ToastController } from 'ionic-angular';
import { LoginPage } from '../Login/Login';


@Component({
  selector: 'page-register',

  templateUrl: 'register.html',
})
export class RegisterPage {

  user= {} as User;

  constructor(private afAuth:AngularFireAuth ,public navCtrl: NavController, public navParams: NavParams,private toastCtrl: ToastController) {
  }

  async register(user: User){
   try {
      const result =await this.afAuth.auth.createUserWithEmailAndPassword(user.email,user.password);
        console.log(result);
        const toast = await this.toastCtrl.create({
          message: 'User created succesfully',
          duration: 2000
        });
        toast.present();
        this.navCtrl.push(LoginPage);

    }
  catch(e){
    console.error(e);
  }
}

  
}
