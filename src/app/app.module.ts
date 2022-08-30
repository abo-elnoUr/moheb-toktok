import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { MotocycleComponent } from './shared/components/motocycle/motocycle.component';
import { OthersComponent } from './shared/components/others/others.component';
import { PaintsComponent } from './shared/components/paints/paints.component';
import { TuktukComponent } from './shared/components/tuktuk/tuktuk.component';
import { TorocycleComponent } from './shared/components/torocycle/torocycle.component';
import { VisbaComponent } from './shared/components/visba/visba.component';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { LoginComponent } from './shared/components/login/login.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { ShortFallsComponent } from './shared/components/short-falls/short-falls.component';
import { DashboardService } from './core/services/dashboard.service';
import { AdminGuard } from './guard/admin.guard';
import { AuthGuard } from './guard/auth.guard';
import { ClientsComponent } from './shared/components/clients/clients.component';
import { BillsComponent } from './shared/components/bills/bills.component';
import { TradersComponent } from './shared/components/traders/traders.component';
import { ClientComponent } from './shared/components/clients/client/client.component';
import { TraderComponent } from './shared/components/traders/trader/trader.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    NotFoundComponent,
    MotocycleComponent,
    OthersComponent,
    PaintsComponent,
    TuktukComponent,
    TorocycleComponent,
    VisbaComponent,
    DashboardComponent,
    LoginComponent,
    ShortFallsComponent,
    ClientsComponent,
    BillsComponent,
    TradersComponent,
    ClientComponent,
    TraderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [DashboardService, AdminGuard, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
