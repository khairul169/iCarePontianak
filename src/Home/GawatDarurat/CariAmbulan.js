import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, LayoutAnimation, Linking, BackHandler } from 'react-native';

// components
import MapView, { Marker } from 'react-native-maps';
import Button from '../../Components/Button';

// API
import * as API from '../../API';
import Authentication from '../../Login/Authentication';

export default class CariAmbulan extends React.Component {
	static navigationOptions = {
		title: 'Cari Ambulan'
	}

	constructor(props) {
		super(props);

		this.initialRegion = {
			latitude: -0.0257813,
			longitude: 109.3323449,
			latitudeDelta: 0.1,
			longitudeDelta: 0.05,
		};

		this.state = {
			mapMargin: 1,
			firstUpdate: true,
			currentCoordinate: {
				latitude: 0.0,
				longitude: 0.0
			},
			objectList: [],
			selectedObject: -1
		}
	}

	async componentDidMount() {
		this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
			if (this.state.selectedObject !== -1) {
				this.resetSelectedObject();
				return true;
			}
			return false;
		});
		
		// get ambulance list
		let result = await API.GawatDarurat.cariAmbulan(Authentication.getInstance().getUserToken());
		if (result) {
			result.map((value, index) => {
				result[index].distance = 0.0;
			});

			LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
			this.setState({objectList: result});
		}
	}

	componentWillUnmount() {
		this.backHandler.remove();
	}

	viewObject = (id) => {
		if (id < 0 || id >= this.state.objectList.length) {
			return;
		}

		this.gotoLocation(id);

		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		this.setState({selectedObject: id});
	}

	resetSelectedObject = () => {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		this.setState({selectedObject: -1});
	}

	gotoLocation = (id) => {
		this.mapView.animateCamera({
			center: {
				latitude: this.state.objectList[id].latitude,
				longitude: this.state.objectList[id].longitude
			}
		});
	}

	hubungiAmbulan = (nomor) => {
		Linking.openURL('tel:' + nomor);
	}

	render() {
		return (
			<View style={{flex: 1}}>
				<View style={{flex: 1, flexGrow: 1}}>
					<MapView style={{flex: 1}}
						showsUserLocation={true} followsUserLocation={true}
						initialRegion={this.initialRegion}

						ref={map => {this.mapView = map}}

						onMapReady={() => {
							// force update mapview
							this.setState({mapMargin: 0});
						}}

						onPress={this.resetSelectedObject}

						onUserLocationChange={(event) => {
							let coordinate = event.nativeEvent.coordinate;

							this.setState({
								currentCoordinate: {
									latitude: coordinate.latitude,
									longitude: coordinate.longitude
								}
							});

							if (this.state.firstUpdate) {
								this.mapView.animateToRegion({
									latitude: coordinate.latitude,
									longitude: coordinate.longitude,
									latitudeDelta: 0.01,
									longitudeDelta: 0.002
								});
								this.setState({firstUpdate: false});
							}

							let newObjectList = [].concat(this.state.objectList);

							// calculate object distance with user
							newObjectList.map((value, id) => {
								let geolib = require('geolib');
								let distance = geolib.getDistance({
									latitude: coordinate.latitude,
									longitude: coordinate.longitude
								}, {
									latitude: value.latitude,
									longitude: value.longitude
								});
								
								// set distance
								newObjectList[id].distance = distance;
							});

							// sort object by distance
							newObjectList.sort((a, b) => a.distance > b.distance);

							// set new object list state
							this.setState({objectList: newObjectList});
						}}
					>
						
					{
						//markers
						this.state.objectList.map((value, index) => (
							<Marker onPress={() => this.viewObject(index)}
								key={index}
								coordinate={{
									latitude: value.latitude,
									longitude: value.longitude
								}}
								title={value.name}
								description={value.address}
								image={require('../../../assets/pins/ambulance.png')}
							/>
						))
					}

					</MapView>
				</View>

				<View style={{backgroundColor: '#fff', borderTopColor: '#ddd', borderTopWidth: 1,
					maxHeight: this.state.selectedObject === -1 ? 180 : 280}}>
					<ScrollView style={this.state.selectedObject === -1 && {padding: 16}}>
					{
						this.state.selectedObject === -1 ? (
							<View style={this.state.objectList.length && {marginBottom: 16}}>
							{   // display object lists
								this.state.objectList.length ? this.state.objectList.map((value, id) => (
									<TouchableOpacity key={id} onPress={() => this.viewObject(id)}
										style={{marginBottom: 5, paddingBottom: 8, borderBottomColor: '#ddd', borderBottomWidth: 1}}>
										<View style={{flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between'}}>
											<Text style={{fontSize: 16, color: '#333', fontWeight: 'bold'}}>{value.name}</Text>
											<Text style={{fontSize: 14, color: '#525252', marginLeft: 20}}>{value.distance} meter</Text>
										</View>
										<Text style={{marginTop: 6}}>{value.address}</Text>
									</TouchableOpacity>
								)) : (
									<View>
										<Text>Ambulance tidak ditemukan.</Text>
									</View>
								)
							}
							</View>
						) : (
							<View>
								<View style={{padding: 16}}>
									<Text style={{fontWeight: 'bold', fontSize: 16, marginBottom: 4}}>{this.state.objectList[this.state.selectedObject].name}</Text>
									<Text>{this.state.objectList[this.state.selectedObject].address}</Text>
									<Text>{this.state.objectList[this.state.selectedObject].phone}</Text>

									{
										this.state.objectList[this.state.selectedObject].description && (
											<Text style={{marginTop: 10}}>
												{this.state.objectList[this.state.selectedObject].description}
											</Text>
										)
									}
								</View>
								
								<Button
									title="Hubungi Ambulan"
									style={{paddingVertical: 18, backgroundColor: '#5db733', borderWidth: 0}}
									textStyle={{color: '#fff', fontWeight: 'bold'}}
									centered={true}
									onPress={() => this.hubungiAmbulan(this.state.objectList[this.state.selectedObject].phone)}
								/>
							</View>
						)
					}
					</ScrollView>
				</View>
			</View>
		);
	}
}
