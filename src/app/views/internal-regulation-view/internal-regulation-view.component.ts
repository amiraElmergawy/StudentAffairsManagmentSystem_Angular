import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-internal-regulation-view',
  templateUrl: './internal-regulation-view.component.html',
  styleUrls: ['./internal-regulation-view.component.scss']
})
export class InternalRegulationViewComponent implements OnInit {

  //dropbtn;
  coursesListFlag: boolean = false;
  departmentsListFlag: boolean = false;
  programsListFlag: boolean = false;
  majorsListFlag: boolean = false;
  divisionsListFlag: boolean = false;
  showingFlags = {
    displayAllCoursesFlag: false,
    displayAddCourseFlag: false,
    displaySearchCoursesFlag: false,
    displayShowCourseFlag: false,
    displayUpdateCourseFlag: false,
    displayAllDepartmentsFlag: false,
    displayAddDepartmentFlag: false,
    displaySearchDepartmentsFlag: false,
    displayShowDepartmentFlag: false,
    displayUpdateDepartmentFlag: false,
    displayAllMajorsFlag: false,
    displayAddMajorFlag: false,
    displaySearchMajorsFlag: false,
    displayShowMajorFlag: false,
    displayUpdateMajorFlag: false,
    displayAllProgramsFlag: false,
    displayAddProgramFlag: false,
    displaySearchProgramsFlag: false,
    displayShowProgramFlag: false,
    displayUpdateProgramFlag: false,
    displayAllDivisionsFlag: false,
    displayAddDivisionFlag: false,
    displaySearchDivisionsFlag: false,
    displayShowDivisionFlag: false,
  };
  authflags = {
    courses: false,
    depts: false,
    divs: false,
    acc: false,
    majs: false,
    progs: false
  };
  accreditListFlag: boolean = false;
  authorizedList;
  currentPermissions;
  constructor(
    private route: Router,
    private storage: LocalStorageService,
  ) {
    this.authorizedList = this.storage.retrieve('backNamesList');
    //console.log(this.authorizedList);
    this.currentPermissions = this.storage.retrieve('userPermissions');
    //console.log(this.authorizedList);
  }

  ngOnInit(): void {
    this.displayAuth();
  }

  displayAuth() {
    this.currentPermissions.forEach(element => {
      if (element.indexOf('course-registrations.accredit') == 0 || element.indexOf('course-registrations.unaccredit') == 0) {
        this.authflags.acc = true;
      } else if (element.indexOf('course.') == 0) {
        this.authflags.courses = true;
      } else if (element.indexOf('department') == 0) {
        this.authflags.depts = true;
        //console.log(element.indexOf('department') == 0);
      } else if (element.indexOf('division') == 0) {
        this.authflags.divs = true;
      } else if (element.indexOf('program') == 0 || element.indexOf('package') == 0) {
        this.authflags.progs = true;
      } else if (element.indexOf('major') == 0) {
        this.authflags.majs = true;
      }
    });
  }

