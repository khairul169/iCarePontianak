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
    headerHeight: PropTypes.number,
    snapping: PropTypes.bool
  };

  static defaultProps = {
    backdrop: false,
    points: [0.4],
    headerHeight: 0,
    snapping: true
  };

  constructor(props) {
    super(props);
    this.updatePoints();
  }

  componentDidMount() {
    this.updatePoints();
  }

  componentDidUpdate() {
    this.updatePoints();
  }

  show(index) {
    const value = this.snappingPoints[index] ? this.snappingPoints[index] : 0;
    this.panel && this.panel.show(value);
  }

  hide() {
    this.panel && this.panel.hide();
  }

  updatePoints = () => {
    let points = [];

    // Add snapping points
    this.props.points.forEach(element => {
      points.push(element * window.height);
    });

    // Add snapping to header
    points.push(this.props.headerHeight);

    this.snappingPoints = points;
  };

  defaultHeader = () => {
    return (
      <View style={styles.defaultHeader}>
        <View style={styles.headerIndicator} />
      </View>
    );
  };

  renderHeader = dragHandlers => {
    const { header, headerHeight } = this.props;

    const headerStyle = {
      height: headerHeight,
      backgroundColor: "#fff"
    };

    return (
      headerHeight && (
        <View style={headerStyle} {...dragHandlers}>
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
    const panelStyle = [styles.panel, style];

    const draggableRange = {
      top: this.snappingPoints.length ? this.snappingPoints[0] : window.height,
      bottom: headerHeight
    };
    const snappingPoints = this.props.snapping
      ? this.snappingPoints
      : undefined;

    return (
      <SlidingUpPanel
        ref={ref => {
          this.panel = ref;
        }}
        showBackdrop={backdrop}
        draggableRange={draggableRange}
        snappingPoints={snappingPoints}
        height={draggableRange.top}
      >
        {dragHandlers => (
          <View style={panelStyle}>
            {this.renderHeader(dragHandlers)}

            <View style={styles.container}>{children}</View>
          </View>
        )}
      </SlidingUpPanel>
    );
  }
}

const styles = StyleSheet.create({
  panel: {
    flex: 1,
    backgroundColor: "white",
    position: "relative",
    marginHorizontal: 8,
    borderRadius: 3,
    overflow: "hidden"
  },
  container: {
    flex: 1
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
