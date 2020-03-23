import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actions } from "../store";
import NewComponent from "../src/components/new";

const mapStateToProps = state => {
  return {
    memoList: state.memoList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewComponent);
