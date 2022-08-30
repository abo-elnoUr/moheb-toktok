import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MotocycleComponent } from './shared/components/motocycle/motocycle.component';
import { TuktukComponent } from './shared/components/tuktuk/tuktuk.component';
import { TorocycleComponent } from './shared/components/torocycle/torocycle.component';
import { VisbaComponent } from './shared/components/visba/visba.component';
import { OthersComponent } from './shared/components/others/others.component';
import { PaintsComponent } from './shared/components/paints/paints.component';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { LoginComponent } from './shared/components/login/login.component';
import { ShortFallsComponent } from './shared/components/short-falls/short-falls.component';
import { ClientsComponent } from './shared/components/clients/clients.component';
import { TradersComponent } from './shared/components/traders/traders.component';
import { BillsComponent } from './shared/components/bills/bills.component';
import { ClientComponent } from './shared/components/clients/client/client.component';
import { TraderComponent } from './shared/components/traders/trader/trader.component';
// import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { AuthGuard } from './guard/auth.guard';
import { AdminGuard } from './guard/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  {
    path: 'motocycle',
    component: MotocycleComponent,
    canActivate: [AuthGuard],
  },
  { path: 'tuktuk', component: TuktukComponent, canActivate: [AuthGuard] },
  {
    path: 'torocycle',
    component: TorocycleComponent,
    canActivate: [AuthGuard],
  },
  { path: 'visba', component: VisbaComponent, canActivate: [AuthGuard] },
  { path: 'others', component: OthersComponent, canActivate: [AuthGuard] },
  { path: 'paints', component: PaintsComponent, canActivate: [AuthGuard] },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AdminGuard],
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'short-falls',
    component: ShortFallsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'clients',
    component: ClientsComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'client/:recieverName',
    component: ClientComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'traders',
    component: TradersComponent,
    canActivate: [AdminGuard],
  },
  { path: 'trader/:supplierName', component: TraderComponent },
  {
    path: 'bills',
    component: BillsComponent,
    canActivate: [AdminGuard],
  },

  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

// const routes: Routes = [
//   { path: '', redirectTo: '/', pathMatch: 'full' },
//   { path: '', component: HomeComponent },
//   {
//     path: 'motocycle',
//     component: MotocycleComponent
//   },
//   { path: 'tuktuk', component: TuktukComponent },
//   {
//     path: 'torocycle',
//     component: TorocycleComponent
//   },
//   { path: 'visba', component: VisbaComponent },
//   { path: 'others', component: OthersComponent },
//   { path: 'paints', component: PaintsComponent },
//   {
//     path: 'dashboard',
//     component: DashboardComponent
//   },
//   { path: 'login', component: LoginComponent },
//   {
//     path: 'short-falls',
//     component: ShortFallsComponent
//   },
//   {
//     path: 'clients',
//     component: ClientsComponent
//   },
//   {
//     path: 'client/:recieverName',
//     component: ClientComponent
//   },
//   {
//     path: 'traders',
//     component: TradersComponent
//   },
//   { path: 'trader/:supplierName', component: TraderComponent },
//   {
//     path: 'bills',
//     component: BillsComponent
//   },

//   { path: '**', redirectTo: '/', pathMatch: 'full' },
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
