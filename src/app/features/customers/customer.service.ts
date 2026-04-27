import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, onSnapshot, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Customer } from '../../core/models/customer';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  private firestore = inject(Firestore);

  private customerToEditSubject = new BehaviorSubject<Customer | null>(null);
  customerToEdit$ = this.customerToEditSubject.asObservable();

  setCustomerToEdit(customer: Customer | null) {
    this.customerToEditSubject.next(customer);
  }

  addCustomer(customer: Customer) {
    const col = collection(this.firestore, 'customers');
    return addDoc(col, customer);
  }

  getCustomers(): Observable<Customer[]> {
    const col = collection(this.firestore, 'customers');
    return new Observable(observer => {
      const unsubscribe = onSnapshot(col, (snapshot) => {
        const customers: Customer[] = [];
        snapshot.forEach(doc => customers.push({ id: doc.id, ...doc.data() } as Customer));
        observer.next(customers);
      }, (error) => observer.error(error));
      return () => unsubscribe();
    });
  }

  updateCustomer(id: string, customer: Partial<Customer>) {
    const docRef = doc(this.firestore, `customers/${id}`);
    return updateDoc(docRef, customer);
  }

  deleteCustomer(id: string) {
    const docRef = doc(this.firestore, `customers/${id}`);
    return deleteDoc(docRef);
  }
}
