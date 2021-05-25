import * as React from 'react';
import {Member} from '../../server/src/shared/types/member'
import {readAll} from './fetch' 
import {Family} from './family'
import {State} from './state'


const initialState: State = {
    members: undefined,
    selectedMemberId: undefined
};



/** Whole app */
function Root() {
    console.log('ROOT')
    const [state, setState] = React.useState(initialState);

    //const {members} = state;
    const members = state.members;


    if (state.members === undefined) {
        readAll(state).then(function(members: Member[]) {
            //state.members = members
            //console.debug();
            setState({ ...state, members });
        });

        return <div>fetching...</div>;
    }

    return (<>
        <Family
            //members={members}
            state={state}
            setState={setState}
        />
    </>)
}

export {Root}
