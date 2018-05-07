import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth'
import { MyApp } from './app.component';
import { AuthProvider } from '../providers/auth/auth';
import { AngularFirestore } from 'angularfire2/firestore';

const config ={
  apiKey: "AIzaSyBoUZ_xabIoL1Gk0oDPNduKpyT2CApWKSw",
    authDomain: "ajax-e13ed.firebaseapp.com",
    databaseURL: "https://ajax-e13ed.firebaseio.com",
    projectId: "ajax-e13ed",
    storageBucket: "ajax-e13ed.appspot.com",
    messagingSenderId: "307872571060"
}

@NgModule({
  declarations: [
    MyApp,
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    
  ],
  providers: [
    StatusBar,
    AngularFirestore ,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider
  ]
})
export class AppModule {}
