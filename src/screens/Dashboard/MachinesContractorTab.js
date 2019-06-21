import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, Platform, Dimensions, TextInput, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import ActionButton from 'react-native-action-button';
import { images } from '../../common/images';
import { p } from '../../common/normalize';
import { colors } from '../../common/colors';
import { MapView, Marker, Animated } from 'expo';
import Header from '../../components/Header4';
import { CUSTOM_STYLE, COORDINATES, CENTER, REGION, MARKERS_LATITUDE_DELTA, LONGITUDE, LATITUDE, PERCENT_SPECIAL_MARKERS, NUM_MARKERS, LOTES1, INTRO } from '../../common/config'
import XMarksTheSpot from '../Map/CustomOverlayXMarksTheSpot';

import Maquinarias from './MaquinariasTab/Maquinarias';
import Alarmas from './MaquinariasTab/alarmas';
import Statistics from './MaquinariasTab/statistics';
import { customStyles } from './customStyles'
import * as ICON from '../../components/Icons';
import text from '../../common/text';

const height = Math.round(Dimensions.get('window').height);

export default class MachinesContractorTab extends Component {

    constructor(props) {
        super(props)
        const markerInfo = [];
        for (let i = 1; i < NUM_MARKERS; i++) {
            markerInfo.push({
                latitude: (((Math.random() * 2) - 1) * MARKERS_LATITUDE_DELTA) + LATITUDE,
                longitude: (((Math.random() * 2) - 1) * MARKERS_LATITUDE_DELTA) + LONGITUDE,
                isSpecial: Math.random() < PERCENT_SPECIAL_MARKERS,
                id: i,
            });
        }
        this.state = {
            markerInfo,
            selectTab: 1
        }
    }

    render() {
        const { selectTab } = this.state;
        const markers = this.state.markerInfo.map((markerInfo) =>
            <MapView.Marker
                coordinate={markerInfo}
                key={markerInfo.id}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={images.marker} style={{ width: p(35), height: p(35) }} />
                    <Text style={{ fontSize: p(18), fontWeight: '700', color: colors.WHITE }}> Lote {markerInfo.id}</Text>
                </View>
            </MapView.Marker>
        );
        return (
            <ScrollView style={styles.container}>

                {
                    selectTab == 3 &&
                    <View style={styles.statistic}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <ICON.IconBack />
                            <ICON.IconDots />
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: p(30) }}>
                            <ICON.IconBigProfile right={p(22)}/>
                            <View>
                                <Text style={text.t_21_500_ff}>{'Contratista'}</Text>
                                <Text style={text.t_30_700_ff}>{'Ricardo Terzo'}</Text>
                                <View style={styles.horizontal}></View>
                                <Text style={text.t_21_500_ff}>{'AgriTerzo S.R.L'}</Text>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: p(22)}}>
                            <ICON.IconCallWhite bottom={p(8)}/>
                            <Text style={text.t_14_500_ff}>{'Llamar'}</Text>
                        </View>
                    </View>
                }

                {selectTab !== 3 &&
                    <MapView
                        ref={instance => this.map = instance}
                        style={styles.map}
                        showsUserLocation={true}
                        zoomEnabled={true}
                        initialRegion={REGION}
                        customMapStyle={CUSTOM_STYLE}
                        cacheEnabled={true}
                        zoomEnabled
                        scrollingEnabled
                        loadingIndicatorColor="#666666"
                        loadingBackgroundColor="#eeeeee"
                    >
                        <XMarksTheSpot coordinates={COORDINATES} center={CENTER} />
                        {markers}
                    </MapView>
                }
                {
                    selectTab !== 3 &&
                    <Header title={'Ricardo Terzo'} address={'AgriTerzo S.R.L'} />
                }
                {
                    selectTab !== 3 && <View style={customStyles.searchView}>
                        <Image source={images.blackSearch} style={customStyles.searchIcon} />
                        <TextInput
                            style={customStyles.textinput}
                            placeholder={'Buscar'}
                            onChangeText={(text) => this.setState({ text })}
                            value={this.state.text}
                        />
                    </View>
                }
                {
                    selectTab !== 3 &&
                    <View style={{ position: 'absolute', right: 15, top: p(172) }}>
                        <ICON.IconLocate1 bottom={p(4)} />
                        <ICON.IconRoundCall bottom={p(4)} />
                    </View>
                }
                {
                    selectTab !== 3 &&
                    <View style={styles.searchView}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder={selectTab == 1 ? 'Máquinas del contratista' : (selectTab == 2 ? 'Alarms del contratista' : '')}
                        />
                        <Image source={images.search_white} style={{ width: p(18), height: p(18), marginRight: p(20) }} />
                    </View>
                }
                <View style={styles.tab}>
                    <TouchableOpacity style={[styles.tabItem, { borderTopColor: selectTab == 1 ? colors.ORANGE : colors.GREY3, backgroundColor: selectTab == 1 ? colors.WHITE : colors.GREY3 }]} onPress={() => this.setState({ selectTab: 1 })}>
                        <Text style={{ color: colors.TEXT, fontSize: p(14) }}>MAQUINARIAS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.tabItem, { borderTopColor: selectTab == 2 ? colors.BLUE : colors.GREY3, backgroundColor: selectTab == 2 ? colors.WHITE : colors.GREY3 }]} onPress={() => this.setState({ selectTab: 2 })}>
                        <Text style={{ color: colors.TEXT, fontSize: p(14) }}>TAREAS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.tabItem, { borderTopColor: selectTab == 3 ? colors.GREEN2 : colors.GREY3, backgroundColor: selectTab == 3 ? colors.WHITE : colors.GREY3 }]} onPress={() => this.setState({ selectTab: 3 })}>
                        <Text style={{ color: colors.TEXT, fontSize: p(14) }}>ESTADÍSTICAS</Text>
                    </TouchableOpacity>
                </View>

                {selectTab == 1 && <Maquinarias />}
                {selectTab == 2 && <Alarmas />}
                {selectTab == 3 && <Statistics />}

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#F5FCFF'
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        height: p(300),
    },
    searchView: {
        backgroundColor: colors.GREY4,
        alignItems: 'center',
        flexDirection: 'row',
        height: p(55),
        marginTop: p(240)
    },
    searchInput: {
        flex: 1,
        marginHorizontal: p(26),
        paddingHorizontal: p(12),
        backgroundColor: colors.GREY5,
        borderRadius: p(12),
        fontSize: p(21),
        height: p(36),
        color: colors.GREY4,
        fontWeight: '700'
    },
    tab: {
        flexDirection: 'row',
        backgroundColor: colors.GREY3,
        height: p(60)
    },
    tabItem: {
        flex: 1,
        borderTopColor: colors.GREY3,
        borderTopWidth: p(8),
        backgroundColor: colors.GREY3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    statistic: {
        paddingTop: p(22),
        backgroundColor: colors.PURPLE2,
        height: p(280),
        paddingHorizontal: p(22)
    },
    horizontal: {
        width: p(210),
        height: p(2.5),
        backgroundColor: colors.WHITE,
        marginVertical: p(10)
    }
});