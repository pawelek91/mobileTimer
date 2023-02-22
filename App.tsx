import React from 'react';
import MainComponent from './components/MainComponent';
import { useKeepAwake } from 'expo-keep-awake';
export default function App() {
  useKeepAwake();
return(
  <MainComponent />
)
};
