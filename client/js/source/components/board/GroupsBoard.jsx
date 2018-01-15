import React from 'react';
import M from '../../../materialize';
import Icon from '../common/Icon.jsx';

export default class GroupsBoard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let elem = document.querySelector('.modal');
    let instance = M.Modal.init(elem);
  }

  render() {
    const notice = <h3 className='grey-text text-lighten-1'>
                   You don't belong to any group
                 </h3>;
  return (
    <div>
      {
        (!this.props.children) ? notice : this.props.children
      }
      <div className='fixed-action-btn modal-trigger'>
        <a className='btn-floating btn-large green modal-trigger' href='#newgroup'>
          <Icon className='large'>group_add</Icon>
        </a>
      </div>
      <div id='newgroup' className='modal'>
        <div className='modal-content'>
        </div>
        <div className='modal-footer'>
          <a className='modal-action modal-close waves-effect btn-flat'>Cancel</a>
          <a className='modal-action modal-close waves-effect btn-flat'>Post</a>
        </div>
      </div>
    </div>
  );
  }
}
