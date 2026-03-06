import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { DRINK_DRAWERS, DrinkId } from "./DrinkPixelart";
import styles from "./BaristaPet.module.scss";

interface Drink {
  id: DrinkId;
  name: string;
  price: number;
  msg: string;
}

type BaristaState = "idle" | "happy" | "working";

// mobile breakpoint hook
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 664);
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth <= 664);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return isMobile;
}

// drink data
const DRINKS: Drink[] = [
  { id: "latte",    name: "Latte",       price: 4.50, msg: "one latte coming right up! great for a long session~"},
  { id: "matcha",   name: "Matcha",      price: 5.00, msg: "matcha! i love the taste of grass!" },
  { id: "mocha",    name: "Mocha",       price: 5.25, msg: "chocolate and coffee? you mean business!" },
  { id: "espresso", name: "Espresso",    price: 3.00, msg: "bold...starting strong today!" },
  { id: "iced",     name: "Iced Coffee", price: 4.75, msg: "chilling and grinding~" },
  { id: "chai",     name: "Chai",        price: 4.75, msg: "extra spicy for you ;)" },
  { id: "hotchoc",  name: "Hot Cocoa",    price: 4.25, msg: "i'll let you in on a secret, this one's my fav!" },
  { id: "water",    name: "Water",       price: 0.00, msg: "staying hydrated! smart move!" },
];

const SIZE_OPTIONS  = ["Small", "Medium", "Large"];
const MILK_OPTIONS  = ["Whole", "Oat", "Almond", "Soy"];
const EXTRA_OPTIONS = ["Extra Shot", "Vanilla", "Caramel", "Whip"];

// drink canvas
function DrinkCanvas({ drinkId, large = false }: { drinkId: DrinkId; large?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;
    DRINK_DRAWERS[drinkId](ctx);
  }, [drinkId]);

  return (
    <canvas
      ref={canvasRef}
      width={24}
      height={32}
      className={large ? styles.drinkCanvasLarge : styles.drinkCanvas}
    />
  );
}

// pixel barista
function BaristaCanvas({ baristaState }: { baristaState: BaristaState }) {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const animRef    = useRef<number>(0);
  const tRef       = useRef(0);
  const stateRef   = useRef<BaristaState>("idle");
  const frameRef   = useRef(0);
  const blinkRef   = useRef(0);
  const isBlinkRef = useRef(false);

  useEffect(() => { stateRef.current = baristaState; frameRef.current = 0; }, [baristaState]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;

    tRef.current++;
    frameRef.current++;
    blinkRef.current++;
    if (blinkRef.current > 180) isBlinkRef.current = true;
    if (blinkRef.current > 186) { isBlinkRef.current = false; blinkRef.current = 0; }

    const t  = tRef.current;
    const st = stateRef.current;
    const fr = frameRef.current;

    let headOff = 0;
    let armUp   = false;

    if (st === "idle")         { headOff = Math.sin(t * 0.03) > 0.8 ? -1 : 0; }
    else if (st === "happy")   { headOff = Math.round(Math.sin(t * 0.15) * 1.5); if (fr > 90) stateRef.current = "idle"; }
    else if (st === "working") { armUp = true; headOff = Math.round(Math.sin(t * 0.1) * 1); }

    const px = (x: number, y: number, w: number, h: number, c: string) => {
      ctx.fillStyle = c; ctx.fillRect(x, y, w, h);
    };

    ctx.clearRect(0, 0, 48, 64);
    const hy = headOff;

    px(14,30+hy,20,18,"#7aad6b"); px(13,32+hy,1,14,"#5a8d4b"); px(33,32+hy,1,14,"#5a8d4b");
    px(17,31+hy,14,20,"#fdf6e3"); px(16,31+hy,1,20,"#e8d0a8"); px(31,31+hy,1,20,"#e8d0a8");
    px(16,29+hy,3,2,"#fdf6e3"); px(29,29+hy,3,2,"#fdf6e3");
    if (armUp) {
      px(33,28+hy,5,4,"#7aad6b"); px(35,24+hy,4,5,"#f5c9a0"); px(37,22+hy,4,4,"#f5c9a0");
      px(38,16+hy,6,8,"#c8a97a"); px(39,14+hy,4,2,"#e8c87a"); px(40,13+hy,2,1,"#e0d8cc");
      px(38,21+hy,6,2,"#e0a878");
    } else {
      px(33,30+hy,5,12,"#7aad6b"); px(34,42+hy,4,5,"#f5c9a0");
    }
    px(10,30+hy,5,12,"#7aad6b"); px(10,42+hy,4,5,"#f5c9a0");
    px(21,27+hy,6,4,"#f5c9a0");
    px(14,10+hy,20,16,"#3d2314");
    px(16,12+hy,16,14,"#f5c9a0");
    px(14,8+hy,20,6,"#3d2314"); px(13,10+hy,2,8,"#3d2314"); px(33,10+hy,2,8,"#3d2314");
    px(18,8+hy,6,2,"#6b4a2a");
    px(14,13+hy,20,3,"#536a5f"); px(14,13+hy,2,3,"#658071"); px(32,13+hy,2,3,"#658071");
    px(11,12+hy,4,4,"#536a5f"); px(10,14+hy,6,2,"#658071");
    px(18,17+hy,4,1,"#3d2314"); px(26,17+hy,4,1,"#3d2314");
    if (!isBlinkRef.current) {
      px(19,19+hy,3,3,"#ffffff"); px(27,19+hy,3,3,"#ffffff");
      px(20,20+hy,2,2,"#3d2314"); px(28,20+hy,2,2,"#3d2314");
      px(21,20+hy,1,1,"#ffffff"); px(29,20+hy,1,1,"#ffffff");
    } else {
      px(19,21+hy,4,1,"#3d2314"); px(27,21+hy,4,1,"#3d2314");
    }
    px(16,22+hy,3,2,"#f0b0b0"); px(29,22+hy,3,2,"#f0b0b0");
    px(20,24+hy,1,1,"#3d2314"); px(21,25+hy,4,1,"#3d2314"); px(25,24+hy,1,1,"#3d2314");

    animRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [draw]);

  return <canvas ref={canvasRef} width={48} height={64} className={styles.baristaCanvas} />;
}

