import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { OrderRequestParams, Order, OrderContent } from '../interfaces/order.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) { }

  // TODO service
  getOrders({ page, status, subsidiaryId, limit = 3 }: OrderRequestParams): Observable<any> {
    const params = new HttpParams()
      .set('status', status)
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this.http.get<Order>(`http://localhost:8080/o/ProviderCompraDigitalPortlet/api/notice/subsidiary/${subsidiaryId}`, { params })
      .pipe(
        map(({ content, ...dataPaginator }) => {
          return {
            data: content,
            dataPaginator
          };
        })
      );
  }

  // TODO service
  getOrder(id: any) {
    return this.http.get<Order>(`http://localhost:8080/o/ProviderCompraDigitalPortlet/api/order/detail/${id}`);
  }

  // TODO service
  acceptOrder(id: any, body: any) {
    return this.http.put<OrderContent>(`http://localhost:8080/o/ProviderCompraDigitalPortlet/api/order/detail/${id}`, body);
  }

  // TODO service
  getCriticalOrders() {
    return this.http.get<Order[]>(`http://localhost:8080/o/ProviderCompraDigitalPortlet/api/order/critical`);
  }

  // TODO service
  dispatchOrder(id: any, body: any) {
    return this.http.put(`http://localhost:8080/o/ProviderCompraDigitalPortlet/api/order/dispatch/${id}`, body);
  }

  // TODO service
  updateProductStock( subsidiaryId: number, reference: string, amount: number): any {
      const params = new HttpParams()
        .set('reference', reference)
        .set('amount', amount.toString());

      this.http.get<any>(`http://localhost:8080/o/ProviderCompraDigitalPortlet/api/product/upd/${subsidiaryId}`, { params })
        .subscribe();
  }

  // TODO borrar dummy
  getOrders2(): OrderContent[] {

    let o1: any = {id: 11, date: '2020-07-31', status: 'assigned', workshop: 'Workshop1', time: '2020-07-31', externalNoticeId: 123};
    let o2: any = {id: 12, date: '2020-07-30', status: 'assigned', workshop: 'Workshop2', time: '2020-07-30', externalNoticeId: 123};
    let o3: any = {id: 13, date: '2020-07-29', status: 'completed', workshop: 'Workshop3', time: '2020-07-29', externalNoticeId: 123};
    let o4: any = {id: 14, date: '2020-07-28', status: 'completed', workshop: 'Workshop4', time: '2020-07-28', externalNoticeId: 123};
    let o5: any = {id: 15, date: '2020-07-27', status: 'accepted', workshop: 'Workshop5', time: '2020-07-27', externalNoticeId: 123};
    let o6: any = {id: 16, date: '2020-07-26', status: 'accepted', workshop: 'Workshop6', time: '2020-07-26', externalNoticeId: 123};
    
    let oc1: OrderContent = {id: 123, number: 123456, plate: 'ABC123', date: '2020-07-25', brand: 'Mazda', line: '2 Sedán', 
      workshop: 'Workshop1', city: 'Bogotá', status: 'assigned', products: [], externalEvent: 123456789, orders: [o1, o2, o3, o4, o5, o6]};
    
    let oc2: OrderContent = {id: 456, number: 123456, plate: 'ABC123', date: '2020-07-24', brand: 'Mazda', line: '2 Sedán', 
      workshop: 'Workshop2', city: 'Bogotá', status: 'completed', products: [], externalEvent: 789456123, orders: [o1, o2, o3]};    
    
    let oc3: OrderContent = {id: 789, number: 123456, plate: 'ABC123', date: '2020-07-23', brand: 'Mazda', line: '2 Sedán', 
      workshop: 'Workshop3', city: 'Bogotá', status: 'accepted', products: [], externalEvent: 654987321, orders: [o1, o2, o3]};



////////////////////////////////////////////

console.log('*****');

const params = new HttpParams().set('url', "test-inventario.xlsx").set('id_subsidiary', "1");

this.http.post<any>(`http://localhost:8080/o/SendFileMKPLPortlet/sendfile/inventory`, {
  "url": "test-inventario.xlsx",
  "id_subsidiary": "1"
})
.subscribe(
  res => console.log('***** res ', res, ' --- ', res.message)
);


////////////////////////////////////////////



    return  Math.random() >= 0.5? [oc1, oc2, oc3]: [];
  }
}
