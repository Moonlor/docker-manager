import { Component } from 'react';

import Background from './Background'
import LoginPgae from '@/pages/login/index'
import MainLayout from './MainLayout'
import Register from '@/pages/register/index'
import { getAuthority, getUserInfo } from '@/utils/authority';
import styles from './index.css';

class Root extends Component {

  constructor(props) {
    super(props);
    this.state = {
      logedIn: true
    };
  }

  render() {

    let token = getAuthority();

    if (this.props.location.pathname === '/login') {
      if (token !== 'null') {
        this.props.history.push("/");
      }

      return (
      <div>
        <Background />
        <LoginPgae />
      </div>);
    }

    if (this.props.location.pathname === '/register') {
      if (token !== 'null') {
        this.props.history.push("/");
      }

      return (<div>
        <Background />
        <Register />
      </div>);
    }

    if (token === 'null') {
      this.props.history.push("/login");
    }

    if (this.props.location.pathname === '/') {
      this.props.history.push("/monitor");
    }

    return (
      <div>
        <MainLayout {...this.props} />
      </div>
    );
  }
}

export default Root;
