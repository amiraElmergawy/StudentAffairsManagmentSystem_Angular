import { Component, OnInit } from "@angular/core";
import { MainService } from "src/app/services/main-service";
import { ImageSnippet } from "src/app/classes/dbClasses/student/image-snippet";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
//import { ForbidenNamesService } from "src/app/services/validation-services/forbiden-names.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: "app-student",
  templateUrl: "./student.component.html",
  styleUrls: ["./student.component.scss"]
})
export class StudentComponent implements OnInit {
  //the following variables for html form part
  genders = ["انثي",
    "ذكر"];
  departments;
  currentDeptMajors = null;
  currentMajorPrograms = null;
  religions = ["مسلم", "مسيحى", "اخري"];
  nationalities = null;
  nationalityId: number; // take the selected nationality id
  specializations = ["علمى/علوم", "علمى/رياضة"];
  dropdownSettings: IDropdownSettings = {};
  status = ["لا يوجد", "لم يحدد الموقف", "مطلوب", "اعفاء مؤقت", "مؤجل", "لم يصبه الدور", "اعفاء نهائي", "انهي الخدمة",];
  wanted = ["معفي", "غير معفي"];
  collageService = ["ادي", "لم يؤدي"];
  selectedFile: ImageSnippet;
  fileData: File = null;
  studentImage: File = null;
  typingFlag: boolean = false;
  imageURL;
  imageValidator: boolean;
  // to save the filterd majors and programs
  uniqueMajors = null;
  uniquePrograms = null;
  wafedAppearanceFlag = true;
  transferredAppearanceFlag = true;
  transferredRegAppearanceFlag = true;
  //uploadForm: FormGroup;
  fileProgress(fileInput: any) {
    if (fileInput) {
      this.fileData = <File>fileInput.target.files[0];
      if (this.fileData) {
        this.preview();
        this.imageValidator = this.imageValidation(this.fileData.name);
        //console.log(this.imageValidator);
      }
      else {
        this.imageURL = null;
        this.imageValidator = null;
      }
    }
  }
  processFile(imageInput: any) {
    //this.showPreview(imageInput);
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.studentImage = this.selectedFile.file;
      //console.log(this.studentImage);
    });
    // console.log(file);
    reader.readAsDataURL(file);
    //console.log(file);
    //console.log(reader.result as string);
  }
  //imageValidation usede to validate enterd image from its url to reject image or files that have extension before the image extension
  // it takes image url and search if the string contain other extesions
  // return false if there exist another extensions and true if not(image valid)
  imageValidation(imageUrl: string): boolean {
    //console.log(imageUrl);
    let urlLength = imageUrl.length;
    let dotExtensionIndex = imageUrl.indexOf('.');
    let extensionString: string;
    //
    if (dotExtensionIndex == urlLength - 3 || dotExtensionIndex == urlLength - 4 || dotExtensionIndex == urlLength - 5) {//image not contain any extensions or dot in its name
      extensionString = imageUrl.slice(dotExtensionIndex + 1); // to take extension only without dot
      let extensionLower = extensionString.toLowerCase();
      if (
        extensionLower == 'tif' ||
        extensionLower == 'jpg' ||
        extensionLower == 'jpeg' ||
        extensionLower == 'gif' ||
        extensionLower == 'png' ||
        extensionLower == 'tiff' ||
        extensionLower == 'jfif'
        // extensionLower == 'pjpeg' ||
        // extensionLower == 'pjp' ||
        // extensionLower == 'webp' ||
        // extensionLower == 'svg' || 
        // extensionLower == 'bmp' ||
        // extensionLower == 'svgz' ||
        // extensionLower == 'ico' ||
        // extensionLower == 'xbm' ||
        // extensionLower == 'dib' 
      ) {
        return true;
      }
      else {
        return false;
      }
    }
    else {// there is another extension or dot in rest image name
      extensionString = imageUrl.slice(dotExtensionIndex + 1);
      let extensionLower = extensionString.toLowerCase();
      if ( // check for file extensions to be sure that it is not a virus
        extensionLower.includes('exe.') ||
        extensionLower.includes('doc.') ||
        extensionLower.includes('docx.') ||
        extensionLower.includes('docm.') ||
        extensionLower.includes('hta.') ||
        extensionLower.includes('html.') ||
        extensionLower.includes('htm.') ||
        extensionLower.includes('js.') ||
        extensionLower.includes('jar.') ||
        extensionLower.includes('vbs.') ||
        extensionLower.includes('vb.') ||
        extensionLower.includes('pdf.') ||
        extensionLower.includes('sfx.') ||
        extensionLower.includes('bat.') ||
        extensionLower.includes('dll.') ||
        extensionLower.includes('py.') ||
        extensionLower.includes('msi.') ||
        extensionLower.includes('msp.') ||
        extensionLower.includes('com.') ||
        extensionLower.includes('gadget.') ||
        extensionLower.includes('vbe.') ||
        extensionLower.includes('jse.') ||
        extensionLower.includes('ps1.') ||
        extensionLower.includes('ps1xml.') ||
        extensionLower.includes('ps2.') ||
        extensionLower.includes('ps2xml.') ||
        extensionLower.includes('psc1.') ||
        extensionLower.includes('lnk.') ||
        extensionLower.includes('inf.') ||
        extensionLower.includes('scf.') ||
        extensionLower.includes('dotx.') ||
        extensionLower.includes('docb.') ||
        extensionLower.includes('dotm.') ||
        extensionLower.includes('xls.') ||
        extensionLower.includes('xlt.') ||
        extensionLower.includes('xlm.') ||
        extensionLower.includes('xlsx.') ||
        extensionLower.includes('xlsm.') ||
        extensionLower.includes('xltx.') ||
        extensionLower.includes('xltm.') ||
        extensionLower.includes('xlsb.') ||
        extensionLower.includes('xlam.') ||
        extensionLower.includes('xll.') ||
        extensionLower.includes('xlw.') ||
        extensionLower.includes('pptx.') ||
        extensionLower.includes('pptm.') ||
        extensionLower.includes('potx.') ||
        extensionLower.includes('potm.') ||
        extensionLower.includes('ppam.') ||
        extensionLower.includes('ppsx.') ||
        extensionLower.includes('ppsm.') ||
        extensionLower.includes('sldx.') ||
        extensionLower.includes('sldm.') ||
        extensionLower.includes('pub.') ||
        extensionLower.includes('xps.') ||
        // extensionLower.includes('potm.') ||
        extensionLower.includes('psc2.')
      ) {
        return false;
      }
      else { // dot exist in image name
        return true;
      }
    }
  }
  /** Image Preview */
  preview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.imageURL = reader.result;
    }
  }
  studentForm: FormGroup;
  currentstudentSsn: string[]; // to save all current exist students Arabic codes
  currentstudentPassport: string[]; // to save all current exist students English codes
  //******************* */
  data;
  createdData;
  authorizedList;
  constructor(
    private service: MainService,
    // private validationService: ForbidenNamesService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private storage: LocalStorageService,
  ) {
    this.authorizedList = this.storage.retrieve('backNamesList');
    this.currentstudentSsn = [""];
    this.currentstudentPassport = [""];
  }

  ngOnInit(): void {
    if (!this.authorizedList['students.store']) {
      this.flashMessage.show("غير مصرح بالدخول", { cssClass: 'flash_danger' });
      this.router.navigate(['/home']);
    } else {
      this.getDepartments();
      this.getNationalities();
      //this.getAllStudents();
      this.studentForm = new FormGroup({
        // 'image':new FormControl(null,
        //   [
        //     Validators.
        //   ]),
        'ssn': new FormControl(null, [
          Validators.required,
          Validators.minLength(14),
          Validators.maxLength(14),
          Validators.pattern("[0-9]+"),
          // this.validationService.forbiddenNames(this.currentstudentSsn) // to force user not to repeat names
        ]),
        'passportNumber': new FormControl(null, [
          // Validators.required,
          Validators.maxLength(20),
          Validators.pattern("[0-9a-zA-Z\_\-]+"),
          // this.validationService.forbiddenNames(this.currentstudentPassport)
        ]),
        'arFirstName': new FormControl(null, [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern("[\u0621-\u064A]+") // this pattern to force user to only type arabic letters and spaces (at least 4 arabic letters then zero or one space)
          //Validators.pattern("[\u0621-\u063A]|[\u0641-\u064A]|\s"),
        ]),
        'arSecondName': new FormControl(null, [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern("[\u0621-\u064A]+") // this pattern to force user to only type arabic letters and spaces (at least 4 arabic letters then zero or one space)
          //Validators.pattern("[\u0621-\u063A]|[\u0641-\u064A]|\s"),
        ]),
        'arThirdName': new FormControl(null, [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern("[\u0621-\u064A]+") // this pattern to force user to only type arabic letters and spaces (at least 4 arabic letters then zero or one space)
          //Validators.pattern("[\u0621-\u063A]|[\u0641-\u064A]|\s"),
        ]),
        'arFamilyName': new FormControl(null, [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern("[\u0621-\u064A]+") // this pattern to force user to only type arabic letters and spaces (at least 4 arabic letters then zero or one space)
          //Validators.pattern("[\u0621-\u063A]|[\u0641-\u064A]|\s"),
        ]),
        'enFirstName': new FormControl(null, [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern("[a-zA-Z]+") // this pattern to force user to just type english letters and spaces (at least 4 english letters then zero or one space)
        ]),
        'enSecondName': new FormControl(null, [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern("[a-zA-Z]+") // this pattern to force user to just type english letters and spaces (at least 4 english letters then zero or one space)
        ]),
        'enThirdName': new FormControl(null, [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern("[a-zA-Z]+") // this pattern to force user to just type english letters and spaces (at least 4 english letters then zero or one space)
        ]),
        'enFamilyName': new FormControl(null, [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern("[a-zA-Z]+") // this pattern to force user to just type english letters and spaces (at least 4 english letters then zero or one space)
        ]),
        'gender': new FormControl(null, [Validators.required]),
        'collageEmail': new FormControl(null, [
          Validators.required,
          Validators.pattern("[a-zA-Z-_.0-9]{2,}@sci.asu.edu.eg"),
          Validators.minLength(17)
        ]),
        'currentDepartment': new FormControl(null, Validators.required),
        // 'currentMajor': new FormControl(null),
        'currentProgram': new FormControl(null),
        'additionalInfo': new FormGroup({
          'birthDate': new FormControl(null, [Validators.required]),
          'birthPlace': new FormControl(null, [
            Validators.required,
            Validators.pattern("([\u0621-\u064A]{4,}(\u0020)?)+"), // this pattern to force user to only type arabic letters and spaces (at least 4 arabic letters then zero or one space)
            Validators.minLength(4), Validators.maxLength(20)
          ]),
          'address': new FormGroup(
            {
              'homeNo': new FormControl(null, Validators.pattern("[0-9]*")),
              'streetName': new FormControl(null, [
                Validators.required,
                Validators.pattern("([\u0621-\u064A]{2,}(\u0020)?)+") // this pattern to force user to only type arabic letters and spaces (at least 4 arabic letters then zero or one space)
              ]),
              'areaName': new FormControl(null, [
                Validators.required,
                Validators.pattern("([\u0621-\u064A]{2,}(\u0020)?)+") // this pattern to force user to only type arabic letters and spaces (at least 4 arabic letters then zero or one space)
              ]),
              'countryName': new FormControl(null, [
                Validators.required,
                Validators.pattern("([\u0621-\u064A]{2,}(\u0020)?)+") // this pattern to force user to only type arabic letters and spaces (at least 4 arabic letters then zero or one space)
              ])
            }
            ,
            [Validators.minLength(15), Validators.maxLength(150)]
          ),
          'religion': new FormControl(null, [Validators.required]),
          'motherName': new FormControl(null, [
            Validators.required,
            Validators.minLength(15),
            Validators.maxLength(150),
            Validators.pattern("([\u0621-\u064A]{2,}(\u0020)?)+")
          ]),
          'fatherProfession': new FormControl(null, [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(30),
            Validators.pattern("([\u0621-\u064A]{2,}(\u0020)?)+")
          ]),
          'nationalityId': new FormControl('', [Validators.required]),
          'landPhone': new FormControl(null, [
            Validators.required,
            Validators.pattern("[0-9]{8,10}")
          ]),
          'mobile': new FormControl(null, [
            Validators.required,
            Validators.pattern("[0-9]{11,16}")
          ])
        }),
        'highSchool': new FormGroup({
          'hSSpecialization': new FormControl(null, [Validators.required]),
          'hSSeatNumber': new FormControl(null, [
            Validators.required,
            Validators.pattern("[0-9]{5}")
          ]),
          'hSGrade': new FormControl(null, [
            Validators.required,
            Validators.pattern("[0-9]+"),
            Validators.max(410)
          ]),
          'hSGradePlus': new FormControl(null, [
            Validators.required,
            Validators.pattern("[0-9]+\.[0-9]+|[0-9]")
          ]),
          'hSGradYear': new FormControl(null, [
            Validators.required,
            Validators.pattern("[12][0-9]{3}") // first number 1 or 2 then any set of numbers in length 3
          ]),
          'hSName': new FormControl(null, [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(100),
            Validators.pattern("([\u0621-\u064A]{1,}(\u0020)?)+") // this pattern to force user to only type arabic letters and spaces (at least 4 arabic letters then zero or one space)
          ])
        }),
        'specialRegistration': new FormGroup({
          'wafed': new FormControl(false),
          'wafedFrom': new FormControl(null),
          'transferred': new FormControl(false),
          'transferredFrom': new FormControl(null),
          'registrationTransferred': new FormControl(false),
          'registrationTransferredFrom': new FormControl(null)
        }),
      });
      // this.studentForm.valueChanges.subscribe(value =>
      //   //console.log(this.studentForm)
      // );
      // this.studentForm.statusChanges.subscribe(status => console.log(status));
      this.formControlValueChanged();
    }
  }
  async getDepartments() {
    this.service.pathName = "departments";
    this.departments = await this.service.index();
    // this.departments.shift();
  }
  // async getMajors() {
  //   if (this.studentForm.get("currentDepartment").value != 'null') {
  //     let currentDeptId = +this.studentForm.get("currentDepartment").value;
  //     //console.log(currentDeptId);
  //     this.service.pathName = "departments/" + currentDeptId;
  //     this.currentDeptMajors = await this.service.show();
  //     if (this.currentDeptMajors.majors.length != 0) {
  //       //console.log('if-case');
  //       this.uniqueMajors = this.filterMajors(this.currentDeptMajors.majors);
  //       //console.log(this.uniqueMajors);
  //     }
  //     // console.log(this.currentDeptMajors);
  //   }
  //   else {
  //     this.currentDeptMajors = null;
  //     this.uniqueMajors = null;
  //   }
  // }
  // to get all programs in the current major
  async getPrograms() {
    if (this.studentForm.get("currentDepartment").value != 'null') {
      let currentDeptId = +this.studentForm.get("currentDepartment").value;
      this.service.pathName = "departments/" + currentDeptId;
      this.currentMajorPrograms = await this.service.show();
      //console.log(this.currentMajorPrograms);
      //console.log(this.currentMajorPrograms);
     // console.log(this.currentMajorPrograms)
      if (this.currentMajorPrograms?.programs?.length != 0) {
        //console.log('if-case');
        // this.uniquePrograms = this.filterMajors(this.currentMajorPrograms.programs);
        // console.log(this.uniquePrograms);
        this.uniquePrograms = this.currentMajorPrograms.programs.filter(program => program.isMajor == 0);
      }
      else {
        this.currentMajorPrograms = null;
      this.uniquePrograms = null;
      }
      //console.log(this.currentMajorPrograms);
    } else {
      this.currentMajorPrograms = null;
      this.uniquePrograms = null;
    }
  }
  //filterMajor fun used to filter all majors coming from the database
  //by adding the first element in tmp array and take only the unique values in the original array  then return the unique array
  // filterMajors(arr) { //if flag exist and == 1 the programs will be filterd
  //   // if (flag == 1) {
  //     // var tmp = [arr[0]];
  //     for (var i = 0; i < arr.length; i++) {
  //       if(arr[i].isMajor == 1){
  //         arr.splice(i,1);
  //       }
  //       // var itemIndex = tmp.map(i => i.Id).indexOf(arr[i].Id);
  //       //console.log(itemIndex);
  //       // if (itemIndex == -1) {
  //         //console.log(tmp.indexOf(arr[i]));
  //         // tmp.push(arr[i]);
  //       }
  //     // }
  //     //console.log(tmp);
      
  //     // } else {
  //       //   var tmp = [arr[0]];
  //       //   for (var i = 1; i < arr.length; i++) {
  //         //     var itemIndex = tmp.map(i => i.id).indexOf(arr[i].id);
  //         //     //console.log(itemIndex);
  //   //     if (itemIndex == -1) {
  //     //       //console.log(tmp.indexOf(arr[i]));
  //     //       tmp.push(arr[i]);
  //     //     }
  //     //   }
  //     //   //console.log(tmp);
  //     //   return tmp;
  //   // }
  //   return arr;
    
  // }
  // getNationalities used to get all nationalities and set the multiple-select settings
  async getNationalities() {
    this.service.pathName = "nationalities";
    this.nationalities = await this.service.index();
    //console.log(this.nationalities);
    this.dropdownSettings = {
      singleSelection: true,
      idField: "id",
      textField: "countryArName",
      selectAllText: "Select All",
      itemsShowLimit: 1,
      allowSearchFilter: true,
      closeDropDownOnSelection: true
    };
  }

  onItemSelect(item: any) {
    this.nationalityId = item.id;
    //console.log(this.nationalityId);
  }
  onItemDeSelect(item: any) {
    this.nationalityId = null;
  }
  onChange() {
    // used to change the-religion input field from select to text-feild if user choose 'ديانة اخري'
    if (this.studentForm.get("additionalInfo.religion").value == "اخري") {
      this.studentForm.get('additionalInfo.religion').patchValue('');
      this.typingFlag = true;
    }
  }
  formControlValueChanged() {//used to subscribe the check boxes of special registration 
    // as if user check 'wafed' button box then we need to force user to enter the 'wafed from' input
    //and  call this in OnInit lifecycle hook
    //console.log('function fired');
    // const wafedFromControl = this.studentForm.get('wafedFrom');
    //console.log(wafedFromControl);
    //console.log(this.studentForm.get('wafed')?.value);
    //this.wafedFrom.
    this.studentForm.get('specialRegistration.wafed')?.valueChanges.subscribe(
      checked => {
        // console.log(this.studentForm.get('specialRegistration.wafed')?.value);
        //console.log(isChecked);
        if (checked == true) {
          this.studentForm.get('specialRegistration.wafedFrom').setValidators([
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(100),
            Validators.pattern("([\u0621-\u064A]{2,}(\u0020)?)+") // this pattern to force user to only type arabic letters and spaces (at least 4 arabic letters then zero or one space)
          ]);
          this.transferredAppearanceFlag = false;
          this.transferredRegAppearanceFlag = false;
          //console.log('in if case');
        }
        else {
          this.studentForm.get('specialRegistration.wafedFrom').setValidators(null);
          this.transferredAppearanceFlag = true;
          this.transferredRegAppearanceFlag = true;
          //console.log('in else case');
        }
        // wafedFromControl.updateValueAndValidity();
        //this.studentForm.get('wafedFrom') = wafedFromControl;
        this.studentForm.get('specialRegistration.wafedFrom').updateValueAndValidity();
        // console.log(this.studentForm.get('specialRegistration.wafedFrom'));
      });
    this.studentForm.get('specialRegistration.transferred')?.valueChanges.subscribe(
      checked => {
        //console.log(this.studentForm.get('specialRegistration.transferred')?.value);
        //console.log(isChecked);
        if (checked == true) {
          this.studentForm.get('specialRegistration.transferredFrom').setValidators([
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(100),
            Validators.pattern("([\u0621-\u064A]{2,}(\u0020)?)+") // this pattern to force user to only type arabic letters and spaces (at least 4 arabic letters then zero or one space)
          ]);
          this.wafedAppearanceFlag = false;
          this.transferredRegAppearanceFlag = false;
          //    console.log('in if case');
        }
        else {
          this.studentForm.get('specialRegistration.transferredFrom').setValidators(null);
          this.wafedAppearanceFlag = true;
          this.transferredRegAppearanceFlag = true;
          //  console.log('in else case');
        }
        // wafedFromControl.updateValueAndValidity();
        //this.studentForm.get('wafedFrom') = wafedFromControl;
        this.studentForm.get('specialRegistration.transferredFrom').updateValueAndValidity();
        //console.log(this.studentForm.get('specialRegistration.transferredFrom'));
      });
    this.studentForm.get('specialRegistration.registrationTransferred')?.valueChanges.subscribe(
      checked => {
        //console.log(this.studentForm.get('specialRegistration.registrationTransferred')?.value);
        //console.log(isChecked);
        if (checked == true) {
          this.studentForm.get('specialRegistration.registrationTransferredFrom').setValidators([
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(100),
            Validators.pattern("([\u0621-\u064A]{2,}(\u0020)?)+") // this pattern to force user to only type arabic letters and spaces (at least 4 arabic letters then zero or one space)
          ]);
          this.wafedAppearanceFlag = false;
          this.transferredAppearanceFlag = false;
          //console.log('in if case');
        }
        else {
          this.studentForm.get('specialRegistration.registrationTransferredFrom').setValidators(null);
          this.wafedAppearanceFlag = true;
          this.transferredAppearanceFlag = true;
          //console.log('in else case');
        }
        // wafedFromControl.updateValueAndValidity();
        //this.studentForm.get('wafedFrom') = wafedFromControl;
        this.studentForm.get('specialRegistration.registrationTransferredFrom').updateValueAndValidity();
        //console.log(this.studentForm.get('specialRegistration.registrationTransferredFrom'));
      });
  }
  // concat student address fields together
  studentAddress(): string {
    let address: string = "";
    if (this.studentForm.get("additionalInfo.address.homeNo").value != null) {
      address += this.studentForm.get("additionalInfo.address.homeNo").value + "-";
    }
    address +=
      this.studentForm.get("additionalInfo.address.streetName").value + "-" +
      this.studentForm.get("additionalInfo.address.areaName").value + "-" +
      this.studentForm.get("additionalInfo.address.countryName").value;
    return address;
  }
  // create() take the input data from form and send it to the service
  async create() {
    this.service.pathName = "students";
    var student = {
      'student': {
        'ssn': +this.studentForm.get("ssn").value,
        // 'academicCode': this.studentForm.get("academicCode").value,
        'passportNumber': this.studentForm.get("passportNumber")?.value,
        'arFirstName': this.studentForm.get("arFirstName").value,
        'arSecondName': this.studentForm.get("arSecondName").value,
        'arThirdName': this.studentForm.get("arThirdName").value,
        'arFamilyName': this.studentForm.get("arFamilyName").value,
        'enFirstName': this.studentForm.get("enFirstName").value,
        'enSecondName': this.studentForm.get("enSecondName").value,
        'enThirdName': this.studentForm.get("enThirdName").value,
        'enFamilyName': this.studentForm.get("enFamilyName").value,
        'collageEmail': this.studentForm.get("collageEmail").value,
        'gender': +this.studentForm.get("gender").value,
        'currentDepartment': +this.studentForm.get("currentDepartment").value,
        'currentProgram': +this.studentForm.get("currentProgram").value,
        'currentMajor': null
      },
      'studentAdditionalInfo': {
        'birthDate': this.studentForm.get("additionalInfo.birthDate").value,
        'birthPlace': this.studentForm.get("additionalInfo.birthPlace").value,
        'address': this.studentAddress(),
        'religion': this.studentForm.get("additionalInfo.religion").value,
        'motherName': this.studentForm.get("additionalInfo.motherName").value,
        'fatherProfession': this.studentForm.get(
          "additionalInfo.fatherProfession"
        ).value,
        'landPhone': this.studentForm.get("additionalInfo.landPhone").value,
        'mobile': this.studentForm.get("additionalInfo.mobile").value,
        'nationalityId': this.nationalityId

      },
      'highSchool': {
        'hSSpecialization': this.studentForm.get("highSchool.hSSpecialization")
          .value,
        'hSSeatNumber': this.studentForm.get("highSchool.hSSeatNumber").value,
        'hSGrade': this.studentForm.get("highSchool.hSGrade").value,
        'hSGradePlus': this.studentForm.get("highSchool.hSGradePlus").value,
        'hSGradYear': this.studentForm.get("highSchool.hSGradYear").value,
        'hSName': this.studentForm.get("highSchool.hSName").value
      },
      'specialRegistration': {
        'wafed': 0,
        'transferred': 0,
        'registrationTransferred': 0
      },
    };
    //console.log(student);
    if (this.studentForm.get('specialRegistration.wafed')?.value == true) {
      student.specialRegistration['wafed'] = this.studentForm.get("specialRegistration.wafed").value;
      student.specialRegistration['wafedFrom'] = this.studentForm.get("specialRegistration.wafedFrom").value;
      student.specialRegistration['transferred'] = 0;
      student.specialRegistration['registrationTransferred'] = 0;
    }
    if (this.studentForm.get('specialRegistration.transferred')?.value == true) {
      student.specialRegistration['transferred'] = this.studentForm.get("specialRegistration.transferred").value;
      student.specialRegistration['transferredFrom'] = this.studentForm.get("specialRegistration.transferredFrom").value;
      student.specialRegistration['registrationTransferred'] = 0;
      student.specialRegistration['wafed'] = 0;
    }
    if (this.studentForm.get('specialRegistration.registrationTransferred')?.value == true) {
      student.specialRegistration['registrationTransferred'] = this.studentForm.get(
        "specialRegistration.registrationTransferred"
      ).value;
      student.specialRegistration['registrationTransferredFrom'] = this.studentForm.get(
        "specialRegistration.registrationTransferredFrom"
      ).value;
      student.specialRegistration['wafed'] = 0;
      student.specialRegistration['transferred'] = 0;
    }
    //console.log(student);
    this.createdData = await this.service.create(student);
    const formData = new FormData();
    formData.append("image", this.fileData);
    this.service.pathName = "students/" + this.createdData.id + "/image";
    this.createdData = await this.service.create(formData);
  }
  // clear fun. to reset all the form inputs
  clear() {
    this.studentForm.reset();
    this.studentImage = null;
    this.fileData = null;
    this.imageValidator = null;
    this.imageURL = null;
  }
}
