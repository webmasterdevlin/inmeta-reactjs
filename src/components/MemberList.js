import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

export default function MemberList() {
    const [members, setMembers] = useState([]);
    useEffect(() => {
        loadMembers();
    }, []);

    const loadMembers = async () => {
        const response = await axios.get("http://localhost:5000/members");
        console.log("RESPONSE_DATA: ", response.data);
        setMembers(response.data);
    }

    return (<div style={{ width: '75vw', margin: "0 auto", padding: '2rem' }}>
        <h2>React Demo</h2>
        <h3>
            <ul style={{ listStyle: 'none' }}>
                {members.map(m =>
                    <Box key={m.id} boxShadow={3}>
                        <li >{m.name} {m.age}</li>
                        <Button variant="contained" color="secondary" >Delete</Button>
                    </Box>
                )}
            </ul>
        </h3>

    </div>)
}