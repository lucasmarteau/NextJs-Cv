import Chatbot from '../components/Chatbot';
import { Suspense, lazy } from 'react';

const ThreeScene = lazy(() => import('../components/ThreeScene'));

export default function Home() {
    return (
        <div>
            <Chatbot />
            <Suspense fallback={<div>Loading 3D scene...</div>}>
                <ThreeScene />
            </Suspense>
        </div>
    );
}
