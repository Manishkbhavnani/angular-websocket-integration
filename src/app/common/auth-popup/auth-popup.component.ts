import { Component, OnInit , Inject } from '@angular/core';
import {MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface DialogData {
  loginCheck: string;
}


@Component({
  selector: 'app-auth-popup',
  templateUrl: './auth-popup.component.html',
  styleUrls: ['./auth-popup.component.scss']
})


export class AuthPopupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }

}
