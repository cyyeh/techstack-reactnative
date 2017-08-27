import React, { Component } from 'react';
import {
	View
} from 'react-native';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import { Header, Button, Spinner, CardSection } from './components/common';
import LibraryList from './components/LibraryList';
import LoginForm from './components/LoginForm';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loggedIn: null
		};
	}

	componentWillMount() {
		firebase.initializeApp({
			apiKey: 'AIzaSyDwR1kvnJ7L8I9J3dCIDRRjxjud4Wr8Zbw',
			authDomain: 'authentication-679f2.firebaseapp.com',
			databaseURL: 'https://authentication-679f2.firebaseio.com',
			projectId: 'authentication-679f2',
			storageBucket: 'authentication-679f2.appspot.com',
			messagingSenderId: '765037324628'
		});

		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.setState({ loggedIn: true });
			} else {
				this.setState({ loggedIn: false });
			}
		});
	}

	renderContent() {
		switch (this.state.loggedIn) {
			case true: 
				return (
					<Provider store={createStore(reducers)}>
						<View>
							<Header headerText={'Tech Stack'} />
							<CardSection>
								<Button 
									onPress={() => firebase.auth().signOut()}
								>
									Log out
								</Button>		
							</CardSection>	
							<LibraryList />		
						</View>
					</Provider>
				);
			case false:
				return (
					<View>
						<Header headerText={'Tech Stack'} />
						<LoginForm />
					</View>
				);
			default:
				return (
					<View style={styles.containerStyle}>
						<Spinner size={'large'} />						
					</View>
				);
		}
	}

	render() {
		return (
			<View style={{ flex: 1 }}>
				{this.renderContent()}
			</View>
		);
	}
}

const styles = {
	containerStyle: {
		paddingTop: 50,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
};

export default App;
