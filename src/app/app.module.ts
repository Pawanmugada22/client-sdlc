import { LoginFormService } from './services/login/login-form.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatCardModule, MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSpinner, MatMenuModule, MatToolbarModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './login/home/home.component';
import { SdlcComponent } from './sdlc/sdlc.component';



@NgModule({
   declarations: [
      AppComponent,
      LoginComponent,
      MatSpinner,
      HomeComponent,
      SdlcComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      MatCardModule,
      MatFormFieldModule,
      MatIconModule,
      BrowserAnimationsModule,
      MatInputModule,
      MatMenuModule,
      MatToolbarModule,
      MatButtonModule,
      FormsModule,
      HttpClientModule
   ],
   providers: [
      LoginFormService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
