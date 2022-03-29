import { Component, NgModule, ViewChild } from '@angular/core';
import { ViewSkillComponent } from './viewskill.component';
import { AddSkillComponent } from './addskill.component';
import { AddSkillModel } from './SkillModel/addskill.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isAddTask = true;
@ViewChild(ViewSkillComponent) vTask: ViewSkillComponent;
@ViewChild(AddSkillComponent) aTask: AddSkillComponent;

  addTask() {
// tslint:disable-next-line:no-debugger

    this.isAddTask = true;
  }

  viewTask() {
    this.isAddTask = false;
    if (this.vTask != null && this.vTask !== undefined) {this.vTask.loadTaskDetails(this.vTask.searchParam); }
  }

  editTaskItem(e: any): void {
    this.isAddTask = true;
    // tslint:disable-next-line:no-debugger
    if (this.aTask != null && this.aTask !== undefined) {
      this.aTask.assignTaskValue(e);
    }
  }
}
