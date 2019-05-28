import { Component } from 'react';
import { List, Card } from 'antd';
import { connect } from 'dva';
import ContainerList from './components/ContainerList'

@connect(({ container, loading }) => ({
  containers: container.containersList,
  servers: container.serversList,
  loading: loading.effects['container/get'],
}))
class MonitorPage extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { loading, servers, containers } = this.props;

    let data = []
    if (servers){
      for (let i = 0; i < servers.length; i++) {
        const server = servers[i];
        const container = containers[i];
        data.push({ server: server, container: container });
      }
    }
    
    return(

      <List
        itemLayout="vertical"
        dataSource={data}
        loading={loading}
        renderItem={item => (
          <List.Item>
            <ContainerList containers={item.container} server={item.server}/>
          </List.Item>
        )}
      />
    );
  }
}

export default MonitorPage;