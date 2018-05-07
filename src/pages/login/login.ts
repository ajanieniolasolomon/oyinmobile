import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup , Validators, AbstractControl} from '@angular/forms'
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
formgroup :  FormGroup 
email:AbstractControl;
password:AbstractControl;
error:any;

  constructor(private alertCtrl: AlertController,private afAuth: AngularFireAuth,public navCtrl: NavController, public navParams: NavParams, public formbuilder: FormBuilder) {
    this.formgroup = formbuilder.group({
      email:['',Validators.email],
      password:['',Validators.required]
    })
    this.email = this.formgroup.controls['email'];
    this.password =  this.formgroup.controls['password'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  async onSubmit(formgroup){
    console.log(formgroup );
  
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(formgroup.value.email, formgroup.value.password);
      if (result) {
        localStorage.setItem('email',formgroup.value.email)
        this.navCtrl.setRoot('MenuPage');
      }  
    }
    catch (e) {
      this.error =e;
      
        let alert = this.alertCtrl.create({
          title: 'login error',
          subTitle: e,
          buttons: ['Dismiss']
        });
        alert.present();
      
    }
  }
  }
  
 

