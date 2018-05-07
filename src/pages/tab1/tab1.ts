import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

/**
 * Generated class for the Tab1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tab1',
  templateUrl: 'tab1.html',
})
export class Tab1Page {
item:any;
posts: Observable<any>;
itemsCollection: AngularFirestoreCollection<User>;
items: Observable<User[]>;


  constructor(private afs: AngularFirestore, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.itemsCollection = this.afs.collection('user' , ref => ref.where('role', '==', 'lectuer')); //ref()
    this.items = this.itemsCollection.valueChanges()

}
taketest(uid){
let payload = {
  uid:uid
}
  this.navCtrl.push("TestPage", payload);
}
}
export interface User{
  uid:string;
  course:string;
}