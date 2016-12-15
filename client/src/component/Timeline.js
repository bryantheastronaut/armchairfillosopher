import React from 'react';
import { Button } from 'react-bootstrap';
import cookie from 'react-cookie';

export const Timeline = props => {
  return (
    <div>
      <Button onClick={ props.onGetTimeline() }>Get timeline</Button>
    </div>
  );
};
