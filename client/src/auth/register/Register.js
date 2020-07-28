import React from 'react'
import {  useHistory } from 'react-router-dom'
import axios from 'axios'
import {
  
  CCard,
  CCardBody,
  CCol,
  CContainer,
  
  CRow
} from '@coreui/react'
// import CIcon from '@coreui/icons-react'

import './style.css'
import { withSnackbar } from 'notistack';

import { Input, Tooltip, Form , Button } from 'antd';
import { InfoCircleOutlined, MailOutlined, UserOutlined, EyeInvisibleOutlined, EyeTwoTone, LockOutlined} from '@ant-design/icons';
import { delay } from 'lodash'



const initialValues= {
  username: '',
  email: '',
  password: '',
  repeatpassword: '',
};

const validateMessages =  e => ({
  required: e.name + ' is required!',
  types: {
    email:  e.name +' is not validate email!',
    
  },
  number: {
    password:  e.name +' is less than 8 characters!',
  },
});

const Register = (props) => {

  let history = useHistory();

  
  
  const onFinish = async (values) => {
    const data = {
      email: values.email.toLowerCase(),
      username: values.username,
      password: values.password,
    }
    try{
      const response = await axios.post('/api/signup',data)
          console.log(response)
          if(response.data.post){
              props.enqueueSnackbar('Successfully registered', { 
                  variant: 'success',
              });
              delay(() => {
                history.push('/login')
              }, 3000)
              
          }else {
              props.enqueueSnackbar('Failed', { 
                  variant: 'error',
              });

          }
    } 
    catch(err){
      console.log(err);
    } 
  }


  return (
    <div className="c-app c-default-layout flex-row align-items-center bg-img">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <h1>Register</h1>
                <p className="text-muted">Create your account</p>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={initialValues}
                    onFinish={onFinish}
                    validateMessages={validateMessages}
                  >
                    <Form.Item
                      name="name"
                      rules={[{ 
                        required: true,
                      }]}
                    >
                      <Input
                        placeholder="Your name"
                        prefix={<UserOutlined className="site-form-item-icon" />}
                      />
                    </Form.Item>
                    <Form.Item
                      name="username"
                      rules={[{
                        required: true,
                      }]}
                    >
                      <Input
                        placeholder="Username"
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        suffix={
                          <Tooltip title="Enter username">
                            <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                          </Tooltip>
                        }
                      />
                    </Form.Item>
                    <Form.Item
                      name="email"
                      rules={[{
                        required: true,
                        type: 'email',
                      }]}
                    >
                      <Input
                        placeholder="Email"
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
                        placeholder="Password"
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                      />
                    </Form.Item>
                    
                    <Form.Item  >
                    <Button type="primary" htmlType="submit" className="button-float-r">
                      Register
                    </Button>
                    </Form.Item>
                  </Form>


              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default withSnackbar(Register)
