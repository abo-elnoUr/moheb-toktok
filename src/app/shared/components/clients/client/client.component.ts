import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { Products } from 'src/app/shared/models/products';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
  subscribtion = new Subscription();
  recieverName: string = '';
  products: any[] = [];
  reciever: any = {};
  recieverBank: any = {};
  paidValue: number = 0 ;
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private dashboard: DashboardService
  ) {
    this.recieverName =
      this._ActivatedRoute.snapshot.paramMap.get('recieverName') || '';
  }

  ngOnInit(): void {
    this.findAllByRecieverName();
    this.findAllProductsByRecieverByName();
    this.findAllBanksByReciverName();
  }

  findAllByRecieverName() {
    if (this.recieverName) {
      this.subscribtion.add(
        this.dashboard
          .findAllByRecieverName(this.recieverName)
          .subscribe((res) => {
            if (res) {
              this.reciever = res[0];
              this.findAllBanksByReciverName()
            }
          })
      );
    }
  }

  findAllBanksByReciverName() {
    if (this.recieverName) {
      this.subscribtion.add(
        this.dashboard
          .findAllBanksByReciverName(this.recieverName)
          .subscribe((res) => {
            if (res) {
              this.recieverBank = res ;
            }
          })
      );
    }
  }

  payDeptBank() {
    if (this.paidValue > 0) {
      this.subscribtion.add(
        this.dashboard
          .payDeptBank(this.paidValue , this.recieverName)
          .subscribe((res) => {
            if (res) {
              this.recieverBank = res ;
              this.paidValue = 0  ;
            }
          })
      );
    } else {
      alert('من فضلك ادخل القيمة المراد فعها')
    }
  }
  findAllProductsByRecieverByName() {
    if (this.recieverName) {
      this.subscribtion.add(
        this.dashboard
          .findAllProductsByRecieverByName(this.recieverName)
          .subscribe((res) => {
            if (res) {
              this.products = res;
            }
          })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }
}
