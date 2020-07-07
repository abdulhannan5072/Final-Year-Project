import React from "react";
import { Result, Button } from "antd";
import {Link} from 'react-router-dom'

export default function Error403() {
  return (
    <div>
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={<Link to='/login'><Button type="primary" >Go Back To Login</Button></Link>}
      />
    </div>
  );
}
