import React from 'react';
import {Card} from 'react-bootstrap';

export default function(props){
    return(
        <Card className="text-center ">
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>
                    {props.body}
                </Card.Text>
                <Card.Text>
                    <small className="text-muted">{props.footer}</small>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}