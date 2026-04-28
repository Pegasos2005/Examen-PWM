import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, onSnapshot, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Assignment } from '../../core/models/assignment';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AssignmentService {
  private firestore = inject(Firestore);

  private assignmentToEditSubject = new BehaviorSubject<Assignment | null>(null);
  assignmentToEdit$ = this.assignmentToEditSubject.asObservable();

  setAssignmentToEdit(assignment: Assignment | null) {
    this.assignmentToEditSubject.next(assignment);
  }

  addAssignment(assignment: Assignment) {
    const col = collection(this.firestore, 'assignments');
    return addDoc(col, assignment);
  }

  getAssignments(): Observable<Assignment[]> {
    const col = collection(this.firestore, 'assignments');
    return new Observable(observer => {
      const unsubscribe = onSnapshot(col, (snapshot) => {
        const assignments: Assignment[] = [];
        snapshot.forEach(doc => assignments.push({ id: doc.id, ...doc.data() } as Assignment));
        observer.next(assignments);
      }, (error) => observer.error(error));
      return () => unsubscribe();
    });
  }

  updateAssignment(id: string, assignment: Partial<Assignment>) {
    const docRef = doc(this.firestore, `assignments/${id}`);
    return updateDoc(docRef, assignment);
  }

  deleteAssignment(id: string) {
    const docRef = doc(this.firestore, `assignments/${id}`);
    return deleteDoc(docRef);
  }
}
