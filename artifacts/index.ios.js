/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React from 'react';
import { AppRegistry, NavigatorIOS, StyleSheet
// Text,
// View
 } from 'react-native';
import { SearchPage } from './search-page';
export class HelloWorld extends React.Component {
}
class PropertyFinder extends React.Component {
    render() {
        return (React.createElement(NavigatorIOS, { style: styles.container, initialRoute: {
                title: 'Property Finder',
                component: SearchPage
            } }));
    }
}
const styles = StyleSheet.create({
    text: {
        color: 'black',
        backgroundColor: 'white',
        fontSize: 30,
        margin: 80
    },
    container: {
        flex: 1
    }
});
AppRegistry.registerComponent('PropertyFinder', () => PropertyFinder);
//# sourceMappingURL=index.ios.js.map