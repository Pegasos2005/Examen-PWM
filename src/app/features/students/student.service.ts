import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore'; // Añade collectionData
import { Student } from '../../core/models/student.model';
import { Observable } from 'rxjs'; // Añade Observable

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private firestore = inject(Firestore);
  private studentCollection = collection(this.firestore, 'students');

  // CREAR (El que ya teníamos)
  addStudent(student: Student) {
    return addDoc(this.studentCollection, student);
  }

  // LEER (El nuevo)
  getStudents(): Observable<Student[]> {
    // collectionData lee la colección y le pedimos que inyecte el ID de Firebase en la propiedad 'id'
    return collectionData(this.studentCollection, { idField: 'id' }) as Observable<Student[]>;
  }
}
