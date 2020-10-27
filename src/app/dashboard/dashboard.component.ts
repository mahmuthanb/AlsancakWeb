import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../services/requests.service';
import { RequestsModel, ProductsModel } from '../shared/request/requests.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  admin = true;
  secilenRows = true;
  addNewRequest: FormGroup;
  editRequest: FormGroup;
  reqNo = 30244;
  opened = false;
  openEdit = false;
  selected: RequestsModel[] = [];
  requests: RequestsModel[] = [];
  newRequest = new RequestsModel();
  products: ProductsModel[] = [];
  fabrics: ProductsModel[] = [];
  colors: ProductsModel[] = [];
  sizes: ProductsModel[] = [];

  constructor(
    private requestService: RequestsService,
    public authService: AuthService,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.createForm();
    this.editForm();
    this.getRequests();
    this.getProducts();
    this.getFabrics();
    this.getColors();
    this.getSizes();
  }

  createForm() {
    this.addNewRequest = this.formBuilder.group({
      urun: [, Validators.required],
      renk: [, Validators.required],
      beden: [, Validators.required],
      kumas: [, Validators.required],
      cinsiyet: [, Validators.required],
      adet: [, Validators.required],
      not: ['', Validators.required],
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
          this.requests = data; 
        }
      }
    );
  }
  getProducts() {
    this.requestService.getProducts().subscribe(
      data => {
        this.products = data;
      }
    );
  }
  getFabrics() {
    this.requestService.getFabric().subscribe(
      data => {
        this.fabrics = data;
      }
    );
  }
  getColors() {
    this.requestService.getColors().subscribe(
      data => {
        this.colors = data;
      }
    );
  }
  getSizes() {
    this.requestService.getSizes().subscribe(
      data => {
        this.sizes = data;
      }
    );
  }

  submitReq() {
    alert(this.reqNo);
    this.newRequest.reqDate = new Date().toString();
    this.newRequest.reqOffice = 'MERKEZ';
    this.newRequest.reqProductName = this.f.urun.value.toString();
    this.newRequest.reqColor = this.f.renk.value;
    this.newRequest.reqFabric = this.f.kumas.value;
    this.newRequest.reqGender = this.f.cinsiyet.value;
    this.newRequest.reqSize = this.f.beden.value;
    this.newRequest.reqCount = this.f.adet.value;
    this.newRequest.reqUser = 'Yusuf S.';
    this.newRequest.reqNote = this.f.not.value;
    this.newRequest.reqPriority = 'Normal';
    this.newRequest.reqStatus = 'Bekliyor';
    this.newRequest.reqNo = this.reqNo.toString();
    this.reqNo++;
    console.log(this.newRequest);
    this.requestService.submitRequest(this.newRequest);
    this.opened = false;
    this.createForm();
  }
  selectionChanged($event) {
    // alert('selected');
    console.log(this.selected);
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


  generateData() {
    var size = this.requests.length;
    var result;
    var data : RequestsModel[];
    data = this.requests
    // for (var i = 0; i < size; i += 1) {
    //   result.push(Object.assign({}, data));
    // }
    return data;
  }

  printData(){
    // function createHeaders(keys) {
    //   var result = [];
    //   for (var i = 0; i < keys.length; i += 1) {
    //     result.push({
    //       id: keys[i],
    //       name: keys[i],
    //       prompt: keys[i],
    //       width: 65,
    //       align: "center",
    //       padding: 0
    //     });
    //   }
    //   return result;
    // }
    
    // var headers = createHeaders([
    //   "No",
    //   "Tarih",
    //   "Şube",
    //   "Ürün",
    //   "Renk",
    //   "Kumaş",
    //   "E/K",
    //   "Beden",
    //   "Adet",
    //   "Öncelik",
    //   "Kullanıcı",
    //   "Not",
    //   "Durum"
    // ]);

    // var doc = new jsPDF();
    
    // doc.table(1,1,this.generateData(),headers,{autoSize:true,fontSize:22});
    // doc.save("A4.pdf");

    // var generateData = function(amount) {
    //   var result = [];
    //   var data = {
    //     coin: "100",
    //     game_group: "GameGroup",
    //     game_name: "XPTO2",
    //     game_version: "25",
    //     machine: "20485861",
    //     vlt: "0"
    //   };
    //   for (var i = 0; i < amount; i += 1) {
    //     result.push(Object.assign({}, data));
    //   }
    //   return result;
    // };
    
    // function createHeaders(keys) {
    //   var result = [];
    //   for (var i = 0; i < keys.length; i += 1) {
    //     result.push({
    //       id: keys[i],
    //       name: keys[i],
    //       prompt: keys[i],
    //       width: 65,
    //       align: "center",
    //       padding: 0
    //     });
    //   }
    //   return result;
    // }
    
    // var headers = createHeaders([
    //   "id",
    //   "coin",
    //   "game_group",
    //   "game_name",
    //   "game_version",
    //   "machine",
    //   "vlt"
    // ]);
    var len = this.requests.length;
    var doc = new jsPDF({orientation:"landscape"});

    autoTable(doc,{
      body: [
        [{ content: 'Text', colSpan: 2, rowSpan: 2, styles: { halign: 'center' } }],
      ],
    })
    var result = [len][len];
    doc.save();
    //applyPlugin(doc);
    //doc.getTextDimensions("deneme",{font:"helvetica",fontSize:14,maxWidth:53,scaleFactor:2,});
    //doc.text("dsfsgffgnghjmfhg",3,4,);
        
    //doc.autoPrint();
    //doc.save('asd.pdf');
    //doc.table(1, 1, generateData(100), headers, { autoSize: true });

  }
}