// main component
export function BaristaPet() {
  const [open, setOpen]                 = useState(false);
  const [selected, setSelected]         = useState<Drink | null>(null);
  const [size, setSize]                 = useState("Medium");
  const [milk, setMilk]                 = useState("Whole");
  const [extras, setExtras]             = useState<string[]>([]);
  const [ordered, setOrdered]           = useState(false);
  const [ordering, setOrdering]         = useState(false);
  const [bubble, setBubble]             = useState("hi! click me to order a drink!");
  const [baristaState, setBaristaState] = useState<BaristaState>("idle");
  const isMobile                        = useIsMobile();

  const idleMsgs = [
    "hi! click me to order a drink!",
    "studying hard? you deserve a treat~",
    "what can i get started for you?",
    "i don't have legs, but i can get you a drink!",
  ];
  const idleIdx = useRef(0);
  useEffect(() => {
    if (open) return;
    const id = setInterval(() => {
      idleIdx.current = (idleIdx.current + 1) % idleMsgs.length;
      setBubble(idleMsgs[idleIdx.current]);
    }, 5000);
    return () => clearInterval(id);
  }, [open]);

  const handleOpen = () => {
    setOpen(true);
    setBubble("what can i make for you today? :D");
    setBaristaState("happy");
    setOrdered(false);
    setSelected(null);
    setExtras([]);
    setSize("Medium");
    setMilk("Whole");
  };

  const handleSelectDrink = (d: Drink) => {
    setSelected(d);
    setBubble(d.msg);
    setBaristaState("happy");
    setOrdered(false);
  };

  const toggleExtra = (e: string) =>
    setExtras(prev => prev.includes(e) ? prev.filter(x => x !== e) : [...prev, e]);

  const handleOrder = () => {
    if (!selected) return;
    setOrdering(true);
    setBaristaState("working");
    setBubble("on it! one moment please~");
    setTimeout(() => {
      setOrdering(false);
      setOrdered(true);
      setBaristaState("happy");
      setBubble(`here's your ${selected.name}! enjoy & good luck studying!`);
    }, 1800);
  };

  const calcPrice = () => {
    if (!selected) return 0;
    let p = selected.price;
    if (size === "Large") p += 0.75;
    if (size === "Small") p -= 0.50;
    if (extras.includes("Extra Shot")) p += 0.80;
    if (extras.includes("Whip")) p += 0.50;
    return Math.max(0, p);
  };

  return (
    <div className={styles.root}>
      {/* ── Floating Barista ── */}
      <div className={styles.floatWrap}>
        <AnimatePresence>
          {!open && (
            <motion.div
              className={styles.idleBubble}
              initial={{ opacity: 0, y: 4, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              key={bubble}
            >
              {bubble}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className={styles.baristaTrigger}
          onClick={handleOpen}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.93 }}
          title="Order a drink!"
        >
          <BaristaCanvas baristaState={baristaState} />
          <div className={styles.counter} />
        </motion.div>
      </div>

      {/* ── slide-in panel ── */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className={styles.backdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            <motion.div
              className={styles.panel}
              initial={isMobile ? { y: "100%", opacity: 0 } : { x: "100%", opacity: 0 }}
              animate={isMobile ? { y: 0, opacity: 1 } : { x: 0, opacity: 1 }}
              exit={isMobile ? { y: "100%", opacity: 0 } : { x: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 340, damping: 34 }}
            >
              <div className={styles.panelHeader}>
                <div className={styles.panelBarista}>
                  <BaristaCanvas baristaState={baristaState} />
                  <div className={styles.panelCounter} />
                </div>
                <div className={styles.panelBubble}>{bubble}</div>
                <button className={styles.closeBtn} onClick={() => setOpen(false)}>✕</button>
              </div>

              <div className={styles.panelBody}>
                <p className={styles.sectionLabel}>— today's menu —</p>

                <div className={styles.drinkGrid}>
                  {DRINKS.map(d => (
                    <button
                      key={d.id}
                      className={`${styles.drinkBtn} ${selected?.id === d.id ? styles.drinkBtnSelected : ""}`}
                      onClick={() => handleSelectDrink(d)}
                    >
                      <DrinkCanvas drinkId={d.id} />
                      <span className={styles.drinkName}>{d.name}</span>
                      <span className={styles.drinkPrice}>{d.price === 0 ? "free" : `$${d.price.toFixed(2)}`}</span>
                    </button>
                  ))}
                </div>

                {selected && selected.id !== "water" && (
                  <motion.div
                    className={styles.customise}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <p className={styles.sectionLabel}>— customize —</p>
                    <div className={styles.optionGroup}>
                      <span className={styles.optionGroupLabel}>size</span>
                      <div className={styles.chips}>
                        {SIZE_OPTIONS.map(s => (
                          <button key={s} className={`${styles.chip} ${size === s ? styles.chipActive : ""}`} onClick={() => setSize(s)}>{s}</button>
                        ))}
                      </div>
                    </div>
                    <div className={styles.optionGroup}>
                      <span className={styles.optionGroupLabel}>milk</span>
                      <div className={styles.chips}>
                        {MILK_OPTIONS.map(m => (
                          <button key={m} className={`${styles.chip} ${milk === m ? styles.chipActive : ""}`} onClick={() => setMilk(m)}>{m}</button>
                        ))}
                      </div>
                    </div>
                    <div className={styles.optionGroup}>
                      <span className={styles.optionGroupLabel}>extras</span>
                      <div className={styles.chips}>
                        {EXTRA_OPTIONS.map(e => (
                          <button key={e} className={`${styles.chip} ${extras.includes(e) ? styles.chipActive : ""}`} onClick={() => toggleExtra(e)}>{e}</button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                <AnimatePresence>
                  {ordered && selected && (
                    <motion.div
                      className={styles.receipt}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <DrinkCanvas drinkId={selected.id} large />
                      <p className={styles.receiptTitle}>{size} {selected.name}</p>
                      {selected.id !== "water" && (
                        <p className={styles.receiptSub}>{milk} milk{extras.length ? ` · ${extras.join(", ")}` : ""}</p>
                      )}
                      <p className={styles.receiptTotal}>{selected.price === 0 ? "free" : `$${calcPrice().toFixed(2)}`}</p>
                      <p className={styles.receiptEta}>ready in ~3 mins</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {!ordered ? (
                  <button
                    className={styles.orderBtn}
                    disabled={!selected || ordering}
                    onClick={handleOrder}
                  >
                    {ordering ? "making your drink..." : selected ? `order ${selected.name.toLowerCase()}` : "select a drink first"}
                  </button>
                ) : (
                  <button className={styles.orderBtn} onClick={() => { setOrdered(false); setSelected(null); setBubble("want something else? i got you~"); }}>
                    order another?
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}