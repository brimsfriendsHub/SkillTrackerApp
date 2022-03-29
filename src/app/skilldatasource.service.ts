import { Injectable } from '@angular/core';
import {Skillset, SkillsetValue} from './SkillModel/skilldata.model';

@Injectable({
    providedIn: 'root'
  })

  export class SkillDatasourceService {
    constructor() {
       }

       getdataSourceskill() {
        return [{id : 'HTML', value: 'HTML', skillType: 'Tech', selectedValue: 0 },
        {id : 'Angular', value: 'Angular', skillType: 'Tech', selectedValue: 0 },
        {id : 'Reactive', value: 'Reactive', skillType: 'Tech', selectedValue: 0 },
        {id : 'Spoken', value: 'Spoken', skillType: 'NTech', selectedValue: 0 }];
     }

     getdataSourceskillValue() {
       const skills: SkillsetValue[] = [];
       for (let i = 0; i <= 20; i++) {
        const s: SkillsetValue = new SkillsetValue();
        s.id = i;
        s.value = i;

        skills.push(s);
       }

         return skills;
     }
  }
