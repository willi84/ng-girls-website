import {Component, OnInit, Input, ChangeDetectorRef} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AppComponent } from '../app.component';
import {DialogPersonComponent} from '../dialog-person/dialog-person.component';

@Component({
  selector: 'app-team-section',
  templateUrl: './team-section.component.html',
  styleUrls: ['./team-section.component.scss']
})
export class TeamSectionComponent implements OnInit {
  @Input() image;
  @Input() team;
  @Input() mobileHeight2;
  @Input() title: string;
  @Input() showPopups = false;
  // mobileHeight = 700; //6/2*250 + 200;
  mobileHeight = 700;
  height = 700;
  team$;
  isMobile = false;

  constructor(public dialog: MatDialog, private cdref: ChangeDetectorRef, private host:AppComponent) {
    this.isMobile = this.host.class.indexOf('desktop') === -1 ? true : false;
  }
  ngOnInit(): void {
    // this.mobileHeight = this.team ? this.team.length / 2*250 + 200 : 700;
    this.image.alt = this.image.alt ? this.image.alt : 'eclipse';
  }
  ngAfterContentChecked() {
    this.cdref.detectChanges();    
    this.mobileHeight = this.isMobile ?  this.team ? this.team.length / 2*250 + 200 : 700 : this.mobileHeight;
    this.image['mobileHeight'] = this.mobileHeight;
    if(this.isMobile){
      this.height = this.mobileHeight;
    }

    // console.log(this.team);
  }
  openDialog(person): void {
    if (!this.showPopups) return;
    const dialogRef = this.dialog.open(DialogPersonComponent, {
      data: person,
      autoFocus: false
    });
  }
}
