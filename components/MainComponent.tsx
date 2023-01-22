import * as React from 'react';
import { useState } from 'react';
import { View, StyleSheet, Dimensions, StatusBar, ImageBackground } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import SettingsComponent from './Settings/SettingsComponent';
import { MainTimer } from './Timer/MainTimer';
import TrainingTimer from './Training/TrainingTimer';

const MainComponent = () =>{
    const [menuRoute,setMenuRoute] = useState({
        index:0,
        routes:[
            {
                key : 'mainTimerRoute', title: 'Alarm'
            },
            {
                key: 'traingTimerRoute', title: 'Training'
            },
            {
              key:'settingsRoute', title:'Settings'
            }

        ]
    })
    const image = require('../assets/background.jpg');

    const renderTabBar = (props:any) => (
        <TabBar
              {...props}
              activeColor={'white'}
              inactiveColor={'black'}
              pressOpacity={50}
              indicatorStyle={styles.tabBarIndicator}
              style={styles.tabBar}
        />
      );
      
    return(
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <TabView navigationState={menuRoute}
        renderTabBar={renderTabBar}
         renderScene={SceneMap({
            mainTimerRoute : MainTimer,
            traingTimerRoute: TrainingTimer,
            settingsRoute: SettingsComponent,
        })}
        onIndexChange={index=> setMenuRoute({...menuRoute,index})}
        initialLayout={{ width: Dimensions.get('window').width }}
        style={styles.container}
        />
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
      marginTop: StatusBar.currentHeight,
      
    },
    image: {
        flex: 1,
        justifyContent: 'center',
      },
    scene: {
      flex: 1,
    },
    tabBar:{
        marginTop:25,
        backgroundColor:'red',
        borderBottomColor:'red',
        borderBottomWidth: 1,
        borderColor:'white',
        
    },
    tabBarIndicator:{
        backgroundColor:'black'
    }
  });

export default MainComponent;