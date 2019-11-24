import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default function MemberList() {
    const [members, setMembers] = useState([]);
    const [member, setMember] = useState({});
    const [loading, setLoading] = useState(false);

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
            await axios.delete(`http://localhost:5000/members/${id}3247328`);
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

    return (<div style={{ width: '75vw', margin: "0 auto", padding: '2rem' }}>
        <h2>React Demo</h2>
        <h3>
            <TextField onChange={handleNameOnChange} margin="dense" variant="outlined" multiline rowsMax="4" />
            <TextField onChange={handleAgeOnChange} margin="dense" variant="outlined" multiline rowsMax="4" />
            <Button variant="contained" color="primary" onClick={handleAddMember} >Add Member</Button>
            <ul style={{ listStyle: 'none' }}>
                {loading
                    ?
                    <h2>Loading...</h2>
                    :
                    members.map(m =>
                        <Box key={m.id} boxShadow={3}>
                            <li >{m.name} {m.age}
                                <Button variant="contained" color="secondary"
                                    onClick={() => deleteMember(m.id)} >
                                    Delete
                            </Button>
                            </li>
                        </Box>
                    )}
            </ul>
        </h3>
    </div>)
}