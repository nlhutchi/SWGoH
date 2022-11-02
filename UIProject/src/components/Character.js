import React, { useState } from 'react';
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
        backgroundPosition: '0 100%',
        backgroundSize: '100% 200%'
    },
    g13FrameLight: {
        backgroundImage: 'url(https://assets.swgoh.gg/files/assets/character-frame-relic-atlas.0b9ffa6122f58395.png)',
        zIndex: 2,
        backgroundSize: '100% 200%'
    },
    g1Through12: {
        backgroundImage: 'url(https://assets.swgoh.gg/files/assets/character-gear-frame-atlas.35f80687e786b206.png)',
        backgroundSize: '100%'
    }
});

function Character(props) {
    const classes = useStyles();
    const [ height, setHeight ] = useState(0);
    const [ wrapperWidth, setWrapperWidth ] = useState(false);
    const { unit, characterData } = props;

    if(unit.gear_level === 13) {
        return (
            <div 
                onLoad={(e) => setWrapperWidth(e.target.width)}
                className={`${classes.characterWrapper}`}
                style={{ 
                    height: height
                }}
            >
                <img
                    onLoad={(e) => setHeight(e.target.height)}
                    className={`${classes.characterImg}`} 
                    src={characterData[unit.base_id].image} 
                    alt={unit.base_id}
                />
                <div>
                    <div 
                        className={`${classes.frameSize} ${characterData[unit.base_id].alignment === "Light Side" ? classes.g13FrameLight : classes.g13FrameDark}`} 
                        style={{ 
                            height: height,
                            marginLeft: `${wrapperWidth/2}px`,
                            transform: `translate(20%,-103%)`
                        }}
                    ></div>
                    <div 
                        className={`${classes.frameSize} ${characterData[unit.base_id].alignment === "Light Side" ? classes.g13FrameLight : classes.g13FrameDark}`} 
                        style={{ 
                            height: height,
                            marginLeft: `${wrapperWidth/2}px`,
                            transform: `rotateY(180deg) translate(-225%,-203%)`
                        }}
                    ></div>
                </div>
            </div>
        );
    } else {
        return (
            <div 
                onLoad={(e) => setWrapperWidth(e.target.width)}
                className={`${classes.characterWrapper}`}
                style={{ 
                    height: height
                }}
            >
                <img
                    onLoad={(e) => setHeight(e.target.height)}
                    className={`${classes.characterImg}`} 
                    src={characterData[unit.base_id].image} 
                    alt={unit.base_id}
                />
                <div 
                    className={`${classes.frameSize} ${classes.g1Through12}`} 
                    style={{ 
                        height: height/3,
                        marginLeft: `${wrapperWidth/2}px`,
                        backgroundPosition: `0 ${(unit.gear_level - 1)*9.1}%`,
                        transform: `translate(${unit.gear_level > 7 ? 125 : 120}%,-200%) scale(${unit.gear_level > 7 ? 3 : 3.3})`
                    }}
                ></div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        characterData: state.MasterDataReducer.characterData,
    };
}

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Character);