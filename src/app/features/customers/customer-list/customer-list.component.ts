import { Component, inject } from '@angular/core';
import { CustomerFormComponent } from '../customer-form/customer-form.component';
import { CustomerService } from '../customer.service';
import { AsyncPipe } from '@angular/common';
import { Customer } from '../../../core/models/customer';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CustomerFormComponent, AsyncPipe],
  templateUrl: './customer-list.component.html'
})
export class CustomerListComponent {
  private customerService = inject(CustomerService);
  customers$ = this.customerService.getCustomers();

  onDelete(id: string | undefined) {
    if (id && confirm('Delete customer?')) {
      this.customerService.deleteCustomer(id);
    }
  }

  onEdit(customer: Customer) {
    this.customerService.setCustomerToEdit(customer);
  }
}
