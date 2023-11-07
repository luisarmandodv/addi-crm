import React, { useState, useMemo, useCallback } from 'react';
import {
  Alert,
  Keyboard,
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
} from 'react-native';
import {
  setNotificationHandler,
  scheduleNotificationAsync,
} from 'expo-notifications';
import { Text } from 'react-native-elements';
import useModal from '@stores/useModal';
import useClientsStore from '@stores/useClientsStore';
import { UserData } from 'src/types';

type ModalComponentTypes = {
  onLeftTextPress?: () => void;
};

function Separator() {
  return (
    <View
      style={{
        marginLeft: 25,
        height: StyleSheet.hairlineWidth,
        width: '100%',
        backgroundColor: '#e1e8ee',
      }}
    />
  );
}

setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const ModalComponent = ({ onLeftTextPress }: ModalComponentTypes) => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const setLeads = useClientsStore((state) => state.setLeads);
  const { isModalVisible, setIsModalVisible } = useModal(
    ({ isModalVisible, setIsModalVisible }) => ({
      isModalVisible,
      setIsModalVisible,
    })
  );

  const onPress = useCallback(() => {
    if (!firstName || !lastName || !address || !phone || !email) {
      return Alert.alert('Rellena todos los campos');
    }
    const newLead = {
      id: new Date().getTime(),
      firstName,
      lastName,
      address: {
        city: address,
      },
      phone,
      email,
    } as UserData
    setLeads(newLead);
    Keyboard.dismiss();
    const schedulingOptions = {
      content: {
        title: `${firstName} added as new Lead`,
        body: ``,
        sound: true,
        color: 'blue',
      },
      trigger: {
        seconds: 1,
      },
    };

    scheduleNotificationAsync(schedulingOptions);
    setIsModalVisible(false);
  }, [firstName, lastName, address, phone, email]);

  const ModalHeader = useMemo(() => {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={[styles.cancelContainer, { alignSelf: 'flex-start' }]}
          onPress={onLeftTextPress}
        >
          <Text style={{ color: '#3c6382', fontWeight: 'bold' }}>Cancel</Text>
        </TouchableOpacity>
        <Text style={{ padding: 20, fontWeight: 'bold' }}>
          Add new prospect
        </Text>
        <TouchableOpacity style={styles.cancelContainer} onPress={onPress}>
          <Text style={{ color: '#3c6382', fontWeight: 'bold' }}>Save</Text>
        </TouchableOpacity>
      </View>
    );
  }, [onPress, onLeftTextPress]);

  return (
    <Modal
      animationType="slide"
      visible={isModalVisible}
      presentationStyle={'pageSheet'}
      transparent
    >
      <KeyboardAvoidingView
        keyboardVerticalOffset={-100}
        behavior={'height'}
        style={styles.modalContainer}
      >
        <View style={styles.container}>
          {ModalHeader}
          <View style={styles.subContainer}>
            <View
              style={{
                alignSelf: 'stretch',
                backgroundColor: 'white',
              }}
            >
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="First Name"
                  onChangeText={(text) => setFirstName(text)}
                  placeholderTextColor={'#C7C7CD'}
                />
              </View>
              <Separator />
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Last Name"
                  onChangeText={(text) => setLastName(text)}
                  placeholderTextColor={'#C7C7CD'}
                />
              </View>
              <Separator />
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Address"
                  onChangeText={(text) => setAddress(text)}
                  placeholderTextColor={'#C7C7CD'}
                />
              </View>
              <Separator />
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Phone number"
                  onChangeText={(text) => setPhone(text)}
                  placeholderTextColor={'#C7C7CD'}
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Email"
                  onChangeText={(text) => setEmail(text)}
                  placeholderTextColor={'#C7C7CD'}
                />
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: { flex: 1 },
  container: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
    backgroundColor: '#F3F3F3',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowOpacity: 0.1,
    shadowRadius: 1,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
  },
  cancelContainer: {
    borderRadius: 20,
    padding: 20,
    elevation: 2,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
  subContainer: {
    paddingTop: 20,
    flex: 1,
    alignSelf: 'stretch',
  },
});

export default ModalComponent;

