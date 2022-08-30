import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from 'src/app/core/services/dashboard.service';

@Component({
  selector: 'app-trader',
  templateUrl: './trader.component.html',
  styleUrls: ['./trader.component.scss'],
})
export class TraderComponent implements OnInit {
  supplierName: string = '';
  products: any[] = [];
  supplier: any = {};
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private dashboard: DashboardService
  ) {
    this.supplierName =
      this._ActivatedRoute.snapshot.paramMap.get('supplierName') || '';
  }

  ngOnInit(): void {
    this.findAllBySupplierName();
  }
  findAllBySupplierName() {
    this.products = [] ;
    if (this.supplierName) {
      this.dashboard.findAllBySupplierName(this.supplierName).subscribe((res) => {
        if (res) {
          this.products = res;
        }
      });
    }
  }
}
