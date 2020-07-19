import React, { Component } from 'react'
import {Row, Col, Container} from 'react-bootstrap';
import ProfileCard from './ProfileCard'
import './Styles.css'

class Profile extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col md='4'>
            {/* <ProfileCard
              name="Abdul Hannan"
              username="abdul5072"
            /> */}
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Profile
