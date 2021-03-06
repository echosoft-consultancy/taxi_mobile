import React, {Component} from 'react';
import {
	StyleSheet,
	View
} from 'react-native';
import MapView from 'react-native-maps';

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
	},
	map: {
		...StyleSheet.absoluteFillObject,
	}
});

export class MapComponent extends Component {

	constructor(props) {
		super(props);

		this.state = {
			latitude: 0,
			longitude: 0,
			latitudeDelta: 0,
			longitudeDelta: 0,
			setLocation: props.setLocation
		};
		// get initial position otherwise start in middle of pacific
		navigator.geolocation.getCurrentPosition((pos) => {
			this.state.setLocation({
				latitude: pos.coords.latitude,
				longitude: pos.coords.longitude
			})
			this.setState({
				latitude: pos.coords.latitude,
				longitude: pos.coords.longitude,
				latitudeDelta: 0.005,
				longitudeDelta: 0.005,
			})
		});
	}

	onRegionChange() {
		// when movement detected update state
		navigator.geolocation.watchPosition(pos => {
			this.state.setLocation({
				latitude: pos.coords.latitude,
				longitude: pos.coords.longitude
			})
			this.setState({
				latitude: pos.coords.latitude,
				longitude: pos.coords.longitude
			});
		}, err => {
			console.log(err);
		}, {distanceFilter: 10, enableHighAccuracy: true, maximumAge: 5000});
	}

	render() {
		return (
			<View style={styles.container}>
				<MapView
					style={styles.map}
					region={{
						latitude: this.state.latitude,
						longitude: this.state.longitude,
						latitudeDelta: this.state.latitudeDelta,
						longitudeDelta: this.state.longitudeDelta
					}}
					onRegionChange={this.onRegionChange()}
				>
					<MapView.Marker coordinate={{
						latitude: this.state.latitude,
						longitude: this.state.longitude
					}}/>
				</MapView>
			</View>
		);
	}

}
