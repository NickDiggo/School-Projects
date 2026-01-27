// components/custom/CameraUI.tsx
import React, { useEffect, useRef, useState } from "react";
import { Linking, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { Camera, type PhotoFile, useCameraDevice, useCameraPermission } from "react-native-vision-camera";

type CameraUIProps = {
  showCamera: boolean;
  cameraType: "front" | "back";
  onClose: (photo?: PhotoFile) => void; // undefined = cancelled
};

const GOLD = "#FFD700";

export function CameraUI({ showCamera, cameraType, onClose }: CameraUIProps) {
  const { hasPermission, requestPermission } = useCameraPermission();
  const [haveRequested, setHaveRequested] = useState(false);

  const [activeCamera, setActiveCamera] = useState<"front" | "back">(cameraType);
  const device = useCameraDevice(activeCamera);
  const cameraRef = useRef<Camera>(null);


  useEffect(() => {
    if (showCamera && !hasPermission) {
      void requestPermission().then(() => setHaveRequested(true));
    }
  }, [showCamera, hasPermission, requestPermission]);

  // als user geweigerd heeft (en OS pop-up komt niet meer) => toon uitleg + settings
  if (showCamera && !hasPermission && haveRequested) {
    return (
      <Modal visible={showCamera} transparent animationType="fade" onRequestClose={() => onClose(undefined)}>
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.75)", justifyContent: "center", padding: 16 }}>
          <View style={{ backgroundColor: "#111", borderRadius: 18, padding: 16, borderWidth: 1, borderColor: "rgba(255,255,255,0.2)" }}>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "800", marginBottom: 10 }}>
              No permission to use camera
            </Text>

            <Text style={{ color: "rgba(255,255,255,0.75)", marginBottom: 14 }}>
              We hebben camera-rechten nodig om een foto te nemen. Zet dit aan in je instellingen.
            </Text>

            <View style={{ flexDirection: "row", gap: 10 }}>
              <Pressable style={{ flex: 1 }} onPress={() => onClose(undefined)}>
                <View style={{ padding: 12, borderRadius: 14, backgroundColor: "rgba(255,255,255,0.2)" }}>
                  <Text style={{ color: "white", fontWeight: "800", textAlign: "center" }}>Cancel</Text>
                </View>
              </Pressable>

              <Pressable style={{ flex: 1 }} onPress={() => void Linking.openSettings()}>
                <View style={{ padding: 12, borderRadius: 14, backgroundColor: GOLD }}>
                  <Text style={{ color: "#000", fontWeight: "900", textAlign: "center" }}>Grant</Text>
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  // als niet open of geen permission => render niets (les)
  if (!showCamera || !hasPermission) return null;
  if (!device) return null;

  const takePhoto = async () => {
    const photo = await cameraRef.current?.takePhoto();
    // les: path is filesystem path => maak URI via file://
    onClose(photo ? { ...photo, path: `file://${photo.path}` } : undefined);
  };

  return (
    <Modal visible={showCamera} animationType="slide" onRequestClose={() => onClose(undefined)}>
      <View style={{ flex: 1, backgroundColor: "black" }}>
        <Camera
          ref={cameraRef}
          device={device}
          isActive={showCamera}
          style={StyleSheet.absoluteFill}
          photo
        />

        {/* Close */}
        <Pressable
          onPress={() => onClose(undefined)}
          style={{ position: "absolute", top: 40, right: 16 }}
        >
          <View style={{ padding: 12, borderRadius: 999, backgroundColor: "rgba(0,0,0,0.5)" }}>
            <Text style={{ color: "white", fontWeight: "900" }}>✕</Text>
          </View>
        </Pressable>

        {/* Switch camera */}
        <Pressable
          onPress={() => setActiveCamera((c) => (c === "front" ? "back" : "front"))}
          style={{ position: "absolute", bottom: 34, right: 16 }}
        >
          <View style={{ padding: 12, borderRadius: 999, backgroundColor: "rgba(0,0,0,0.5)" }}>
            <Text style={{ color: "white", fontWeight: "900" }}>↺</Text>
          </View>
        </Pressable>

        {/* Shutter */}
        <Pressable
          onPress={() => void takePhoto()}
          style={{ position: "absolute", bottom: 50, alignSelf: "center" }}
        >
          <View
            style={{
              width: 84,
              height: 84,
              borderRadius: 999,
              borderWidth: 6,
              borderColor: "rgba(255,255,255,0.35)",
              backgroundColor: "rgba(255,255,255,0.20)",
            }}
          />
        </Pressable>
      </View>
    </Modal>
  );
}
