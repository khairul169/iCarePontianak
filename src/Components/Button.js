import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#fff',
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: '#676767'
    },

    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

    label: {
        flexGrow: 1,
        fontSize: 14,
        fontWeight: '200',
        color: '#333',
        textAlign: 'center'
    },

    labelDisabled: {
        color: '#727272'
    },
    
    icon: {
        width: 40
    }
})

export default class Button extends React.Component {
    constructor(props) {
        super(props);
        this.props.centered = true;
    }

    onPress = () => {
        if (this.props.disabled) {
            return;
        }
        this.props.onPress && this.props.onPress();
    }
    
    render() {
        return (
            <TouchableOpacity onPress={() => this.onPress()} style={[styles.button, this.props.style]}>
                <View style={styles.container}>
                    {
                        this.props.icon
                            ?
                            <Icon
                                name={this.props.icon}
                                size={20} style={[styles.icon, {
                                    color: (this.props.iconColor ? this.props.iconColor : '#333')
                                }]}
                            />
                            : null
                    }
                    <Text style={[styles.label, 
                        !this.props.centered ? {textAlign: 'left'} : null,
                        this.props.disabled ? styles.labelDisabled : null,
                        this.props.textStyle
                    ]}>
                        {this.props.title}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}
