import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {FormBuilder, FormGroup , Validators, AbstractControl} from '@angular/forms'
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subscription} from 'rxjs/Subscription'
import 'rxjs/add/operator/switchMap';
import { User } from '../tab1/tab1';
/**
 * Generated class for the TestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {
 score:number = 0;
  itemsCollection: AngularFirestoreCollection<Test>;
  items: Observable<Test[]>
 formgroup :  FormGroup 
pick:AbstractControl;
subscription:Subscription;
private stateEvent:BehaviorSubject<any>=new BehaviorSubject(0);
Collection: AngularFirestoreCollection<result>;

  constructor(private afs: AngularFirestore,public navCtrl: NavController, public navParams: NavParams,public formbuilder: FormBuilder) {
       this.formgroup = formbuilder.group({
      pick:['',Validators.required],
     
    })
    this.pick = this.formgroup.controls['pick'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestPage');
   console.log(this.navParams.get('uid'));
   this.itemsCollection = this.afs.collection('test' , ref => ref.where('lecturer_id', '==', this.navParams.get('uid'))); //ref()
   this.items = this.itemsCollection.valueChanges()
   this.Collection = this.afs.collection('result');
  }
  getValue(optionid) {
    console.log(optionid);
}
  onSubmit(formgroup){
    console.log(formgroup);
  }
  setradio(e,f)  
  {  
 
   if(e == f){
     this.score= this.score + 1;
     console.log(this.score);
this.Search = this.score;

this.subscription=this.getState()
.subscribe(event=>{
console.log(event);
})
   }
   
   else{
     console.log('no');
   }

   console.log("okay");
  }  
  set Search(value:any){
    this.stateEvent.next(value);
  }
  getState():Observable<string>{
    return this.stateEvent.asObservable();
  
  }
  endexam(){
    this.subscription=this.getState()
    .switchMap(e => this.addresult(e,this.navParams.get('uid')))
.subscribe(event=>{
console.log(event);


})
  }
  addresult(e,f){
  return  this.Collection.add({
  score: e,
  total:10,
    student_email: localStorage.getItem('email'),
    lecturer_id:f

})
  }
}
 export interface Test{
   a:string;
   b:string;
   c:string;
   d:string;
   lecturer_id:string;
   question:string;
   answer:string;
 }
 export interface result{
   lecturer_id:string;
   student_email:string;
   score:number;
   total?:10;
 }