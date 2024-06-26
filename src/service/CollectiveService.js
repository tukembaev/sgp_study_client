
import $api from "../http";
import $apiJSON from "../http/apiJSON";


export async function getMyMembers(data) {
  return $api.get("/employees/all-employees/?user_type=E", data);
}

export async function  getMyTeam(data) {
    return $api.get("/employees/commands/", data);
  }

  export async function  getTeamMember(id , data) {
    return $api.get(`/employees/command/${id}/`, data);
  }

  export async function  createNewTeam(name_team) {
    return $apiJSON.post("/employees/commands/", {name_team});
  }

export async function SendInviteToTeam(data) {
    return $apiJSON.post(`/employees/memberscommand/`,data);
  }
  export async function AnswerToInvite(id , members) {
    return $apiJSON.patch(`/employees/command/${id}/`,members);
  }