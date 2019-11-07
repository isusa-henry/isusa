import { Component } from '@angular/core';
import { ToastController, IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import * as moment from 'moment';
import * as firebase from 'firebase';
import {snapshotToArray} from '../../app/app.firebase.config';

@IonicPage()
@Component({
  selector: 'page-event-modal',
  templateUrl: 'event-modal.html',
})
export class EventModalPage {
  items = [
    
  ];
  showhidefavorite = 0;
  showtitle =0;
  showstart=0;
  showend=0;
  showtyperepas=0;
  showaliment=0;
  showquantiterepas=0;
  showtypecouche=0;
  shownotes=0;
  ref=firebase.database().ref('siestes/');
  refrepas=firebase.database().ref('repas/');
  refcouche=firebase.database().ref('couches/');
  refdouche=firebase.database().ref('douches/');

  event = { startTime: new Date().toISOString(), endTime: new Date().toISOString(),title:"", allDay: false,typeRepas:"",aliment:"",quantite:"",typeCouche:"",notes:"",type:"" };
  minDate = new Date().toISOString();
 
  constructor(public navCtrl: NavController, private navParams: NavParams, public viewCtrl: ViewController,public toastController: ToastController) {
    this.ref.on('value',resp =>{
      this.items=snapshotToArray(resp);})
    let preselectedDate = moment(this.navParams.get('selectedDay')).format();
    this.event.startTime = preselectedDate;
    this.event.endTime = preselectedDate;
    this.showtitle =1;  
    this.showtyperepas=1;
    this.showaliment=1;
      this.showquantiterepas=1;
      this.showtypecouche=1;
      this.shownotes=1;
  }
 
  cancel() {
    this.viewCtrl.dismiss();
  }
  onChange(event)
  {
    //console.log(event.target.value);
    console.log(event);
    if (event.toString()==="Sieste")
    {
      this.showstart = 0;
      this.showend=0;
      this.showtitle =1;  
      this.showtyperepas=1;
      this.showaliment=1;
      this.showquantiterepas=1;
      this.showtypecouche=1;
      this.shownotes=1;
      this.event.type="Sieste";
    }
    if (event.toString()==="Repas")
    {
      this.showstart = 0;
      this.showend=1;
      this.showtitle =1;  
      this.showtyperepas=0;
      this.showaliment=0;
      this.showquantiterepas=0;
      this.showtypecouche=1;
      this.shownotes=1;
    }
    if (event.toString()==="Couche")
    {
      this.showstart = 0;
      this.showend=1;
      this.showtitle =1;  
      this.showtyperepas=1;
      this.showaliment=1;
      this.showquantiterepas=1;
      this.showtypecouche=0;
      this.shownotes=1;
    }
    if (event.toString()==="Douche")
    {
      this.showstart = 0;
      this.showend=1;
      this.showtitle =1;  
      this.showtyperepas=1;
      this.showaliment=1;
      this.showquantiterepas=1;
      this.showtypecouche=1;
      this.shownotes=1;
    }
    if (event.toString()==="Notes")
    {
      this.showstart = 1;
      this.showend=1;
      this.showtitle =1;  
      this.showtyperepas=1;
      this.showaliment=1;
      this.showquantiterepas=1;
      this.showtypecouche=1;
      this.shownotes=0;
    }
  }
 
  addItem(item){
    if (item.type.toString()==="Sieste")
    {
    let newItem = this.ref.push();
    console.log(newItem);
    let s={startTime:item.startTime,endTime:item.endTime,title:item.type};

    newItem.set(s);
    this.presentToast("Sieste ajoutée avec succés!");
    this.viewCtrl.dismiss();
    }
    if (item.type.toString()==="Repas")
    {
    let newItem = this.refrepas.push();
   
      var start=new Date(item.startTime);
      var end=new Date(start.getTime() + 30*60000);
    item.endTime= end.toISOString();

    console.log(newItem);
    let s={startTime:item.startTime,endTime:item.endTime,title:item.type,type:item.typeRepas,aliment:item.aliment,quantité:item.quantite};

    newItem.set(s);
    this.presentToast("Repas ajouté avec succés!");
    this.viewCtrl.dismiss();
    }
    if (item.type.toString()==="Couche")
    {
    let newItem = this.refcouche.push();
    console.log(newItem);
    var start=new Date(item.startTime);
      var end=new Date(start.getTime() + 30*60000);
    item.endTime= end.toISOString();
    let s={startTime:item.startTime,endTime:item.endTime,title:item.type,typeCouche:item.typeCouche};

    newItem.set(s);
    this.presentToast("Couche ajoutée avec succés!");
    this.viewCtrl.dismiss();
    }
    if (item.type.toString()==="Douche")
    {
    let newItem = this.refdouche.push();
    var start=new Date(item.startTime);
      var end=new Date(start.getTime() + 30*60000);
    item.endTime= end.toISOString();
    console.log(newItem);
    let s={startTime:item.startTime,endTime:item.endTime,title:item.type};

    newItem.set(s);
    this.presentToast("Douche ajoutée avec succés!");
    this.viewCtrl.dismiss();
    }
    
  }
  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000
    });
    toast.present();
  }
  
 
}