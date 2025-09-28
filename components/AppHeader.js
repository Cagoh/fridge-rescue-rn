import { StyleSheet, Text, Image } from "react-native";

import { Colors } from "../styles/colors";

function AppHeader() {
  
  return (
    <>
    
        <Image
          source={require('../assets/fridge_rescue-icon.png')} // Adjust path based on your file structure
          style={styles.icon}
        />
        <Text style={styles.appHeader}>Turn Your Leftovers into Culinary Magic</Text>
    <Text style={styles.appBody}>Stop wasting food! Input what's in your fridge, and we'll suggest delicious recipes tailored just for you.</Text>
    
    </>


  );
   
}

const styles = StyleSheet.create({
  appHeader: {
    fontFamily: "Rubik_700Bold",
    color: Colors.PRIMARY,
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 20,
    textAlign: "center",
    marginTop: 16,
  },

    appBody: {
      fontFamily: "Rubik_700Bold",
      color: 'grey',
      fontSize: 16,
      fontWeight: 300,
      marginBottom: 20,
      textAlign: "center",
      marginTop: 16,
    },

  icon: {
    width: 128, // Adjust size as needed
    height: 128,
    marginRight: 8, // Space between icon and text
  },
});

export default AppHeader;
