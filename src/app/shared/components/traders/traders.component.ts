import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
@Component({
  selector: 'app-traders',
  templateUrl: './traders.component.html',
  styleUrls: ['./traders.component.scss'],
})
export class TradersComponent implements OnInit {
  subscribtion = new Subscription();
  suppliers: any[] = [];
  supplierNames: any[] = [];
  searchValue: any;
  constructor(private _Router: Router, private dashboard: DashboardService) {}

  ngOnInit(): void {
    this.findAllSupplier();
  }

  getSupplier() {
    if (this.searchValue.length > 2 && this.suppliers.length > 0) {
      this.suppliers = this.suppliers.filter(
        (element) => element.supplierName == this.searchValue
      );
    } else {
      this.findAllSupplier();
    }
  }

  search: OperatorFunction<string, readonly string[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      map((term) =>
        term.length < 1
          ? []
          : this.supplierNames
              .filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)
              .slice(0, 10)
      )
    );

  findAllSupplier() {
    this.suppliers = [];
    this.supplierNames = []
    this.subscribtion.add(
      this.dashboard.findAllSuppliers().subscribe((res) => {
        if (res) {
          res.forEach((element: any) => {
            if (!this.suppliers.includes(element)) {
              this.suppliers.push(element);
              this.supplierNames.push(element.supplierName)
            }
          });
        }
      })
    );
  }

  onSearch(supplierName: any) {
    this._Router.navigate(['../trader/' + supplierName]);
  }

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }
}
