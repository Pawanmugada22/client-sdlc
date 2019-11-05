import { WorkspaceComponent } from './sdlc/workspace/workspace.component';
import { LoginFormService } from './services/login/login-form.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatCardModule, MatIconModule, MatFormFieldModule, MatInputModule, 
         MatButtonModule, MatMenuModule, MatToolbarModule, MatProgressSpinnerModule, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule, MatTooltipModule,
         MatSnackBarModule, 
         MatSlideToggleModule,
         MatButtonToggleModule} from '@angular/material';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './login/home/home.component';
import { SdlcComponent } from './sdlc/sdlc.component';
import { MyDashboardComponent } from './sdlc/workspace/my-dashboard/my-dashboard.component';
import { PersonalTasksComponent } from './sdlc/workspace/personal-tasks/personal-tasks.component';
import { NewPersonnalTaskComponent } from './sdlc/workspace/personal-tasks/new-personnal-task/new-personnal-task.component';



@NgModule({
   declarations: [
      AppComponent,
      LoginComponent,
      HomeComponent,
      SdlcComponent,
      WorkspaceComponent,
      MyDashboardComponent,
      PersonalTasksComponent,
      NewPersonnalTaskComponent
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
      MatSidenavModule,
      MatListModule,
      MatDialogModule,
      MatTooltipModule,
      MatProgressSpinnerModule,
      MatSnackBarModule,
      MatSlideToggleModule,
      MatButtonToggleModule,
      FormsModule,
      HttpClientModule
   ],
   providers: [
      LoginFormService,
      { provide: MatDialogRef, useValue: {} },
      { provide: MAT_DIALOG_DATA, useValue: [] }
   ],
   bootstrap: [
      AppComponent
   ],
   entryComponents: [NewPersonnalTaskComponent],
})
export class AppModule { }
