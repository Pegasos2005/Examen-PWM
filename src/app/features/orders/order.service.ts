import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, onSnapshot, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Order } from '../../core/models/order';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private firestore = inject(Firestore);

  private orderToEditSubject = new BehaviorSubject<Order | null>(null);
  orderToEdit$ = this.orderToEditSubject.asObservable();

  setOrderToEdit(order: Order | null) {
    this.orderToEditSubject.next(order);
  }

  addOrder(order: Order) {
    const col = collection(this.firestore, 'orders');
    return addDoc(col, order);
  }

  getOrders(): Observable<Order[]> {
    const col = collection(this.firestore, 'orders');
    return new Observable(observer => {
      const unsubscribe = onSnapshot(col, (snapshot) => {
        const orders: Order[] = [];
        snapshot.forEach(doc => {
          orders.push({ id: doc.id, ...doc.data() } as Order);
        });
        observer.next(orders);
      }, (error) => observer.error(error));

      return () => unsubscribe();
    });
  }

  updateOrder(id: string, order: Partial<Order>) {
    const docRef = doc(this.firestore, `orders/${id}`);
    return updateDoc(docRef, order);
  }

  deleteOrder(id: string) {
    const docRef = doc(this.firestore, `orders/${id}`);
    return deleteDoc(docRef);
  }
}
