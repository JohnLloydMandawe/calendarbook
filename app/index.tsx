import { useEffect, useState } from "react";
import { supabase } from "../assets/supabase";
import { View, StyleSheet, ScrollView, Text, Pressable } from "react-native";
import { Calendar } from "react-native-calendars";
import ReservationModal from "./reservationModal";


export default function App() {


  type Reservation = {
    selected: boolean;
    selectedColor: string;
    marked?: boolean;
    dotColor?: string;
    name?: string;
    reason?: string;
  };

  type DBReservation = {
    date: string;
    name: string;
    reason: string;
  };

  const [selectedDate, setSelectedDate] = useState('');
  const [reservations, setReservations] = useState<Record<string, Reservation>>({});
  const [modalVisible, setModalVisible] = useState(false);

  const today = new Date().toISOString().split('T')[0];

 //Fetch sa reserve
  useEffect(() => {
    fetchReservations();
  }
    , []);
  const fetchReservations = async () => {
    const { data, error } = await supabase
      .from('reservations')
      .select('*');

    if (data) {
      const formatted: Record<string, Reservation> = {};
      (data as DBReservation[]).forEach(item => {
        formatted[item.date] = {
          selected: true,
          selectedColor: "#79C9C5",
          marked: true,
          dotColor: "red",
          name: item.name,
          reason: item.reason,
        };
      });
      setReservations(formatted);
    }
  };

// add sa reserve
  const addreservation = async (date: string, name: string, reason: string) => {
    if (!date) return;
    const { error } = await supabase.from('reservations').insert([
      { date, name, reason }
    ]);
    if (error) {
      console.log('Error adding reservation:', error);
    }

    setReservations(prev => ({
      ...prev,
      [date]: {
        selected: true,
        selectedColor: "#79C9C5",
        marked: true,
        dotColor: "red",
        name,
        reason,
      },
    }));

    setSelectedDate('');
  };

//delete sa reserve
  const deletereservation = async (date: string) => {

    await supabase.from('reservations').delete().eq('date', date);
    fetchReservations();
  };


  return (
    <View style={styles.container}>
      <Calendar style={styles.calendar}
        minDate={today}
        disableAllTouchEventsForInactiveDays={true}
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={reservations}
      />
      <ReservationModal
        visible={selectedDate !== ''}
        date={selectedDate}
        onClose={() => setSelectedDate('')}
        onAdd={addreservation}
        onDelete={deletereservation}
      />
      <ScrollView style={{ marginTop: 20 }}>
        {Object.entries(reservations).map(([date, reservation]) => (
          <View key={date} style={styles.shadowbox}>
            <View style={styles.reservationItem}>
              <Text style={styles.reservationText}>
                {date}: {reservation.name || "No Name"} - {reservation.reason || "No Reason"}</Text>

              <Pressable style={styles.deleteButton} onPress={() => deletereservation(date)}>
                <Text style={styles.deleteButtonText}>Delete</Text>
              </Pressable>

            </View>
          </View>

        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: '#FCB53B',
  },
  calendar: {
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 10,
    width: '95%',
    alignSelf: 'center',
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: '#F96E5B',
    padding: 5,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#000',
  },
  deleteButtonText: {
    color: '#000',
    fontWeight: '500',
    fontSize: 14,
  },
  shadowbox: {
    top: 1,
    left: 10,
    height: 48,
    backgroundColor: '#000000',
    borderRadius: 10,
    width: '90%',
    marginVertical: 2,
  },
  reservationItem: {
    backgroundColor: "#fff7f7",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 10,
    height: 40,
    marginLeft: 5,
    width: '100%',
  },
  reservationText: {
    fontSize: 16,
    fontWeight: "500",
  },
});