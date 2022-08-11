import { StyleSheet, Text, Touchable, View } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-web';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import tw from "tailwind-react-native-classnames";

const NavFavorites = () => {

    const data = [{
        id: "123",
        icon: "home",
        location:"Home",
        destination:"code street , london, uk",
    },
    {
        id: "456",
        icon: "briefcase",
        location:"Work",
        destination:"London Eye, London,UK",  
    },
];
  return (
    <FlatList 
    data={data} keyExtractor={(item) => item.id}
    renderItem = {({item}) => (
        <TouchableOpacity style ={tw`flex-row items-centre p-5`}>
            <Icon
                style = {tw`mr-4 rounded-full bg-gray-300 p-3`}
                name = {icon}
                type = "ionicon"
                color = "white"
                size ={18}
            />
            <View>
                <Text>
                    style= {tw`font-semibold text-lg`}
                    (location)
                </Text>
                <Text>
                    style={tw`text-gray-500`}
                    (destination)
                </Text>
            </View>
        </TouchableOpacity>


  )}/>
  )
}

export default NavFavorites

const styles = StyleSheet.create({})