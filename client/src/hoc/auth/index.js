import React, { Component } from "react";
import { connect } from "react-redux";
import { authCheckState } from "../../store/actions";
import { withRouter } from "react-router-dom";
import { Skeleton } from "antd";
import {currentOpenProject} from '../../store/actions'

function Auth(ComposedClass, reload) {
  class AuthChecks extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: true,
      };
    }

    componentDidMount() {
      this.props.authChk();
      if (this.props.match.params.Pid) {
        const key = {
          _id: this.props.match.params.Pid
        }
        this.props.currentProject(key);
      }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
      this.setState({ loading: false });

      if (!nextProps.isAuth) {
        if (reload) {
          this.props.history.push("/403");
        }
      } else {
        if (reload === false) {
          this.props.history.push("/");
        }
      }
    }

    render() {
      // console.log(this.props);
      // if(this.state.loading){
      //     return(
      //         <div>loading</div>
      //     );
      // }
      return (
        <div>
          <Skeleton active loading={this.state.loading}>
            <ComposedClass {...this.props} user={this.props.user} />
          </Skeleton>
        </div>
      );
    }
  }
  const mapStateToProps = (state) => {
    return {
      isAuth: state.auth.isAuth,
      authInfo: state.auth,
    };
  };
  const mapDispatchToProps = (dispatch) => {
    return {
      authChk: () => dispatch(authCheckState()),
      currentProject: (project) => dispatch(currentOpenProject(project)),
    };
  };
  return withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthChecks));
}

export default Auth;
