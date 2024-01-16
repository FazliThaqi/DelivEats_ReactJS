import React from 'react'
import { withAuthorization } from '../HOC';

function AuthenticationTestAdmin() {
  return (
    <div>This page can only be accessed if the role of the logged in user is ADMIN</div>
  );
}

export default withAuthorization(AuthenticationTestAdmin);