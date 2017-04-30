import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableHighlight, ActivityIndicator, Image } from 'react-native';
import '../resources/house.png';
const styles = StyleSheet.create({
    description: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        color: '#656565'
    },
    container: {
        padding: 30,
        marginTop: 65,
        alignItems: 'center'
    },
    flowRight: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch'
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        height: 36,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    searchInput: {
        height: 36,
        padding: 4,
        marginRight: 5,
        flex: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 8,
        color: '#48BBEC'
    },
    image: {
        width: 217,
        height: 138
    }
});
function urlForQueryAndPage(key, value, pageNumber) {
    const data = {
        country: 'uk',
        pretty: '1',
        encoding: 'json',
        listing_type: 'buy',
        action: 'search_listings',
        page: pageNumber
    };
    data[key] = value;
    const querystring = Object.keys(data)
        .map(dataKey => `${dataKey}=${encodeURIComponent(data[dataKey])}`)
        .join('&');
    return `http://api.nestoria.co.uk/api?${querystring}`;
}
export class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchString: 'london',
            isLoading: false,
            message: ''
        };
    }
    onSearchTextChanged(event) {
        console.log('onSearchTextChanged');
        this.setState({ searchString: event.nativeEvent.text });
        console.log(this.state.searchString);
    }
    onSearchPressed() {
        const query = urlForQueryAndPage('place_name', this.state.searchString, 1);
        this.executeQuery(query);
    }
    render() {
        const spinner = this.state.isLoading ? (React.createElement(ActivityIndicator, { size: "large" })) : (React.createElement(View, null));
        return (React.createElement(View, { style: styles.container },
            React.createElement(Text, { style: styles.description }, "Search for houses to buy!"),
            React.createElement(Text, { style: styles.description }, "Search by place-name, postcode or search near your location."),
            React.createElement(View, { style: styles.flowRight },
                React.createElement(TextInput, { style: styles.searchInput, value: this.state.searchString, onChange: this.onSearchTextChanged.bind(this), placeholder: "Search via name or postcode" }),
                React.createElement(TouchableHighlight, { style: styles.button, onPress: this.onSearchPressed.bind(this), underlayColor: "#99d9f4" },
                    React.createElement(Text, { style: styles.buttonText }, "Go"))),
            React.createElement(TouchableHighlight, { style: styles.button, underlayColor: "#99d9f4" },
                React.createElement(Text, { style: styles.buttonText }, "Location")),
            React.createElement(Image, { source: require('../resources/house.png'), style: styles.image }),
            React.createElement(Text, { style: styles.description }, this.state.message),
            spinner));
    }
    executeQuery(query) {
        console.log(query);
        this.setState({ isLoading: true });
        fetch(query)
            .then(response => response.json())
            .then(json => this.handleResponse(json.response))
            .catch(error => this.setState({
            isLoading: false,
            message: `Something bad happened ${error}`
        }));
    }
    handleResponse(response) {
        this.setState({ isLoading: false, message: '' });
        if (response.application_response_code.substr(0, 1) === '1') {
            console.log(`Properties found: ${response.listings.length}`);
        }
        else {
            this.setState({ message: 'Location not recognized; please try again.' });
        }
    }
}
//# sourceMappingURL=search-page.js.map