import { Component, OnInit } from '@angular/core';
import { Student, StudentsService } from '../shared';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  students: Student[];
  currentStudent: Student;

  constructor(private studentsService: StudentsService) { }

  ngOnInit() {
    this.getStudents();
    this.resetCurrentStudent();
  }

  resetCurrentStudent() {
    this.currentStudent = { id: null, firstName: '', lastName: '', active: false, courses: [] };
  }

  selectStudent(student) {
    this.currentStudent = student;
  }

  cancel(student) {
    this.resetCurrentStudent();
  }

  getStudents() {
    this.studentsService.all()
      .subscribe(students => this.students = students);
  }

  saveStudent(student) {
    if (!student.id) {
      this.createStudent(student);
    } else {
      this.updateStudent(student);
    }
  }

  createStudent(student) {
    this.studentsService.create(student)
      .subscribe(response => this.resetCurrentStudent());
  }

  updateStudent(student) {
    this.studentsService.update(student)
      .subscribe(response => this.resetCurrentStudent());
  }

  deleteStudent(student) {
    this.studentsService.delete(student)
      .subscribe(response => this.resetCurrentStudent());
  }
}
