/* Style reminder: Signal Workshop — use this motion as a precise system signal, not decorative noise; orange is reserved for the action state. */
import React, { memo, useCallback, useEffect, useMemo, useRef } from "react";
import { useAnimate, type AnimationOptions } from "framer-motion";

type StaggerFrom = "first" | "last" | "center" | "random";
type RotateDirection = "top" | "right" | "bottom" | "left";
type AnimationTrigger = "hover" | "enter";
type TextTag = "h1" | "h2" | "h3" | "h4" | "h5" | "p" | "span" | "div" | "section";

type Text3DFlipProps = {
  text?: string;
  color?: string;
  flipColor?: string;
  font?: React.CSSProperties;
  staggerDuration?: number;
  staggerFrom?: StaggerFrom;
  animation?: AnimationTrigger;
  tag?: TextTag;
  transition?: AnimationOptions;
  rotateDirection?: RotateDirection;
  style?: React.CSSProperties;
};

const transforms = {
  top: { container: "translateZ(-0.5lh) rotateX(0deg)", front: "translateZ(0.5lh)", second: "rotateX(-90deg) translateZ(0.5lh)", flipped: "translateZ(-0.5lh) rotateX(90deg)" },
  bottom: { container: "translateZ(-0.5lh) rotateX(0deg)", front: "translateZ(0.5lh)", second: "rotateX(90deg) translateZ(0.5lh)", flipped: "translateZ(-0.5lh) rotateX(-90deg)" },
  left: { container: "rotateY(90deg) translateX(50%) rotateY(-90deg) rotateY(0deg)", front: "rotateY(90deg) translateX(50%) rotateY(-90deg)", second: "rotateY(90deg) translateX(50%) rotateY(-90deg) rotateY(-90deg)", flipped: "rotateY(90deg) translateX(50%) rotateY(-90deg) rotateY(-90deg)" },
  right: { container: "rotateY(90deg) translateX(50%) rotateY(-90deg) rotateY(0deg)", front: "rotateY(-90deg) translateX(50%) rotateY(90deg)", second: "rotateY(90deg) translateX(50%) rotateX(90deg)", flipped: "rotateY(90deg) translateX(50%) rotateY(-90deg) rotateY(90deg)" },
} as const;

const splitChars = (text: string) => Array.from(text);

const CharBox = memo(({ char, color, flipColor, direction }: { char: string; color: string; flipColor: string; direction: RotateDirection }) => {
  const t = transforms[direction];
  return <span className="text-3d-flip-char" style={{ display: "inline-block", transformStyle: "preserve-3d", transform: t.container }}>
    <span style={{ position: "relative", display: "block", height: "1lh", color, backfaceVisibility: "hidden", transform: t.front }}>{char}</span>
    <span style={{ position: "absolute", top: 0, left: 0, display: "block", height: "1lh", color: flipColor, backfaceVisibility: "hidden", transform: t.second }}>{char}</span>
  </span>;
});
CharBox.displayName = "CharBox";

export default function Text3DFlip({ text = "MAP THE REPEAT", color = "#171715", flipColor = "#F05A3C", font, staggerDuration = 0.035, staggerFrom = "first", animation = "enter", tag = "div", transition = { type: "spring", damping: 30, stiffness: 300, mass: 1 }, rotateDirection = "top", style }: Text3DFlipProps) {
  const content = text || "MAP THE REPEAT";
  const [scope, animate] = useAnimate();
  const animating = useRef(false);
  const mounted = useRef(false);
  const [hasEntered, setHasEntered] = React.useState(false);
  const chars = useMemo(() => content.split(" ").map((word, index, words) => ({ chars: splitChars(word), space: index < words.length - 1 })), [content]);

  useEffect(() => { mounted.current = true; return () => { mounted.current = false; }; }, []);

  const play = useCallback(async () => {
    if (animating.current) return;
    animating.current = true;
    const all = chars.flatMap((word) => word.chars);
    const delays = all.map((_, index) => staggerFrom === "last" ? (all.length - 1 - index) * staggerDuration : staggerFrom === "center" ? Math.abs(Math.floor(all.length / 2) - index) * staggerDuration : index * staggerDuration);
    try {
      await animate(".text-3d-flip-char", { transform: transforms[rotateDirection].flipped }, { ...transition, delay: (index: number) => delays[index] ?? 0 } as any);
      if (mounted.current) await animate(".text-3d-flip-char", { transform: transforms[rotateDirection].container }, { duration: 0 });
    } finally { animating.current = false; }
  }, [animate, chars, rotateDirection, staggerDuration, staggerFrom, transition]);

  useEffect(() => { if (animation === "enter" && !hasEntered) { setHasEntered(true); void play(); } }, [animation, hasEntered, play]);

  return React.createElement(tag, { ref: scope, className: "text-3d-flip", "aria-label": content, style: { ...font, ...style } }, chars.map((word, wordIndex) => <span key={wordIndex} aria-hidden="true" style={{ display: "inline-flex", transformStyle: "preserve-3d" }} onPointerEnter={animation === "hover" ? () => void play() : undefined}>{word.chars.map((char, index) => <CharBox key={`${wordIndex}-${index}`} char={char} color={color} flipColor={flipColor} direction={rotateDirection} />)}{word.space ? <span style={{ whiteSpace: "pre" }}> </span> : null}</span>));
}
