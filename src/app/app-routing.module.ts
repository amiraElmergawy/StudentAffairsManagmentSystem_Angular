import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseIndexComponent } from './views/course-view/course-index/course-index.component';
import { CourseComponent } from './views/course-view/course-creation/course.component';
import { CourseSearchComponent } from './views/course-view/course-search/course-search.component';
import { CourseShowComponent } from './views/course-view/course-show/course-show.component';
import { CourseUpdateComponent } from './views/course-view/course-update/course-update.component';
import { CoursePrerequisitesCreationComponent } from './views/course-view/course-prerequisites-creation/course-prerequisites-creation.component';
import { NoPageFoundComponent } from './views/no-page-found/no-page-found.component';
import { HomeComponent } from './views/home/home.component';
import { CoursePrerequisitesShowComponent } from './views/course-view/course-prerequisites-show/course-prerequisites-show.component';
import { StudentSearchComponent } from './views/student-view/student-search/student-search.component';
import { StudentShowComponent } from './views/student-view/student-show/student-show.component';
import { StudentUpdateComponent } from './views/student-view/student-update/student-update.component';
import { StudentComponent } from './views/student-view/student-creation/student.component';
import { DepartmentComponent } from './views/department-view/department-creation/department.component';
import { DepartmentShowComponent } from './views/department-view/department-show/department-show.component';
import { DepartmentUpdateComponent } from './views/department-view/department-update/department-update.component';
import { DepartmentSearchComponent } from './views/department-view/department-search/department-search.component';
import { DepartmentIndexComponent } from './views/department-view/department-index/department-index.component';
import { DivisionComponent } from './views/division-view/division-creation/division.component';
import { DivisionShowComponent } from './views/division-view/division-show/division-show.component';
import { DivisionUpdateComponent } from './views/division-view/division-update/division-update.component';
import { DivisionSearchComponent } from './views/division-view/division-search/division-search.component';
import { DivisionIndexComponent } from './views/division-view/division-index/division-index.component';
import { MajorComponent } from './views/major-view/major-creation/major.component';
import { MajorShowComponent } from './views/major-view/major-show/major-show.component';
import { MajorUpdateComponent } from './views/major-view/major-update/major-update.component';
import { MajorSearchComponent } from './views/major-view/major-search/major-search.component';
import { MajorIndexComponent } from './views/major-view/major-index/major-index.component';
import { ProgramComponent } from './views/program-view/program-creation/program.component';
import { ProgramShowComponent } from './views/program-view/program-show/program-show.component';
import { ProgramUpdateComponent } from './views/program-view/program-update/program-update.component';
import { ProgramSearchComponent } from './views/program-view/program-search/program-search.component';
import { ProgramIndexComponent } from './views/program-view/program-index/program-index.component';
import { ProgramLinkCoursesComponent } from './views/program-view/program-link-courses/program-link-courses.component';
import { CreatePackageComponent } from './views/program-view/create-package/create-package.component';
import { DeletePackageComponent } from './views/program-view/delete-package/delete-package.component';
import { CourseRegistrationComponent } from './views/course-registration-view/course-registration-creation/course-registration.component';
import { IndexComponent } from './views/course-registration-view/index/index.component';
import { DegreeComponent } from './views/course-registration-view/degree/degree.component';
import { DeleteComponent } from './views/course-registration-view/delete/delete.component';
import { LogInComponent } from './views/log-in/log-in.component';
import { AccreditationOfGradesComponent } from './views/accreditation-of-grades/accreditation-of-grades.component';
import { CourseDetailsPopUpComponent } from './views/course-registration-view/course-details-pop-up/course-details-pop-up.component';
import { NoLongerAvailablePageComponent } from './views/no-longer-available-page/no-longer-available-page.component';
import { SomethingWentWrongComponent } from './views/something-went-wrong/something-went-wrong.component';
import { InternalRegulationViewComponent } from './views/internal-regulation-view/internal-regulation-view.component';
import { ShowPackagesComponent } from './views/program-view/show-packages/show-packages.component';
import { UpdatePackageComponent } from './views/program-view/update-package/update-package.component';
import { AccreditationCancelComponent } from './views/accreditation-cancel/accreditation-cancel.component';
import { ManageHoursBalancComponent } from './views/course-registration-view/manage-hours-balanc/manage-hours-balanc.component';
import { StudentTrainningCreationComponent } from './views/student-view/trainning-view/student-trainning-creation/student-trainning-creation.component';
import { ShowAllAvailableTrainningsComponent } from './views/student-view/trainning-view/show-all-available-trainnings/show-all-available-trainnings.component';
import { CreateBillComponent } from './views/student-view/bills/admins/create-bill/create-bill.component';
import { UpdateBillComponent } from './views/student-view/bills/admins/update-bill/update-bill.component';
import { StudentBillsComponent } from './views/student-view/bills/student-bills/student-bills.component';
import { StudentCreateBillComponent } from './views/student-view/bills/student-create-bill/student-create-bill.component';
import { LinkProgramsComponent } from './views/major-view/link-programs/link-programs.component';
import { RegistrationIndexComponent } from './views/program-registration/registration-index/registration-index.component';
import { RegisterSutdentToProgramComponent } from './views/program-registration/register-sutdent-to-program/register-sutdent-to-program.component';
import { UpdateRegistrationComponent } from './views/program-registration/update-registration/update-registration.component';
import { ProgramLinkParentComponent } from './views/program-view/program-link-parent/program-link-parent.component';
import { CanActivateRouteGuard } from './services/auth-services/can-activate-route.guard.service';
import { MilitaryServiceComponent } from './views/student-view/military-service/military-service.component';
import { DeleteTrainningComponent } from './views/student-view/trainning-view/delete-trainning/delete-trainning.component';
import { AcademicRecordComponent } from './views/reports/academic-record/academic-record.component';
import { StudentsReportComponent } from './views/reports/students-report/students-report.component';
import { StudentsLowGpaComponent } from "./views/reports/students-low-gpa/students-low-gpa.component";
import { CourseStudentsComponent } from './views/reports/course-students/course-students.component';
import { TestTransferComponent } from './views/program-registration/test-transfer/test-transfer.component';
import { AccountComponent } from './views/account/account.component';
// import { AppComponent } from './app.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full', canActivate: [CanActivateRouteGuard] },
  { path: 'home', component: HomeComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'show-all-courses', component: CourseIndexComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'add-course', component: CourseComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'search-course', component: CourseSearchComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'show-course/:id', component: CourseShowComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'update-course/:id', component: CourseUpdateComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'add-course-prerequisites/:programId/:courseId/:semesterNo/:coursePackageId', component: CoursePrerequisitesCreationComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'show-course-prerequisites/:programId/:courseId/:semesterNo/:coursePackageId', component: CoursePrerequisitesShowComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'search-student', component: StudentSearchComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'show-student/:id', component: StudentShowComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'update-student/:id', component: StudentUpdateComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'add-student', component: StudentComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'create-trainning-for-student/:id', component: StudentTrainningCreationComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'show-all-avilable-trainnings', component: ShowAllAvailableTrainningsComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'create-bill-for-student/:id', component: CreateBillComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'update-bill-for-student/:studentId/:billId', component: UpdateBillComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'show-all-bills-for-student/:id', component: StudentBillsComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'add-bill-for-student/:id', component: StudentCreateBillComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'add-department', component: DepartmentComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'show-department/:id', component: DepartmentShowComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'update-department/:id', component: DepartmentUpdateComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'search-department', component: DepartmentSearchComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'show-all-departments', component: DepartmentIndexComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'add-division', component: DivisionComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'show-division/:id', component: DivisionShowComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'update-division/:id', component: DivisionUpdateComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'search-division', component: DivisionSearchComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'show-all-divisions', component: DivisionIndexComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'add-major', component: MajorComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'show-major/:id', component: MajorShowComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'update-major/:id', component: MajorUpdateComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'search-major', component: MajorSearchComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'show-all-majors', component: MajorIndexComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'link-program-with-major/:id', component: LinkProgramsComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'add-program', component: ProgramComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'show-program/:id', component: ProgramShowComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'update-program/:id', component: ProgramUpdateComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'search-program', component: ProgramSearchComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'show-all-programs', component: ProgramIndexComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'add-courses-to-program/:id', component: ProgramLinkCoursesComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'link-program-with-parent/:id', component: ProgramLinkParentComponent, canActivate: [CanActivateRouteGuard] },
  // { path: 'link-program-with-parent/:id', component: ProgramLinkCoursesComponent , canActivate:[CanActivateRouteGuard]},
  { path: 'add-package-to-program/:id', component: CreatePackageComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'show-all-packages-in-program/:id', component: DeletePackageComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'update-program-package/:programId/:packageId', component: UpdatePackageComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'register-courses-for-student/:id', component: CourseRegistrationComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'show-all-registered-courses-for-student/:id', component: IndexComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'degree-registered-course/:id', component: DegreeComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'delete-registered-course/:id', component: DeleteComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'login', component: LogInComponent },
  { path: 'degree-accreditation', component: AccreditationOfGradesComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'cancel-accreditation', component: AccreditationCancelComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'course-details-pop-up', component: CourseDetailsPopUpComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'manage-hours-balance-for-student/:id', component: ManageHoursBalancComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'no-longer-available', component: NoLongerAvailablePageComponent },
  { path: 'something-went-wrong', component: SomethingWentWrongComponent },
  { path: 'internal-regulation', component: InternalRegulationViewComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'show-package-of-semester/:semesterNo/:programId', component: ShowPackagesComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'show-all-registred-students-of-program/:id', component: RegistrationIndexComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'transfer-student-to-program/:id', component: TestTransferComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'register-to-program-student/:id', component: RegisterSutdentToProgramComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'update-registeration-to-program-of-student/:id', component: UpdateRegistrationComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'military-serivce-for-student/:id', component: MilitaryServiceComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'edit-training-for-student/:id', component: DeleteTrainningComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'academic-record/:id', component: AcademicRecordComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'full-student-report', component: StudentsReportComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'students-low-gpa', component: StudentsLowGpaComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'course-students/:id', component: CourseStudentsComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'change-password', component: AccountComponent, canActivate: [CanActivateRouteGuard] },
  { path: '**', component: NoPageFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor() {
    // console.log(localStorage.getItem('backNamesList.departments.index'));
    // console.log([CanActivateRouteGuard]);
  }
}
