import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { FlashMessagesService } from 'angular2-flash-messages';

@Injectable({
  providedIn: 'root'
})
export class CanActivateRouteGuard implements CanActivate {
  authorizedList;
  userPermissions;
  convertedPermissions = ['home'];
  constructor(
    private storage: LocalStorageService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) {
    this.authorizedList = this.storage.retrieve('backNamesList');
    this.userPermissions = this.storage.retrieve('userPermissions');
  }
  // mapRouteToPermission() used to convert the routing link to permission
  mapRouteToPermission(route: string): string {
    let permissionName: string = '';
    let helperString1, helperString2: string;
    let index: number;
    //route = route.substring(1,route.length-1); //to delete the first char '/'
    if (route.includes('show-all')) {
      if (route.includes('show-all-avilable-trainnings')) {
        permissionName = 'training.index';
      } else if (route.includes('show-all-bills-for-student')) {
        permissionName = 'student.bills';
      } else if (route.includes('show-all-packages-in-program')) {
        permissionName = 'packages.index';
      } else if (route.includes('show-all-registered-courses-for-student')) {
        permissionName = 'course-registrations.index';
      } else if (route.includes('show-all-registred-students-of-program')) {
        permissionName = 'student.programRegister';
      } else {
        helperString1 = '.index';
        index = route.lastIndexOf('-');
        helperString2 = route.substring(index + 1);
        permissionName = helperString2 + helperString1;
      }
    } else if (route.includes('add')) {
      if (route.includes('add-course-prerequisites/')) {
        permissionName = 'program.insert-prerequisites';
      } else {
        helperString1 = '.store';
        index = route.lastIndexOf('-');
        helperString2 = route.substring(index + 1) + 's';
        permissionName = helperString2 + helperString1;
      }
    } else if (route.includes('update-registeration-to-program-of-student')) {
      permissionName = 'program_registration.update';
    } else if (route.includes('register-to-program-student')) {
      permissionName = 'student.programRegister';
    } else if (route.includes('search')) {
      helperString1 = '.search';
      index = route.lastIndexOf('-');
      helperString2 = route.substring(index + 1);
      permissionName = helperString2 + helperString1;
    } else if (route.includes('show')) {
      if (route.includes('show-course-prerequisites')) {
        permissionName = 'program.get-prerequisites';
      } else if (route.includes('show-package-of-semester')) {
        permissionName = 'packages.show';
      } else {
        helperString1 = '.show';
        index = route.lastIndexOf('-');
        helperString2 = route.substring(index + 1) + 's';
        permissionName = helperString2 + helperString1;
      }
    } else if (route.includes('update')) {
      if (route.includes('update-bill-for-student')) {
        permissionName = 'student.update_bill';
      } else if (route.includes('update-program-package')) {
        permissionName = 'program.packages';
      } else {
        helperString1 = '.update';
        index = route.lastIndexOf('-');
        helperString2 = route.substring(index + 1) + 's';
        permissionName = helperString2 + helperString1;
      }
    } else if (route.includes('create')) {
      if (route.includes('create-trainning-for-student')) {
        permissionName = 'student.add-training';
      } else if (route.includes('create-bill-for-student')) {
        permissionName = 'student.add_bill';
      }
    } else if (route.includes('link')) {
      if (route.includes('major')) {
        permissionName = 'programs.linkMajor';
      } else if (route.includes('parent')) {
        permissionName = 'programs.linkParent';
      }
    } else if (route.includes('register')) {
      permissionName = 'course-registrations.store';
    } else if (route.includes('degree')) {
      if (route.includes('accreditation')) {
        permissionName = 'course-registrations.accredit';
      } else if (route.includes('course')) {
        permissionName = 'course-registrations.degree';
      }
    } else if (route.includes('delete')) {
      permissionName = 'course-registrations.index';
    } else if (route.includes('cancel')) {
      permissionName = 'course-registrations.unaccredit';
    } else if (route.includes('manage')) {
      permissionName = 'student.manage-hours-balance';
    } else {
      permissionName = route;
    }
    return permissionName;
  }
  checkIdleTime(lastActionTime: number): number {
    let currentTime = new Date();
    let hours = +currentTime.getHours();
    let minutes = +currentTime.getMinutes();
    let currentCalcTime = hours * 60 + minutes;
    if (lastActionTime > currentCalcTime) {
      return lastActionTime - currentCalcTime;
    } else {
      return currentCalcTime - lastActionTime;
    }
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    //console.log(this.authorizedList);
    //console.log(this.userPermissions);
    //console.log(state.url);
    let lastActionTime = this.storage.retrieve('startTime');
    if (this.checkIdleTime(lastActionTime) > 50) {
      this.storage.clear();
      this.flashMessage.show("يجب اعادة التسجيل", { cssClass: 'flash_danger', timeout: 5000 });
      this.router.navigate(['/login/']);
      // return false;
    }
    else {
      let regulationFlag: boolean = false;
      for (let index = 0; index < this.userPermissions?.length; index++) {
        const element = this.userPermissions[index];
        if (
          element.includes('department') ||
          element.includes('program') ||
          (element.includes('package') &&
            !element.includes('egister')) ||
          element.includes('division') ||
          element.includes('major') ||
          (
            element.includes('course') &&
            !element.includes('registrations.store') &&
            !element.includes('registrations.index') &&
            !element.includes('registrations.destroy') &&
            !element.includes('registrations.show') &&
            !element.includes('registrations.degree')
          )
        ) {
          regulationFlag = true;
          break;
        }
      }
      if (state.url.includes('home') && !this.authorizedList) {
        // this.flashMessage.show("غير مصرح بالدخول", { cssClass: 'flash_danger', timeout: 5000 });
        this.router.navigate(['login']);
        //return false;
      } else if (state.url.includes('internal') && regulationFlag != true) // user need to get in the internal regulation 
      {
        this.flashMessage.show("غير مصرح بالدخول", { cssClass: 'flash_danger', timeout: 5000 });
        return false;
      }
    }
    return true;
  }
}
