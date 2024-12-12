import React, { useState } from "react";
import { ActivityIndicator, Dimensions, Animated } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { WebView } from 'react-native-webview';
import Colors from '../../Constants/Colors';
import * as S from './styles';
import Header from "../../Components/Header";

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
                    
                    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
                    const renderer = new THREE.WebGLRenderer({ antialias: true });
                    renderer.setSize(window.innerWidth, window.innerHeight);
                    document.body.appendChild(renderer.domElement);

                    const controls = new THREE.OrbitControls(camera, renderer.domElement);
                    
                    // Luz ambiente
                    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
                    scene.add(ambientLight);

                    // Luz direcional
                    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
                    directionalLight.position.set(0, 10, 0);
                    scene.add(directionalLight);

                    // Converte base64 para blob URL
                    const binaryString = atob('${base64Data}');
                    const bytes = new Uint8Array(binaryString.length);
                    for (let i = 0; i < binaryString.length; i++) {
                        bytes[i] = binaryString.charCodeAt(i);
                    }
                    const blob = new Blob([bytes], { type: 'model/gltf-binary' });
                    const blobUrl = URL.createObjectURL(blob);

                    // Carrega o modelo
                    const loader = new THREE.GLTFLoader();
                    loader.load(blobUrl, function(gltf) {
                        const model = gltf.scene;
                        scene.add(model);
                        
                        // Ajusta a câmera
                        const box = new THREE.Box3().setFromObject(model);
                        const center = box.getCenter(new THREE.Vector3());
                        const size = box.getSize(new THREE.Vector3());
                        const maxDim = Math.max(size.x, size.y, size.z);
                        
                        // Posiciona a câmera em um ângulo mais adequado para visualização
                        camera.position.set(
                            center.x + maxDim * 1.5,
                            center.y + maxDim * 1.5,
                            center.z + maxDim * 1.5
                        );
                        camera.lookAt(center);
                        controls.target.copy(center);
                        
                        // Define limites para o zoom
                        controls.maxDistance = maxDim * 4;
                        controls.minDistance = maxDim * 0.5;
                        
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
            <S.Container>
                <S.LoadingContainer>
                    <ActivityIndicator size="large" color={Colors.primary} />
                    <S.LoadingText>Carregando visualização 3D...</S.LoadingText>
                </S.LoadingContainer>
            </S.Container>
        );
    }

    return (
        <S.Container>
            <Header backButton={true} />

            <S.ContainerBody>
                <Animated.View style={{
                    transform: [{
                        rotateY: rotationAnim.interpolate({
                            inputRange: [-1, 0, 1],
                            outputRange: ['-90deg', '0deg', '90deg']
                        })
                    }],
                    height: '70%'
                }}>
                    <S.ModelContainer>
                        <WebView
                            source={{ 
                                html: createModelHtml(rooms[currentRoom].file_data)
                            }}
                            style={{ flex: 1, width: '100%', height: '100%' }}
                            onLoad={onWebViewLoad}
                        />
                    </S.ModelContainer>
                </Animated.View>

                <S.RoomControlsContainer>
                    <S.RoomControlButton onPress={() => changeRoom('prev')}>
                        <S.RoomControlText>Anterior</S.RoomControlText>
                    </S.RoomControlButton>

                    <S.RoomControlButton onPress={() => changeRoom('next')}>
                        <S.RoomControlText>Próximo</S.RoomControlText>
                    </S.RoomControlButton>
                </S.RoomControlsContainer>

                <S.DimensionsContainer>
                    <S.DimensionItem>
                        <S.DimensionText>
                            Tipo: {rooms[currentRoom]?.room_type}
                        </S.DimensionText>
                    </S.DimensionItem>
                    <S.DimensionItem>
                        <S.DimensionText>
                            Arquivo: {rooms[currentRoom]?.file_name}
                        </S.DimensionText>
                    </S.DimensionItem>
                </S.DimensionsContainer>
            </S.ContainerBody>
        </S.Container>
    );
};

export default Plant3D;