import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ThemeFormPage } from './theme-form';

@NgModule({
  declarations: [
    ThemeFormPage,
  ],
  imports: [
    IonicPageModule.forChild(ThemeFormPage),
  ],
})
export class ThemeFormPageModule {}
