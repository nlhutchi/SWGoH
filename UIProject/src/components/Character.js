import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    characterImg: {
        zIndex: 1,
        borderRadius: 100,
        maxHeight: 128
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
        backgroundImage: 'url(https://assets.swgoh.gg/files/assets/character-frame-relic-atlas.0b9ffa6122f58395.png)',
        zIndex: 2,
        backgroundSize: '100% 200%'
    },
    g13FrameLight: {
        backgroundImage: 'url(https://assets.swgoh.gg/files/assets/character-frame-relic-atlas.0b9ffa6122f58395.png)',
        zIndex: 2,
        backgroundPosition: '0 100%',
        backgroundSize: '100% 200%'
    },
});

function Character(props) {
    const classes = useStyles();
    const wrapperRef = useRef(null)
    const [ height, setHeight ] = useState(0);
    const [ wrapperWidth, setWrapperWidth ] = useState(false);

    useEffect(() => {
        if(wrapperRef.current && height !== wrapperRef.current.clientHeight) {
            setWrapperWidth(wrapperRef.current.clientWidth);
        }
    }, [wrapperRef]);

    return (
        <div 
            ref={wrapperRef}
            className={`${classes.characterWrapper}`}
            style={{ 
                height: height
            }}
        >
            <img
                onLoad={(e) => setHeight(e.target.height)}
                className={`${classes.characterImg}`} 
                src={props.characterData[props.unit.base_id].image} 
                alt={props.unit.base_id}
            />
            <div 
                className={`${classes.frameSize} ${props.characterData[props.unit.base_id].alignment === "Light Side" ? classes.g13FrameLight : classes.g13FrameDark}`} 
                style={{ 
                    height: height,
                    marginLeft: `${(wrapperWidth)/2}px`,
                    transform: `translate(-150%,-103%)`
                }}
            ></div>
            <div 
                className={`${classes.frameSize} ${props.characterData[props.unit.base_id].alignment === "Light Side" ? classes.g13FrameLight : classes.g13FrameDark}`} 
                style={{ 
                    height: height,
                    marginLeft: `${(wrapperWidth)/2}px`,
                    transform: `rotateY(180deg) translate(-50%,-203%)`
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