import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { MessageService } from 'primeng/api';
import { Group, Student, ExcelStudent } from '../interfaces/interfaces';
import { ManagerService } from '../services/manager.service';
import * as XLSX from 'xlsx';
import { AdvertisingService } from '../../admin/advertising/services/advertising.service';
import { Advertising } from '../../admin/advertising/interfaces/interfaces';
import { timer } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [MessageService],
})
export class DashboardComponent implements OnInit {
  advertisings: Advertising[] = [];
  advertising: Advertising = {};
  get loggedUser() {
    return this.authservice.loggedUser;
  }
  private storageURL: string = environment.storageURL;
  loading: boolean = true;

  userStudents: Student[] = [];

  closable: boolean = false;
  closableSM: boolean = false;

  students: Student[] = [];

  student: Student = {};

  selectedStudents: Student[] = [];

  deleteStudentDialog: boolean = false;

  deleteStudentsDialog: boolean = false;

  studentDialog: boolean = false;

  importDialog: boolean = false;

  deleteGroupDialog: boolean = false;

  groups: Group[] = [];

  group: Group = {};

  groupDialog: boolean = false;

  selectedGroup!: Group;

  excelData: any[] = [];

  excel: any[] = [];
  timeLeft: number = 10;
  interval: any;
  dash = 'manager';
  advertisingBannerDialog: boolean = true;
  advertisingBannerSMDialog: boolean = false;
  constructor(
    private router: Router,
    private authservice: AuthService,
    private managerservice: ManagerService,
    private messageService: MessageService,
    private AdvertisingService: AdvertisingService // private userService: UserService,
  ) // private fb:FormBuilder
  {}

