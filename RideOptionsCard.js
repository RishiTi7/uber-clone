import { StyleSheet, Text, View ,Image} from 'react-native'
import React, { useState } from 'react'
import tw from "tailwind-react-native-classnames"
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { selectTravelTimeInformation } from '../slices/NavSlice'

const data =[{
    id:"uber-X-123",
    title:"uberX",
    multiplier:1,
    image:"https://links.papareact.com/3pn"
},
{
    id:"uber-XL-456",
    title:"uberXL",
    multiplier:1.2,
    image:"https://links.papareact.com/5w8"

},
{
    id:"uber-LUX-789",
    title:"uber-LUX",
    multiplier:1.75,
    image:"https://links.papareact.com/37pf"
}
];

const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
    const navigation =useNavigation();
    const [selected, setSelected] = useState(null);
    const travelTimeInformation =useSelector(selectTravelTimeInformation);

    
  return (
    <SAfeAreaView style={tw`bg-white flex-grow`}>
        <View>
            <TouchableOpacity
                onPress={() => navigation.navigate("NavigationCard")}
                style={tw`absolute top-3 left-5 z-50 p-3 rounded-full`}>
                <Icon  name="chevron-left" type="fontawesome"/>
            </TouchableOpacity>
            <Text style={tw`text-center py-5 text-xl`}>Select a ride -{travelTimeInformation?.distance.text}</Text>
        </View>

        <FlatList 
        data={data}
        keyExtractor={(item) =>item.id}
        renderItem={({item:{id,title,multiplier,image},item})=>(
            <TouchableOpacity style={tw`flex-row justify-between items-centre px-10 ${id ===selected?.id && "bg-gray-200"}`}>
                <Image
                    style = {{
                        width: 100,
                        height:100,
                        resizemode: "contain",
                    }}
                    source={{uri:image}}
                />
                <View style={tw`-ml-6`}>
                    <Text style={tw`text-xl font-semibold`}>
                        {title}                    
                    </Text>
                    <Text>{travelTimeInformation?.duration.text}travel time..</Text>
                    <Text style={tw`text-xl`}> 
                    {new Intl.NumberFormat('en-gb',{
                        style:'currency',
                        currency: 'GBP'
                    }) .format(
                        (travelTimeInformation?.duration.value *SURGE_CHARGE_RATE * multiplier) /100
                    )}
                    </Text>
                </View>
            </TouchableOpacity>
        )}/>

        <View>
            <TouchableOpacity disabled={!selected} style={tw`bg-black py-3 m-3`}>
                <Text style={tw`text-center text-white text-xl`}>choose ${selected?.title}</Text>
            </TouchableOpacity>
        </View>
    </SAfeAreaView>
  )
}

export default RideOptionsCard

const styles = StyleSheet.create({})