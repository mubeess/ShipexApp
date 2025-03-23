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
  const isLoading = false;
  const shipmentList = [
    {
      adjusted_cod: 150.0,
      awb_date: '2023-10-01',
      barcode: '123456789',
      company: 'Global Logistics',
      currency: 'USD',
      consignee: 'John Doe',
      creation: '2023-09-30',
      destination_city: 'Los Angeles',
      destination_country: 'USA',
      destination_state: 'California',
      destination_zone: 'West Coast',
      docstatus: 1,
      modified: '2023-10-01',
      modified_by: 'admin',
      name: 'Shipment 1',
      origin_city: 'New York',
      origin_country: 'USA',
      origin_state: 'New York',
      origin_zone: 'East Coast',
      owner: 'Jane Smith',
      pieces: 5,
      posting_date: '2023-10-01',
      posting_time: '10:00 AM',
      sender: 'Global Logistics',
      sender_name: 'Jane Smith',
      shipping_service: 'Express',
      status: 'In Transit',
      total_weight: 25.5,
    },
    {
      adjusted_cod: 200.0,
      awb_date: '2023-10-02',
      barcode: '987654321',
      company: 'Euro Cargo',
      currency: 'EUR',
      consignee: 'Alice Johnson',
      creation: '2023-10-01',
      destination_city: 'Paris',
      destination_country: 'France',
      destination_state: 'Île-de-France',
      destination_zone: 'Central Europe',
      docstatus: 1,
      modified: '2023-10-02',
      modified_by: 'admin',
      name: 'Shipment 2',
      origin_city: 'Berlin',
      origin_country: 'Germany',
      origin_state: 'Berlin',
      origin_zone: 'Northern Europe',
      owner: 'Bob Brown',
      pieces: 3,
      posting_date: '2023-10-02',
      posting_time: '11:30 AM',
      sender: 'Euro Cargo',
      sender_name: 'Bob Brown',
      shipping_service: 'Standard',
      status: 'Delivered',
      total_weight: 15.0,
    },
    {
      adjusted_cod: 100.0,
      awb_date: '2023-10-03',
      barcode: '456789123',
      company: 'UK Shipping',
      currency: 'GBP',
      consignee: 'Charlie Davis',
      creation: '2023-10-02',
      destination_city: 'Manchester',
      destination_country: 'UK',
      destination_state: 'England',
      destination_zone: 'North West',
      docstatus: 1,
      modified: '2023-10-03',
      modified_by: 'admin',
      name: 'Shipment 3',
      origin_city: 'London',
      origin_country: 'UK',
      origin_state: 'England',
      origin_zone: 'South East',
      owner: 'Emma Wilson',
      pieces: 2,
      posting_date: '2023-10-03',
      posting_time: '09:15 AM',
      sender: 'UK Shipping',
      sender_name: 'Emma Wilson',
      shipping_service: 'Economy',
      status: 'Pending',
      total_weight: 10.0,
    },
    {
      adjusted_cod: 300.0,
      awb_date: '2023-10-04',
      barcode: '321654987',
      company: 'American Freight',
      currency: 'USD',
      consignee: 'David Lee',
      creation: '2023-10-03',
      destination_city: 'Miami',
      destination_country: 'USA',
      destination_state: 'Florida',
      destination_zone: 'South East',
      docstatus: 1,
      modified: '2023-10-04',
      modified_by: 'admin',
      name: 'Shipment 4',
      origin_city: 'Chicago',
      origin_country: 'USA',
      origin_state: 'Illinois',
      origin_zone: 'Midwest',
      owner: 'Olivia Green',
      pieces: 4,
      posting_date: '2023-10-04',
      posting_time: '02:45 PM',
      sender: 'American Freight',
      sender_name: 'Olivia Green',
      shipping_service: 'Express',
      status: 'In Transit',
      total_weight: 30.0,
    },
    {
      adjusted_cod: 250.0,
      awb_date: '2023-10-05',
      barcode: '654123987',
      company: 'Canadian Cargo',
      currency: 'CAD',
      consignee: 'Eva Martinez',
      creation: '2023-10-04',
      destination_city: 'Vancouver',
      destination_country: 'Canada',
      destination_state: 'British Columbia',
      destination_zone: 'West Coast',
      docstatus: 1,
      modified: '2023-10-05',
      modified_by: 'admin',
      name: 'Shipment 5',
      origin_city: 'Toronto',
      origin_country: 'Canada',
      origin_state: 'Ontario',
      origin_zone: 'East Coast',
      owner: 'Liam Brown',
      pieces: 6,
      posting_date: '2023-10-05',
      posting_time: '08:00 AM',
      sender: 'Canadian Cargo',
      sender_name: 'Liam Brown',
      shipping_service: 'Standard',
      status: 'Cancelled',
      total_weight: 40.0,
    },
  ];

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
        Mubarak Ibrahim
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
      {!isLoading && (
        <FlatList
          data={shipmentList ? shipmentList : []}
          renderItem={({item}) => <ShipmentList markAll={markAll} {...item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      )}

      <FilterModal
        //@ts-ignore
        bottomSheetRef={bottomSheetRef}
        closeBottomSheet={closeBottomSheet}
      />
    </View>
  );
}
