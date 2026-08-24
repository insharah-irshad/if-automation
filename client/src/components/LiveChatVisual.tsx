/* Style reminder: Signal Workshop — treat the chat as an annotated workflow artifact, using paper, ink, and signal orange rather than generic app chrome. */
import { useCallback, useEffect, useRef, useState } from "react";
import { useAnimate, stagger } from "framer-motion";

type Message = { text: string; sender: "me" | "them"; label: string };
type Scenario = { code: string; title: string; messages: Message[]; typingLabel: string };

const scenarios: Scenario[] = [
  {
    code: "HANDOFF / 01",
    title: "Workflow handoff",
    messages: [
      { text: "We repeat the same manual tasks.", sender: "them", label: "CLIENT / 10:14" },
      { text: "We’ll automate the repeatable steps.", sender: "me", label: "IF / 10:15" },
      { text: "So the work moves faster.", sender: "them", label: "CLIENT / 10:16" },
    ],
    typingLabel: "IF / THINKING",
  },
  {
    code: "LEAD ROUTE / 02",
    title: "Lead qualification",
    messages: [
      { text: "New leads come in, but follow-up is slow.", sender: "them", label: "TEAM / 09:22" },
      { text: "We’ll sort and route urgent leads fast.", sender: "me", label: "IF / 09:23" },
      { text: "Now every lead gets a quick reply.", sender: "them", label: "TEAM / 09:24" },
    ],
    typingLabel: "IF / ROUTING",
  },
];

export default function LiveChatVisual() {
  const [scope, animate] = useAnimate();
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [isReplaying, setIsReplaying] = useState(false);
  const hasPlayed = useRef(false);
  const scenario = scenarios[scenarioIndex];

  const playSequence = useCallback(async (resetFirst = false) => {
    const root = scope.current;
    if (!root) return;

    const messageNodes = Array.from(root.querySelectorAll(".chat-row:not(.typing-row)")) as HTMLElement[];
    const typingRow = root.querySelector(".typing-row") as HTMLElement | null;
    const dotNodes = Array.from(root.querySelectorAll(".chat-dot")) as HTMLElement[];
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (resetFirst) {
      await animate([...messageNodes, ...(typingRow ? [typingRow] : [])], { opacity: 0, y: 10, scale: 0.98 }, { duration: reduceMotion ? 0 : 0.12, ease: "easeOut" });
    }

    if (reduceMotion) {
      await animate([...messageNodes, ...(typingRow ? [typingRow] : [])], { opacity: 1, y: 0, scale: 1 }, { duration: 0 });
      return;
    }

    if (messageNodes.length) {
      void animate(messageNodes, { opacity: 1, y: 0, scale: 1 }, { delay: stagger(0.46), type: "spring", stiffness: 420, damping: 28 });
    }
    if (typingRow) {
      void animate(typingRow, { opacity: 1, y: 0, scale: 1 }, { delay: 1.45, type: "spring", stiffness: 420, damping: 28 });
    }
    if (dotNodes.length) {
      void animate(dotNodes, { y: [0, -4, 0], opacity: [0.35, 1, 0.35] }, { duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 1.6 });
    }
  }, [animate, scope]);

  useEffect(() => {
    const shouldReset = hasPlayed.current;
    hasPlayed.current = true;
    const frame = requestAnimationFrame(() => void playSequence(shouldReset));
    return () => cancelAnimationFrame(frame);
  }, [playSequence, scenarioIndex]);

  const handleReplay = async () => {
    if (isReplaying) return;
    setIsReplaying(true);
    await playSequence(true);
    window.setTimeout(() => setIsReplaying(false), 1800);
  };

  const handleScenarioChange = (nextIndex: number) => {
    if (nextIndex === scenarioIndex || isReplaying) return;
    setScenarioIndex(nextIndex);
  };

  return (
    <div ref={scope} className="live-chat-visual" aria-label={`Animated conversation: ${scenario.title}`}>
      <div className="chat-scenario-switcher" role="tablist" aria-label="Chat scenarios">
        {scenarios.map((item, index) => (
          <button
            key={item.code}
            className={`chat-scenario-tab ${index === scenarioIndex ? "is-active" : ""}`}
            type="button"
            role="tab"
            aria-selected={index === scenarioIndex}
            onClick={() => handleScenarioChange(index)}
          >
            {item.code}
          </button>
        ))}
      </div>
      <div className="chat-body">
        {scenario.messages.map((message) => (
          <div className={`chat-row ${message.sender === "me" ? "is-me" : ""}`} key={message.label}>
            <div className="chat-meta">{message.label}</div>
            <div className="chat-bubble">{message.text}</div>
          </div>
        ))}
        <div className="chat-row typing-row"><div className="chat-meta">{scenario.typingLabel}</div><div className="chat-typing"><i className="chat-dot" /><i className="chat-dot" /><i className="chat-dot" /></div></div>
      </div>
      <div className="chat-actions">
        <span className="chat-scenario-label">{scenario.title}</span>
        <button className="chat-replay" type="button" onClick={handleReplay} disabled={isReplaying} aria-label="Replay chat animation">
          <span aria-hidden="true">↻</span> {isReplaying ? "REPLAYING" : "REPLAY ANIMATION"}
        </button>
      </div>
    </div>
  );
}

