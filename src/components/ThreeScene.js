import { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default function ThreeScene() {
    useEffect(() => {
        // Initialisation de la scène, de la caméra et du rendu
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });

        // Configuration du renderer
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        document.body.appendChild(renderer.domElement);

        // Ajout de lumières
        const colors = [0xFFFFFF, 0xFFFFFF]; // Couleurs des lumières
        const positions = [
            [10, 10, 10],
            [-10, -10, -10],
        ];

        colors.forEach((color, index) => {
            const light = new THREE.DirectionalLight(color, 2.5);
            light.position.set(...positions[index]);
            scene.add(light);
        });

        // Chargement du modèle 3D
        const loader = new GLTFLoader();
        loader.load('/model.glb', (gltf) => {
            const model = gltf.scene;
            model.position.set(0, 0, 0);
            model.scale.set(1, 1, 1);
            model.castShadow = true;
            scene.add(model);
        }, undefined, (error) => {
            console.error('Erreur de chargement du modèle 3D', error);
        });

        // Positionnement de la caméra
        camera.position.set(0, 50, 90);
        camera.lookAt(0, 50, 0);

        // Animation de la scène
        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        animate();

        // Nettoyage
        return () => {
            document.body.removeChild(renderer.domElement);
            renderer.dispose(); // Libère les ressources du renderer
        };
    }, []);

    return null;
}
