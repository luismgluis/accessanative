import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    paddingTop: 2,
    paddingBottom: 2,
    paddingHorizontal: 5,
    width: "100%",
  },
  panelBorder: {
    //width: "80%",
    paddingVertical: 6,
    backgroundColor: "blue",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  mePanelBorder: {
    borderTopStartRadius: 12,
    borderTopEndRadius: 0,
    alignSelf: "flex-end",
  },
  otherPanelborder: {
    alignSelf: "flex-start",
    borderTopStartRadius: 0,
    borderTopEndRadius: 12,
  },
  panelImage: { overflow: "hidden" },
  image: {},
  textStyles: {
    fontSize: 16,
    color: "black",
    paddingHorizontal: 15,
  },
  titleStyles: {
    fontWeight: "700",
    paddingHorizontal: 15,
  },
  avatarStyles: {
    width: 50,
    height: 50,
  },
});
