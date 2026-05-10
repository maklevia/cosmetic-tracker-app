import React, { useState } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { formatDate } from "@/utils/date";

interface DatePickerFieldProps {
  label: string;
  value: string; // Expected format: YYYY-MM-DD
  onChangeDate: (date: string) => void;
}

export const DatePickerField = ({ label, value, onChangeDate }: DatePickerFieldProps) => {
  const [show, setShow] = useState(false);

  // Parse string date to Date object, fallback to today
  const date = value ? new Date(value) : new Date();
  
  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    // For Android, selection happens in a dialog, 'set' means they picked and clicked OK
    if (Platform.OS === 'android') {
      setShow(false);
      if (event.type === 'set' && selectedDate) {
        const formattedDate = selectedDate.toISOString().split('T')[0];
        onChangeDate(formattedDate);
      }
    } else {
      // For iOS, just update the value while selection is happening
      if (selectedDate) {
        const formattedDate = selectedDate.toISOString().split('T')[0];
        onChangeDate(formattedDate);
      }
    }
  };

  const togglePicker = () => {
    if (!show && !value) {
      // If opening for the first time and no value exists, 
      // set it to today immediately so "Done" works without spinning
      const today = new Date().toISOString().split('T')[0];
      onChangeDate(today);
    }
    setShow(!show);
  };

  return (
    <View className="mt-6 px-6">
      <Text className="text-xs font-bold text-brand-pink-900/60 uppercase tracking-widest mb-2">
        {label}
      </Text>
      
      <TouchableOpacity 
        onPress={togglePicker}
        activeOpacity={0.7}
        className="bg-white border border-brand-pink-100 rounded-2xl px-4 py-4 flex-row items-center justify-between"
      >
        <Text className={`font-medium ${value ? 'text-brand-pink-900' : 'text-brand-pink-900/40'}`}>
          {formatDate(value) || "Select Date"}
        </Text>
      </TouchableOpacity>

      {show && (
        <View className={Platform.OS === 'ios' ? 'bg-brand-pink-100/20 rounded-2xl mt-2 p-2' : ''}>
          <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleDateChange}
            maximumDate={new Date()}
          />
          
          <TouchableOpacity 
            onPress={() => setShow(false)}
            className="bg-brand-pink-900 py-3 rounded-xl items-center mt-2 mx-4 mb-2"
          >
            <Text className="text-white font-bold">Done</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default DatePickerField;
