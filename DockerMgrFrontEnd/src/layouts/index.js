import { Component } from 'react';

import Background from './Background'
import LoginPgae from '@/pages/login/index'
import MainLayout from './MainLayout'
import Register from '@/pages/register/index'
import { getAuthority } from '@/utils/authority';

class Root extends Component {

  constructor(props) {
    super(props);
    this.state = {
      logedIn: true
    };
  }

  componentWillMount()
  {
    let token = getAuthority();

    if (this.props.location.pathname === '/login') {
      if (token !== 'null') {
        this.props.history.push("/");
      }
    }

    if (this.props.location.pathname === '/register') {
      if (token !== 'null') {
        this.props.history.push("/");
      }
    }

    if (token === 'null') {
      this.props.history.push("/login");
    }
  }

  render() {

    let token = getAuthority();

    if (this.props.location.pathname === '/login') {
      // if (token !== 'null') {
      //   this.props.history.push("/");
      // }

      return (
      <div>
        <Background />
        <LoginPgae />
      </div>);
    }

    if (this.props.location.pathname === '/register') {
      // if (token !== 'null') {
      //   this.props.history.push("/");
      // }

      return (<div>
        <Background />
        <Register />
      </div>);
    }

    if (token === 'null') {
      // this.props.history.push("/login");
      return (
        <div>
          <Background />
          <LoginPgae />
        </div>
      );
    }

    return (
      <div>
        <MainLayout {...this.props} />
      </div>
    );
  }
}

export default Root;
