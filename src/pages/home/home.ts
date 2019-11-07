import { Component } from '@angular/core';
import { NavController, ModalController, AlertController,ViewController } from 'ionic-angular';
import * as moment from 'moment';
import * as firebase from 'firebase';
import {snapshotToArray} from '../../app/app.firebase.config';
import { registerLocaleData } from '@angular/common';
import localeFR from '@angular/common/locales/fr';
registerLocaleData(localeFR);

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  ref=firebase.database().ref('/');
 
  items = [];
  eventSource = []; 
 
  viewTitle: string;
  selectedDay = new Date();
  
 
  calendar = {
    mode: 'week',
    currentDate: new Date(),
    locale:'fr'
  };
  
  constructor(public navCtrl: NavController, private modalCtrl: ModalController, private alertCtrl: AlertController,public viewCtrl: ViewController) {
    this.ref.on('value',resp =>{
      this.items=snapshotToArray(resp);
    //  console.log('this.',);
      this.eventSource=[];
      var evs=[];
      var values=[];
      var ids=[];
      for(var i=0;i<this.items.length;i++)
      {
       values=Object.values(this.items[i]);
       ids=Object.keys(this.items[i]);
      console.log("values",values," ids= ",ids);
      for(var j=0;j<values.length-1;j++)
      {
        
        let objecttosend = {
          "title":values[j].title,
          "startTime":new Date(values[j].startTime),
          "endTime":new Date(values[j].endTime),
          "key":ids[j],
          "type":values[values.length-1],
          "typeRepas":values[j].type,
          "aliment":values[j].aliment,
          "quantite":values[j].quantité,
          "typeCouche":values[j].typeCouche
        } 
        console.log("ojecttosend",objecttosend," i ",j);
       evs.push(objecttosend);
  
      }
      
      }
      //console.log("from db",this.items[1]);
     
    
    //this.eventSource.push(x);
    this.eventSource = evs;
   

    
      });
      
   }
   changeMode(mode) {
    this.calendar.mode = mode;
}
  addEvent() {
    console.log("zebbi");
    let modal = this.modalCtrl.create('EventModalPage', {selectedDay: this.selectedDay});
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        let eventData = data;
 
        eventData.startTime = new Date(data.startTime);
        eventData.endTime = new Date(data.endTime);
 
        let events = this.eventSource;
        events.push(eventData);
        this.eventSource = [];
        setTimeout(() => {
          this.eventSource = events;
          console.log(this.eventSource)
        });
      }
    });
  }
 
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
 
  onEventSelected(event) {

    let modal2 = this.modalCtrl.create('EventDetailsPage', {selectedId: event.key,type:event.type,startTime:event.startTime,endTime:event.endTime,typeRepas:event.typeRepas,aliment:event.aliment,quantite:event.quantite,typeCouche:event.typeCouche});
    modal2.present();
   /* modal2.onDidDismiss(data => {
      if (data) {
        let eventData = data;
 
        eventData.startTime = new Date(data.startTime);
        eventData.endTime = new Date(data.endTime);
 
        let events = this.eventSource;
        events.push(eventData);
        this.eventSource = [];
        setTimeout(() => {
          //this.eventSource = events;
          console.log(this.eventSource)
        });
      }
    }); */



    
    
    
  }
 
  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
  }
  


}