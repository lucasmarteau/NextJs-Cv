import { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default function ThreeScene() {
    useEffect(() => {
        // Scène, caméra, et rendu
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        document.body.appendChild(renderer.domElement);

        // Lumière directionnelle avec ombres douces
        const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1.5);
        directionalLight1.position.set(10, 10, 10);
        scene.add(directionalLight1);

        // Lumière directionnelle avec ombres douces
        const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1.5);
        directionalLight2.position.set(-10, -10, 0);
        scene.add(directionalLight2);

        // Chargement du modèle 3D
        const loader = new GLTFLoader();
        loader.load('/model.glb', (gltf) => {
            const model = gltf.scene;
            model.position.set(0, 0, 0);  // Position initiale du modèle
            model.scale.set(1, 1, 1);     // Taille du modèle
            model.castShadow = true;
            scene.add(model);
        }, undefined, (error) => {
            console.error('Erreur de chargement du modèle 3D', error);
        });

        // Positionnement de la caméra
        camera.position.set(0, 0, 207);  // Place la caméra à une distance de 500 unités sur l'axe Z
        camera.lookAt(0, 0, 0); // Oriente la caméra vers l'origine, où se trouve le modèle (l'écran)

        // Animation de la scène
        const animate = function () {
            requestAnimationFrame(animate);

            renderer.render(scene, camera);
        };

        animate();

        // Nettoyage
        return () => {
            document.body.removeChild(renderer.domElement);
        };
    }, []);

    return null;
}
