import React from 'react';
import { Button } from 'react-bootstrap';

export default function LockTokens(props) {
  const { returnBack } = props;
  return (
    <div>
      <h3>Lock</h3>
      <Button onClick={returnBack}>Back</Button>
    </div>
  )
}
