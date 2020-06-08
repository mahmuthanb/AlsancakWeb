import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-addrequest',
  templateUrl: './addrequest.component.html',
  styleUrls: ['./addrequest.component.css']
})
export class AddrequestComponent implements OnInit {
  addNewRequest: FormGroup;
  colors = [
    { id: 1, value: 'Siyah' },
    { id: 2, value: 'Beyaz' },
  ];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.createForm();
    console.log(this.colors);
  }

  createForm() {
    this.addNewRequest = this.formBuilder.group({
      urun: ['', Validators.required],
      renk: [, Validators.required],
      beden: [, Validators.required],
      kumas: [, Validators.required],
      cinsiyet: [, Validators.required],
      adet: [, Validators.required],
      not : [, Validators.required],
    });

  }

}
