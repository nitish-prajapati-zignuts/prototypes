import {
  CameraView,
  CameraType,
  useCameraPermissions,
  Camera,
} from 'expo-camera';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function Completed() {
  const [showCamera, setShowCamera] = useState(false);
  const [facing, setFacing] = useState<CameraType>('back');

  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.getCameraPermissionsAsync();
      console.log('Initial Permission Status:', status);
    })();
  }, []);

  const handleOpenCamera = async () => {
    if (!permission) return;

    if (permission.granted) {
      setShowCamera(true);
      return;
    }

    if (!permission.canAskAgain) {
      Alert.alert(
        'Camera Permission Required',
        'You have disabled camera access. Please enable it in Settings to use this feature.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: () => Linking.openSettings() },
        ],
      );
      return;
    }

    const response = await requestPermission();
    if (response.granted) {
      setShowCamera(true);
    }
  };

  const toggleCameraFacing = () => {
    setFacing((prev) => (prev === 'back' ? 'front' : 'back'));
  };

  if (!showCamera) {
    return (
      <View style={styles.centered}>
        <Pressable style={styles.openButton} onPress={handleOpenCamera}>
          <Text style={styles.openButtonText}>Open Camera</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing}>
        <Pressable
          style={styles.closeButton}
          onPress={() => setShowCamera(false)}
        >
          <Text style={styles.closeText}>✕</Text>
        </Pressable>

        <View style={styles.controls}>
          <Pressable style={styles.flipButton} onPress={toggleCameraFacing}>
            <Text style={styles.flipText}>Flip Camera</Text>
          </Pressable>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  camera: { flex: 1 },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  openButton: {
    backgroundColor: '#1e90ff',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
  },
  openButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  closeButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: { color: '#fff', fontSize: 22 },
  controls: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    alignItems: 'center',
  },
  flipButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
  },
  flipText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
