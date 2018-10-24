import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingBasicServiceComponent } from './basic-service/basic-service.component';

const routes: Routes = [

  { path: 'basic-service', component: SettingBasicServiceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
