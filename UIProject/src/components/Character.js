import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    characterImg: {
        zIndex: 1,
        borderRadius: 100
    },
    characterWrapper: {
        display: 'block',
        alignItems: 'center',
        justifyContent: 'center'
    },
    frameSize: {
        width: 50
    },
    g13FrameDark: {
        position: 'absolute',
        backgroundImage: 'url(https://assets.swgoh.gg/files/assets/character-frame-relic-atlas.0b9ffa6122f58395.png)',
        zIndex: 2,
        backgroundSize: '100% 200%'
    },
    g13FrameLight: {
        backgroundImage: 'url(https://assets.swgoh.gg/files/assets/character-frame-relic-atlas.0b9ffa6122f58395.png)',
        zIndex: '-1',
        left: '50%',
        top: '50%',
    },
});

function Character(props) {
    const classes = useStyles();
    const ref = useRef(null)
    const wrapperRef = useRef(null)
    const [ height, setHeight ] = useState(0);
    const [ width, setWidth ] = useState(0);
    const [ wrapperWidth, setWrapperWidth ] = useState(false);

    useEffect(() => {
        if(ref.current && height !== ref.current.clientHeight) {
            setHeight(ref.current.clientHeight);
            setWidth(ref.current.clientWidth);
        }
    }, [ref]);

    useEffect(() => {
        if(wrapperRef.current && height !== wrapperRef.current.clientHeight) {
            setWrapperWidth(wrapperRef.current.clientWidth);
        }
    }, [wrapperRef]);

    
    return (
        <div 
            ref={wrapperRef}
            className={`${classes.characterWrapper}`}
        >
            <img
                ref={ref}
                className={`${classes.characterImg}`} 
                src={props.characterData[props.unit.base_id].image} 
                alt={props.unit.base_id}
            />
            <div 
                className={`${classes.frameSize} ${classes.g13FrameDark}`} 
                style={{ 
                    height: height,
                    marginLeft: `${(wrapperWidth)/2}px`,
                    transform: `translate(-150%,-103%)`
                }}
            ></div>
            <div 
                className={`${classes.frameSize} ${classes.right} ${classes.g13FrameDark}`} 
                style={{ 
                    height: height,
                    marginLeft: `${(wrapperWidth)/2}px`,
                    transform: `rotateY(180deg) translate(-50%,-103%)`
                }}
            ></div>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        characterData: state.MasterDataReducer.characterData,
    };
}

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Character);