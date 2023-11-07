import React, { useCallback, useMemo } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Avatar, Title, Caption, Text, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@theme/colors';
import { useGetNRI } from '@hooks/useGetNRI';
import { useJudicialRecords } from '@hooks/useJudicialRecords';
import { useProspectQualification } from '@hooks/useProspectQualification';
import { AuthNavigatorRoutesprops } from '@routes/DashboardRoutes';
import useClientsStore from '@stores/useClientsStore';
import {
  setNotificationHandler,
  scheduleNotificationAsync,
} from 'expo-notifications';
import { UserData } from 'src/types';

interface ProfileProps {
  user: UserData;
  section: string;
}

type Props = NativeStackScreenProps<AuthNavigatorRoutesprops>;

setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function UserInfo({ user }: { user: UserData }) {
  return (
    <View style={[styles.userInfoSection, styles.userInfoContainer]}>
      <View style={styles.userInfoRow}>
        <Avatar.Image source={{ uri: user.image }} size={80} />
        <View style={styles.userInfoText}>
          <Title
            style={[styles.title, styles.userInfoTitle]}
          >{`${user.firstName} ${user.lastName}`}</Title>
          <Caption style={styles.caption}>{user.username}</Caption>
        </View>
      </View>
      <View style={[styles.userInfoSection, styles.userInfoDetails]}>
        <View style={styles.row}>
          <Icon name="map-marker-radius" color="#777777" size={20} />
          <Text style={styles.loadingText}>{user.address.city}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="phone" color="#777777" size={20} />
          <Text style={styles.loadingText}>{user.phone}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" color="#777777" size={20} />
          <Text style={styles.loadingText}>{user.email}</Text>
        </View>
      </View>
    </View>
  );
}

function InfoBox({
  title,
  isLoading,
  data,
  isLeadsUser,
}: {
  title: string;
  isLoading: boolean;
  data: any;
  isLeadsUser: boolean;
}) {
  const Result = useMemo(() => {
    if (isLoading) {
      return (
        <ActivityIndicator
          testID={`${title}-loader`}
          hidesWhenStopped
          size="small"
          animating={true}
        />
      );
    }
    if (data?.data?.meetsRequirements || !isLeadsUser) {
      return <Icon name="check" color={colors.green} size={40} />;
    }
    return <Icon name="close" color={colors.danger} size={40} />;
  }, [isLoading, data, isLeadsUser]);

  return (
    <View style={styles.infoBox}>
      <Caption style={styles.infoBoxText}>{title}</Caption>
      {Result}
    </View>
  );
}

function InternalQualification({ user }: { user: UserData }) {
  const qualification = useProspectQualification();
  const percentage =
    user.qualification ||
    qualification.data?.qualification as number
  const isPropspect = Boolean(percentage > 60);
  const color = isPropspect ? colors.green : colors.danger;
  const setProspects = useClientsStore((state) => state.setProspects);
  const navigation = useNavigation();
  const result = useMemo(() => {
    if (qualification.isFetching || qualification.isLoading) {
      return (
        <ActivityIndicator
          testID={`internal-qualification-loader`}
          hidesWhenStopped
          size="small"
          animating={true}
        />
      );
    }
    return (
      <Text
        testID="internal-qualification-text"
        style={[styles.internalQualificationText, { color }]}
      >
        {percentage}/100
      </Text>
    );
  }, [qualification, color, percentage]);

  const onPress = useCallback(() => {
    const schedulingOptions = {
      content: {
        title: 'New Prospect Added',
        body: ``,
        sound: true,
        color: 'blue',
      },
      trigger: {
        seconds: 1,
      },
    };

    scheduleNotificationAsync(schedulingOptions);

    setProspects({ ...user, qualification: percentage });
    navigation.goBack();
  }, [user, percentage]);

  return (
    <>
      <View style={styles.leadsContainer}>
        <Title
          testID="internal-qualification-title"
          style={[styles.title, styles.userInfoTitle]}
        >
          Internal Qualification
        </Title>
        {result}
      </View>
      {!user.qualification && <Button
        mode="contained"
        disabled={!isPropspect}
        onPress={onPress}
        style={{ marginTop: 50, marginHorizontal: 30 }}
      >
        Add new prospect
      </Button>}
    </>
  );
}

export function UserDetails({ route }: Props) {
  const { user, section } = route.params as ProfileProps;
  const isLeadsUser = Boolean(section === 'Leads');
  const NRI = useGetNRI(isLeadsUser);
  const juficialRecords = useJudicialRecords(isLeadsUser);

  const renderInternalQualification = useMemo(() => {
    if (NRI.isFetching && juficialRecords.isFetching) return;
    if (
      !isLeadsUser ||
      (NRI.data?.meetsRequirements && juficialRecords.data?.meetsRequirements)
    ) {
      return <InternalQualification user={user} />;
    }
  }, [NRI, juficialRecords, user, isLeadsUser]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <UserInfo user={user} />
        <View style={styles.infoBoxWrapper}>
          <InfoBox
            title="National Registry Identification"
            isLoading={NRI.isLoading || NRI.isFetching}
            data={NRI}
            isLeadsUser={isLeadsUser}
          />
          <InfoBox
            title="Judicial Records"
            isLoading={juficialRecords.isLoading || juficialRecords.isFetching}
            data={juficialRecords}
            isLeadsUser={isLeadsUser}
          />
        </View>
        {renderInternalQualification}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  infoBoxWrapper: {
    margin: 10,
    padding: 10,
    backgroundColor: colors.brown,
    borderRadius: 10,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoBoxText: {
    marginBottom: 10,
  },
  loadingText: {
    color: '#777777',
  },
  internalQualificationText: {
    fontSize: 25,
    alignSelf: 'center',
    marginTop: 10,
  },
  userInfoContainer: {
    backgroundColor: colors.brown,
    marginBottom: 10,
    padding: 10,
    margin: 8,
    borderRadius: 10,
  },
  leadsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.brown,
  },
  userInfoRow: { flexDirection: 'row', marginLeft: 7 },
  userInfoText: { marginLeft: 20 },
  userInfoTitle: { marginTop: 15, marginBottom: 5 },
  userInfoDetails: { marginTop: '10%', marginLeft: '-10%' },
});
