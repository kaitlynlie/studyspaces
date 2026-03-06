export type DrinkId =
  | "latte"
  | "matcha"
  | "mocha"
  | "espresso"
  | "iced"
  | "chai"
  | "hotchoc"
  | "water";

type Ctx = CanvasRenderingContext2D;

function px(ctx: Ctx, x: number, y: number, w: number, h: number, c: string) {
  ctx.fillStyle = c;
  ctx.fillRect(x, y, w, h);
}

// latte
export function drawLatte(ctx: Ctx) {
  ctx.clearRect(0, 0, 24, 32);
  // steam
  px(ctx,  8, 1, 1, 3, "#c8b89a");
  px(ctx, 12, 0, 1, 4, "#c8b89a");
  px(ctx, 16, 1, 1, 3, "#c8b89a");
  // mug body
  px(ctx,  5, 6, 14, 18, "#f0e6d2");
  // inner coffee
  px(ctx,  6, 7, 12, 10, "#c8956a");
  // foam top
  px(ctx,  6, 7,  12, 3, "#f5efe6");
  px(ctx,  7, 7,  10, 2, "#ffffff");
  // latte art dot
  px(ctx, 10, 8,   4, 1, "#c8956a");
  px(ctx, 11, 9,   2, 1, "#c8956a");
  // mug lower
  px(ctx,  6,17,  12, 6, "#e8dcc8");
  // mug outline
  px(ctx,  5, 6,  1, 18, "#b8a080");
  px(ctx, 18, 6,  1, 18, "#b8a080");
  px(ctx,  5,24, 14,  1, "#b8a080");
  px(ctx,  6, 6, 12,  1, "#b8a080");
  // handle
  px(ctx, 19, 10, 2,  1, "#b8a080");
  px(ctx, 20, 11, 1,  4, "#b8a080");
  px(ctx, 19, 15, 2,  1, "#b8a080");
  // saucer
  px(ctx,  3,25, 18,  2, "#e0d4bc");
  px(ctx,  4,27, 16,  1, "#c8b89a");
}

// matcha latte
export function drawMatcha(ctx: Ctx) {
  ctx.clearRect(0, 0, 24, 32);
  // steam (green-tinted)
  px(ctx,  8, 1, 1, 3, "#a8c898");
  px(ctx, 13, 0, 1, 4, "#a8c898");
  px(ctx, 17, 1, 1, 3, "#a8c898");
  // wide cup body
  px(ctx,  4, 7, 16, 16, "#f0ece0");
  // matcha fill
  px(ctx,  5, 8, 14,  9, "#7aad5a");
  // foam top
  px(ctx,  5, 8, 14,  2, "#e8f0e0");
  px(ctx,  6, 8, 12,  1, "#f4f8f0");
  // matcha swirl
//   px(ctx,  9,11,  1,  1, "#5a8d3a");
  px(ctx, 10,12,  3,  1, "#5a8d3a");
//   px(ctx, 13,11,  1,  1, "#5a8d3a");
  // cup lower
  px(ctx,  5,17, 14,  5, "#e0dcc8");
  // cup outline
  px(ctx,  4, 7,  1, 16, "#a0b880");
  px(ctx, 20, 7,  1, 16, "#a0b880");
  px(ctx,  4,23, 16,  1, "#a0b880");
  px(ctx,  5, 7, 15,  1, "#a0b880");
  // handle
  px(ctx, 21, 11, 2,  1, "#a0b880");
  px(ctx, 22, 12, 1,  4, "#a0b880");
  px(ctx, 21, 16, 2,  1, "#a0b880");
  // saucer
  px(ctx,  2,24, 20,  2, "#ddd8c0");
  px(ctx,  3,26, 18,  1, "#b8b098");
}

// mocha
export function drawMocha(ctx: Ctx) {
  ctx.clearRect(0, 0, 24, 32);
  // steam
  px(ctx,  7, 1, 1, 3, "#9a7860");
  px(ctx, 12, 0, 1, 4, "#9a7860");
  px(ctx, 16, 1, 1, 3, "#9a7860");
  // mug
  px(ctx,  5, 6, 14, 18, "#e8ddd0");
  // dark mocha fill
  px(ctx,  6, 7, 12, 11, "#4a2810");
  // foam
  px(ctx,  6, 7, 12,  3, "#f0e8e0");
  px(ctx,  7, 7, 10,  2, "#ffffff");
  // chocolate drizzle
  px(ctx,  8, 8,  1,  2, "#6b3a1a");
  px(ctx,  9, 9,  3,  1, "#6b3a1a");
  px(ctx, 14, 8,  2,  1, "#6b3a1a");
  px(ctx, 15, 9,  1,  2, "#6b3a1a");
  // choc chips
  px(ctx, 10,10,  2,  1, "#3d2010");
  px(ctx, 13,11,  2,  1, "#3d2010");
  // lower mug
  px(ctx,  6,18, 12,  5, "#ddd0c0");
  // outline
  px(ctx,  5, 6,  1, 18, "#8a6850");
  px(ctx, 18, 6,  1, 18, "#8a6850");
  px(ctx,  5,24, 14,  1, "#8a6850");
  px(ctx,  6, 6, 12,  1, "#8a6850");
  // handle
  px(ctx, 19, 10, 2,  1, "#8a6850");
  px(ctx, 20, 11, 1,  4, "#8a6850");
  px(ctx, 19, 15, 2,  1, "#8a6850");
  // saucer
  px(ctx,  3,25, 18,  2, "#d8ccb8");
  px(ctx,  4,27, 16,  1, "#b8a890");
}

