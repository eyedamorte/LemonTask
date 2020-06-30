import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';

const { Header, Content, Footer } = Layout;

class CustomLayout extends React.Component {
    render() {
        return (
            <Layout className="layout">
                <Header>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['3']}
                    style={{ lineHeight: '64px' }}
                >

                <Menu.Item key="1">
                    <Link to="/">Home</Link>
                </Menu.Item>



                    <Menu.Item key="4">
                        <Link to="/profile">Profile</Link>
                    </Menu.Item>

                    <Menu.Item key="5">
                        <Link to="/news">News</Link>
                    </Menu.Item>
                    {
                        this.props.isLogin ?

                        <Menu.Item key="2" onClick={this.props.logout}>
                            <span style={{color: '#d11755'}}>OUT</span>
                        </Menu.Item>

                        :
                        <Menu.Item key="2">

                        </Menu.Item>

                    }
                </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/">List</Link></Breadcrumb.Item>
                </Breadcrumb>
                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                        {this.props.children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                gitlab/eyedamorte
                </Footer>
            </Layout>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    }
}
const mapStateToProps = state => {
  return {
    isLogin: state.isLogin
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomLayout));
