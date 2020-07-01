import React, {Component} from 'react'
import {connect} from 'react-redux';
import {authCheckState} from '../../store/actions'
import {withRouter} from 'react-router-dom'

function Auth(ComposedClass, reload) {

    
    class AuthChecks extends Component {

        constructor(props){
            super(props);
            this.state = {
                loading:true
            }
        }

        componentDidMount(){

            this.props.authChk();
            
        }

        
        
        UNSAFE_componentWillReceiveProps(nextProps){
            this.setState({loading: false});
            
            if(!nextProps.isAuth){
                if(reload){
                    this.props.history.push('login');
                }
            } else {
                if(reload === false){
                    this.props.history.push('/');
                }
            }
        }

        render() {
            // console.log(this.props);
            if(this.state.loading){
                return(
                    <div>loading</div>
                );
            }

            return (
                <div>
                    <ComposedClass {...this.props} user={this.props.user} />
                </div>
            )
        }
    }
    const mapStateToProps = state => {
        return{
            isAuth: state.auth.isAuth,
            defaultPath: state.reducer.defaultPath,
            authInfo: state.auth
        }
    }
    const mapDispatchToProps = dispatch => {
        return {
            authChk: () => dispatch(authCheckState())
        }
    };
    return withRouter(connect(mapStateToProps,mapDispatchToProps)(AuthChecks));
    

    
}

export default Auth;
