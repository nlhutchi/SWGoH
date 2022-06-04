import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from "react-router-dom";

function InitializeData() {
    const navigate = useNavigate();

    useEffect(() => {
        console.log('load data')
        navigate('/Guild')
    }, []);

    return (
        <div>
            {/* <p>Initializing Data</p> */}
        </div>
    );
}

function mapStateToProps(state) {
    return {
    };
}

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(InitializeData);