import {Member} from '../../server/src/shared/types/member';
import {State} from './state'


async function readAll(state: State): Promise<Member[]> {
    if (state.members !== undefined) {
        return state.members
    }
    
    let response = await fetch('/user')
    if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + response.status);
        return;
    }

    let data = await response.json()
    //console.log(data);
    return data as Member[]
}


async function create(members: Member[], member: Member): Promise<Member[]> {
    let response = await fetch('/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(member)
    })
    let data = await response.json()
    if (response.status !== 201) {
        console.log('Looks like there was a problem. Status Code: ' + response.status);
        return;
    }

    // console.log(data)
    member.id = data.insertId
    return [...members, member]
}


async function del(members: Member[], id: number): Promise<Member[]> {
    let response = await fetch('/user/' + id, {
        method: 'DELETE'
    })

    let newMembers = [...members]
    const idx = members.findIndex(member => member.id === id)
    if (idx !== -1) {
        newMembers.splice(idx,1)
    }
    return newMembers
}


async function upd(members: Member[], member: Member, id: number): Promise<Member[]> {
    let response = await fetch('/user/' + id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(member)
    })
    if (response.status !== 201) {
        console.log('Looks like there was a problem. Status Code: ' + response.status);
        return;
    }

    member.id = id
    let newMembers = [...members]
    const idx = members.findIndex(member => member.id === id)
    if (idx !== -1) {
        newMembers.splice(idx, 1, member)
    }
    return newMembers
}

export {readAll, create, del, upd}