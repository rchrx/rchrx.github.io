import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { getSavedTheme } from '../services/themeService';

export const BackgroundCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let animationFrameId: number;
    let isDisposed = false;

    // Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050508, 0.025);

    const camera = new THREE.PerspectiveCamera(54, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const initialHex = getSavedTheme();
    const initialAccent = parseInt(initialHex.replace('#', ''), 16) || 0x00ff66;

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);

    const keyGreen = new THREE.DirectionalLight(initialAccent, 2.0);
    keyGreen.position.set(12, 14, 10);
    scene.add(keyGreen);

    const rimCyan = new THREE.PointLight(0x00f0ff, 2.5, 45);
    rimCyan.position.set(-14, -8, 8);
    scene.add(rimCyan);

    // Core Group
    const coreGroup = new THREE.Group();

    // Outer Wireframe Tesseract Cage (Dodecahedron)
    const outerGeo = new THREE.DodecahedronGeometry(3.6, 0);
    const outerMat = new THREE.MeshBasicMaterial({
      color: initialAccent,
      wireframe: true,
      transparent: true,
      opacity: 0.75
    });
    const outerCage = new THREE.Mesh(outerGeo, outerMat);
    coreGroup.add(outerCage);

    // Inner Wireframe Icosahedron (Cyan)
    const innerGeo = new THREE.IcosahedronGeometry(2.4, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.65
    });
    const innerCage = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerCage);

    // Concentric Coordinate Gyro Rings
    const ringGeo1 = new THREE.TorusGeometry(4.8, 0.03, 16, 80);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: initialAccent, transparent: true, opacity: 0.35 });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    coreGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(5.2, 0.025, 16, 80);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.3 });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = Math.PI / 3;
    coreGroup.add(ring2);

    // Pulsing Matrix Core Node
    const coreGeo = new THREE.SphereGeometry(0.9, 24, 24);
    const coreMat = new THREE.MeshBasicMaterial({
      color: initialAccent,
      transparent: true,
      opacity: 0.4
    });
    const centerNode = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(centerNode);

    const updateResponsivePosition = () => {
      if (window.innerWidth > 1024) {
        coreGroup.position.set(6.8, 0.2, 0);
        coreGroup.scale.set(1, 1, 1);
      } else if (window.innerWidth > 768) {
        coreGroup.position.set(0, 1.2, 0);
        coreGroup.scale.set(0.85, 0.85, 0.85);
      } else {
        coreGroup.position.set(0, 1.0, 0);
        coreGroup.scale.set(0.72, 0.72, 0.72);
      }
    };
    updateResponsivePosition();
    scene.add(coreGroup);

    // Matrix Data Particle Stream
    const count = 1200;
    const particlesGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const green = new THREE.Color(0x00ff66);
    const cyan = new THREE.Color(0x00f0ff);
    const amber = new THREE.Color(0xffb454);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60;

      const choice = Math.random();
      const col = choice < 0.6 ? green : choice < 0.9 ? cyan : amber;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.5
    });

    const matrixParticles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(matrixParticles);

    // Interactive Physics & Parallax State
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    const dragVelocity = { x: 0, y: 0 };
    let scrollProgress = 0;
    const clock = new THREE.Clock();

    // Event Handlers
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      updateResponsivePosition();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'touch' && window.innerWidth <= 768) return;
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
      dragVelocity.x = 0;
      dragVelocity.y = 0;
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouse.x;
      const deltaY = e.clientY - prevMouse.y;

      dragVelocity.x = deltaX * 0.005;
      dragVelocity.y = deltaY * 0.005;
      coreGroup.rotation.y += dragVelocity.x;
      coreGroup.rotation.x += dragVelocity.y;

      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    // Animation Loop
    const animate = () => {
      if (isDisposed) return;
      animationFrameId = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();

      // Continuous Rotations
      outerCage.rotation.x += 0.004;
      outerCage.rotation.y += 0.006;

      innerCage.rotation.x -= 0.005;
      innerCage.rotation.y -= 0.004;

      ring1.rotation.z += 0.003;
      ring2.rotation.y -= 0.004;

      const scale = 1 + Math.sin(elapsed * 2.5) * 0.12;
      centerNode.scale.set(scale, scale, scale);

      matrixParticles.rotation.y = elapsed * 0.008;

      // Inertial decay when not dragging
      if (!isDragging) {
        dragVelocity.x *= 0.94;
        dragVelocity.y *= 0.94;
        coreGroup.rotation.y += dragVelocity.x;
        coreGroup.rotation.x += dragVelocity.y;
      }

      // Parallax
      const targetCamZ = 18 - scrollProgress * 5;
      const targetCamY = -scrollProgress * 6;
      camera.position.z += (targetCamZ - camera.position.z) * 0.05;
      camera.position.y += (targetCamY - camera.position.y) * 0.05;

      targetRotX = mouseY * 0.16;
      targetRotY = mouseX * 0.22;
      scene.rotation.x += (targetRotX - scene.rotation.x) * 0.04;
      scene.rotation.y += (targetRotY - scene.rotation.y) * 0.04;

      renderer.render(scene, camera);
    };

    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ hex: string }>;
      if (!customEvent.detail?.hex) return;
      const num = parseInt(customEvent.detail.hex.replace('#', ''), 16);
      if (isNaN(num)) return;
      keyGreen.color.setHex(num);
      outerMat.color.setHex(num);
      ringMat1.color.setHex(num);
      coreMat.color.setHex(num);
    };
    window.addEventListener('term-theme-change', handleThemeChange);

    animate();

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('term-theme-change', handleThemeChange);
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);

      // Disposal
      outerGeo.dispose();
      outerMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <>
      <div id="webgl-container" ref={containerRef} aria-hidden="true">
        <canvas id="webgl-canvas" ref={canvasRef} />
      </div>
      <div className="studio-glow studio-glow-top" aria-hidden="true" />
      <div className="studio-glow studio-glow-bottom" aria-hidden="true" />
    </>
  );
};
