import { Component } from 'react';
import { List, Card } from 'antd';
import { connect } from 'dva';


class ContainerList extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { containers } = this.props;

    return (

      <List
        grid={{ gutter: 16, column: 2 }}
        dataSource={containers}
        renderItem={item => (
          <List.Item>
            <Card title={item.Image}>Card content</Card>
          </List.Item>
        )}
      />
    );
  }
}

export default ContainerList;