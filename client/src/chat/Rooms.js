import React from "react";
import { CCard, CCardHeader, CCardBody, CRow, CCol, CContainer } from "@coreui/react";
import {AntInput} from '../shared/components'
import {Formik, Form, Field} from 'formik'
import * as Yup from "yup";
import {Button} from 'antd'

const validationSchema = Yup.object().shape({
  roomName: Yup.string().required("Required"),
});

function Rooms() {

  const onSubmit = () => {

  }

  return (
    <>
      <div className="  flex-row align-items-center " >
        <CContainer>
        <CRow className="justify-content-center">
          <CCol sm=''>
            <CCard href="#" accentColor="info" style={{width: '20rem', height: '20rem'}}>
              {/* <CCardHeader>Create Rooms</CCardHeader> */}
              <CCardBody className=''>
                <h3 className='text-center' >Create chat rooms</h3>
                <Formik
                  initialValues={{
                    roomName:''
                  }}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                >
                  {(props) => (
                    <Form>
                      <CRow>
                        <CCol>
                        <Field
                          component={AntInput}
                          label="Room"
                          name="roomName"
                          placeholder='Enter room name'
                          onChange={props.handleChange}
                          hasFeedback
                        />
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol>
                          <Button type='primary'>Create Room</Button>
                        </CCol>
                      </CRow>
                    </Form>
                  )}
                </Formik>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        </CContainer>
        
      </div>
    </>
  );
}

export default Rooms;
