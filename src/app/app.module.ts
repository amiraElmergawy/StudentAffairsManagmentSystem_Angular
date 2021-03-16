import { MilitaryServiceComponent } from './views/student-view/military-service/military-service.component';
import { CreateBillComponent } from './views/student-view/bills/admins/create-bill/create-bill.component';
import { CoursesOpPipe } from './pipes/courses-op.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DivisionComponent } from './views/division-view/division-creation/division.component';
import { StudentComponent } from './views/student-view/student-creation/student.component';
import { HttpClientModule } from '@angular/common/http';
import { CourseComponent } from './views/course-view/course-creation/course.component';
import { MajorComponent } from './views/major-view/major-creation/major.component';
import { ProgramComponent } from './views/program-view/program-creation/program.component';
import { CourseUpdateComponent } from './views/course-view/course-update/course-update.component';
import { HomeComponent } from './views/home/home.component';
import { CourseSearchComponent } from './views/course-view/course-search/course-search.component';
import { CoursePrerequisitesCreationComponent } from './views/course-view/course-prerequisites-creation/course-prerequisites-creation.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CourseIndexComponent } from './views/course-view/course-index/course-index.component';
import { CourseShowComponent } from './views/course-view/course-show/course-show.component';
import { NoPageFoundComponent } from './views/no-page-found/no-page-found.component';
import { CoursePrerequisitesShowComponent } from './views/course-view/course-prerequisites-show/course-prerequisites-show.component';
import { StudentUpdateComponent } from './views/student-view/student-update/student-update.component';
import { StudentShowComponent } from './views/student-view/student-show/student-show.component';
import { StudentSearchComponent } from './views/student-view/student-search/student-search.component';
import { DepartmentUpdateComponent } from './views/department-view/department-update/department-update.component';
import { DepartmentShowComponent } from './views/department-view/department-show/department-show.component';
import { DepartmentIndexComponent } from './views/department-view/department-index/department-index.component';
import { DepartmentSearchComponent } from './views/department-view/department-search/department-search.component';
import { DepartmentComponent } from './views/department-view/department-creation/department.component';
import { DivisionUpdateComponent } from './views/division-view/division-update/division-update.component';
import { DivisionIndexComponent } from './views/division-view/division-index/division-index.component';
import { DivisionShowComponent } from './views/division-view/division-show/division-show.component';
import { DivisionSearchComponent } from './views/division-view/division-search/division-search.component';
import { MajorUpdateComponent } from './views/major-view/major-update/major-update.component';
import { MajorShowComponent } from './views/major-view/major-show/major-show.component';
import { MajorSearchComponent } from './views/major-view/major-search/major-search.component';
import { MajorIndexComponent } from './views/major-view/major-index/major-index.component';
import { ProgramIndexComponent } from './views/program-view/program-index/program-index.component';
import { ProgramShowComponent } from './views/program-view/program-show/program-show.component';
import { ProgramUpdateComponent } from './views/program-view/program-update/program-update.component';
import { ProgramSearchComponent } from './views/program-view/program-search/program-search.component';
import { ProgramLinkCoursesComponent } from './views/program-view/program-link-courses/program-link-courses.component';
import { CreatePackageComponent } from './views/program-view/create-package/create-package.component';
import { DeletePackageComponent } from './views/program-view/delete-package/delete-package.component';
import { CourseRegistrationComponent } from './views/course-registration-view/course-registration-creation/course-registration.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { IndexComponent } from './views/course-registration-view/index/index.component';
import { DegreeComponent } from './views/course-registration-view/degree/degree.component';
import { DeleteComponent } from './views/course-registration-view/delete/delete.component';
import { SemesterPipePipe } from './pipes/semester-pipe.pipe';
import { BooleanPipePipe } from './pipes/boolean-pipe.pipe';
import { LogInComponent } from './views/log-in/log-in.component';
import { HighSchoolDeptPipe } from './pipes/high-school-dept.pipe';
import { MajorTypePipe } from './pipes/major-type.pipe';
import { AccreditationOfGradesComponent } from './views/accreditation-of-grades/accreditation-of-grades.component';
import { CourseDetailsPopUpComponent } from './views/course-registration-view/course-details-pop-up/course-details-pop-up.component';
import { ConvertIdToNamePipe } from './pipes/convert-id-to-name.pipe';
import { NoLongerAvailablePageComponent } from './views/no-longer-available-page/no-longer-available-page.component';
import { SomethingWentWrongComponent } from './views/something-went-wrong/something-went-wrong.component';
import { InternalRegulationViewComponent } from './views/internal-regulation-view/internal-regulation-view.component';
import { ShowPackagesComponent } from './views/program-view/show-packages/show-packages.component';
import { PackageKindPipe } from './pipes/package-kind.pipe';
import { UpdatePackageComponent } from './views/program-view/update-package/update-package.component';
import { AccreditationCancelComponent } from './views/accreditation-cancel/accreditation-cancel.component';
import { ManageHoursBalancComponent } from './views/course-registration-view/manage-hours-balanc/manage-hours-balanc.component';
import { ShowStudentAssentialDataComponent } from './views/course-registration-view/show-student-assential-data/show-student-assential-data.component';
import { StudentTrainningCreationComponent } from './views/student-view/trainning-view/student-trainning-creation/student-trainning-creation.component';
import { ShowAllAvailableTrainningsComponent } from './views/student-view/trainning-view/show-all-available-trainnings/show-all-available-trainnings.component';
import { DeleteTrainningComponent } from './views/student-view/trainning-view/delete-trainning/delete-trainning.component';
import { StudentBillsComponent } from './views/student-view/bills/student-bills/student-bills.component';
import { UpdateBillComponent } from './views/student-view/bills/admins/update-bill/update-bill.component';
import { BillPaymentTypePipe } from './pipes/bill-payment-type.pipe';
import { StudentCreateBillComponent } from './views/student-view/bills/student-create-bill/student-create-bill.component';
import { LinkProgramsComponent } from './views/major-view/link-programs/link-programs.component';
import { ProgramLinkParentComponent } from './views/program-view/program-link-parent/program-link-parent.component';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { RegisterSutdentToProgramComponent } from './views/program-registration/register-sutdent-to-program/register-sutdent-to-program.component';
import { UpdateRegistrationComponent } from './views/program-registration/update-registration/update-registration.component';
import { RegistrationIndexComponent } from './views/program-registration/registration-index/registration-index.component';
import { AcademicRecordComponent } from './views/reports/academic-record/academic-record.component';
import { StudentsReportComponent } from './views/reports/students-report/students-report.component';
import { StudentsLowGpaComponent } from './views/reports/students-low-gpa/students-low-gpa.component';
import { CourseStudentsComponent } from './views/reports/course-students/course-students.component';
import { LoaderComponent } from './views/loader/loader.component';
import { TestTransferComponent } from './views/program-registration/test-transfer/test-transfer.component';
import { FooterComponent } from './views/footer/footer.component';
import { HeaderComponent } from './views/header/header.component';
import { AccountComponent } from './views/account/account.component';

