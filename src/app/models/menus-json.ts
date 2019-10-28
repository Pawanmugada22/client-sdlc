import { Menus } from './menus';
export class MenusJson {
    menudata: any=[
        {
          "menuname" : "My Dashboard",
          "roles" : ["SU","TL","RS"]
        },
        {
          "menuname" : "Personal Tasks",
          "roles" : ["SU","TL","RS"]
        },
        {
          "menuname" : "Employee Master",
          "roles" : ["SU"]
        },
        {
          "menuname" : "Team Dashboard",
          "roles" : ["TL"]
        },
        {
          "menuname" : "Team Master",
          "roles" : ["SU"]
        }
    ]
    menu: Menus[]=[];
    menuArray: string[]=[];
    noOfMenus: number;
    temp: number;
    constructor(){
        this.menu =JSON.parse(JSON.stringify(this.menudata));
        this.noOfMenus=1;
    }

    getMenus(role: string): string[] {
        while (this.noOfMenus<=this.menu.length) {
            if(this.menu[this.noOfMenus-1].roles.includes(role)) {
                this.menuArray.push(this.menu[this.noOfMenus-1].menuname);
            }
            this.noOfMenus++;
        }
        return this.menuArray;
    }

}