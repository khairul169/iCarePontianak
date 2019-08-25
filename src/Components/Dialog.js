import React, {Component} from 'react';
import {View} from 'react-native';
import RNDialog from 'react-native-dialog';
import PropTypes from 'prop-types';

export default class Dialog extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    buttonNo: PropTypes.string,
    buttonYes: PropTypes.string,
    onPressNo: PropTypes.func,
    onPressYes: PropTypes.func,
  };

  static defaultProps = {
    title: 'Dialog',
    description: 'Apakah anda yakin?',
    buttonNo: 'Tidak',
    buttonYes: 'Ya',
  };

  constructor(props) {
    super(props);

    this.state = {
      ...props,
      visible: false,
    };
  }

  show(props) {
    this.setState({...props, visible: true});
  }

  hide() {
    this.setState({visible: false});
  }

  onPressNo = () => {
    this.state.onPressNo && this.state.onPressNo();
    this.hide();
  };

  onPressYes = () => {
    this.state.onPressYes && this.state.onPressYes();
    this.hide();
  };

  render() {
    const {visible, title, description, buttonNo, buttonYes} = this.state;

    if (!visible) {
      return <View />;
    }

    return (
      <RNDialog.Container visible={this.state.visible}>
        <RNDialog.Title>{title}</RNDialog.Title>
        <RNDialog.Description>{description}</RNDialog.Description>
        <RNDialog.Button label={buttonNo} onPress={this.onPressNo} />
        <RNDialog.Button label={buttonYes} onPress={this.onPressYes} />
      </RNDialog.Container>
    );
  }
}
