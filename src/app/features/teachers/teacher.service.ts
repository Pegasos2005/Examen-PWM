import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, onSnapshot, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Teacher } from '../../core/models/teacher';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TeacherService {
  private firestore = inject(Firestore);

  private teacherToEditSubject = new BehaviorSubject<Teacher | null>(null);
  teacherToEdit$ = this.teacherToEditSubject.asObservable();

  setTeacherToEdit(teacher: Teacher | null) {
    this.teacherToEditSubject.next(teacher);
  }

  addTeacher(teacher: Teacher) {
    const col = collection(this.firestore, 'teachers');
    return addDoc(col, teacher);
  }

  getTeachers(): Observable<Teacher[]> {
    const col = collection(this.firestore, 'teachers');
    return new Observable(observer => {
      const unsubscribe = onSnapshot(col, (snapshot) => {
        const teachers: Teacher[] = [];
        snapshot.forEach(doc => teachers.push({ id: doc.id, ...doc.data() } as Teacher));
        observer.next(teachers);
      }, (error) => observer.error(error));
      return () => unsubscribe();
    });
  }

  updateTeacher(id: string, teacher: Partial<Teacher>) {
    const docRef = doc(this.firestore, `teachers/${id}`);
    return updateDoc(docRef, teacher);
  }

  deleteTeacher(id: string) {
    const docRef = doc(this.firestore, `teachers/${id}`);
    return deleteDoc(docRef);
  }
}
