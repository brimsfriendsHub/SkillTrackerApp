import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddSkillComponent } from './addskill.component';
import { ViewSkillComponent } from './viewskill.component';
import { SharedServiceService } from './skilltrackerservice.service';
import { SkillDatasourceService } from './skilldatasource.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AddSkillComponent,
    ViewSkillComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [SharedServiceService, SkillDatasourceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
