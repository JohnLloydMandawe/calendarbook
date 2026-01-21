import React, { JSX } from "react";
import { useState } from "react";
import { View, Text, Button, Modal, StyleSheet, TouchableOpacity, TextInput, Pressable, Platform } from "react-native";

type ReservationModalProps = {
  visible: boolean;
  date: string;
  onClose: () => void;
  onAdd: (date: string, name: string, reason: string) => void;
  onDelete: (date: string) => void;
};

export default function ReservationModal({
  visible,
  date,
  onClose,
  onAdd,
}: ReservationModalProps): JSX.Element {
  const [name, setname] = useState("");
  const [reason, setreason] = useState("");

  const handelAdd = () => {
    if (!name.trim()) return;
    if (!reason.trim()) return;
    onAdd(date, name, reason);
    setname('');
    setreason('');
  };


  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => onClose()}>

      <View style={styles.modalBackground}>
        <View style={styles.modalblackbox} />
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Reservation for {date}</Text>
          <View style={styles.inputContainer}>
            <View style={{
              position: 'absolute',
              top: -4,
              left: 25,
              width: 200,
              height: 55,
              backgroundColor: '#000',
              borderRadius: 10,
            }} />
            <TextInput
              style={styles.input}
              placeholder="Enter name"
              value={name}
              onChangeText={setname}
            />
          </View>
          <View style={styles.inputreason}>
            <View style={{
              position: 'absolute',
              top: -4,
              left: 25,
              width: 200,
              height: 55,
              backgroundColor: '#000',
              borderRadius: 10,
            }} />
            <TextInput
              style={styles.input}
              placeholder="Enter reason"
              value={reason}
              onChangeText={setreason}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Pressable style={styles.neuButton} onPress={handelAdd} >
              <Text style={styles.text}>Book</Text>
            </Pressable>


            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgb(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Platform.OS === 'android' ? 20 : 0,
  },
  modalblackbox: {
    marginTop: -300,
    top: 290,
    left: 10,
    width: 305,
    height: 290,
    backgroundColor: '#000',
    borderRadius: 10,
  },
  modalContainer: {
    width: 300,
    backgroundColor: '#FFE2AF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#000',
    color: '#000',
    fontWeight: '700',
    fontSize: 16,
    paddingHorizontal: 15,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 500,
  },
  closeButton: {
    backgroundColor: '#ED3F27',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#000",
  },
  buttonContainer: {
    //flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'row',
    alignItems: "center",
    paddingTop: 40,
  },
  neuButton: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#0BA6DF",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#000",
  },

  text: {
    fontWeight: "600",
  },

  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    width: 200,
    height: 50,
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: '#000',
    color: '#000',
    fontWeight: '700',
    fontSize: 16,
    borderRadius: 10,
  },
  inputContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
    padding: 20,
  },
  inputreason: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
    padding: 20,
  },
});