import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { SettingRoutingModule } from './setting-routing.module';
import { SettingBasicServiceComponent } from './basic-service/basic-service.component';
import { SettingBasicServiceEditComponent } from './basic-service/edit/edit.component';
import { SettingBasicServiceViewComponent } from './basic-service/view/view.component';

const COMPONENTS = [
  SettingBasicServiceComponent];
const COMPONENTS_NOROUNT = [
  SettingBasicServiceEditComponent,
  SettingBasicServiceViewComponent];

@NgModule({
  imports: [
    SharedModule,
    SettingRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class SettingModule { }