@NgModule({
  declarations: [
    TestTransferComponent,
    MilitaryServiceComponent,
    AppComponent,
    CreateBillComponent,
    DivisionComponent,
    MajorComponent,
    DepartmentComponent,
    CourseComponent,
    CourseRegistrationComponent,
    StudentComponent,
    ProgramComponent,
    CourseUpdateComponent,
    HomeComponent,
    CourseSearchComponent,
    CoursePrerequisitesCreationComponent,
    CourseIndexComponent,
    CourseShowComponent,
    NoPageFoundComponent,
    CoursePrerequisitesShowComponent,
    StudentUpdateComponent,
    StudentShowComponent,
    StudentSearchComponent,
    DepartmentUpdateComponent,
    DepartmentShowComponent,
    DepartmentIndexComponent,
    DepartmentSearchComponent,
    DivisionUpdateComponent,
    DivisionIndexComponent,
    DivisionShowComponent,
    DivisionSearchComponent,
    MajorUpdateComponent,
    MajorShowComponent,
    MajorSearchComponent,
    MajorIndexComponent,
    ProgramIndexComponent,
    ProgramShowComponent,
    ProgramUpdateComponent,
    ProgramSearchComponent,
    ProgramLinkCoursesComponent,
    CreatePackageComponent,
    DeletePackageComponent,
    IndexComponent,
    DegreeComponent,
    DeleteComponent,
    CoursesOpPipe,
    FilterPipe,
    SemesterPipePipe,
    BooleanPipePipe,
    LogInComponent,
    HighSchoolDeptPipe,
    MajorTypePipe,
    AccreditationOfGradesComponent,
    CourseDetailsPopUpComponent,
    ConvertIdToNamePipe,
    NoLongerAvailablePageComponent,
    SomethingWentWrongComponent,
    InternalRegulationViewComponent,
    ShowPackagesComponent,
    PackageKindPipe,
    UpdatePackageComponent,
    AccreditationCancelComponent,
    ManageHoursBalancComponent,
    ShowStudentAssentialDataComponent,
    StudentTrainningCreationComponent,
    ShowAllAvailableTrainningsComponent,
    DeleteTrainningComponent,
    StudentBillsComponent,
    UpdateBillComponent,
    BillPaymentTypePipe,
    StudentCreateBillComponent,
    LinkProgramsComponent,
    ProgramLinkParentComponent,
    RegisterSutdentToProgramComponent,
    UpdateRegistrationComponent,
    RegistrationIndexComponent,
    AcademicRecordComponent,
    StudentsReportComponent,
    StudentsLowGpaComponent,
    CourseStudentsComponent,
    LoaderComponent,
    FooterComponent,
    HeaderComponent,
    AccountComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot(),
    FlashMessagesModule.forRoot(),
    NgxWebstorageModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
