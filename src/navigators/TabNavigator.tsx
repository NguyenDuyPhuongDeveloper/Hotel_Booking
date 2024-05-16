import React, { ReactNode } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import SearchNavigator from './SearchNavigator';
import SavedNavigator from './SavedNavigator';
import BookingNavigator from './BookingNavigator';
import ProfileNavigator from './ProfileNavigator';
import { appColors } from '../constants/appColors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TextComponent } from '../components';

const TabNavigator = () =>
{
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator screenOptions={( { route } ) => ( {
            headerShown: false,
            tabBarStyle: {
                height: 60,
                justifyContent: 'center',
                alignItems: 'center',
            },
            tabBarIcon: ( { focused, color, size } ) =>
            {
                let icon: ReactNode;
                color = focused ? appColors.primary : appColors.gray;
                switch ( route.name )
                {
                    case 'Search':
                        icon = <AntDesign name="search1" size={size} color={focused ? appColors.primary : appColors.gray} />
                        break;
                    case 'Saved':
                        icon = <AntDesign name="hearto" size={size} color={focused ? appColors.primary : appColors.gray} />
                        break;
                    case 'Booking':
                        icon = <Feather name="briefcase" size={size} color={focused ? appColors.primary : appColors.gray} />
                        break;
                    case 'Profile':
                        icon = <Ionicons name="person-circle-sharp" size={size} color={focused ? appColors.primary : appColors.gray} />
                        break;
                }
                return icon;
            },
            tabBarLabelStyle: {
                fontSize: 12,
                marginBottom: 8

            },
        } )}>
            <Tab.Screen name="Search" component={SearchNavigator} />
            <Tab.Screen name="Booking" component={BookingNavigator} />
            <Tab.Screen name="Profile" component={ProfileNavigator} />
        </Tab.Navigator>
    )
}

export default TabNavigator