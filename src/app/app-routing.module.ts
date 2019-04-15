import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { InformeComponent } from './informe/informe.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'informe', component: InformeComponent },
  { path: 'snapshot', component: InformeComponent },

  { path: 'home', component: HomeComponent },
  { path: 'not-found', component: NotFoundComponent},
  { path: '**', component: NotFoundComponent},
];
//http://localhost:4200/snapshot?token=c9afa88b728f34bdf3e2604fe8dfd104245397311fecd7babd02e463e5d3e3a7&todo=5a219a0de8486a619204d122&inprogress=5a219a0de8486a619204d123&blocked=5c6415552e231a6c83eb73fb&done=5a219a0de8486a619204d124

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports:[ RouterModule ]
})
export class AppRoutingModule { }
