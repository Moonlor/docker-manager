import { Component } from 'react';

import Background from './Background'
import LoginPgae from '@/pages/login/index'
import MainLayout from './MainLayout'
import Register from '@/pages/register/index'
import styles from './index.css';

class Root extends Component {

  constructor(props) {
    super(props);
    this.state = {
      logedIn: true,
    };
  }

  render() {

    if (this.props.location.pathname === '/login') {
      return (<div>
        <Background />
        <LoginPgae />
      </div>);
    }

    if (this.props.location.pathname === '/register') {
      return (<div>
        <Background />
        <Register />
      </div>);
    }

    return (
      <div>
        {this.state.logedIn ?
          (<MainLayout {...this.props}/>)
          :
          (<div><Background /><LoginPgae /></div>)}
      </div>
    );
  }
}

export default Root;
