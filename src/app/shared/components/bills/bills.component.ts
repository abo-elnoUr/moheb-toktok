import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DashboardService } from 'src/app/core/services/dashboard.service';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss'],
})
export class BillsComponent implements OnInit {
  subscribtion = new Subscription();
  bills: any[] = [];
  constructor(private dashboard: DashboardService) {}

  ngOnInit(): void {
    this.findAllBills();
  }

  findAllBills() {
    this.subscribtion.add(
      this.dashboard.findAllBills().subscribe((res) => {
        if (res) {
          this.bills = res;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }
}
