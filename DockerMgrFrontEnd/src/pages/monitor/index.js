import { Component } from 'react';
import { List, Card } from 'antd';
import { connect } from 'dva';

@connect(({ monitorPage, container }) => ({
  monitorPage,
  containers: container.payload,
  // loading: container.effects['container/get']
}))
class MonitorPage extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount()
  {
    this.props.dispatch({
      type: 'container/getAll',
      payload: { ip: '47.100.187.100'},
    });
  }

  render() {
    // const { loading } = this.props;

    const data = [
      {
        title: 'Title 1',
      },
      {
        title: 'Title 2',
      },
      {
        title: 'Title 3',
      },
      {
        title: 'Title 4',
      },
    ];

    return(
      <List
        grid={{ gutter: 16, column: 2 }}
        dataSource={data}
        // loading={loading}
        renderItem={item => (
          <List.Item>
            <Card title={item.title}>Card content</Card>
          </List.Item>
        )}
      />
    );
  }
}

export default MonitorPage;