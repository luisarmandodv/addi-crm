import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  SectionList,
  TouchableOpacity,
} from 'react-native';
import { Avatar, Title, Caption, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useGetUsers } from '@hooks/useGetUsers';
import Modal from '@components/Modal';
import useClientsStore from '@stores/useClientsStore';
import useModal from '@stores/useModal';
import { colors } from '@theme/colors';
import { formStyles, typography } from '@theme/globalStyles';
import { UserData } from 'src/types';

export function HomeScreen() {
  const setIsModalVisible = useModal(
    (state: { setIsModalVisible: (value: boolean) => void }) =>
      state.setIsModalVisible
  );
  const { leads, prospects } = useClientsStore(({ leads, prospects }) => ({
    leads,
    prospects,
  }));
  const { data, isLoading } = useGetUsers();
  const { navigate }: any = useNavigation();

  const Loader = React.useMemo(() => {
    return (
      <ActivityIndicator
        testID="loader"
        hidesWhenStopped
        size="large"
        animating={isLoading}
        style={styles.activityIndicator}
      />
    );
  }, [isLoading]);

  const list = React.useMemo(() => {
    const sectionList = []
    
    if (leads && leads.length) {
      sectionList.push({
        title: 'Leads',
        data: leads as UserData[],
      })
    }

    if (prospects && prospects.length) {
      sectionList.push({
        title: 'Prospect',
        data: prospects as UserData[],
      });
    }

    return sectionList;
  }, [leads, prospects]);

  const List = React.useMemo(() => {
    return (
      <SectionList
        sections={list}
        keyExtractor={(item, index) => item.firstName + index.toString()}
        renderSectionHeader={({ section: { title } }) => (
          <Title style={styles.header}>{title}</Title>
        )}
        ListEmptyComponent={<View><Text>Empty</Text></View>}
        renderItem={({ item, section, index }) => {
          return (
            <TouchableOpacity
              testID={`button`}
              onPress={() => {
                navigate('UserDetails', { user: item, section: section.title });
              }}
            >
              <View style={styles.itemContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ marginHorizontal: 15 }}>
                    <Avatar.Image
                      style={{
                        height: 50,
                        width: 50,
                        borderRadius: 50 / 2,
                        alignSelf: 'center',
                      }}
                      source={{
                        uri: item.image,
                      }}
                      size={50}
                    />
                  </View>
                  <View>
                    <Title style={typography.paragraph}>
                      {item.firstName + ' ' + item.lastName}
                    </Title>
                    <Caption style={{ color: colors.gray }}>
                      {item.email}
                    </Caption>
                    {section.title === 'Leads' ? (
                      <Text style={{ color: colors.warning }}>In Progress</Text>
                    ) : (
                      <Text style={{ color: colors.green }}>Approved</Text>
                    )}
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    );
  }, [list]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {Loader}
      <Modal onLeftTextPress={() => setIsModalVisible(false)} />
      <ScrollView>{List}</ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.primary },
  activityIndicator: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  itemContainer: {
    backgroundColor: colors.brown,
    marginBottom: 10,
    padding: 10,
    margin: 8,
    borderRadius: 10,
  },
  header: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
