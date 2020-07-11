import React from 'react';
import { Menu } from 'antd';
import {Link} from 'react-router-dom';

class TheHeaderSubMenu extends React.Component {
  state = {
    current: 'faults',
  };

  handleClick = e => {
    this.setState({ current: e.key });
  };

  render() {

    const MenuItems = this.props.nav_link.map((item) => (
        
            <Menu.Item key={item.key} >
                <Link to={item.to}  >
                    {item.title}
                </Link>
            </Menu.Item>
        
    ));

    const { current } = this.state;
    return (
      <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">
        {MenuItems}
      </Menu>
    );
  }
}
export default TheHeaderSubMenu;