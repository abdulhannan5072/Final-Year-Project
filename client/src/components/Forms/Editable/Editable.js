import React from 'react'
import ContentEditable from 'react-contenteditable'


class Editable extends React.Component {
  constructor(props) {
    super(props)
    this.contentEditable = React.createRef();
    this.state = {html: props.data};
  };

  handleChange = evt => {
    this.setState({html: evt.target.value});
  };

  render = () => {
    return <ContentEditable
              onFocus={this.props.focus}
              innerRef={this.contentEditable}
              html={this.state.html} // innerHTML of the editable div
              disabled={this.props.disabled}       // use true to disable editing
              onChange={this.handleChange} // handle innerHTML change
              tagName='article' // Use a custom HTML tag (uses a div by default)
              {...this.props}
            />
  };
};

export default Editable;