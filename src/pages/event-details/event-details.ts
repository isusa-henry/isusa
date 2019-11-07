import { Component } from '@angular/core';
import { ToastController, IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import * as moment from 'moment';
import * as firebase from 'firebase';
import {snapshotToArray} from '../../app/app.firebase.config';

@IonicPage()
@Component({
  selector: 'page-event-details',
  templateUrl: 'event-details.html',
})
export class EventDetailsPage {
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
  selectedType="";
  selectedID="";
  
  event = { startTime: new Date().toISOString(), endTime: new Date().toISOString(),title:"", allDay: false,typeRepas:"",aliment:"",quantite:"",typeCouche:"",notes:"",type:"" };
  minDate = new Date().toISOString();
 
  constructor(public navCtrl: NavController, private navParams: NavParams, public viewCtrl: ViewController,public toastController: ToastController) {
    this.ref.on('value',resp =>{
      this.items=snapshotToArray(resp);})
     this.selectedID = this.navParams.get('selectedId');
     this.selectedType=this.navParams.get('type');
      
    if(this.selectedType==="siestes")
    {
    this.event.startTime=this.navParams.get('startTime').toISOString();
    this.event.endTime=this.navParams.get('endTime').toISOString();
   // console.log('start iso',this.event.startTime);
    this.showstart = 0;
      this.showend=0;
      this.showtitle =1;  
      this.showtyperepas=1;
      this.showaliment=1;
      this.showquantiterepas=1;
      this.showtypecouche=1;
      this.shownotes=1;
    
    }
    if(this.selectedType==="repas")
    {
    this.event.startTime=this.navParams.get('startTime').toISOString();
    //this.event.endTime=this.navParams.get('endTime').toISOString();
    this.event.typeRepas=this.navParams.get('typeRepas');
    this.event.aliment=this.navParams.get('aliment');
    this.event.quantite=this.navParams.get('quantite');
   // console.log('start iso',this.event.startTime);
    this.showstart = 0;
      this.showend=1;
      this.showtitle =1;  
      this.showtyperepas=0;
      this.showaliment=0;
      this.showquantiterepas=0;
      this.showtypecouche=1;
      this.shownotes=1;
    
    }
    if(this.selectedType==="couches")
    {
    this.event.startTime=this.navParams.get('startTime').toISOString();
    //this.event.endTime=this.navParams.get('endTime').toISOString();
    
    
    this.event.typeCouche=this.navParams.get('typeCouche');
   // console.log('start iso',this.event.startTime);
    this.showstart = 0;
      this.showend=1;
      this.showtitle =1;  
      this.showtyperepas=1;
      this.showaliment=1;
      this.showquantiterepas=1;
      this.showtypecouche=0;
      this.shownotes=1;
    
    }
    if(this.selectedType==="douches")
    {
    this.event.startTime=this.navParams.get('startTime').toISOString();
    //this.event.endTime=this.navParams.get('endTime').toISOString();
    
    
    
   // console.log('start iso',this.event.startTime);
    this.showstart = 0;
      this.showend=1;
      this.showtitle =1;  
      this.showtyperepas=1;
      this.showaliment=1;
      this.showquantiterepas=1;
      this.showtypecouche=1;
      this.shownotes=1;
    
    }
  }
 
  cancel() {
    this.viewCtrl.dismiss();
  }
  
 
  editItem(item){
    if (this.selectedType==="siestes")
    {
      
      firebase.database().ref(this.selectedType+'/'+this.selectedID).update({startTime:item.startTime,endTime:item.endTime});
    
   
    

    
    
    }
    if (this.selectedType==="repas")
    {
      var start=new Date(item.startTime);
      var end=new Date(start.getTime() + 30*60000);
      firebase.database().ref(this.selectedType+'/'+this.selectedID).update({startTime:item.startTime,endTime:end.toISOString(),type:item.typeRepas,aliment:item.aliment,quantité:item.quantite})
      
    }
    if (this.selectedType==="couches")
    {
      var start=new Date(item.startTime);
      var end=new Date(start.getTime() + 30*60000);
      firebase.database().ref(this.selectedType+'/'+this.selectedID).update({startTime:item.startTime,endTime:end.toISOString(),typeCouche:item.typeCouche})
      
    }
    if (this.selectedType==="douches")
    {
      var start=new Date(item.startTime);
      var end=new Date(start.getTime() + 30*60000);
      firebase.database().ref(this.selectedType+'/'+this.selectedID).update({startTime:item.startTime,endTime:end.toISOString()})
      
    }
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
  deleteItem()
  {
    firebase.database().ref(this.selectedType+'/'+this.selectedID).remove();
    this.presentToast("activité supprimée avec succés!");
    this.viewCtrl.dismiss();
  }
  
 
}