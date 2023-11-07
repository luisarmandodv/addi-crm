import React, { useState } from 'react';
import {
  Alert,
  View,
  Text,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@theme/colors';
import { formStyles, typography } from '@theme/globalStyles';
import Logo from '@assets/icon.png';
import { useLogin } from '@hooks/useLogin';

interface AuthInputProps {
  iconName: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
}

interface LoginButtonProps {
  onPress: () => void;
  isLoading: boolean;
}

function Header() {
  return (
    <View style={styles.headerContainer}>
      <Image style={styles.headerImage} source={Logo} resizeMode="contain" />
      <Text style={styles.titleText}>Hello World</Text>
    </View>
  );
}

function AuthInput({ iconName, placeholder, value, onChangeText, secureTextEntry = false }: AuthInputProps) {
  return (
    <View style={formStyles.compactInputWrapper}>
      <FontAwesome name={iconName} size={24} color={colors.primaryBlack} style={styles.inputIcon} />
      <TextInput
        style={formStyles.compactInput}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        value={value}
      />
    </View>
  );
}

function LoginButton({ onPress, isLoading }: LoginButtonProps) {
  return (
    <TouchableOpacity style={styles.loginButton} onPress={onPress}>
      <Text style={styles.loginButtonText}>
        {isLoading ? <ActivityIndicator color={'#ffffff'} /> : 'Login'}
      </Text>
    </TouchableOpacity>
  );
}

export function LoginScreen() {
  const [email, onChangeEmail] = useState<string>('kminchelle');
  const [password, onChangePassword] = useState<string>('0lelplR');
  const { mutate, isLoading } = useLogin();

  function handleLogin() {
    if (!email || !password) {
      return Alert.alert('Rellena todos los campos');
    }
    mutate({ email, password });
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <LinearGradient
        colors={[colors.primary, colors.tertiary]}
        start={[0.0, 0.5]}
        end={[1.0, 0.5]}
        locations={[0.0, 1.0]}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <Header />
          <AuthInput iconName="user" placeholder="E-mail" value={email} onChangeText={onChangeEmail} />
          <AuthInput iconName="lock" placeholder="Password" value={password} onChangeText={onChangePassword} secureTextEntry={true} />
          <LoginButton onPress={handleLogin} isLoading={isLoading} />
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginVertical: 32,
    paddingHorizontal: 40,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  headerImage: {
    width: 90,
    height: 60,
  },
  titleText: {
    ...typography.titleClean,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  inputIcon: {
    marginRight: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    backgroundColor: 'white'
  },
  loginButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    backgroundColor: 'white',
    borderRadius: 24,
    marginTop: 40,
  },
  loginButtonText: {
    color: colors.primary,
    fontWeight: '700',
  },
});
