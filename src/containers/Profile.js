import React from 'react';
import { Form, Input, Button, Spin } from 'antd';

import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as actions from '../store/actions/auth';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

class NormalLoginForm extends React.Component {


  render() {

    return (
      <div>
        {this.props.isLogin ?

          <div>
            <Avatar style={{backgroundColor: '#87d068' }} icon={<UserOutlined />} />
            <h3>{this.props.username}</h3>
          </div>

          :

          this.props.history.push('/login')
        }

      </div>
    );
  }
}



const mapStateToProps = (state) => {
    return {
        isLogin: state.isLogin,
        loading: state.loading,
        error: state.error,
        username: state.username
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(actions.authLogin(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NormalLoginForm);
