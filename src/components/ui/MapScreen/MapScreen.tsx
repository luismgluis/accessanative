// import React from "react";
// import { Animated, Dimensions, StyleSheet, View } from "react-native";
// // import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

// import Panel from "../Panel/Panel";
// import MapActions from "./MapActions";
// import { VisibleAnim } from "./../../../libs/anim/VisibleAnim";
// import { useTheme } from "../../hooks/useTheme";
// const w = Dimensions.get("window");
// const styles = StyleSheet.create({
//   container: {
//     width: w.width,
//     height: "100%",
//   },
//   mapPanel: {
//     width: w.width,
//     height: "100%",
//   },
//   map: {
//     height: "100%",
//     width: "100%",
//   },
//   bottomPanel: {
//     width: "100%",
//     position: "absolute",
//     height: 110,
//     bottom: 0,
//     zIndex: 9,
//   },
//   lateralPanel: {
//     height: "100%",
//     width: 25,
//     position: "absolute",
//     top: 0,
//     right: 0,
//     zIndex: 9,
//   },
// });
// const AnimatedMap = Animated.createAnimatedComponent(MapView);
// const CMapView = () => {
//   const initAnim = VisibleAnim(1500, 0);
//   const mapStyles = {
//     ...styles.map,
//     opacity: initAnim,
//   };
//   return (
//     <AnimatedMap
//       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
//       style={mapStyles}
//       region={{
//         latitude: 37.78825,
//         longitude: -122.4324,
//         latitudeDelta: 0.015,
//         longitudeDelta: 0.0121,
//       }}
//     />
//   );
// };

// const TAG = "MAP SCREEN";
// type MapScreenProps = {
//   pagerFocus?: boolean;
// };
// const MapScreen: React.FC<MapScreenProps> = ({ pagerFocus }) => {
//   const theme = useTheme();
//   const containerStyles = { ...styles.container };
//   const mapPanelStyles = {
//     ...styles.mapPanel,
//     backgroundColor: theme.colors["color-primary-500"],
//   };

//   return (
//     <View>
//       <View style={containerStyles}>
//         <Panel verticalCenter={true} horizontalCenter={true}>
//           <View style={styles.bottomPanel}>
//             <MapActions />
//           </View>
//           <View style={styles.lateralPanel} />
//           <View style={mapPanelStyles}>{pagerFocus && <CMapView />}</View>
//         </Panel>
//       </View>
//     </View>
//   );
//   /**<View style={styles.mapPanel}>
//         <MapView
//           provider={PROVIDER_GOOGLE} // remove if not using Google Maps
//           style={styles.map}
//           region={{
//             latitude: 37.78825,
//             longitude: -122.4324,
//             latitudeDelta: 0.015,
//             longitudeDelta: 0.0121,
//           }}
//         />
//       </View> */
// };
// export default MapScreen;
export const ss = "s";
