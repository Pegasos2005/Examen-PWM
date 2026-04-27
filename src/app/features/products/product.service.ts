import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, onSnapshot, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Product } from '../../core/models/product';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private firestore = inject(Firestore);

  private productToEditSubject = new BehaviorSubject<Product | null>(null);
  productToEdit$ = this.productToEditSubject.asObservable();

  setProductToEdit(product: Product | null) {
    this.productToEditSubject.next(product);
  }

  addProduct(product: Product) {
    const col = collection(this.firestore, 'products');
    return addDoc(col, product);
  }

  getProducts(): Observable<Product[]> {
    const col = collection(this.firestore, 'products');
    return new Observable(observer => {
      const unsubscribe = onSnapshot(col, (snapshot) => {
        const products: Product[] = [];
        snapshot.forEach(doc => products.push({ id: doc.id, ...doc.data() } as Product));
        observer.next(products);
      }, (error) => observer.error(error));
      return () => unsubscribe();
    });
  }

  updateProduct(id: string, product: Partial<Product>) {
    const docRef = doc(this.firestore, `products/${id}`);
    return updateDoc(docRef, product);
  }

  deleteProduct(id: string) {
    const docRef = doc(this.firestore, `products/${id}`);
    return deleteDoc(docRef);
  }
}
