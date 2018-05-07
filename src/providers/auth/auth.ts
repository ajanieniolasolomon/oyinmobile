
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection forimport { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth' more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  itemsCollection: AngularFirestoreCollection<User>; //Firestore collection
  items: Observable<User[]>
  constructor(private afs: AngularFirestore) {
    console.log('Hello AuthProvider Provider');
  }
  displaycourse(){
    this.itemsCollection = this.afs.collection('items'); //ref()
    this.items = this.itemsCollection.valueChanges()
return this.items;
  }
  GetPost() {
    return this.afs.collection('user').snapshotChanges().map(action => {
      return action.map(a => {
        const data = a.payload.doc.data();
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }

}
export interface User{
  course:string;
  uid:string;
  role:string;
}