# Pixel-art QA — 0.7

Reviewed the actual offline export at 1366×768 and 390×844.

Changes: replaced the straight timber-like log with three forked branch silhouettes, bark shading and broken ends; added three asymmetric rock silhouettes with facets; replaced rectangular shallows with an irregular sprite; added small highlights to boat, crew, foliage, tent and crates; removed the heart container and used a shaded standalone heart. Variants are chosen stably per obstacle so sprites never change during travel.

The first Play action opens an illustrated upstream introduction. Its examples use the same embedded sprite data as the game. Simulation remains stopped until Got it is pressed. Restart and completion replay enter the run directly.

Checks: desktop/mobile introduction legibility, no clipped example labels or button; heart visible without a frame; 14 model tests pass; full offline browser sequence passes with no page errors or network requests. Browser assertions cover stationary introduction, three example canvases, and replay skipping introduction. Art retains the original limited palette and nearest-neighbor rendering. Physical-device and classroom recognition testing remain open.
