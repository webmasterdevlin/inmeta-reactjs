import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

const useStyles = makeStyles({
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function Profile(params) {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    const [member, setMember] = useState({})
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        console.log('PROPS: ', params)
        getMemberById();
    }, [])

    const getMemberById = async () => {
        setLoading(true)
        const { data } = await axios.get(`http://localhost:5000/members/${params.id}`)
        setMember(data);
        setLoading(false)
    }

    return (
        <Card className={classes.card}>
            {loading
                ? <h1>Loading...</h1>
                : <div>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Word of the Day
        </Typography>
                        <Typography variant="h5" component="h2">
                            {member.name}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            adjective
        </Typography>
                        <Typography variant="body2" component="p">
                            well meaning and kindly.
          <br />
                            {'"a benevolent smile"'}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </div>
            }
        </Card>
    );
}
