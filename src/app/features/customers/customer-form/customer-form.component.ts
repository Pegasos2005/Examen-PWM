import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { Customer } from '../../../core/models/customer';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './customer-form.component.html'
})
export class CustomerFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private customerService = inject(CustomerService);

  editingId: string | null = null;

  customerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  });

  ngOnInit() {
    this.customerService.customerToEdit$.subscribe(customer => {
      if (customer) {
        this.editingId = customer.id || null;
        this.customerForm.patchValue({ name: customer.name, email: customer.email });
      } else {
        this.editingId = null;
        this.customerForm.reset();
      }
    });
  }

  onSubmit() {
    if (this.customerForm.valid) {
      const data: Customer = {
        name: this.customerForm.value.name!,
        email: this.customerForm.value.email!
      };

      if (this.editingId) {
        this.customerService.updateCustomer(this.editingId, data).then(() => this.onClear());
      } else {
        this.customerService.addCustomer(data).then(() => this.onClear());
      }
    } else {
      this.customerForm.markAllAsTouched();
    }
  }

  onClear() {
    this.customerForm.reset();
    this.editingId = null;
    this.customerService.setCustomerToEdit(null);
  }
}
