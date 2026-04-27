import { Injectable, inject } from '@angular/core';
// Añadimos doc, deleteDoc y updateDoc
import { Firestore, collection, addDoc, onSnapshot, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Student } from '../../core/models/student.model';
import { Observable, BehaviorSubject } from 'rxjs'; // Importamos BehaviorSubject

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private firestore = inject(Firestore);

  // --- MENSAJERO PARA EL MODO EDICIÓN ---
  // Este "canal" guardará el estudiante que queramos editar
  private studentToEditSubject = new BehaviorSubject<Student | null>(null);
  studentToEdit$ = this.studentToEditSubject.asObservable();

  // Función para meter un estudiante en el canal
  setStudentToEdit(student: Student | null) {
    this.studentToEditSubject.next(student);
  }

  // --- MÉTODOS CRUD ---

  // CREAR (El que ya tienes)
  addStudent(student: Student) {
    const studentCollection = collection(this.firestore, 'students');
    return addDoc(studentCollection, student);
  }

  // LEER (El Método Antibombas que ya tienes)
  getStudents(): Observable<Student[]> {
    const studentCollection = collection(this.firestore, 'students');
    return new Observable(observer => {
      const unsubscribe = onSnapshot(studentCollection, (snapshot) => {
        const students: Student[] = [];
        snapshot.forEach(doc => {
          students.push({ id: doc.id, ...doc.data() } as Student);
        });
        observer.next(students);
      }, (error) => observer.error(error));
      return () => unsubscribe();
    });
  }

  // ACTUALIZAR (Nuevo)
  updateStudent(id: string, student: Partial<Student>) {
    const docRef = doc(this.firestore, `students/${id}`);
    return updateDoc(docRef, student);
  }

  // BORRAR (Nuevo)
  deleteStudent(id: string) {
    const docRef = doc(this.firestore, `students/${id}`);
    return deleteDoc(docRef);
  }
}
