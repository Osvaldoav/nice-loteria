import React, {Fragment} from 'react';
import UserList from './UserList';
import UserTitle from './UserTitle';

function ParticipantFormController() {
  return (
    <Fragment>
      <UserTitle/>
      <UserList/>
    </Fragment>
  )
}

export default ParticipantFormController;