// espresso
export function drawEspresso(ctx: Ctx) {
  ctx.clearRect(0, 0, 24, 32);
  // steam wisps (subtle)
  px(ctx, 10, 4, 1, 2, "#907060");
  px(ctx, 13, 3, 1, 3, "#907060");
  // small espresso cup (centered, wide)
  px(ctx,  6,10, 12, 12, "#f0ece4");
  // espresso fill (rich dark)
  px(ctx,  7,11, 10,  6, "#2a1208");
  // crema top
  px(ctx,  7,11, 10,  2, "#c88040");
  px(ctx,  8,11,  8,  1, "#e0a060");
  // lower cup
  px(ctx,  7,17, 10,  4, "#e4ddd0");
  // outline
  px(ctx,  6,10,  1, 12, "#a09080");
  px(ctx, 17,10,  1, 12, "#a09080");
  px(ctx,  6,22, 12,  1, "#a09080");
  px(ctx,  7,10, 10,  1, "#a09080");
  // handle (small)
  px(ctx, 18, 13, 2,  1, "#a09080");
  px(ctx, 19, 14, 1,  3, "#a09080");
  px(ctx, 18, 17, 2,  1, "#a09080");
  // saucer (wide)
  px(ctx,  3,23, 18,  2, "#e8e0d0");
  px(ctx,  4,25, 16,  1, "#c0b8a8");
  // spoon
  px(ctx,  4,26, 16,  1, "#c8c0b0");
  px(ctx,  4,26,  2,  1, "#e0d8c8");
}

// iced coffee
export function drawIced(ctx: Ctx) {
  ctx.clearRect(0, 0, 24, 32);
  // straw
  px(ctx, 16, 1,  2, 20, "#f06080");
  px(ctx, 16, 1,  1, 20, "#f08898");
  // glass (slightly tapered)
  px(ctx,  6, 4, 12, 24, "#c8e8f8");
  px(ctx,  7, 5, 10, 22, "#e8f4fc");
  // coffee layer (bottom)
  px(ctx,  7,18, 10,  8, "#6b3f1a");
  // milk layer
  px(ctx,  7,14, 10,  4, "#d4a878");
  // ice cubes
  px(ctx,  8, 6,  4,  4, "#d8f0ff");
  px(ctx,  8, 6,  4,  1, "#ffffff");
  px(ctx,  8, 6,  1,  4, "#ffffff");
  px(ctx, 13, 8,  3,  3, "#d8f0ff");
  px(ctx, 13, 8,  3,  1, "#ffffff");
  px(ctx, 13, 8,  1,  3, "#ffffff");
  px(ctx,  9,11,  4,  3, "#d8f0ff");
  px(ctx,  9,11,  4,  1, "#ffffff");
  // glass outline
  px(ctx,  6, 4,  1, 24, "#88b8d0");
  px(ctx, 17, 4,  1, 24, "#88b8d0");
  px(ctx,  6,28, 12,  1, "#88b8d0");
  px(ctx,  7, 4, 10,  1, "#88b8d0");
  // condensation dots
  px(ctx,  5,10,  1,  1, "#b8d8e8");
  px(ctx,  5,16,  1,  1, "#b8d8e8");
  px(ctx, 18,12,  1,  1, "#b8d8e8");
}

// chai
export function drawChai(ctx: Ctx) {
  ctx.clearRect(0, 0, 24, 32);
  // steam
  px(ctx,  8, 1, 1, 3, "#c89870");
  px(ctx, 12, 0, 1, 4, "#c89870");
  px(ctx, 16, 1, 1, 3, "#c89870");
  // mug body (warm terracotta)
  px(ctx,  5, 6, 14, 18, "#e8d4b8");
  // chai fill (warm amber-orange)
  px(ctx,  6, 7, 12, 11, "#c87840");
  // foam
  px(ctx,  6, 7, 12,  3, "#f0e8d8");
  px(ctx,  7, 7, 10,  2, "#fff8f0");
  // spice specks on foam
  px(ctx,  8, 8,  1,  1, "#8b4513");
  px(ctx, 11, 7,  1,  1, "#8b4513");
  px(ctx, 14, 8,  1,  1, "#8b4513");
  px(ctx, 10, 9,  1,  1, "#c86020");
  // star anise hint
  px(ctx, 12,11,  2,  1, "#a06030");
  px(ctx, 13,10,  1,  3, "#a06030");
  // lower mug
  px(ctx,  6,18, 12,  5, "#ddc8a8");
  // outline (warm brown)
  px(ctx,  5, 6,  1, 18, "#9a7050");
  px(ctx, 18, 6,  1, 18, "#9a7050");
  px(ctx,  5,24, 14,  1, "#9a7050");
  px(ctx,  6, 6, 12,  1, "#9a7050");
  // handle
  px(ctx, 19, 10, 2,  1, "#9a7050");
  px(ctx, 20, 11, 1,  4, "#9a7050");
  px(ctx, 19, 15, 2,  1, "#9a7050");
  // saucer
  px(ctx,  3,25, 18,  2, "#d8c4a0");
  px(ctx,  4,27, 16,  1, "#b89878");
}

