import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, FlatList, StatusBar, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomSheet from '@gorhom/bottom-sheet';

import Input from '@shipex/components/Input/Input';

import {colors} from '@shipex/constants';
import {AppText} from '@shipex/components/Text/AppText';
import Button from '@shipex/components/Buttons/Button';
import CheckBox from '@shipex/components/CheckBox/CheckBox';
import ShipmentList from './components/ShipmentList';
import Header from '@shipex/components/Header/Header';
import FilterModal from './components/FilterModal';
import {FilterIcon, ScanIcon, SearchIcon} from '@assets/svgs/Index';
import {HomeStyles} from './styles/home.styles';
import {useShipmentList} from '@shipex/hooks/useShipment';
import {RefreshControl} from 'react-native-gesture-handler';

export default function Home() {
  const [markAll, setMarkAll] = useState(false);
  const [name, setName] = useState('');
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const openBottomSheet = () => {
    bottomSheetRef.current?.snapToIndex(0);
  };
  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
  };
  const toggleMarkAll = () => {
    setMarkAll(prev => !prev);
  };
  const setFullName = async () => {
    const fullName = await AsyncStorage.getItem('full_name');
    if (fullName) {
      setName(fullName);
    }
  };
  const handleSearchTerm = (e: string) => {
    setSearchTerm(e);
  };
  useEffect(() => {
    setFullName();
  }, []);
  const {shipmentList, isLoading, refresh, refetching} =
    useShipmentList(searchTerm);

  return (
    <View className="flex-1 bg-white px-5">
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.white}
        translucent
      />
      <Header />
      <AppText className="text-lightGray">Hello,</AppText>
      <AppText className="my-2.5 text-black text-[35px] font-bold">
        {name}
      </AppText>
      <Input
        value={searchTerm}
        onChangeText={handleSearchTerm}
        icon={<SearchIcon color={colors.gray} />}
        placeholder="Search"
      />
      <View className="flex-row items-center justify-between my-5">
        <Button
          style={HomeStyles.button}
          onPress={openBottomSheet}
          backgroundColor={colors.inputBg}
          IconLeft={<FilterIcon color={colors.iconColor} />}
          className="w-[45%] h-11"
          fontColor={colors.iconColor}
          label="Filters"
        />
        <Button
          style={HomeStyles.button}
          IconLeft={<ScanIcon color={colors.white} />}
          className="w-[45%] h-11"
          label="Add Scan"
        />
      </View>

      <View className="flex-row items-center justify-between mb-2.5">
        <AppText className="text-[22px] font-bold text-black">
          Shipments
        </AppText>

        <View className="flex-row items-center gap-1.5">
          <CheckBox isChecked={markAll} onCheck={toggleMarkAll} />
          <AppText>Mark All</AppText>
        </View>
      </View>
      {isLoading && (
        <View
          testID="loading-indicator"
          className="h-[300px] w-full justify-center items-center">
          <ActivityIndicator color={colors.primary} />
        </View>
      )}

      <FlatList
        refreshControl={
          <RefreshControl refreshing={refetching} onRefresh={refresh} />
        }
        data={shipmentList ? shipmentList : []}
        renderItem={({item}) => <ShipmentList markAll={markAll} {...item} />}
        keyExtractor={(item, index) => index.toString()}
      />

      <FilterModal
        //@ts-ignore
        bottomSheetRef={bottomSheetRef}
        closeBottomSheet={closeBottomSheet}
      />
    </View>
  );
}
