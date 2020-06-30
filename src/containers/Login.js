import React from 'react';
import { Form, Input, Button, Spin } from 'antd';
import Icon from '@ant-design/icons';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as actions from '../store/actions/auth';
import bg from '../image/bg.png';
import icongr from '../image/Group.png';
const FormItem = Form.Item;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;


class NormalLoginForm extends React.Component {


  render() {
    let errorMessage = null;
    if (this.props.error) {
        errorMessage = (
            <p>{this.props.error}</p>
        );
    }
    const background = {
      maxWidth: '100%'
    }

    const onFinish = values => {
      console.log(values);

          this.props.onAuth(values.username, values.password);
          this.props.history.push('/profile');

    };



    return (
        <div>
        <div class="container">
          <div class="row">
            <div class="col-5">



                {
                    this.props.loading ?

                    <Spin indicator={antIcon} />

                    :

                    <Form onFinish={onFinish} className="login-form">
                        <img maxWidth='100%' src={icongr} alt="logo" />
                        <h1 className='title'>профиль</h1>
                        <FormItem name="username">

                            <Input className='item' prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)' }} />} placeholder="Логин" />

                        </FormItem>

                        <FormItem name="password">
                            <Input className='item' prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Пароль" />
                        </FormItem>

                        <FormItem className='button'>
                        { this.props.error ?
                          <p style={{fontSize:'20px', fontWeight: 'bold'}}>{this.props.error}</p>
                          :
                          <div></div>

                         }
                        <Button  type="primary" htmlType="submit" style={{marginRight: '10px'}}>
                            Войти
                        </Button>
                        </FormItem>
                    </Form>
                }



            </div>
            <div className="col-7 greenbg"> <img maxWidth='70%' maxHeight='50%' className="background" src={bg}/></div>
</div>
</div>
      </div>
    );
  }
}



const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(actions.authLogin(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NormalLoginForm);
