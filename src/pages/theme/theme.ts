import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import * as firebase from 'firebase';
import { snapshotToArray } from '../../app/app.firebase.config';
import { registerLocaleData } from '@angular/common';
import localeFR from '@angular/common/locales/fr';
registerLocaleData(localeFR);

/**
 * Generated class for the ThemePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-theme',
  templateUrl: 'theme.html',
})
export class ThemePage {

  items = [];
  eventSource = [];

  viewTitle: string;
  selectedDay = new Date();


  calendar = {
    mode: 'week',
    currentDate: new Date(),
    locale: 'fr'
  };
  ActiveClassId: any;

  constructor(public navCtrl: NavController, private modalCtrl: ModalController, public navParams: NavParams, public viewCtrl: ViewController) {
    var ActiveClassIdReciever = this.navParams.data;
    this.ActiveClassId = this.navParams.data;
    //  this.ActiveClassId=ActiveClassIdReciever.id_classe_param;
    console.log('test recieved id_classe from tabs (theme page ) ', ActiveClassIdReciever, this.ActiveClassId);

    firebase.database().ref('/classes/' + this.ActiveClassId + '/themes').ref.on('value', resp => {
      this.items = snapshotToArray(resp);

      console.log('theme check', this.items);
      let evs = [];
      let values = [];
      values = this.items;
      console.log("values", values);
      for (var j = 0; j < values.length; j++) {
        let objecttosend = {
          "title": values[j].title,
          "startTime": new Date(values[j].startTime),
          "endTime": new Date(values[j].endTime),
          "key": values[j].key,
        }
       // console.log("ojecttosend", objecttosend, " i ", j);
        evs.push(objecttosend);
      }
      this.eventSource = evs;
      console.log('themes on calendar :', this.eventSource);
    });
  }
  addEvent(k) {

    console.log("to modal from theme page : selected classe id", this.ActiveClassId,"kk ",k);
    if(k==1)
    {
      let modal = this.modalCtrl.create('ThemeFormPage', { selectedDay: this.selectedDay, selectedClasse: this.ActiveClassId,type:"theme" });
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
    else
    {
      let modal = this.modalCtrl.create('ThemeFormPage', { selectedDay: this.selectedDay, selectedClasse: this.ActiveClassId,type:"activite" });
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

  }

  changeMode(mode) {
    this.calendar.mode = mode;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ThemePage');
  }
  onEventSelected(event) {

    let modal2 = this.modalCtrl.create('ThemeDetailsPage', { selectedId: event.key, type: event.type, startTime: event.startTime, endTime: event.endTime, title: event.title, selectedClasse: this.ActiveClassId });
    modal2.present();
  }

  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
  }
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

}
