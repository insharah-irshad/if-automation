/* Signal Workshop visual reminder: tactile paper, ink geometry, signal-orange energy, and motion that explains the system rather than decorating it. */
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import {
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  TextureLoader,
  Vector2,
  WebGLRenderer,
} from "three";

type Props = { src: string; alt: string; className?: string };

const vertexShader = `
varying vec2 vUv;
void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`;

const fragmentShader = `
varying vec2 vUv;
uniform sampler2D uTexture;
uniform vec2 uSize;
uniform vec2 uImageSize;
uniform float uProgress;
#define PI 3.1415926538
float wave(vec2 p){
  float a = atan(p.y, p.x) + uProgress * PI;
  return (sin(a * 3.0) + cos(a * 5.0) + 2.0) / 4.0;
}
void main(){
  vec2 aspect = vec2(1.0);
  float ca = uSize.x / uSize.y;
  float ia = uImageSize.x / uImageSize.y;
  if (ca > ia) aspect.y = ia / ca; else aspect.x = ca / ia;
  vec2 uv = (vUv - 0.5) * aspect + 0.5;
  vec4 tex = (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) ? vec4(0.0) : texture2D(uTexture, uv);
  vec2 p = (vUv - 0.5) * uSize;
  float radius = uProgress * length(uSize) * 0.72;
  float mask = length(p) + wave(p) * 18.0 < radius ? 1.0 : 0.0;
  gl_FragColor = vec4(tex.rgb, tex.a * mask);
}
`;

export default function FluidImageReveal({ src, alt, className = "" }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [isRevealing, setIsRevealing] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    const image = imageRef.current;
    if (!host || !canvas || !image) return;

    const scene = new Scene();
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 2;
    const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const geometry = new PlaneGeometry(2, 2, 1, 1);
    const material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      uniforms: {
        uTexture: { value: null },
        uSize: { value: new Vector2(1, 1) },
        uImageSize: { value: new Vector2(1, 1) },
        uProgress: { value: 0 },
      },
    });
    const mesh = new Mesh(geometry, material);
    scene.add(mesh);

    const resize = () => {
      const width = Math.max(host.clientWidth, 1);
      const height = Math.max(host.clientHeight, 1);
      renderer.setSize(width, height, false);
      material.uniforms.uSize.value.set(width, height);
      renderer.render(scene, camera);
    };

    const render = () => renderer.render(scene, camera);
    const texture = new TextureLoader().load(src, (loaded) => {
      material.uniforms.uTexture.value = loaded;
      material.uniforms.uImageSize.value.set(loaded.image.width || 1, loaded.image.height || 1);
      resize();
    });

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let tween: gsap.core.Tween | undefined;
    let hasEnteredView = false;
    const reveal = (replay = false) => {
      if (reduceMotion) {
        material.uniforms.uProgress.value = 1;
        render();
        return;
      }
      if (!replay && hasEnteredView) return;
      hasEnteredView = true;
      setIsRevealing(true);
      tween?.kill();
      material.uniforms.uProgress.value = replay ? 0 : material.uniforms.uProgress.value;
      tween = gsap.to(material.uniforms.uProgress, {
        value: 1,
        duration: 3.2,
        ease: "power3.out",
        overwrite: true,
        onUpdate: render,
        onComplete: () => setIsRevealing(false),
      });
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) reveal();
    }, { threshold: 0.24 });
    observer.observe(host);
    const onPointerEnter = () => reveal(true);
    const onPointerUp = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") reveal(true);
    };
    host.addEventListener("pointerenter", onPointerEnter);
    host.addEventListener("pointerup", onPointerUp);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    image.style.opacity = "0";

    return () => {
      observer.disconnect();
      host.removeEventListener("pointerenter", onPointerEnter);
      host.removeEventListener("pointerup", onPointerUp);
      resizeObserver.disconnect();
      tween?.kill();
      texture.dispose();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [src]);

  return (
    <div ref={hostRef} className={`fluid-image-reveal ${isRevealing ? "is-revealing" : ""} ${className}`} role="img" aria-label={alt} tabIndex={0}>
      <img ref={imageRef} src={src} alt="" aria-hidden="true" />
      <canvas ref={canvasRef} aria-hidden="true" />
    </div>
  );
}
