import React, { Component } from 'react';
import {
	Text,
	TouchableWithoutFeedback,
	View,
	LayoutAnimation
} from 'react-native';
import { connect } from 'react-redux';
import { CardSection, Card } from './common';
import * as actions from '../actions';

class ListItem extends Component {
	componentWillUpdate() {
		LayoutAnimation.spring();
	}

	renderDescription() {
		const { library, expanded } = this.props;

		if (expanded) {
			return (
				<CardSection>
					<Text style={{ flex: 1, paddingLeft: 5, paddingRight: 5 }}>
						{library.description}
					</Text>	
				</CardSection>
			);
		}
	}

	render() {
		const { titleStyle } = styles;
		const { title, id } = this.props.library;

		return (
			<TouchableWithoutFeedback
				onPress={() => this.props.selectLibrary(id)}
			>
				<View>
					<Card>
						<CardSection>
							<Text style={titleStyle}>
								{title}
							</Text>
						</CardSection>	
						{this.renderDescription()}				
					</Card>	
				</View>			
			</TouchableWithoutFeedback>
		);
	}
}

const styles = {
	titleStyle: {
		fontSize: 18,
		paddingLeft: 15
	}
};

const mapStateToProps = (state, ownProps) => {
	const expanded = state.selectedLibraryId === ownProps.library.id;

	return {
		expanded
	};
};

export default connect(mapStateToProps, actions)(ListItem);
