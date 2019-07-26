module.exports = {
  preset: "react-native",
  transformIgnorePatterns: [
    "/node_modules/(?!react-native|@react-native-community|react-navigation|@react-navigation|rn-sliding-up-panel)"
  ],
  setupFiles: ["./node_modules/react-native-gesture-handler/jestSetup.js"]
};
