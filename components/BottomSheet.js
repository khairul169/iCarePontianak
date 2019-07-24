import React, { Component } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import SlidingUpPanel from "rn-sliding-up-panel";
import PropTypes from "prop-types";

const window = Dimensions.get("window");

class BottomSheet extends Component {
  static propTypes = {
    style: PropTypes.any,
    backdrop: PropTypes.bool,
    points: PropTypes.array,
    header: PropTypes.element,
    headerHeight: PropTypes.number
  };

  static defaultProps = {
    backdrop: false,
    points: [0.4],
    headerHeight: 0
  };

  constructor(props) {
    super(props);
    this.snappingPoints = [];
  }

  componentDidMount() {
    this.updatePoints();
  }

  componentDidUpdate() {
    this.updatePoints();
  }

  show(index, velocity) {
    const value =
      index !== undefined && this.snappingPoints[index] !== null
        ? this.snappingPoints[index]
        : 0;

    this.panel && this.panel.show({ toValue: value, velocity: -velocity });
  }

  hide() {
    this.panel && this.panel.hide();
  }

  updatePoints = () => {
    this.snappingPoints = [];

    // Add snapping points
    this.props.points.forEach(element => {
      this.snappingPoints.push(element * window.height);
    });

    // Add snapping to header
    this.snappingPoints.push(this.props.headerHeight);
  };

  defaultHeader = () => {
    return (
      <View style={styles.defaultHeader}>
        <View style={styles.headerIndicator} />
      </View>
    );
  };

  renderHeader = () => {
    const { header, headerHeight } = this.props;

    const headerStyle = {
      height: headerHeight
    };

    return (
      headerHeight && (
        <View style={headerStyle}>
          {header
            ? typeof header === "function"
              ? header()
              : header
            : this.defaultHeader()}
        </View>
      )
    );
  };

  render() {
    const { style, backdrop, headerHeight, children } = this.props;

    // Draggable range
    const draggableRange = {
      top: this.snappingPoints.length ? this.snappingPoints[0] : window.height,
      bottom: headerHeight
    };

    return (
      <View style={style}>
        <SlidingUpPanel
          ref={ref => {
            this.panel = ref;
          }}
          showBackdrop={backdrop}
          draggableRange={draggableRange}
          snappingPoints={this.snappingPoints}
        >
          <View style={styles.panel}>
            {this.renderHeader()}

            <View style={styles.container}>{children}</View>
          </View>
        </SlidingUpPanel>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  panel: {
    flex: 1,
    backgroundColor: "white",
    position: "relative"
  },
  defaultHeader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  headerIndicator: {
    backgroundColor: "#ddd",
    borderRadius: 3,
    width: 60,
    height: 6
  }
});

export default BottomSheet;
