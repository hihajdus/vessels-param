import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmissionsComponent } from './emissions/emissions/emissions.component';
import { VesselsComponent } from './vessels/vessels/vessels.component';

const routes: Routes = [
  { path: 'emissions', component: EmissionsComponent },
  { path: 'vessels', component: VesselsComponent },
  { path: '', redirectTo: '/vessels', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
