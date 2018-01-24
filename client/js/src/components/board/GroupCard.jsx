import React from 'react';
import Icon from '../common/Icon';

export default ({ groupImage, groupName, membersCount, isOwner, groupid, onClick}) => {
  const card = {
    height: 'auto'
  };

  return (
    <div className='col s12 m6 l3' onClick={onClick} gid={groupid}>
      <div className='card small hoverable' style={card}>
        <div className='card-image'>
          <img src={groupImage} />
        </div>
        <div className='card-content'>
          <span className='card-title truncate'>{groupName}</span>
	        <p className='grey-text text-darken-1'>{membersCount}</p>
          <Icon title={isOwner?'Delete':'Leave'}>{
            isOwner?'delete':'exit_to_app'
          }</Icon>
        </div>
      </div>
    </div>
  );
}
