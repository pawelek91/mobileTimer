import * as React from 'react';
import { useState } from 'react';
import { View, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { MainTimer } from './Timer/MainTimer';
import TrainingTimer from './Training/TrainingTimer';

// const MainTimerRoute = () => MainTimer;
// const TrainingTimerRoute = () => TrainingTimer;

const MainComponent = () =>{
    const [menuRoute,setMenuRoute] = useState({
        index:0,
        routes:[
            {
                key : 'mainTimerRoute', title: 'BUDZIK'
            },
            {
                key: 'traingTimerRoute', title: 'TRENING'
            }

        ]
    })

    return(
        <TabView navigationState={menuRoute} renderScene={SceneMap({
            mainTimerRoute : MainTimer,
            traingTimerRoute: TrainingTimer
        })}
        onIndexChange={index=> setMenuRoute({...menuRoute,index})}
        initialLayout={{ width: Dimensions.get('window').width }}
        style={styles.container}
        />
    )
}

const styles = StyleSheet.create({
    container: {
      marginTop: StatusBar.currentHeight,
    },
    scene: {
      flex: 1,
    },
  });

export default MainComponent;