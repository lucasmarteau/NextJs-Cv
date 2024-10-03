import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box } from '@react-three/drei';

export default function ThreeScene() {
    return (
        <Canvas style={{ height: '100vh', width: '100vw' }} camera={{ position: [2, 2, 5], fov: 75 }}>
            {/* Lumières */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <pointLight position={[-5, -5, -5]} intensity={0.5} />

            {/* Cube 3D */}
            <Box args={[1, 1, 1]} position={[0, 0, 0]}>
                <meshStandardMaterial attach="material" color="royalblue" />
            </Box>

            {/* Contrôles de la caméra */}
            <OrbitControls />
        </Canvas>
    );
}
