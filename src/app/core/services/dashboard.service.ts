import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  url = 'http://localhost:8281/api/';

  constructor(private _HttpClient: HttpClient) {}


  //tuktuk
  findAllTuktuks(): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.get(this.url + 'findAllTuktuks', { headers });
  }
  findAllTuktuksLessThan(): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.get(this.url + 'findAllTuktuksLessThan', {
      headers,
    });
  }
  updateTuktuk(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.post(this.url + 'updateTuktuk', data, { headers });
  }
  saveTuktuk(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.post(this.url + 'saveTuktuk', data, { headers });
  }
  saveTuktuks(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.post(this.url + 'saveTuktuks', data, { headers });
  }
  addTuktukBill(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.post(this.url + 'addTuktukBill', data, { headers });
  }
  sellTuktuk(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.post(this.url + 'sellTuktuk', data, { headers });
  }
  getTuktuksByType(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.post(this.url + 'getTuktuksByType', data, {
      headers,
    });
  }
  findTuktukById(id: any): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.get(this.url + 'findTuktukById/' + id, { headers });
  }
  deleteTuktuk(id: any): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.get(this.url + 'deleteTuktuk/' + id, { headers });
  }

  //Visbas
  findAllVisbas(): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.get(this.url + 'findAllVisbas', { headers });
  }
  saveVisba(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.post(this.url + 'saveVisba', data, { headers });
  }
  saveVisbas(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.post(this.url + 'saveVisbas', data, { headers });
  }
  addVisbaBill(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.post(this.url + 'addVisbaBill', data, { headers });
  }
  updateVisba(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.post(this.url + 'updateVisba', data, { headers });
  }
  getVisbasByType(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.post(this.url + 'getVisbasByType', data, {
      headers,
    });
  }

  findVisbaById(id: any): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.get(this.url + 'findVisbaById/' + id, { headers });
  }
  deleteVisba(id: any): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.get(this.url + 'deleteVisba/' + id, { headers });
  }

  findAllVisbasLessThan(): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.get(this.url + 'findAllVisbasLessThan', {
      headers,
    });
  }
  sellVisba(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.post(this.url + 'sellVisba', data, { headers });
  }
  //paints
  findAllPaints(): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.get(this.url + 'findAllPaints', { headers });
  }
  savePaints(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.post(this.url + 'savePaints', data, { headers });
  }
  savePaintss(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.post(this.url + 'savePaintss', data, { headers });
  }
  addPaintBill(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.post(this.url + 'addPaintBill', data, { headers });
  }
  updatePaints(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.post(this.url + 'updatePaints', data, { headers });
  }
  getPaintsByType(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.post(this.url + 'getPaintsByType', data, {
      headers,
    });
  }

  findPaintsById(id: any): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.get(this.url + 'findPaintsById/' + id, { headers });
  }
  deletePaints(id: any): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.get(this.url + 'deletePaints/' + id, { headers });
  }

  findAllPaintsLessThan(): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.get(this.url + 'findAllPaintsLessThan', {
      headers,
    });
  }
  sellPaint(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.post(this.url + 'sellPaint', data, { headers });
  }
  //other
  findAllOthers(): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.get(this.url + 'findAllOthers', { headers });
  }
  saveOther(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.post(this.url + 'saveOther', data, { headers });
  }
  saveOthers(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.post(this.url + 'saveOthers', data, { headers });
  }
  addOtherBill(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.post(this.url + 'addOtherBill', data, { headers });
  }
  updateOther(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.post(this.url + 'updateOther', data, { headers });
  }
  getOthersByType(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.post(this.url + 'getOthersByType', data, {
      headers,
    });
  }

  findOtherById(id: any): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.get(this.url + 'findOtherById/' + id, { headers });
  }
  deleteOther(id: any): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.get(this.url + 'deleteOther/' + id, { headers });
  }

  findAllOthersLessThan(): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.get(this.url + 'findAllOthersLessThan', {
      headers,
    });
  }
  sellOther(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.post(this.url + 'sellOther', data, { headers });
  }
  //torocycle
  findAllTorocycles(): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.get(this.url + 'findAllTorocycles', { headers });
  }
  saveTorocycle(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.post(this.url + 'saveTorocycle', data, { headers });
  }
  saveTorocycles(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.post(this.url + 'saveTorocycles', data, {
      headers,
    });
  }
  addTorocycleBill(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.post(this.url + 'addTorocycleBill', data, {
      headers,
    });
  }
  updateTorocycle(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.post(this.url + 'updateTorocycle', data, {
      headers,
    });
  }
  getTorocyclesByType(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.post(this.url + 'getTorocyclesByType', data, {
      headers,
    });
  }

  findTorocycleById(id: any): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.get(this.url + 'findTorocycleById/' + id, {
      headers,
    });
  }
  deleteTorocycle(id: any): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.get(this.url + 'deleteTorocycle/' + id, {
      headers,
    });
  }

  findAllTorocyclesLessThan(): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.get(this.url + 'findAllTorocyclesLessThan', {
      headers,
    });
  }
  sellTorocycle(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.post(this.url + 'sellTorocycle', data, { headers });
  }
  //Mototcycles
  findAllMototcycles(): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.get(this.url + 'findAllMototcycles', { headers });
  }
  saveMototcycle(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.post(this.url + 'saveMototcycle', data, {
      headers,
    });
  }
  saveMototcycles(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.post(this.url + 'saveMototcycles', data, {
      headers,
    });
  }
  addMotocycleBill(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.post(this.url + 'addMotocycleBill', data, {
      headers,
    });
  }
  updateMototcycle(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.post(this.url + 'updateMototcycle', data, {
      headers,
    });
  }
  deleteMotocycle(id: any): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.get(this.url + 'deleteMototcycle/' + id, {
      headers,
    });
  }
  findMototcycleById(id: any): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.get(this.url + 'findMototcycleById/' + id, {
      headers,
    });
  }
  findAllMototcyclesLessThan(): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.get(this.url + 'findAllMototcyclesLessThan', {
      headers,
    });
  }
  sellMototcycle(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.post(this.url + 'sellMototcycle', data, {
      headers,
    });
  }

  findAllSuppliers(): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.get(this.url + 'findAllSuppliers', { headers });
  }
  findAllReciever(): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.get(this.url + 'findAllReciever', { headers });
  }
  findAllBySupplierName(supplierName: any): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.get(
      this.url + 'findAllBySupplierName/' + supplierName,
      { headers }
    );
  }
  findAllProductsBySupplierByName(supplierName: any): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.post(
      this.url + 'findAllProductsBySupplierByName' , supplierName,
      { headers }
    );
  }

  payDeptBank(data: number , recieverName: string): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.post(
      this.url + 'payDeptBank/' + recieverName, data,
      { headers }
    );
  }
  findAllByRecieverName(recieverName: any): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.get(
      this.url + 'findAllByRecieverName/' + recieverName,
      { headers }
    );
  }
  findAllProductsByRecieverByName(recieverName: any): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.get(
      this.url + 'findAllProductsByRecieverByName/' + recieverName,
      { headers }
    );
  }

  findAllBanksByReciverName(recieverName: any): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.get(
      this.url + 'findAllBanksByReciverName/' + recieverName,
      { headers }
    );
  }
  findAllBills(): Observable<any> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    return this._HttpClient.get(this.url + 'findAllBills', { headers });
  }

}
