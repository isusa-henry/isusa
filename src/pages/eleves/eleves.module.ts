import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ElevesPage } from './eleves';

@NgModule({
  declarations: [
    ElevesPage,
  ],
  imports: [
    IonicPageModule.forChild(ElevesPage),
  ],
})
export class ElevesPageModule {}
