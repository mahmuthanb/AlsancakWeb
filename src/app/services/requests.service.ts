import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
    // this.request = this.requestCollection.snapshotChanges()
    //   .pipe(
    //     map(action => {
    //       const data = action.payload.data() as RequestsModel;
    //       const id = action.payload.id;
    //       return { id, ...data };
    //     }));
    return this.request;
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
    this.requestCollection.add(JSON.parse(JSON.stringify(req)));
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
