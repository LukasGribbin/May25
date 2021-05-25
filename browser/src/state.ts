import { Member } from "../../server/src/shared/types/member";

interface State {
    members: Member[];
    selectedMemberId: number;
}


export {State}