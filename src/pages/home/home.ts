import { Component } from '@angular/core';
import { NavController, ModalController, AlertController, ViewController, NavParams } from 'ionic-angular';
import * as moment from 'moment';
import * as firebase from 'firebase';
import { snapshotToArray } from '../../app/app.firebase.config';
import { registerLocaleData } from '@angular/common';
import localeFR from '@angular/common/locales/fr';
registerLocaleData(localeFR);

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  ref: any;
  items = [];
  eventSource = [];

  viewTitle: string;
  selectedDay = new Date();
  SelectedClasseId: any;
  SelectedEleve: any;

  calendar = {
    mode: 'week',
    currentDate: new Date(),
    locale: 'fr'
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController, private alertCtrl: AlertController, public viewCtrl: ViewController) {

    var RecievedDataFromElevePage = this.navParams.data;
    this.SelectedClasseId = RecievedDataFromElevePage.id_classe_crud_event;
    this.SelectedEleve = RecievedDataFromElevePage.selected_eleve;


    console.log("Revieved data in home page ===\n all :", RecievedDataFromElevePage, " \n SelectedClasseId = '", this.SelectedClasseId, "\n SelectedEleve_key:", this.SelectedEleve);

    firebase.database().ref('/classes/' + this.SelectedClasseId + '/eleves/' + this.SelectedEleve + '/activites').on('value', resp => {
      this.items = snapshotToArray(resp);
      this.eventSource = [];
      console.log('from fire', this.items);
      var evs = [];
      var values = [];
      var ids = [];
      for (var i = 0; i < this.items.length; i++) {
        values = Object.values(this.items[i]);
        ids = Object.keys(this.items[i]);
        console.log("values", values, " ids= ", ids);
        for (var j = 0; j < values.length - 1; j++) {
          let objecttosend = {
            "title": values[j].title,
            "startTime": new Date(values[j].startTime),
            "endTime": new Date(values[j].endTime),
            "key": ids[j],
            "type": values[values.length - 1],
            "typeRepas": values[j].type,
            "aliment": values[j].aliment,
            "quantite": values[j].quantité,
            "typeCouche": values[j].typeCouche
          }
          console.log("ojecttosend", objecttosend, " i ", j);
          evs.push(objecttosend);
        }
      }
      this.eventSource = evs;
    });

  }
  changeMode(mode) {
    this.calendar.mode = mode;
  }
  addEvent() {
    console.log("zebbi");
    let modal = this.modalCtrl.create('EventModalPage', { selectedDay: this.selectedDay, id_classe_crud: this.SelectedClasseId, selected_eleve: this.SelectedEleve });
    modal.present();
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onEventSelected(event) {
    let modal2 = this.modalCtrl.create('EventDetailsPage', {
      selectedId: event.key, type: event.type, startTime: event.startTime, endTime: event.endTime, typeRepas: event.typeRepas,
      aliment: event.aliment, quantite: event.quantite, typeCouche: event.typeCouche, id_classe_crud_event: this.SelectedClasseId, selected_eleve: this.SelectedEleve
    });
    modal2.present();
  }
  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
  }
}