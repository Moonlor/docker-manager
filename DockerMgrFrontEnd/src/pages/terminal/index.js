import { Component } from 'react';
import { Terminal } from 'xterm';
import { Tabs, Button, Card, Empty, Modal, Form, Alert, Radio } from 'antd';
import { connect } from 'dva';
import * as attach from 'xterm/lib/addons/attach/attach';
import 'xterm/src/xterm.css';

const { TabPane } = Tabs;
const ButtonGroup = Button.Group;

@connect(({ container, loading }) => ({
  containers: container.containersList,
  servers: container.serversList,
  loading: loading.effects['container/get'],
  loadingStop: loading.effects['container/stop'],
  loadingRemove: loading.effects['container/remove'],
  confirmLoading: loading.effects['container/run'],
}))
class TerminalPage extends Component {

  constructor(props) {
    super(props);
    this.newTabIndex = 0;
    const panes = [];
    this.state = {
      activeKey: '1',
      panes,
      visible: false
    };
    Terminal.applyAddon(attach);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.confirmLoading !== nextProps.confirmLoading) {
      if (nextProps.confirmLoading) {
        this.setState({
          visible: !nextProps.confirmLoading
        })
      }
    }
  }

  onChange = activeKey => {
    this.setState({ activeKey });
  };

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  add = (id, image, ip) => {
    const panes = this.state.panes;
    const activeKey = `${id} ${this.newTabIndex++}`;
    panes.push({ title: `${this.newTabIndex} - ${image}`, key: activeKey, image: image });
    this.setState({ panes, activeKey }, () => {

      let term = new Terminal({ cursorBlink: true });
      term.open(document.getElementById(activeKey));
      term.writeln("welcome to use docker web terminal!");
      term.writeln(`Current container: ${image}`);
      term.writeln("-----------------------------------");
      let socket = new WebSocket(`ws://127.0.0.1:5000/ws?token=${id}&ip=${ip}`);
      term.attach(socket);
      socket.onclose = function () {
        term.writeln("closed. Thank you for use!");
      };

    });

  };

  stop = (id, ip) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'container/stop',
      payload: {
        id: id,
        ip: ip,
      },
    });
  };

  delete = (id, ip) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'container/remove',
      payload: {
        id: id,
        ip: ip,
      },
    });
  };

  remove = targetKey => {
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (panes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = panes[lastIndex].key;
      } else {
        activeKey = panes[0].key;
      }
    }
    this.setState({ panes, activeKey });
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { imageName, selectedIp } = values;
        const { dispatch } = this.props;
        dispatch({
          type: 'container/run',
          payload: {
            image: imageName,
            ip: selectedIp
          },
        });
        this.setState({
          confirmLoading: true,
        });
        setTimeout(() => {
          this.setState({
            visible: false,
          });
        }, 3000);
      }
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {

    const gridStyle = {
      width: '50%',
      textAlign: 'center',
    };

    const { servers, containers, loading, loadingStop, loadingRemove, confirmLoading } = this.props;
    const { visible } = this.state;
    const { getFieldDecorator } = this.props.form

    let serverList = [];
    let radioList = []
    let defaultIp = null;
    if (servers) {
      for (let i = 0; i < servers.length; i++) {
        const server = servers[i];
        radioList.push(<Radio value={server.ip} key={server.ip} >{server.ip}</Radio>)
        defaultIp = server.ip;
        const containerList = containers[i];
        serverList.push({ server: server, containerList: containerList });
      }
    }

    let imageList = [];
    ['ubuntu:latest', 'python:3.6'].forEach(e => {
      imageList.push(<Radio value={e} key={e} >{e}</Radio>)
    });

    const serverCards = serverList.map((e) =>
      <Card title={"服务器 " + e.server.ip} key={e.server.ip} size='small'>
        {
          e.containerList.map((c) =>
            <Card.Grid style={gridStyle} key={c.Id}> 
              <ButtonGroup style={{marginRight: '16px', marginBottom: '16px'}}>
                <Button type="primary" disabled icon="cloud">{`${c.Image}`}</Button>
                <Button type="primary" disabled icon="tag">{`${c.Id.slice(0, 5)}`}</Button>
                {c.State === 'running' ?
                  <Button type="primary" icon="desktop" onClick={this.add.bind(this, c.Id, c.Image, e.server.ip)} >终端</Button>
                  :
                  <Button type="danger" icon="desktop" >终端(不可用)</Button>
                }
              </ButtonGroup>

              <ButtonGroup >
                <Button type="danger" icon="stop" onClick={this.stop.bind(this, c.Id, e.server.ip)} loading={loadingStop}>停止</Button>
                {c.State === 'running' ?
                  <Button type="danger" icon="delete" disabled>移除</Button>
                  :
                  <Button type="danger" icon="delete" onClick={this.delete.bind(this, c.Id, e.server.ip)} loading={loadingRemove}>移除</Button>
                }
              </ButtonGroup>
            </Card.Grid>)
        }
      </Card>
    );

    let addContainerButton;

    if (servers) {
      addContainerButton = <Button type="primary" onClick={this.showModal} style={{ marginBottom: '16px' }}>启动新的容器</Button>;
    } else {
      addContainerButton = null;
    }

    return (
      <div>

        {addContainerButton}

        <Modal
          title="添加新服务器"
          visible={visible}
          confirmLoading={confirmLoading}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div style={{ marginBottom: '16px' }}>
            <Alert
              message="镜像格式: ImageName:Tag"
              description="当服务器中不存在镜像时，会从 dockerHub 拉取镜像"
              type="info"
              showIcon
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            
          </div>

          <Form onSubmit={this.handleOk}>
            <Form.Item>
              {getFieldDecorator('selectedIp', {
                rules: [
                  {
                    required: true,
                    message: "ip地址",
                  }
                ],
              })(
                <Radio.Group defaultValue={defaultIp}>
                  {radioList}
                </Radio.Group>
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('imageName', {
                rules: [
                  {
                    required: true,
                    message: "镜像名",
                  }
                ],
              })(
                <Radio.Group defaultValue={defaultIp}>
                  {imageList}
                </Radio.Group>
              )}
            </Form.Item>
          </Form>
        </Modal>

        <div>
          {serverCards}
        </div>
        <div style={{ marginTop: '16px' }}>
          {loading || !servers ? <Empty /> :
          <Tabs
            hideAdd
            onChange={this.onChange}
            activeKey={this.state.activeKey}
            type="editable-card"
            onEdit={this.onEdit}
          >
            {this.state.panes.map(pane => (
              <TabPane forceRender={true} tab={pane.title} key={pane.key}>
                <div id={pane.key}></div>
              </TabPane>
            ))}
          </Tabs>}
        </div>
      </div>
    );
  }
}

export default Form.create()(TerminalPage);