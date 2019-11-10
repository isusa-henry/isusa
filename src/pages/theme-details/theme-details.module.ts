import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ThemeDetailsPage } from './theme-details';

@NgModule({
  declarations: [
    ThemeDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ThemeDetailsPage),
  ],
})
export class ThemeDetailsPageModule {}
