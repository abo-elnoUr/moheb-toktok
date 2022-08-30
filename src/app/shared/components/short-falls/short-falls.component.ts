import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { Products } from '../../models/products';
import { Observable, OperatorFunction, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-short-falls',
  templateUrl: './short-falls.component.html',
  styleUrls: ['./short-falls.component.scss'],
})
export class ShortFallsComponent implements OnInit {
  subscribtion = new Subscription();
  // pagination variable
  totalLenght: any;
  page: number = 1;

  tuktuks: any[] = [];
  tuktukData: any = {};

  Torocycles: any[] = [];
  TorocycleData: any = {};

  Visbas: any[] = [];
  VisbaData: any = {};

  Others: any[] = [];
  OtherData: any = {};

  Paints: any[] = [];
  PaintData: any = {};

  Mototcycles: any[] = [];
  MototcycleData: any = {};
  constructor(private _DashboardService: DashboardService) {}

  ngOnInit(): void {
    this.findAllTuktuksLessThan();
    this.findAllMototcyclesLessThan();
    this.findAllOthersLessThan();
    this.findAllPaintsLessThan();
    this.findAllTorocyclesLessThan();
    this.findAllVisbasLessThan();
  }

  showImage(tuktuk: Products) {
    this.tuktukData = tuktuk;
  }

  findAllTuktuksLessThan() {
    this.subscribtion.add(
      this._DashboardService.findAllTuktuksLessThan().subscribe((res) => {
        if (res) {
          res.forEach((element: any) => {
            if (element in res) {
            } else {
              this.tuktuks.push(element);
            }
          });
        }
      })
    );
  }
  deleteTuktuk(id: any) {
    if (confirm('هل انت متاكد من حذف هذا المنتج ؟')) {
      this.subscribtion.add(
        this._DashboardService.deleteTuktuk(id).subscribe((res: any) => {
          if (res) {
            this.tuktuks.forEach((element, indes) => {
              if (element.tuktukId == id) {
                this.tuktuks.splice(indes, 1);
              }
            });
          }
        })
      );
    }
  }

  findAllPaintsLessThan() {
    this.subscribtion.add(
      this._DashboardService.findAllPaintsLessThan().subscribe((res) => {
        if (res) {
          res.forEach((element: any) => {
            if (element in res) {
            } else {
              this.Paints.push(element);
            }
          });
        }
      })
    );
  }
  deletePaints(id: any) {
    if (confirm('هل انت متاكد من حذف هذا المنتج ؟')) {
      this.subscribtion.add(
        this._DashboardService.deletePaints(id).subscribe((res: any) => {
          if (res) {
            this.Paints.forEach((element, indes) => {
              if (element.paintId == id) {
                this.Paints.splice(indes, 1);
              }
            });
          }
        })
      );
    }
  }
  findAllOthersLessThan() {
    this.subscribtion.add(
      this._DashboardService.findAllOthersLessThan().subscribe((res) => {
        if (res) {
          res.forEach((element: any) => {
            if (element in res) {
            } else {
              this.Others.push(element);
            }
          });
        }
      })
    );
  }
  deleteOther(id: any) {
    if (confirm('هل انت متاكد من حذف هذا المنتج ؟')) {
      this.subscribtion.add(
        this._DashboardService.deleteOther(id).subscribe((res: any) => {
          if (res) {
            this.Others.forEach((element, indes) => {
              if (element.otherId == id) {
                this.Others.splice(indes, 1);
              }
            });
          }
        })
      );
    }
  }
  findAllVisbasLessThan() {
    this.subscribtion.add(
      this._DashboardService.findAllVisbasLessThan().subscribe((res) => {
        if (res) {
          res.forEach((element: any) => {
            if (element in res) {
            } else {
              this.Visbas.push(element);
            }
          });
        }
      })
    );
  }
  deleteVisba(id: any) {
    if (confirm('هل انت متاكد من حذف هذا المنتج ؟')) {
      this.subscribtion.add(
        this._DashboardService.deleteVisba(id).subscribe((res: any) => {
          if (res) {
            this.Visbas.forEach((element, indes) => {
              if (element.visbaId == id) {
                this.Visbas.splice(indes, 1);
              }
            });
          }
        })
      );
    }
  }
  findAllTorocyclesLessThan() {
    this.subscribtion.add(
      this._DashboardService.findAllTorocyclesLessThan().subscribe((res) => {
        if (res) {
          res.forEach((element: any) => {
            if (element in res) {
            } else {
              this.Torocycles.push(element);
            }
          });
        }
      })
    );
  }
  deleteTorocycle(id: any) {
    if (confirm('هل انت متاكد من حذف هذا المنتج ؟')) {
      this.subscribtion.add(
        this._DashboardService.deleteTorocycle(id).subscribe((res: any) => {
          if (res) {
            this.Torocycles.forEach((element, indes) => {
              if (element.torocycleId == id) {
                this.Torocycles.splice(indes, 1);
              }
            });
          }
        })
      );
    }
  }
  findAllMototcyclesLessThan() {
    this.subscribtion.add(
      this._DashboardService.findAllMototcyclesLessThan().subscribe((res) => {
        if (res) {
          res.forEach((element: any) => {
            if (element in res) {
            } else {
              this.Mototcycles.push(element);
            }
          });
        }
      })
    );
  }
  deleteMotocycle(id: any) {
    if (confirm('هل انت متاكد من حذف هذا المنتج ؟')) {
      this.subscribtion.add(
        this._DashboardService.deleteMotocycle(id).subscribe((res: any) => {
          if (res) {
            this.Mototcycles.forEach((element, indes) => {
              if (element.mototcycleId == id) {
                this.Mototcycles.splice(indes, 1);
              }
            });
          }
        })
      );
    }
  }
  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }
}
