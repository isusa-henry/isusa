import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChoixClassePage } from './choix-classe';

@NgModule({
  declarations: [
    ChoixClassePage,
  ],
  imports: [
    IonicPageModule.forChild(ChoixClassePage),
  ],
})
export class ChoixClassePageModule {}
