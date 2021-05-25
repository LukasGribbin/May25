import * as React from 'react';
import {Member} from '../../server/src/shared/types/member'
import {create, del, upd} from './fetch' 
import { State } from './state'
import {useForm} from "react-hook-form"

interface Props {
    //members: Member[]
    state: State
    setState: React.Dispatch<React.SetStateAction<State>>
}

function Family(props: Props) {
    //const {state, setState} = props;
    const state = props.state
    const setState = props.setState

    // const {register, handleSubmit} = useForm()

    //const {members} = state;
    const members = state.members

    if (members === undefined) {
        return null
    }

    function rowClicked(e: React.MouseEvent) {
        const selectedRow = Number.parseInt(e.currentTarget.getAttribute('data-id'))
        setState({...state, selectedMemberId: selectedRow})
    }

    const tableRows = members.map(member => {
        return (
            <tr 
                style = {{
                    background: state.selectedMemberId === member.id ? 'rgb(65, 210, 230)' : ''
                }}
                key={member.id}
                data-id={member.id}
                onClick = {rowClicked}
            >
                <td>{member.firstname}</td>
                <td>{member.lastname}</td>
                <td>{member.age}</td>
            </tr>
        )
    })

    async function onClickCreate(event: any) {
        const member: Member = {
            id: undefined,
            firstname: 'Vimy',
            lastname: 'Gribbin',
            age: 10
        }
        const newMembers = await create(members,member)
        setState({ ...state, members: newMembers })
    }

    async function onClickDelete(event: any) {
        const newMembers = await del(members, state.selectedMemberId)
        setState({ ...state, members: newMembers })
    }

    async function onClickUpdate(event: any) {
        const member: Member = {
            id: undefined,
            firstname: 'Harry',
            lastname: 'Potter',
            age: 12
        }
        const newMembers = await upd(members, member, state.selectedMemberId)
        setState({...state, members: newMembers})
    }

    function onSubmit(data1: any) {
        console.log(data1)
    }

    return(<>
        {/* <div>{JSON.stringify(members)}</div> */}

        <table style={{width:"100%"}}>
            <thead>
                <tr>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Age</th>
                </tr>
            </thead>
            <tbody>
                {tableRows}
            </tbody>
        </table>
        <div>
        <button onClick={onClickCreate}>add</button>
        <button onClick={onClickDelete}>delete</button>
        <button onClick={onClickUpdate}>update</button>
        </div>
        <div>
            <form id="form" action="/" method="GET">
                <ul>
                    <li>
                        <label htmlFor="firstName">First Name: </label>
                        <input id="firstName" name="firstName" type="text"/>
                    </li>
                    <li>
                        <label htmlFor="lastName">Last Name: </label>
                        <input id="lastName" name="lastName" type="text" />
                    </li>
                    <li>
                        <label htmlFor="age">Age: </label>
                        <input id="age" name="age" type="number" />
                    </li>
                    {/* <button type="submit">Submit</button> */}
                </ul>
            </form>
        </div>

    </>)
}

export {Family}
