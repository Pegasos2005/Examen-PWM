import { Routes } from '@angular/router';
import { CustomerListComponent } from './features/customers/customer-list/customer-list.component';
import { ProductListComponent } from './features/products/product-list/product-list.component';
import { OrderListComponent } from './features/orders/order-list/order-list.component';

export const routes: Routes = [
  { path: 'customers', component: CustomerListComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'orders', component: OrderListComponent },
  { path: '', redirectTo: '/customers', pathMatch: 'full' },
  { path: '**', redirectTo: '/customers' }
];
