import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function MemberList() {

    const [members, setMembers] = useState([]);
    useEffect(() => {
        loadMembers();
    }, []);

    const loadMembers = async () => {
        const response = await axios.get("http://localhost:5000/members");
        console.log(response.data);
    }

    return (<h1>MemberList Works!</h1>)
}