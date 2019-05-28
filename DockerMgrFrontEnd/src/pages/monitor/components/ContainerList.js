import { Component } from 'react';
import { List, Card, Tag, Timeline } from 'antd';

class ContainerList extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { containers, server } = this.props;

    return (
      <div>
        <Card
          style={{ margin: '0 0 16px 0' }}
          title={'服务器IP地址: ' + server.ip}
          extra={'端口: ' + server.endpoint}
        >
          <Card.Meta
            title={server.introduction}
            description={
              <div>
                <Tag color="blue">{server.id}</Tag>
                <Tag color="blue">{server.provider}</Tag>
              </div>
            }
          />
        </Card>
        <List
          grid={{ gutter: 16, column: 2 }}
          dataSource={containers}
          renderItem={item => (
            <List.Item>
              <Card
                title={item.Image}
                extra={'状态: ' + item.State}
              >
                <div>
                  <Timeline>
                    <Timeline.Item color="green">创建于 <Tag color="green"><code>{item.Created}</code></Tag></Timeline.Item>
                    <Timeline.Item color="green">启动命令 <Tag color="green"><code>{item.Command}</code></Tag></Timeline.Item>
                    {item.State === 'running' ?
                      <Timeline.Item >当前状态 <Tag color="blue"><code>{item.Status}</code></Tag></Timeline.Item>
                      :
                      <Timeline.Item color="red">当前状态 <Tag color="red"><code>{item.Status}</code></Tag></Timeline.Item>
                    }
                  </Timeline>
                      
                      
                  <div>
                    <span>Gateway: <Tag>{item.NetworkSettings.Networks.bridge.Gateway}</Tag><p></p></span>
                    <span>IPAddress: <Tag>{item.NetworkSettings.Networks.bridge.IPAddress}</Tag><p></p></span>
                    <span>MacAddress: <Tag>{item.NetworkSettings.Networks.bridge.MacAddress}</Tag><p></p></span>
                    <span>Container Id: <Tag>{item.Id.slice(0, 15)}</Tag><p></p></span>
                  </div>
                </div>
              </Card>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default ContainerList;