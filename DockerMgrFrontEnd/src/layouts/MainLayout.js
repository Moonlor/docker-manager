import { Layout, Menu, Icon } from 'antd';
import { Component } from 'react';
import { routerRedux } from 'dva/router';
import { setAuthority, setUserInfo } from '@/utils/authority';
import Link from 'umi/link';

import styles from './index.css';

const { Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class MainLayout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  logoutHandler = (e) => {
    setAuthority(null);
    setUserInfo(null);
    this.props.history.push("/login");
  };

  handleClick = e => {
    this.props.history.push(e.key);
  };

  render() {

    const pathName = this.props.location.pathname;

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className={styles.logo} />
          <Menu 
            theme="dark" 
            defaultSelectedKeys={['/monitor']} 
            mode="inline" 
            selectedKeys={[pathName]}
            onClick={this.handleClick}
            >
            <Menu.Item key="/monitor">
              <Icon type="pie-chart" />
              <span>概览</span>
            </Menu.Item>
            <Menu.Item key="/terminal">
              <Icon type="desktop" />
              <span>
                <Link className={styles.menuLink} to="/terminal">容器</Link>
              </span>
            </Menu.Item>
            <Menu.Item key="/image">
              <Icon type="hdd" />
              <span>
                <Link className={styles.menuLink} to="/image">镜像</Link>
              </span>
            </Menu.Item>
            <Menu.Item key="/image/hub">
              <Icon type="cloud-download" />
              <span>
                <Link className={styles.menuLink} to="/image/hub">Hub</Link>
              </span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  <span>用户</span>
                </span>
              }
            >
              <Menu.Item key="logout" onClick={this.logoutHandler}>登出</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: '16px 16px' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Docker Manager ©2019 Created by Moonlor</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default MainLayout;