  displayCourses() {
    if (this.coursesListFlag) {
      this.coursesListFlag = false;
    } else {
      this.departmentsListFlag = false;
      this.programsListFlag = false;
      this.majorsListFlag = false;
      this.divisionsListFlag = false;
      this.accreditListFlag = false;
      this.coursesListFlag = true;
    }
    // console.log(this.coursesListFlag);
  }
  displayDepts() {
    if (this.departmentsListFlag) {
      this.departmentsListFlag = false;
    } else {
      this.coursesListFlag = false;
      this.programsListFlag = false;
      this.majorsListFlag = false;
      this.divisionsListFlag = false;
      this.accreditListFlag = false;
      this.departmentsListFlag = true;
    }
    // console.log(this.departmentsListFlag);
  }
  displayMajors() {
    if (this.majorsListFlag) {
      this.majorsListFlag = false;
    } else {
      this.coursesListFlag = false;
      this.departmentsListFlag = false;
      this.programsListFlag = false;
      this.divisionsListFlag = false;
      this.accreditListFlag = false;
      this.majorsListFlag = true;
    }
    // console.log(this.majorsListFlag); 
  }
  displayPrograms() {
    if (this.programsListFlag) {
      this.programsListFlag = false;
    } else {
      this.coursesListFlag = false;
      this.departmentsListFlag = false;
      this.majorsListFlag = false;
      this.divisionsListFlag = false;
      this.accreditListFlag = false;
      this.programsListFlag = true;
    }
    // console.log(this.programsListFlag);
  }
  displayDivisions() {
    if (this.divisionsListFlag) {
      this.divisionsListFlag = false;
    } else {
      this.coursesListFlag = false;
      this.departmentsListFlag = false;
      this.programsListFlag = false;
      this.majorsListFlag = false;
      this.accreditListFlag = false;
      this.divisionsListFlag = true;
    }
    // console.log(this.divisionsListFlag);
  }
  closeAllFlags() {
    for (let key in this.showingFlags) {
      this.showingFlags[key] = false;
      // Use `key` and `value`
    }
  }
  displayAllCourses() {
    this.closeAllFlags();
    this.showingFlags.displayAllCoursesFlag = true;
  }
  displayAddCourse() {
    this.closeAllFlags();
    this.showingFlags.displayAddCourseFlag = true;
  }
  displaySearchCourses() {
    this.closeAllFlags();
    this.showingFlags.displaySearchCoursesFlag = true;
  }
  // displayUpdateCourse(){
  //   this.closeAllFlags();
  //   this.showingFlags.displayUpdateCourseFlag = true;
  // }
  // displayShowCourse(){
  //   this.closeAllFlags();
  //   this.showingFlags.displayShowCourseFlag = true;
  // }
  displayAllDepartments() {
    this.closeAllFlags();
    this.showingFlags.displayAllDepartmentsFlag = true;
  }
  displayAddDepartment() {
    this.closeAllFlags();
    this.showingFlags.displayAddDepartmentFlag = true;
  }
  displaySearchDepartments() {
    this.closeAllFlags();
    this.showingFlags.displaySearchDepartmentsFlag = true;
  }
  // displayUpdateDepartment(){
  //   this.closeAllFlags();
  //   this.showingFlags.displayUpdateDepartmentFlag = true;
  // }
  // displayShowDepartment(){
  //   this.closeAllFlags();
  //   this.showingFlags.displayShowDepartmentFlag = true;
  // }
  displayAllMajors() {
    this.closeAllFlags();
    this.showingFlags.displayAllMajorsFlag = true;
  }
  displayAddMajor() {
    this.closeAllFlags();
    this.showingFlags.displayAddMajorFlag = true;
  }
  displaySearchMajors() {
    this.closeAllFlags();
    this.showingFlags.displaySearchMajorsFlag = true;
  }
  displayAllPrograms() {
    this.closeAllFlags();
    this.showingFlags.displayAllProgramsFlag = true;
  }
  displayAddProgram() {
    this.closeAllFlags();
    this.showingFlags.displayAddProgramFlag = true;
  }
  displaySearchPrograms() {
    this.closeAllFlags();
    this.showingFlags.displaySearchProgramsFlag = true;
  }
  displaySearchDivisions() {
    this.closeAllFlags();
    this.showingFlags.displaySearchDivisionsFlag = true;
  }
  displayAddDivision() {
    this.closeAllFlags();
    this.showingFlags.displayAddDivisionFlag = true;
  }
  displayAllDivisions() {
    this.closeAllFlags();
    this.showingFlags.displayAllDivisionsFlag = true;
  }
  displayAccreditation() {
    if (this.accreditListFlag == false) {
      this.coursesListFlag = false;
      this.departmentsListFlag = false;
      this.programsListFlag = false;
      this.majorsListFlag = false;
      this.divisionsListFlag = false;
      this.accreditListFlag = true;
    } else {
      this.accreditListFlag = false;
    }
  }
  goToAccreditation() {
    this.route.navigate(['/degree-accreditation/']);
  }
  cancelAccreditation() {
    this.route.navigate(['/cancel-accreditation/']);
  }
}
