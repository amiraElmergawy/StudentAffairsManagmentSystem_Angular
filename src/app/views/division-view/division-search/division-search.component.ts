import { Component, OnInit, HostListener } from '@angular/core';
import { MainService } from 'src/app/services/main-service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-division-search',
  templateUrl: './division-search.component.html',
  styleUrls: ['./division-search.component.scss']
})
export class DivisionSearchComponent implements OnInit {
  searchingResult = null;
  divisionForm: FormGroup;
  authorizedList;
  constructor(
    private storage: LocalStorageService,
    private service: MainService) {
    this.authorizedList = this.storage.retrieve('backNamesList');
    //console.log(this.authorizedList);
  }

  ngOnInit(): void {
    this.divisionForm = new FormGroup({
      'searchValue': new FormControl(null, [
        Validators.required,
        // Validators.pattern('([a-zA-Z]{4,}(\u0020)?)+')// this pattern to force user to just type english letters and spaces (at least 4 english letters then zero or one space)
      ])
    });
    // this.divisionForm.valueChanges.subscribe(value =>
    //   console.log(this.divisionForm)
    // );
  }
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    //console.log(event);

    if (event.keyCode == 13) {// enter key code
      if (this.divisionForm.valid) {
        this.search();
      }
    }
  }
  async search() {
    this.service.pathName = 'divisions/search?name=' + this.divisionForm.get('searchValue').value;
    this.searchingResult = await this.service.search();
    //console.log(this.searchingResult);
  }

}
