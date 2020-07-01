import React, {  useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CRow
} from '@coreui/react'
// import CIcon from '@coreui/icons-react'

import {auth} from '../../store/actions';


import './style.css'
import { Input, Tooltip, Form, Button } from 'antd';
import { InfoCircleOutlined, MailOutlined, EyeInvisibleOutlined, EyeTwoTone, LockOutlined} from '@ant-design/icons';


import { withSnackbar } from 'notistack';
import * as actions from '../../store/actions';
import {Spin} from 'antd';

const initialValues= {
  email: '',
  password: '',
};


const Login = (props) => {

  //mapStateToProps
  const loading = useSelector(state => state.auth.loading )
  const errMsg = useSelector(state => state.auth.errMsg )
  const isAuth = useSelector(state => state.auth.token !== null )
  //mapDispatchToProps
  const dispatch = useDispatch()
  const onAuth = (email, password) =>dispatch(auth(email, password))

  let history = useHistory();

 
  const onFinish = values => {
    onAuth(values.email, values.password);
  };

  useEffect(( )=> {
    if(props.error){
      props.enqueueSnackbar( errMsg, { 
          variant: 'error',
      });
    }
  });

  useEffect(() => {
    console.log(isAuth);

    if(isAuth){
      history.push('/');
    }
    
  },[isAuth]);

  const validateMessages = e => ({
    required: e.name + ' is required!',
    types: {
      email:  e.name +' is not validate email!',
      
    },
    number: {
      password:  e.name +' is less than 8 characters!',
    },
  });

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <h1>Login</h1>
                  <p className="text-muted">Sign In to your account</p>
                  <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={initialValues}
                    onFinish={onFinish}
                    validateMessages={validateMessages}
                  >
                    <Form.Item
                      name="email"
                      rules={[{
                        required: true,
                        type: 'email',
                      }]}
                    >
                      <Input
                        placeholder="Enter your email"
                        type='email'
                        prefix={<MailOutlined className="site-form-item-icon" />}
                        suffix={
                          <Tooltip title="Enter email">
                            <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                          </Tooltip>
                        }
                      />
                    </Form.Item>
                    <Form.Item
                      name="password"
                      rules={[{ 
                        required: true,
                        min: 8
                      }]}
                    >
                      <Input.Password
                        placeholder="input password"
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                      />
                    </Form.Item>
                    <Form.Item  >
                      {/* <Spin spinning={loading}> */}
                        <Button loading={loading} type="primary" htmlType="submit" className="login-form-button">
                          Log in
                        </Button>
                      {/* </Spin> */}
                      {/* <Link className="login-form-forgot" to="#">
                        Forgot password
                      </Link> */}
                    </Form.Item>
                  </Form>

                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2 className="text-white">Sign up</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.</p>
                    <Link to="/register">
                      <Button type="dashed" htmlType="submit" className="mt-4">
                        Register Now!
                      </Button>
                        {/* <CButton color="secondary" className="mt-3" active tabIndex={-1}>Register Now!</CButton> */}
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default withSnackbar(Login)


