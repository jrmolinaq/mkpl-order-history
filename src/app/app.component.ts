import { Component, OnInit } from '@angular/core';
//import { Location } from '@angular/common';

import { OrderService } from './services/order.service';

import { EMPTY_ORDERS } from './constants/history-constants';
import { Order, OrderContent } from './interfaces/order.interface';
import { DataPaginator } from './interfaces/paginator.interface';

declare const Liferay: any;

@Component({
	templateUrl: 
		Liferay.ThemeDisplay.getPathContext() + 
		'/o/mkpl-order-history/app/app.component.html'
})
export class AppComponent {
	data: Order;
	paginator: DataPaginator;
	emptyOrders = EMPTY_ORDERS;
	subsidiaryId: number;
  
	constructor(private orderService: OrderService) { }
  
	ngOnInit() {
		// TODO conseguir el subsidiaryId
		this.subsidiaryId = 5;
		this.getOrders();
	}
  
	getOrders(page = 0) {
	  this.orderService
		.getOrders({ page, status: 'finished', subsidiaryId: this.subsidiaryId})
		.subscribe(({ data, dataPaginator }) => {
		  this.data = data;
		  this.paginator = dataPaginator;
		});
	}
  
	currentPageChange(page: number) {
	  this.getOrders(page);
	}
}
