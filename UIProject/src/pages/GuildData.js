import React, { useState } from 'react';
import { connect } from 'react-redux';

function GuildData() {
  return (
    <div>
      <p>Guild Data</p>
    </div>
  );
}

function mapStateToProps(state) {
    return {
    };
}

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(GuildData);