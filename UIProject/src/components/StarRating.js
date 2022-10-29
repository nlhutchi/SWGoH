import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const useStyles = makeStyles({
    characterImg: {
        zIndex: 1,
        borderRadius: 100
    }
});

function StarRating(props) {
    const classes = useStyles();
    const [ starArray, setStarArray ] = useState([]);

    useEffect(() => {
        var starArray = [];
        for(let i = 1; i <= 7; i++) {
            if(i <= props.stars ) {
                starArray.push(<StarIcon key={i}/>);
            } else {
                starArray.push(<StarBorderIcon key={i}/>);
            }
        }
        setStarArray(starArray);
    }, []);

    return (
        <div>
            {
                starArray
            }
        </div>
    );
}

export default StarRating;