import { useEffect } from 'react';
import * as THREE from 'three';

export default function ThreeScene() {
    useEffect(() => {
        // Scène, caméra, et rendu
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        document.body.appendChild(renderer.domElement);

        // Lumière ambiante douce
        const ambientLight = new THREE.AmbientLight(0x404040, 1.2);
        scene.add(ambientLight);

        // Lumière directionnelle avec ombres douces
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
        directionalLight.position.set(5, 10, 5);
        directionalLight.castShadow = true;
        scene.add(directionalLight);

        // Sol brillant avec un matériau réfléchissant
        const floorGeometry = new THREE.PlaneGeometry(20, 20);
        const floorMaterial = new THREE.MeshStandardMaterial({
            color: 0x202020,
            roughness: 0.5,
            metalness: 0.6,
        });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        scene.add(floor);

        // Bureau stylisé
        const deskGeometry = new THREE.BoxGeometry(6, 0.3, 2.5);
        const deskMaterial = new THREE.MeshStandardMaterial({
            color: 0x2c3e50,
            roughness: 0.4,
            metalness: 0.6,
        });
        const desk = new THREE.Mesh(deskGeometry, deskMaterial);
        desk.position.set(0, -0.8, 0);
        desk.castShadow = true;
        scene.add(desk);

        // Modélisation de l'ordinateur avec un écran légèrement lumineux
        const screenGeometry = new THREE.BoxGeometry(1.8, 1.2, 0.05);
        const screenMaterial = new THREE.MeshStandardMaterial({
            color: 0x111111,
            emissive: 0x00ffff,  // Éclairage subtil de l'écran
            emissiveIntensity: 0.5,
        });
        const screen = new THREE.Mesh(screenGeometry, screenMaterial);
        screen.position.set(0, 0.8, -1.2);
        desk.add(screen);

        // Clavier stylisé
        const keyboardGeometry = new THREE.BoxGeometry(1.5, 0.1, 0.5);
        const keyboardMaterial = new THREE.MeshStandardMaterial({
            color: 0x333333,
            roughness: 0.3,
            metalness: 0.8,
        });
        const keyboard = new THREE.Mesh(keyboardGeometry, keyboardMaterial);
        keyboard.position.set(0, 0.15, 0.7);
        desk.add(keyboard);

        // Chat stylisé (formes simples, proportions mignonnes)
        const catMaterial = new THREE.MeshStandardMaterial({
            color: 0xf0a8a0,
            roughness: 0.5,
            metalness: 0.2,
        });

        // Corps du chat
        const bodyGeometry = new THREE.SphereGeometry(0.7, 32, 32);
        const body = new THREE.Mesh(bodyGeometry, catMaterial);
        body.position.set(0, 0, 0.5);
        body.castShadow = true;
        scene.add(body);

        // Tête du chat
        const headGeometry = new THREE.SphereGeometry(0.4, 32, 32);
        const head = new THREE.Mesh(headGeometry, catMaterial);
        head.position.set(0, 0.9, 0);
        body.add(head);

        // Pattes avant du chat (tapant sur le clavier)
        const pawGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.5, 32);
        const leftPaw = new THREE.Mesh(pawGeometry, catMaterial);
        leftPaw.position.set(-0.3, -0.2, 0.7);
        leftPaw.rotation.x = -Math.PI / 4;
        body.add(leftPaw);

        const rightPaw = new THREE.Mesh(pawGeometry, catMaterial);
        rightPaw.position.set(0.3, -0.2, 0.7);
        rightPaw.rotation.x = -Math.PI / 4;
        body.add(rightPaw);

        // Lumières supplémentaires pour plus de style
        const pointLight = new THREE.PointLight(0xff0055, 1, 100);
        pointLight.position.set(3, 5, 3);
        scene.add(pointLight);

        // Positionnement de la caméra
        camera.position.set(4, 2.5, 6);
        camera.lookAt(0, 0.5, 0);

        // Animation des pattes
        const animate = function () {
            requestAnimationFrame(animate);

            // Légère animation des pattes pour un effet de "tape"
            leftPaw.rotation.z = Math.sin(Date.now() * 0.005) * 0.2;
            rightPaw.rotation.z = Math.sin(Date.now() * 0.005 + Math.PI) * 0.2;

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
