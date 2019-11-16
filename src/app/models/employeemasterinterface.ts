import { TeamMaster } from './team-master';
import { PersonnalDetailsClass } from "./PersonnalDetailsClass";
import { RoleMaster } from "./RoleMaster";

export interface Employeemasterinterface {
    empMast: PersonnalDetailsClass;
    roleList: RoleMaster[];
    teamList: TeamMaster[];
    type: boolean;
}
