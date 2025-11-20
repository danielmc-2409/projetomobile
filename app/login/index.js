import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StatusBar,
    Modal,
    TouchableOpacity,
    Image,
    Alert,
} from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './style';
import { auth } from '../../firebaseConfig';
import { useRouter } from 'expo-router';

export default function Home() {
    const [modalVisible, setModalVisible] = useState(false);
    const router = useRouter();

    // Configuração do login com Google
    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: '167925150187-q0pi8tipbsvjd5m60cdu20br817k594u.apps.googleusercontent.com',
        webClientId: '167925150187-q0pi8tipbsvjd5m60cdu20br817k594u.apps.googleusercontent.com',
    });

    useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params;
            const credential = GoogleAuthProvider.credential(id_token);

            signInWithCredential(auth, credential)
                .then(async (result) => {
                    const user = result.user;
                    await AsyncStorage.setItem('@user', JSON.stringify(user));
                    setModalVisible(false);
                    router.replace('/nav/agenda');
                })
                .catch((error) => {
                    Alert.alert('Erro', 'Falha ao autenticar com o Google.');
                    console.error(error);
                });
        }
    }, [response]);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            <Text style={styles.logo}>Ortos</Text>
            <Text style={styles.subtitle}>Clínica Odontológica</Text>

            <TouchableOpacity
                style={styles.loginButton}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.loginButtonText}>Fazer Login</Text>
            </TouchableOpacity>

            <Modal
                visible={modalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Login</Text>
                        <Text style={styles.modalText}>Escolha uma forma de login:</Text>

                        <TouchableOpacity
                            style={styles.googleButton}
                            onPress={() => promptAsync()}
                            disabled={!request}
                        >
                            <Text style={styles.googleButtonText}>Continuar com Google</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                            style={styles.closeButton}
                        >
                            <Text style={styles.closeButtonText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
