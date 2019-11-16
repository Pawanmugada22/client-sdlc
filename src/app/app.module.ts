import { CreateoreditteamComponent } from './sdlc/workspace/team-master/createoreditteam/createoreditteam.component';
import { WorkspaceComponent } from './sdlc/workspace/workspace.component';
import { LoginFormService } from './services/login/login-form.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatCardModule, MatIconModule, MatFormFieldModule, MatInputModule, 
         MatButtonModule, MatMenuModule, MatToolbarModule, MatProgressSpinnerModule, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule, MatTooltipModule,
         MatSnackBarModule, MatSlideToggleModule, MatButtonToggleModule, MatTabsModule, MatDatepickerModule, MatNativeDateModule,
         MatTreeModule,
         MatSelectModule,
         MatTableModule,
         MatCheckboxModule} from '@angular/material';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DatePipe } from '@angular/common';
 
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
import { SettingsComponent } from './settings/settings/settings.component';
import { SettingsService } from './services/settings/settings.service';
import { EmployeeMasterComponent } from './sdlc/workspace/employee-master/employee-master.component';
import { TeamMasterComponent } from './sdlc/workspace/team-master/team-master.component';
import { CreateoreditemployeeComponent } from './sdlc/workspace/employee-master/createoreditemployee/createoreditemployee.component';
import { EmployeemasterService } from './services/employee-master/employeemaster.service';
import { TeammasterService } from './services/team-master/teammaster.service';


@NgModule({
   declarations: [
      AppComponent,
      LoginComponent,
      HomeComponent,
      SdlcComponent,
      WorkspaceComponent,
      MyDashboardComponent,
      PersonalTasksComponent,
      NewPersonnalTaskComponent,
      SettingsComponent,
      EmployeeMasterComponent,
      TeamMasterComponent,
      CreateoreditemployeeComponent,
      CreateoreditteamComponent
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
      MatTreeModule,
      MatDialogModule,
      MatTooltipModule,
      MatProgressSpinnerModule,
      MatSnackBarModule,
      MatSlideToggleModule,
      MatButtonToggleModule,
      MatTabsModule,
      FormsModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatSelectModule,
      HttpClientModule,
      MatTableModule,
      MatCheckboxModule
   ],
   providers: [
      LoginFormService,
      SettingsService,
      TeammasterService,
      EmployeemasterService,
      DatePipe,
      { provide: MatDialogRef, useValue: {} },
      { provide: MAT_DIALOG_DATA, useValue: [] }
   ],
   bootstrap: [
      AppComponent
   ],
   entryComponents: [NewPersonnalTaskComponent,CreateoreditemployeeComponent,CreateoreditteamComponent],
})
export class AppModule { }