// hot cocoa
export function drawHotchoc(ctx: Ctx) {
  ctx.clearRect(0, 0, 24, 32);
  // steam
  px(ctx,  8, 1, 1, 3, "#a08878");
  px(ctx, 13, 0, 1, 4, "#a08878");
  px(ctx, 17, 1, 1, 3, "#a08878");
  // wide mug
  px(ctx,  4, 6, 16, 18, "#f0e8de");
  // hot choc fill
  px(ctx,  5, 7, 14, 11, "#3d1a08");
  // whipped cream / marshmallows top
  px(ctx,  5, 7, 14,  3, "#fff8f4");
  px(ctx,  6, 7, 12,  2, "#ffffff");
  // marshmallows
  px(ctx,  7, 7,  3,  3, "#fff0e8");
  px(ctx,  7, 7,  3,  1, "#ffffff");
  px(ctx, 11, 7,  3,  3, "#fff0e8");
  px(ctx, 11, 7,  3,  1, "#ffffff");
  px(ctx, 15, 7,  2,  3, "#fff0e8");
  px(ctx, 15, 7,  2,  1, "#ffffff");
  // cocoa dust
  px(ctx,  8,10,  2,  1, "#6b3010");
  px(ctx, 13,10,  2,  1, "#6b3010");
  // lower mug
  px(ctx,  5,18, 14,  5, "#e4d8c8");
  // outline
  px(ctx,  4, 6,  1, 18, "#9a7860");
  px(ctx, 19, 6,  1, 18, "#9a7860");
  px(ctx,  4,24, 16,  1, "#9a7860");
  px(ctx,  5, 6, 14,  1, "#9a7860");
  // handle
  px(ctx, 20, 10, 2,  1, "#9a7860");
  px(ctx, 21, 11, 1,  4, "#9a7860");
  px(ctx, 20, 15, 2,  1, "#9a7860");
  // saucer
  px(ctx,  2,25, 20,  2, "#ddd0b8");
  px(ctx,  3,27, 18,  1, "#b8a888");
}

// water
export function drawWater(ctx: Ctx) {
  ctx.clearRect(0, 0, 24, 32);
  // glass body
  px(ctx,  6, 4, 12, 24, "#d0eef8");
  px(ctx,  7, 5, 10, 22, "#e8f6fc");
  // water fill (clear blue)
  px(ctx,  7, 8, 10, 18, "#b0ddf0");
  px(ctx,  8, 9,  8, 16, "#c8e8f5");
  // surface shimmer
  px(ctx,  7, 8, 10,  1, "#e0f4ff");
  px(ctx,  8, 8,  8,  1, "#ffffff");
  // bubbles
  px(ctx,  9,14,  1,  1, "#e8f8ff");
  px(ctx, 13,18,  1,  1, "#e8f8ff");
  px(ctx, 11,11,  1,  1, "#e8f8ff");
  px(ctx, 15,22,  1,  1, "#e8f8ff");
  px(ctx, 10,24,  1,  1, "#e8f8ff");
  // lemon slice hint
  px(ctx, 13,10,  3,  3, "#f0e060");
  px(ctx, 14,10,  1,  1, "#ffffff");
  px(ctx, 13,11,  1,  1, "#e8d040");
  px(ctx, 15,11,  1,  1, "#e8d040");
  px(ctx, 13,12,  3,  1, "#e8d040");
  // glass outline
  px(ctx,  6, 4,  1, 24, "#80b8d0");
  px(ctx, 17, 4,  1, 24, "#80b8d0");
  px(ctx,  6,28, 12,  1, "#80b8d0");
  px(ctx,  7, 4, 10,  1, "#80b8d0");
  // highlight
  px(ctx,  8, 6,  1, 18, "#f0f8ff");
}

export const DRINK_DRAWERS: Record<DrinkId, (ctx: Ctx) => void> = {
  latte:    drawLatte,
  matcha:   drawMatcha,
  mocha:    drawMocha,
  espresso: drawEspresso,
  iced:     drawIced,
  chai:     drawChai,
  hotchoc:  drawHotchoc,
  water:    drawWater,
};