import { Component } from 'react';
import { Terminal } from 'xterm';
import * as attach from 'xterm/lib/addons/attach/attach';
import 'xterm/src/xterm.css';

class TerminalPage extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    Terminal.applyAddon(attach);
    let term = new Terminal({ cursorBlink: true });
    term.open(document.getElementById('terminal'));
    term.writeln("welcome to use docker web terminal!");
    let socket = new WebSocket('ws://127.0.0.1:5000/ws');
    term.attach(socket);
    socket.onclose = function () {
      term.writeln("closed. Thank you for use!");
    };
  }

  render() {
    return (
      <div id="terminal"></div>
    )
  }
}

export default TerminalPage;