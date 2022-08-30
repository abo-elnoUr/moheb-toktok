import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
  subscribtion = new Subscription();
  recievers: any[] = [];
  clientNames: any[] = [];
  searchValue: any;
  constructor(private _Router: Router, private dashboard: DashboardService) {}

  ngOnInit(): void {
    this.findAllReciever();
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
          : this.clientNames
              .filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)
              .slice(0, 10)
      )
    );
  getReciever() {
    if (this.searchValue.length > 2 && this.recievers.length > 0) {
      this.recievers = this.recievers.filter(
        (element) =>
          element.recieverName == this.searchValue ||
          element.phoneNumber == this.searchValue
      );
    } else {
      this.findAllReciever();
    }
  }
  findAllReciever() {
    this.recievers = [];
    this.clientNames = []
    this.subscribtion.add(
      this.dashboard.findAllReciever().subscribe((res) => {
        if (res) {
          res.forEach((element: any) => {
            if (!this.clientNames.includes(element.recieverName)) {
              this.recievers.push(element);
              this.clientNames.push(element.recieverName)
            }
          });
        }
      })
    );
  }

  onSearch(recieverName: any) {
    this._Router.navigate(['../client/' + recieverName]);
  }

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }
}
