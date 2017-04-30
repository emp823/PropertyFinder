import React, { Component } from 'react';
import { StyleSheet, Image, View, TouchableHighlight, ListView, Text } from 'react-native';
import { PropertyView } from './property-view';
const styles = StyleSheet.create({
    thumb: {
        width: 80,
        height: 80,
        marginRight: 10
    },
    textContainer: {
        flex: 1
    },
    separator: {
        height: 1,
        backgroundColor: '#dddddd'
    },
    price: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#48BBEC'
    },
    title: {
        fontSize: 20,
        color: '#656565'
    },
    rowContainer: {
        flexDirection: 'row',
        padding: 10
    }
});
export class SearchResults extends Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.lister_url !== r2.lister_url });
        this.state = {
            dataSource: dataSource.cloneWithRows(this.props.listings)
        };
    }
    renderRow(rowData) {
        const price = rowData.price_formatted.split(' ')[0];
        return (React.createElement(TouchableHighlight, { onPress: () => this.rowPressed(rowData.lister_url), underlayColor: "#dddddd" },
            React.createElement(View, null,
                React.createElement(View, { style: styles.rowContainer },
                    React.createElement(Image, { style: styles.thumb, source: { uri: rowData.img_url } }),
                    React.createElement(View, { style: styles.textContainer },
                        React.createElement(Text, { style: styles.price }, price),
                        React.createElement(Text, { style: styles.title, numberOfLines: 1 }, rowData.title))),
                React.createElement(View, { style: styles.separator }))));
    }
    render() {
        return (React.createElement(ListView, { dataSource: this.state.dataSource, renderRow: this.renderRow.bind(this) }));
    }
    rowPressed(listerURL) {
        const property = this.props.listings.filter(prop => prop.lister_url === listerURL)[0];
        this.props.navigator.push({
            title: 'Property',
            component: PropertyView,
            passProps: { property: property }
        });
    }
}
//# sourceMappingURL=search-results.js.map