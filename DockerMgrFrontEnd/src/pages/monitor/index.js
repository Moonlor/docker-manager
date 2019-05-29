import { Component } from 'react';
import { List, Modal, Button, Form, Input, Alert } from 'antd';
import { connect } from 'dva';
import { getUserInfo } from '@/utils/authority';
import ContainerList from './components/ContainerList'

const FormItem = Form.Item;
const InputGroup = Input.Group;

@connect(({ container, loading }) => ({
  containers: container.containersList,
  servers: container.serversList,
  loading: loading.effects['container/get'],
  confirmLoading: loading.effects['container/addNewServer'],
}))
class MonitorPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { dispatch } = this.props;
        const { id } = getUserInfo();
        dispatch({
          type: 'container/addNewServer',
          payload: {
            ...values,
            userId: id
          },
        });
        this.setState({
          confirmLoading: true,
        });
        setTimeout(() => {
          this.setState({
            visible: false,
          });
        }, 1500);
      }
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { loading, servers, containers, confirmLoading } = this.props;
    const { visible } = this.state;
    const { getFieldDecorator } = this.props.form

    let data = []
    if (servers) {
      for (let i = 0; i < servers.length; i++) {
        const server = servers[i];
        const container = containers[i];
        data.push({ server: server, container: container });
      }
    }

    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          添加新服务器
        </Button>

        <Modal
          title="添加新服务器"
          visible={visible}
          confirmLoading={confirmLoading}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div style={{marginBottom: '16px'}}>
            <Alert
              message="请确保Docker Daemon开启了远程调用"
              description="编辑 /usr/lib/systemd/system/docker.service , 替换: ExecStart=/usr/bin/dockerd -H tcp://0.0.0.0:2375 -H unix://var/run/docker.sock, 然后分别运行# systemctl daemon-reload # systemctl restart docker"
              type="info"
              showIcon
            />
          </div>
          
          <Form onSubmit={this.handleOk}>
            <FormItem>
              {getFieldDecorator('provider', {
                rules: [
                  {
                    required: true,
                    message: "未填写提供商",
                  }
                ],
              })(
                <Input size="large" placeholder={"提供商"} />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('introduction', {
                rules: [
                  {
                    required: true,
                    message: "未填写简介",
                  }
                ],
              })(
                <Input
                  size="large"
                  placeholder={"简介"}
                />
              )}
            </FormItem>
            <InputGroup compact>
              {getFieldDecorator('ip', {
                rules: [
                  {
                    required: true,
                    message: "未填写服务器ip地址",
                  },
                ],
              })(
                <Input style={{ width: '70%' }} size="large" placeholder={"服务器ip地址"} />
              )}
              {getFieldDecorator('endpoint', {
                rules: [
                  {
                    required: true,
                    message: "未填写端口号",
                  }
                ],
              })(
                <Input style={{ width: '30%' }} size="large" placeholder={"2375"} />
              )}
            </InputGroup>
          </Form>
        </Modal>

        <List
          itemLayout="vertical"
          dataSource={data}
          loading={loading}
          renderItem={item => (
            <List.Item>
              <ContainerList containers={item.container} server={item.server} dispatch={this.props.dispatch}/>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default Form.create()(MonitorPage);