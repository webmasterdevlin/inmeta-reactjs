import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles, createStyles } from '@material-ui/core/styles';
const devlinStyle = makeStyles(theme =>
    createStyles({
        button: {
            margin: theme.spacing(1),
        }
    })
)
export default function MemberList() {
    const { button } = devlinStyle();

    const [members, setMembers] = useState([]);
    const [member, setMember] = useState({});
    const [loading, setLoading] = useState(false);
    const [forEditing, setForEditing] = useState(0);
    const [memberToUpdate, setMemberToUpdate] = useState({});

    useEffect(() => {
        loadMembers();
    }, []);

    const loadMembers = async () => {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/members");
        console.log("RESPONSE_DATA: ", response.data);
        setMembers(response.data);
        setLoading(false);
    }

    const deleteMember = async (id) => {
        const previous = [...members];
        const newMembers = members.filter(m => m.id !== id);
        setMembers(newMembers);

        try {
            await axios.delete(`http://localhost:5000/members/${id}`);
        } catch (err) {
            alert(err.message);
            setMembers(previous);
        }
    }

    const handleAddMember = async () => {
        setLoading(true);
        try {
            const { data: createdMember } = await axios.post("http://localhost:5000/members", member)
            const newMemberCollection = [...members, createdMember];
            setMembers(newMemberCollection);
        } catch (e) {
            alert(e.message);
        }
        setLoading(false);
    }

    const handleNameOnChange = ({ currentTarget }) => {
        console.log(currentTarget.value)
        setMember({ ...member, name: currentTarget.value })
    }

    const handleAgeOnChange = ({ currentTarget }) => {
        console.log(currentTarget.value);
        setMember({ ...member, age: currentTarget.value })
    }

    const handleEditMember = (member) => {
        setForEditing(member.id);
        setMemberToUpdate(member);
    }

    const handleEditNameOnChange = ({ currentTarget }) => {
        setMemberToUpdate({ ...memberToUpdate, name: currentTarget.value })
    }
    const handleEditAgeOnChange = ({ currentTarget }) => {
        setMemberToUpdate({ ...memberToUpdate, age: currentTarget.value })
    }

    return (<div style={{ width: '75vw', margin: "0 auto", padding: '2rem' }}>
        <h2>React Demo</h2>
        <h3>
            <TextField onChange={handleNameOnChange} margin="dense" variant="outlined" multiline rowsMax="4" />
            <TextField onChange={handleAgeOnChange} margin="dense" variant="outlined" multiline rowsMax="4" />
            <Button variant="contained" color="primary" onClick={handleAddMember} >Add Member</Button>
            <ul style={{ listStyle: 'none' }}>
                {loading ?
                    <h2>Loading..</h2>
                    :
                    members.map(m =>
                        <Box boxShadow={3} key={m.id}>
                            <li>
                                {forEditing === m.id ? (
                                    <>
                                        <TextField value={memberToUpdate.name} margin="dense"
                                            onChange={handleEditNameOnChange}
                                            variant="outlined"
                                            multiline rowsMax="4" />
                                        <TextField value={memberToUpdate.age} margin="dense"
                                            onChange={handleEditAgeOnChange}
                                            variant="outlined"
                                            multiline rowsMax="4" />
                                    </>) : (`name: ${m.name}, age: ${m.age}`)
                                }
                                {forEditing === m.id
                                    ?
                                    (<Button variant="contained" color="primary" >Update</Button>)
                                    :
                                    (<Button variant="contained" className={button} onClick={() => handleEditMember(m)} >Edit</Button>)
                                }
                                <Button variant="contained" color="secondary" onClick={() => deleteMember(m.id)} >Delete</Button>
                            </li>
                        </Box>
                    )}
            </ul>
        </h3>
    </div>)
}