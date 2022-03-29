import { Component, NgModule, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {AddSkillModel} from './SkillModel/addskill.model';
import {Skillset, SkillsetValue} from './SkillModel/skilldata.model';
import { DatePipe } from '@angular/common';
import { SharedServiceService } from './skilltrackerservice.service';
import { SkillDatasourceService } from './skilldatasource.service';
import { s } from '@angular/core/src/render3';

@Component({
    selector: 'app-addskill-component',
    templateUrl: './addskill.component.html'
  })

  export class AddSkillComponent {
    addskillForm: FormGroup;
    submitted = false;
    addskillModel = new AddSkillModel();
    associateId = '';
    validationError = '';
    skillset: Skillset[] = [];
    SkillsetValue: SkillsetValue[] = [];
    isDisabled: boolean = false;
     emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
     mobilePattern = '^([0-9]{10})$' ;


    constructor(private _formBuilder: FormBuilder, private _datePipe: DatePipe, private _service: SharedServiceService,
        private _datasourceService: SkillDatasourceService
        ) {
           this.skillset = _datasourceService.getdataSourceskill();
           this.SkillsetValue = _datasourceService.getdataSourceskillValue();
            this.addTaskForm();
        }

        // tslint:disable-next-line:use-life-cycle-interface
    ngOnInit() {this.onReset(); }

    addTaskForm() {
        this.addskillForm = this._formBuilder.group({
            name: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(30)])],
            associateId: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(30)])],
            emailId: ['', [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]],
            mobileNo: ['', [Validators.required, Validators.pattern(this.mobilePattern)]]
        });

       this.addControls();
       this.setEnableControls();
    }
    onSubmit() {
        this.submitted = true;
        this.validationError = '';
        // tslint:disable-next-line:no-debugger
        if (this.addskillForm.invalid) {
            return;
        }

        // stop here if form is invalid
        if (!this.addskillForm.invalid) {
                 const val = this.addskillForm.getRawValue();
                  if (this.validationDt(val).length < 1) {
                    if (this.associateId === null || this.associateId === '') {
                         this._service.addProfile(this.assignTaskValues(val)).subscribe(data => {
                        //     // tslint:disable-n debugger;
                             this.onReset();
                         }) ;
                     } else {
                        this._service.updateProfile(this.assignTaskValues(val)).subscribe(data => {
                             this.onReset();
                         }) ;
                     }
                  }
        }

    }
    get f() { return this.addskillForm.controls; }

    assignTaskValues(val: any) {
        this.addskillModel.associateId = this.addskillForm.controls['associateId'].value;
        this.addskillModel.name = this.addskillForm.controls['name'].value;
        this.addskillModel.emailId = this.addskillForm.controls['emailId'].value;
        this.addskillModel.mobileNo = this.addskillForm.controls['mobileNo'].value;

        const selctedSkills: Array<Skillset> = new Array<Skillset>();

        this.skillset.forEach(element => {
            const items: Skillset = new Skillset();
            items.id = element.id;
            items.value = element.value;
            items.skillType = element.skillType;
            const controlName = 'select' + element.value;
            items.selectedValue = Number(this.addskillForm.controls[controlName].value);
            selctedSkills.push(items);
         });

         this.addskillModel.technicalSkill = selctedSkills;


         return this.addskillModel;
    }

    validationDt(valIn) {

        // if (valIn.name.length < 5 || valIn.name.length > 30) {
        //     this.validationError = 'Name should fall between 5 to 30 characters';
        // } else if (valIn.associateId.length < 5 || valIn.associateId.length > 30) {
        //     this.validationError = 'AssociateId should fall between 5 to 30 characters';
        // } else if (valIn.emailPattern) {
        //     this.validationError = 'Invalid EmailId';
        // } else if ((valIn.mobileNo.length > 11 && valIn.mobileNo.length < 10) || NaN(valIn.mobileNo)) {
        //     this.validationError = 'Invalid Mobile Number';
        // }

        return this.validationError;
    }

    assignTaskValue(val: AddSkillModel) {
        // tslint:disable-next-line:no-debugger
        if (val != null && val !== undefined) {
            this.addskillModel = val;
            this.addskillForm.controls['name'].setValue(val.name);
            this.addskillForm.controls['associateId'].setValue(val.associateId);
            this.addskillForm.controls['emailId'].setValue(val.emailId);
            this.addskillForm.controls['mobileNo'].setValue(val.mobileNo);
            this.setControlvalue(val.technicalSkill);
            this.isDisabled = true;
           this.setEnableControls();

            this.associateId = val.id;
        }
    }

    onReset() {
        this.isDisabled = false;
        this.setEnableControls();
        this.addskillForm.controls['name'].setValue(null);
            this.addskillForm.controls['associateId'].setValue(null);
            this.addskillForm.controls['emailId'].setValue(null);
            this.addskillForm.controls['mobileNo'].setValue(null);
          this.resetControlvalue();
          this.validationError = '';
          this.associateId = '';
    }
     addControls(){
        this.skillset.forEach(element => {
           let controlName = 'select' + element.value;
           this.addskillForm.addControl(controlName, new FormControl());
           this.addskillForm.controls[controlName].setValue(0);
        });

     }

     resetControlvalue(){
        this.skillset.forEach(element => {
           let controlName = 'select' + element.value;
           this.addskillForm.controls[controlName].setValue(0);
        });
    }

    setControlvalue(val) {
        val.forEach(element => {
           let controlName = 'select' + element.id;
           this.addskillForm.controls[controlName].setValue(element.selectedValue);
        });
    }

    setEnableControls() {
        if (this.isDisabled) {
        this.addskillForm.controls['name'].disable();
        this.addskillForm.controls['associateId'].disable();
        this.addskillForm.controls['emailId'].disable();
        this.addskillForm.controls['mobileNo'].disable();
        } else {
            this.addskillForm.controls['name'].enable();
        this.addskillForm.controls['associateId'].enable();
        this.addskillForm.controls['emailId'].enable();
        this.addskillForm.controls['mobileNo'].enable();
        }

    }

  }
