import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { RequestsModel, ProductsModel } from '../shared/request/requests.model';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  requestCollection: AngularFirestoreCollection<RequestsModel>;
  productsCollection: AngularFirestoreCollection<ProductsModel>;
  fabricsCollection: AngularFirestoreCollection<ProductsModel>;
  request: Observable<RequestsModel[]>;
  reqCounter: AngularFirestoreDocument<String>;
  reqCount: Observable<String>;
  requestDoc: AngularFirestoreDocument<RequestsModel>;
  sendReq: RequestsModel;
  product: Observable<ProductsModel[]>;
  fabric: Observable<ProductsModel[]>;
  color: Observable<ProductsModel[]>;
  size: Observable<ProductsModel[]>;

  constructor(public afs: AngularFirestore) {
    this.requestCollection = this.afs.collection<RequestsModel>('requests', ref => ref.orderBy('reqDate', 'desc'));
  }

  getReqs() {
    this.request = this.requestCollection.valueChanges({idField: 'reqEventId'});
    return this.request;
  }
  getReqCount(){
    this.reqCounter = this.afs.collection<String>('reqCounter').doc('reqCount');
    this.reqCount = this.reqCounter.valueChanges();
    return this.reqCount;
  }
  updateReqCount(countData: String){
    this.afs.collection('reqCounter').doc('reqCount').update({
      count: countData
    })
  }
  getProducts() {
    this.productsCollection = this.afs.collection<ProductsModel>('products');
    this.product = this.productsCollection.valueChanges();
    return this.product;
  }
  getFabric() {
    this.productsCollection = this.afs.collection<ProductsModel>('fabric');
    this.fabric = this.productsCollection.valueChanges();
    return this.fabric;
  }
  getColors() {
    this.productsCollection = this.afs.collection<ProductsModel>('colors');
    this.color = this.productsCollection.valueChanges();
    return this.color;
  }
  getSizes() {
    this.productsCollection = this.afs.collection<ProductsModel>('sizes');
    this.size = this.productsCollection.valueChanges();
    return this.size;
  }
  submitRequest(req: RequestsModel) {
    this.requestCollection.doc(req.reqNo).set(JSON.parse(JSON.stringify(req)));
  }

  deleteRequest(req: RequestsModel) {
    this.requestDoc = this.afs.doc(`requests/${req.reqEventId}`);
    this.requestDoc.delete();
  }

  tarihFormatla(tarih, pattern) {
    return new DatePipe('tr').transform(
      tarih,
      pattern
    );
  }
}
