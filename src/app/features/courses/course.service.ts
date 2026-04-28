import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, onSnapshot, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Course } from '../../core/models/course';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private firestore = inject(Firestore);

  private courseToEditSubject = new BehaviorSubject<Course | null>(null);
  courseToEdit$ = this.courseToEditSubject.asObservable();

  setCourseToEdit(course: Course | null) {
    this.courseToEditSubject.next(course);
  }

  addCourse(course: Course) {
    const col = collection(this.firestore, 'courses');
    return addDoc(col, course);
  }

  getCourses(): Observable<Course[]> {
    const col = collection(this.firestore, 'courses');
    return new Observable(observer => {
      const unsubscribe = onSnapshot(col, (snapshot) => {
        const courses: Course[] = [];
        snapshot.forEach(doc => courses.push({ id: doc.id, ...doc.data() } as Course));
        observer.next(courses);
      }, (error) => observer.error(error));
      return () => unsubscribe();
    });
  }

  updateCourse(id: string, course: Partial<Course>) {
    const docRef = doc(this.firestore, `courses/${id}`);
    return updateDoc(docRef, course);
  }

  deleteCourse(id: string) {
    const docRef = doc(this.firestore, `courses/${id}`);
    return deleteDoc(docRef);
  }
}
