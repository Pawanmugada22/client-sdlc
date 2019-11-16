import { HttpResponse, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TeamMaster } from '../../models/team-master';

@Injectable()
export class TeammasterService {

constructor(private http: HttpClient) { }

    getAllTeams() : Observable<HttpResponse<TeamMaster[]>>{
        return this.http.get<TeamMaster[]>('/teammast/getallteams',{ observe: 'response' })
    }

    getTeamList(teamDet: TeamMaster) : Observable<HttpResponse<TeamMaster[]>>{
        return this.http.post<TeamMaster[]>('/teammast/getteamlist',teamDet,{ observe: 'response' });
    }

    createNewTeam(teamDet: TeamMaster) : Observable<HttpResponse<string>>{
        return this.http.post<string>('/teammast/createteam',teamDet,{ observe : 'response', responseType: 'text' as 'json' });
    }

    updateTeam(teamDet: TeamMaster) : Observable<HttpResponse<string>>{
        return this.http.post<string>('/teammast/updateteam',teamDet,{ observe : 'response', responseType: 'text' as 'json' });
    }
}
