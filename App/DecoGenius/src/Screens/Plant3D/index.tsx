import React, { useState } from "react";
import { ActivityIndicator, Dimensions, Animated } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { WebView } from 'react-native-webview';
import Colors from '../../Constants/Colors';
import Header from "../../Components/Header";
import { Container, ContainerBody, LoadingContain, ModelContainerer, LoadingText, ModelContainer, RoomControlsContainer, RoomControlButton, DimensionText, DimensionItem, DimensionsContainer, RoomControlText, LoadingContainer } from "./styles";

interface RoomDimensions {
    width_left: number;
    height_left: number;
    width_right: number;
    height_right: number;
    width_bottom: number;
    height_bottom: number;
    width_top: number;
    height_top: number;
}

interface Room {
    code: string;
    file_data: string;
    file_name: string;
    room_type: string;
    dimensions: RoomDimensions;
}

interface RouteParams {
    rooms: Room[];
}

const Plant3D: React.FC = (): JSX.Element => {
    const [isLoading, setIsLoading] = useState(false);
    const [currentRoom, setCurrentRoom] = useState<number>(0);
    const rotationAnim = new Animated.Value(0);
    const route = useRoute<RouteProp<Record<string, RouteParams>, string>>();
    const { rooms } = route.params;

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const onWebViewLoad = () => {
        setIsLoading(false);
    };

    const changeRoom = (direction: 'next' | 'prev') => {
        const newRoom = direction === 'next' 
            ? (currentRoom + 1) % rooms.length 
            : currentRoom > 0 ? currentRoom - 1 : rooms.length - 1;
        
        Animated.sequence([
            Animated.timing(rotationAnim, {
                toValue: direction === 'next' ? 1 : -1,
                duration: 300,
                useNativeDriver: true
            }),
            Animated.timing(rotationAnim, {
                toValue: 0,
                duration: 0,
                useNativeDriver: true
            })
        ]).start(() => {
            setCurrentRoom(newRoom);
        });
    };

    const createModelHtml = (base64Data: string): string => {
        return `
            <!DOCTYPE html>
            <html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
                <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js"></script>
                <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>
                <style>
                    body { margin: 0; }
                    canvas { width: 100%; height: 100%; }
                </style>
            </head>
            <body>
                <script>
                    const scene = new THREE.Scene();
                    scene.background = new THREE.Color(0xf0f0f0);
                    
                    const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000000);
                    const renderer = new THREE.WebGLRenderer({ 
                        antialias: true,
                        preserveDrawingBuffer: true
                    });
                    renderer.setSize(window.innerWidth, window.innerHeight);
                    document.body.appendChild(renderer.domElement);

                    const controls = new THREE.OrbitControls(camera, renderer.domElement);
                    controls.enableDamping = true;
                    controls.dampingFactor = 0.05;
                    
                    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
                    scene.add(ambientLight);
                    
                    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
                    directionalLight.position.set(1, 1, 1);
                    scene.add(directionalLight);
                    
                    const backLight = new THREE.DirectionalLight(0xffffff, 0.3);
                    backLight.position.set(-1, 1, -1);
                    scene.add(backLight);

                    const binaryString = atob('${base64Data}');
                    const bytes = new Uint8Array(binaryString.length);
                    for (let i = 0; i < binaryString.length; i++) {
                        bytes[i] = binaryString.charCodeAt(i);
                    }
                    const blob = new Blob([bytes], { type: 'model/gltf-binary' });
                    const blobUrl = URL.createObjectURL(blob);

                    const loader = new THREE.GLTFLoader();
                    loader.load(blobUrl, function(gltf) {
                        const model = gltf.scene;
                        
                        model.traverse((child) => {
                            if (child.isMesh) {
                                child.material.side = THREE.DoubleSide;
                                child.material.needsUpdate = true;
                                child.material.vertexColors = true;
                            }
                        });
                        
                        scene.add(model);
                        
                        const box = new THREE.Box3().setFromObject(model);
                        const center = box.getCenter(new THREE.Vector3());
                        const size = box.getSize(new THREE.Vector3());
                        const maxDim = Math.max(size.x, size.y, size.z);
                        
                        camera.position.set(
                            center.x + maxDim * 2,
                            center.y + maxDim * 3,
                            center.z + maxDim * 6
                        );
                        camera.lookAt(center);
                        controls.target.copy(center);
                        
                        controls.maxDistance = maxDim * 20;
                        controls.minDistance = maxDim * 1;
                        
                        controls.maxPolarAngle = Math.PI / 1.5;
                        controls.minPolarAngle = 0;
                        
                        controls.update();
                    });

                    function animate() {
                        requestAnimationFrame(animate);
                        controls.update();
                        renderer.render(scene, camera);
                    }
                    animate();

                    window.addEventListener('resize', onWindowResize, false);
                    function onWindowResize() {
                        camera.aspect = window.innerWidth / window.innerHeight;
                        camera.updateProjectionMatrix();
                        renderer.setSize(window.innerWidth, window.innerHeight);
                    }
                </script>
            </body>
            </html>
        `;
    };

    if (isLoading) {
        return (
            <Container>
                <LoadingContainer>
                    <ActivityIndicator size="large" color={Colors.primary} />
                    <LoadingText>Carregando visualização 3D...</LoadingText>
                </LoadingContainer>
            </Container>
        );
    }

    return (
        <Container>
            <Header backButton={true} />

            <ContainerBody>
                <Animated.View style={{
                    transform: [{
                        rotateY: rotationAnim.interpolate({
                            inputRange: [-1, 0, 1],
                            outputRange: ['-90deg', '0deg', '90deg']
                        })
                    }],
                    height: '70%'
                }}>
                    <ModelContainer>
                        <WebView
                            source={{ 
                                html: createModelHtml(rooms[currentRoom].file_data)
                            }}
                            style={{ flex: 1, width: '100%', height: '100%' }}
                            onLoad={onWebViewLoad}
                        />
                    </ModelContainer>
                </Animated.View>

                <RoomControlsContainer>
                    <RoomControlButton onPress={() => changeRoom('prev')}>
                        <RoomControlText>Anterior</RoomControlText>
                    </RoomControlButton>

                    <RoomControlButton onPress={() => {}}>
                    <RoomControlText>Code: {rooms[currentRoom].code}</RoomControlText>
                    </RoomControlButton>

                    <RoomControlButton onPress={() => changeRoom('next')}>
                        <RoomControlText>Próximo</RoomControlText>
                    </RoomControlButton>
                </RoomControlsContainer>

                <DimensionsContainer>
                    <DimensionItem>
                        <DimensionText>
                            Tipo: {rooms[currentRoom]?.room_type}
                        </DimensionText>
                    </DimensionItem>
                    <DimensionItem>
                        <DimensionText>
                            Arquivo: {rooms[currentRoom]?.file_name}
                        </DimensionText>
                    </DimensionItem>
                </DimensionsContainer>
            </ContainerBody>
        </Container>
    );
};

export default Plant3D;