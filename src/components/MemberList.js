import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@material-ui/core/Box';

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

    return (<div>
        <h2>React Demo</h2>
        <h3>
            <ul style={{ listStyle: 'none' }}>
                {members.map(m =>
                    <Box boxShadow={3}>
                        <li key={m.id} >{m.name} {m.age}</li>
                    </Box>
                )}
            </ul>
        </h3>

    </div>)
}