  ngOnInit() {
    this.managerservice.groups(this.loggedUser.id).subscribe((resp) => {
      this.groups = resp;
      this.loading = false;
      console.log(this.groups);
      this.managerservice.students().subscribe((resp) => {
        this.userStudents = resp;
        this.loading = false;
        console.log(this.userStudents);
      });
    });

    this.loadAdvertising();
    this.startTimer()
  }
  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;

      } else {
        this.closable = true;
        this.timeLeft = 0;
      }
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  loadAdvertising() {
    this.AdvertisingService.getGameAdvertising().subscribe((resp) => {

      this.advertisings = resp;
      let cant = this.advertisings.length;
      let random_number = Math.floor(Math.random() * cant);

      this.advertising = resp[random_number];

      if (this.advertising.banner_xl_url) {
        this.advertising.banner_xl_url = `${
          this.storageURL
        }${this.advertising.banner_xl_url?.replace('public', '')}`;
      } else {
        this.advertising.banner_xl_url = '';
      }

      if (this.advertising.banner_sm_url) {
        this.advertising.banner_sm_url = `${
          this.storageURL
        }${this.advertising.banner_sm_url?.replace('public', '')}`;
      } else {
        this.advertising.banner_sm_url = '';
      }
      console.log(this.advertising);
    });
  }



  openSMDialogBanner(event:any) {
    console.log(event)
    this.advertisingBannerSMDialog = true;
  }
  hideGroupDialog() {
    this.groupDialog = false;
  }
  selectGroup(group: Group) {
    this.messageService.add({
      severity: 'info',
      summary: 'Product Selected',
      detail: group.group_name,
    });
  }
  deleteGroup(group: Group) {
    this.deleteGroupDialog = true;
    this.group = { ...group };
    console.log(group);
  }
  editGroup(group: Group) {
    this.group = { ...group };
    this.groupDialog = true;
  }

  confirmDeleteGroup() {
    this.deleteGroupDialog = false;
    this.managerservice.deleteGroup(this.group.id!).subscribe((resp) => {
      this.groups = this.groups.filter((val) => val.id !== this.group.id);
      this.messageService.add({
        severity: 'info',
        summary: 'Group deleting',
        detail: resp,
        life: 3000,
      });
      this.group = {};
      this.students = [];
    });
  }

  openNewGroup() {
    this.group = {};
    this.groupDialog = true;
  }


  findGroupIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.groups.length; i++) {
      if (this.groups[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }
  saveGroup() {
    if (this.group.group_name?.trim()) {
      if (this.group.id) {
        // @ts-ignore
        this.groups[this.findGroupIndexById(this.group.id)] = this.group;
        this.managerservice.updateGroup(this.group).subscribe((resp) => {
          this.messageService.add({
            severity: 'info',
            summary: 'Group Updating',
            detail: resp.message,
            life: 3000,
          });
        });
      } else {
        this.group.user_id = this.loggedUser.id;
        this.managerservice.storeGroup(this.group).subscribe((resp) => {
          this.messageService.add({
            severity: 'info',
            summary: 'Group creation',
            detail: resp.message,
            life: 3000,
          });
          this.groups.push(resp.data);
        });
      }

      this.groups = [...this.groups];
      this.groupDialog = false;
      this.group = {};
    }
  }

  readExcel(event: any) {
    this.importDialog = false;
    this.loading = true;
    this.excel = [];
    let file = event.files[0];
    console.log(file);
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    fileReader.onload = (e) => {
      var workBook = XLSX.read(fileReader.result, { type: 'binary' });
      var sheetNames = workBook.SheetNames;
      this.excelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]]);

      let headers = Object.keys(this.excelData[0]);

      const [code, name] = headers;

      let students = this.excelData.map((student) => ({
        group_id: this.selectedGroup.id,
        first_name: student[name],
        code: student[code],
      }));

      let data = {
        data: [...(this.students = students)],
      };

      this.managerservice.storeStudent(data).subscribe((resp) => {
        this.messageService.add({
          severity: 'info',
          summary: 'Student creation',
          detail: resp.message,
          life: 3000,
        });
        this.managerservice.students().subscribe((resp) => {
          this.userStudents = resp;
          this.students = this.userStudents.filter(
            (val) => val.group_id === this.selectedGroup.id
          );
          this.loading = false;
          console.log(this.userStudents);
        });
      });

      console.table(this.excelData);
      console.log(headers);
      console.table(this.students);
    };
  }
  selectStudent(student: Student) {
    this.messageService.add({
      severity: 'info',
      summary: 'Product Selected',
      detail: student.first_name,
    });
  }
  deleteStudent(student: Student) {
    this.deleteStudentDialog = true;
    this.student = { ...student };
    console.log(student);
  }
  deleteSelectedStudents() {
    this.deleteStudentsDialog = true;
  }

  confirmDeleteStudent() {
    this.deleteStudentDialog = false;
    this.managerservice.deleteStudent(this.student.id!).subscribe((resp) => {
      this.students = this.students.filter((val) => val.id !== this.student.id);
      this.userStudents = this.userStudents.filter(
        (val) => val.id !== this.student.id
      );
      this.messageService.add({
        severity: 'info',
        summary: 'Student deleting',
        detail: resp,
        life: 3000,
      });
      this.student = {};
    });
  }
  confirmDeleteSelectedStudent() {
    this.deleteStudentsDialog = false;

    this.managerservice
      .deleteAllStudents(this.selectedStudents)
      .subscribe((resp) => {
        this.students = this.students.filter(
          (val) => !this.selectedStudents.includes(val)
        );
        this.userStudents = this.userStudents.filter(
          (val) => !this.selectedStudents.includes(val)
        );
        this.messageService.add({
          severity: 'info',
          summary: 'User deleting',
          detail: resp,
          life: 3000,
        });
        this.selectedStudents = [];
      });
  }

  hideStudentDialog() {
    this.studentDialog = false;
  }
  hideImportDialog() {
    this.importDialog = false;
  }

  editStudent(student: Group) {
    this.student = { ...student };
    this.studentDialog = true;
  }

  openNewStudent() {
    this.student = {};
    this.studentDialog = true;
  }

  openImportStudent() {
    this.excel = [];
    this.excelData = [];
    this.importDialog = true;
  }

  findStudentIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.students.length; i++) {
      if (this.students[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  findUserStudentIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.userStudents.length; i++) {
      if (this.userStudents[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  saveStudent() {
    if (this.student.first_name!.trim()) {
      if (this.student.id) {
        // @ts-ignore
        this.students[this.findStudentIndexById(this.student.id)] =
          this.student;
        this.userStudents[this.findUserStudentIndexById(this.student.id)] =
          this.student;
        this.managerservice.updateStudent(this.student).subscribe((resp) => {
          this.messageService.add({
            severity: 'info',
            summary: 'Student Updating',
            detail: resp.message,
            life: 3000,
          });
        });
      } else {
        this.student.group_id = this.selectedGroup.id;
        console.log(this.student);

        let students = {
          data: [{ ...this.student }],
        };
        this.managerservice.storeStudent(students).subscribe((resp) => {
          this.messageService.add({
            severity: 'info',
            summary: 'Student creation',
            detail: resp.message,
            life: 3000,
          });
          this.managerservice.students().subscribe((resp) => {
            this.userStudents = resp;
            this.students = this.userStudents.filter(
              (val) => val.group_id === this.selectedGroup.id
            );
            this.loading = false;
            console.log(this.userStudents);
          });
        });
      }

      this.students = [...this.students];
      this.studentDialog = false;
      this.student = {};
    }
  }
  onRowSelect(event: any) {
    this.students = this.userStudents.filter(
      (val) => val.group_id === event.data.id
    );
    this.selectedGroup.id = event.data.id;
  }

  onRowUnselect(event: any) {
    this.students = [];
  }
}
