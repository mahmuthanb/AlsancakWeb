import { Component, Injectable, OnInit } from '@angular/core';
import { RequestsService } from '../services/requests.service';
import { RequestsModel, ProductsModel } from '../shared/request/requests.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { DatePipe } from '@angular/common';
import { Variable } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:[DatePipe]
})

export class DashboardComponent implements OnInit {
  isAdmin = false;
  secilenRows = true;
  addNewRequest: FormGroup;
  editRequest: FormGroup;
  todayInString: String;
  reqCount: String;
  reqNo: string;
  opened = false;
  openEdit = false;
  selected: RequestsModel[] = [];
  requestData: RequestsModel[];
  printedData: RequestsModel[] = [];
  newRequest = new RequestsModel();
  products: ProductsModel[] = [];
  fabrics: ProductsModel[] = [];
  colors: ProductsModel[] = [];
  sizes: ProductsModel[] = [];
  counter: number;

  constructor(
    private requestService: RequestsService,
    public authService: AuthService,
    public datePipe:DatePipe,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.createForm();
    this.editForm();
    this.getDetails();
    this.getDate();
    this.isAdmin = this.authService.isAdmin;
  }
  getDate(){
    var today = new Date();
    this.todayInString = this.datePipe.transform(today,"ddMMyy");
  }
  isAdminOrNot(): boolean{
    this.isAdmin = false;
    alert(this.isAdmin)
    return this.isAdmin;
  }  
  getDetails(){
    this.getRequests();
    this.getProducts();
    this.getFabrics();
    this.getColors();
    this.getSizes();
    this.getReqCount();
    this.printedData = this.requestData;
  }
  createForm() {    
    this.addNewRequest = this.formBuilder.group({
      urun: [, Validators.required],
      renk: [, Validators.required],
      beden: [, Validators.required],
      kumas: [, Validators.required],
      cinsiyet: ["BAYAN", Validators.required],
      adet: [1, Validators.required],
      not: [''],
    });
  }
  editForm(){
    this.editRequest = this.formBuilder.group({
      edturun:    [, Validators.required],
      edtrenk:    [, Validators.required],
      edtbeden:   [, Validators.required],
      edtkumas:   [, Validators.required],
      edtcinsiyet:[, Validators.required],
      edtadet:    [, Validators.required],
      edtnot:     [, Validators.required],
    });
  }
  editFormFilled(req: RequestsModel) {
    this.editRequest = this.formBuilder.group({
      edturun:    [req.reqProductName, Validators.required],
      edtrenk:    [req.reqColor, Validators.required],
      edtbeden:   [req.reqSize, Validators.required],
      edtkumas:   [req.reqFabric, Validators.required],
      edtcinsiyet:[req.reqGender, Validators.required],
      edtadet:    [req.reqCount, Validators.required],
      edtnot:     [req.reqNote, Validators.required],
    });
  }
  get f() {
    return this.addNewRequest.controls;
  }
  get e() {
    return this.editRequest.controls;
  }
  getRequests() {
    this.requestService.getReqs().subscribe(
      data => {
        if(data){
          this.requestData = data; 
        }
      });
    }
  getReqCount(){
    this.requestService.getReqCount().subscribe(
      data => {
        if(data){
          this.reqCount = data;
        }
      });
    }
  updateReqCount(count:String){
    var numberValue = Number(count['count']);
    numberValue++;
    this.requestService.updateReqCount(numberValue.toString());
  }
  getProducts() {
    this.requestService.getProducts().subscribe(
      data => {
        this.products = data;
      });
  }
  getFabrics() {
    this.requestService.getFabric().subscribe(
      data => {
        this.fabrics = data;
      });
  }
  getColors() {
    this.requestService.getColors().subscribe(
      data => {
        this.colors = data;
      });
    }
  getSizes() {
    this.requestService.getSizes().subscribe(
      data => {
        this.sizes = data;
      });
    }
  selectionChanged($event) {
    this.printedData = this.selected;
  }
  rowEdit(req: RequestsModel) {
    alert('edit');
    console.log(req);
    this.editFormFilled(req);
    this.openEdit = true;
  }
  rowDelete(req: RequestsModel) {
    this.requestService.deleteRequest(req);
    alert(req.reqNo + ' no\'lu satırı silmek istediğinizden emin misiniz ?');
  }
  submitReq() {
    if(this.addNewRequest.valid){
      this.newRequest.reqUser = 'Yusuf S.';
      this.newRequest.reqOffice = 'MERKEZ';
      this.newRequest.reqDate = new Date().toString();
      this.newRequest.reqProductName = this.f.urun.value.toString();
      this.newRequest.reqColor = this.f.renk.value;
      this.newRequest.reqFabric = this.f.kumas.value;
      this.newRequest.reqGender = this.f.cinsiyet.value;
      this.newRequest.reqSize = this.f.beden.value;
      this.newRequest.reqCount = this.f.adet.value;
      this.newRequest.reqNote = this.f.not.value;
      this.newRequest.reqPriority = 'Normal';
      this.newRequest.reqStatus = 'Bekliyor';
      this.newRequest.reqNo = this.todayInString + '-' + this.reqCount['count'].toString();
      this.requestService.submitRequest(this.newRequest);
      this.opened = false;
      this.createForm();
      this.updateReqCount(this.reqCount);
    }
  }

  printData(data:RequestsModel[]){
    var doc = new jsPDF({orientation:"landscape"});
    autoTable(doc,{
      columns:[
        {header:'NO',       dataKey:'reqNo'},
        {header:'TARIH',    dataKey:'reqDate'},
        {header:'SUBE',     dataKey:'reqOffice'},
        {header:'URUN',     dataKey:'reqProductName'},
        {header:'RENK',     dataKey:'reqColor'},
        {header:'KUMAS',    dataKey:'reqFabric'},
        {header:'E/K',      dataKey:'reqGender'},
        {header:'BEDEN',    dataKey:'reqSize'},
        {header:'ADET',     dataKey:'reqCount'},
        {header:'T.E',      dataKey:'reqUser'},
        {header:'NOT',      dataKey:'reqNote'},
        {header:'ACIL',     dataKey:'reqPriority'},
      ],
      body:this.printDatatoPDF(data) ,
    });
    doc.setLanguage("tr"); 
    doc.save(this.datePipe.transform(new Date(),"ddMMyyyy_Hmmss")+".pdf");
  }

  printDatatoPDF(data){
    var body = [];
      var body = [],i=0;
      for(i = 0 ; i < data.length ; i++){
        body.push({
          reqNo:          data[i]['reqNo'],
          reqDate:        this.datePipe.transform(data[i]['reqDate'], 'dd-MM-yyyy H:mm:ss'),
          reqOffice:      data[i]['reqOffice'],
          reqProductName: data[i]['reqProductName'],
          reqColor:       data[i]['reqColor'],
          reqFabric:      data[i]['reqFabric'],
          reqGender:      data[i]['reqGender'],
          reqSize:        data[i]['reqSize'],
          reqCount:       data[i]['reqCount'],
          reqUser:        data[i]['reqUser'],
          reqNote:        data[i]['reqNote'],
          reqPriority:    data[i]['reqPriority'],
        })
      };
    return body;
  }
}


