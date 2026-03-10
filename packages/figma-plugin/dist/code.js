"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // src/tokens.ts
  var tokens_exports = {};
  __export(tokens_exports, {
    COLORS: () => COLORS,
    hexToRgb: () => hexToRgb
  });
  function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result)
      return { r: 0, g: 0, b: 0 };
    return {
      r: parseInt(result[1], 16) / 255,
      g: parseInt(result[2], 16) / 255,
      b: parseInt(result[3], 16) / 255
    };
  }
  var COLORS;
  var init_tokens = __esm({
    "src/tokens.ts"() {
      "use strict";
      COLORS = {
        black: "#000000",
        white: "#FFFFFF",
        gray: {
          50: "#f8f9fa",
          60: "#f5f6f7",
          80: "#f1f3f5",
          100: "#e9ecef",
          200: "#dee2e6",
          300: "#ced4da",
          400: "#adb5bd",
          500: "#848c94",
          600: "#666d75",
          700: "#495056",
          800: "#343a40",
          900: "#212529",
          1e3: "#141719"
        },
        blue: {
          50: "#f5fbff",
          80: "#e7f4fd",
          100: "#cbe7fd",
          200: "#97d1fb",
          300: "#60b5f6",
          400: "#2896e8",
          500: "#2b96ed"
        },
        red: {
          500: "#ec4937"
        },
        green: {
          500: "#27ab86"
        },
        yellow: {
          500: "#f59e0b"
        }
      };
    }
  });

  // src/builders/chip.builder.ts
  init_tokens();
  var SIZE_SPEC = {
    medium: { height: 36, paddingX: 12, fontSize: 14 },
    small: { height: 28, paddingX: 10, fontSize: 12 }
  };
  function getChipColors(variant, selected) {
    if (variant === "outlined") {
      return {
        bg: COLORS.white,
        text: selected ? COLORS.gray[1e3] : COLORS.gray[700],
        border: selected ? COLORS.gray[1e3] : COLORS.gray[100],
        hasBorder: true
      };
    }
    return {
      bg: selected ? COLORS.gray[1e3] : COLORS.gray[80],
      text: selected ? COLORS.white : COLORS.gray[700],
      border: "",
      hasBorder: false
    };
  }
  async function loadFont() {
    await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });
    await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  }
  function createChipNode(spec) {
    const sizeSpec = SIZE_SPEC[spec.size];
    const colors = getChipColors(spec.variant, spec.selected);
    const frame = figma.createFrame();
    frame.name = `Chip / ${spec.variant} / ${spec.selected ? "selected" : "default"} / ${spec.size}`;
    frame.layoutMode = "HORIZONTAL";
    frame.primaryAxisAlignItems = "CENTER";
    frame.counterAxisAlignItems = "CENTER";
    frame.paddingLeft = sizeSpec.paddingX;
    frame.paddingRight = sizeSpec.paddingX;
    frame.paddingTop = 0;
    frame.paddingBottom = 0;
    frame.resize(1, sizeSpec.height);
    frame.primaryAxisSizingMode = "AUTO";
    frame.counterAxisSizingMode = "FIXED";
    frame.cornerRadius = 99;
    const bgRgb = hexToRgb(colors.bg);
    frame.fills = [{ type: "SOLID", color: bgRgb }];
    if (colors.hasBorder) {
      const borderRgb = hexToRgb(colors.border);
      frame.strokes = [{ type: "SOLID", color: borderRgb }];
      frame.strokeWeight = 1;
      frame.strokeAlign = "INSIDE";
    } else {
      frame.strokes = [];
    }
    const text = figma.createText();
    text.fontName = { family: "Inter", style: "Semi Bold" };
    text.fontSize = sizeSpec.fontSize;
    text.characters = spec.label;
    const textRgb = hexToRgb(colors.text);
    text.fills = [{ type: "SOLID", color: textRgb }];
    frame.appendChild(text);
    return frame;
  }
  async function buildChipComponent(page) {
    await loadFont();
    const section = figma.createFrame();
    section.name = "\u{1F9E9} Chip";
    section.layoutMode = "VERTICAL";
    section.primaryAxisSizingMode = "AUTO";
    section.counterAxisSizingMode = "AUTO";
    section.itemSpacing = 24;
    section.paddingTop = 32;
    section.paddingBottom = 32;
    section.paddingLeft = 32;
    section.paddingRight = 32;
    section.fills = [{ type: "SOLID", color: hexToRgb(COLORS.white) }];
    section.cornerRadius = 16;
    const title = figma.createText();
    await figma.loadFontAsync({ family: "Inter", style: "Bold" });
    title.fontName = { family: "Inter", style: "Bold" };
    title.fontSize = 20;
    title.characters = "Chip";
    title.fills = [{ type: "SOLID", color: hexToRgb(COLORS.gray[1e3]) }];
    section.appendChild(title);
    await figma.loadFontAsync({ family: "Inter", style: "Regular" });
    const desc = figma.createText();
    desc.fontName = { family: "Inter", style: "Regular" };
    desc.fontSize = 13;
    desc.characters = "\uD544\uD130/\uCE74\uD14C\uACE0\uB9AC \uC120\uD0DD\uC6A9 \uCE69. filled/outlined \xD7 selected/default \xD7 medium/small";
    desc.fills = [{ type: "SOLID", color: hexToRgb(COLORS.gray[500]) }];
    section.appendChild(desc);
    const variants = ["filled", "outlined"];
    const sizes = ["medium", "small"];
    const labels = ["\uC804\uCCB4", "NOL \uD2F0\uCF13", "\uD638\uD154/\uB9AC\uC870\uD2B8", "\uD39C\uC158/\uD480\uBE4C\uB77C"];
    for (const size of sizes) {
      const sizeLabel = figma.createText();
      sizeLabel.fontName = { family: "Inter", style: "Semi Bold" };
      sizeLabel.fontSize = 12;
      sizeLabel.characters = `size: ${size}`;
      sizeLabel.fills = [{ type: "SOLID", color: hexToRgb(COLORS.gray[400]) }];
      section.appendChild(sizeLabel);
      for (const variant of variants) {
        const row = figma.createFrame();
        row.name = `${variant} / ${size}`;
        row.layoutMode = "HORIZONTAL";
        row.primaryAxisSizingMode = "AUTO";
        row.counterAxisSizingMode = "AUTO";
        row.itemSpacing = 8;
        row.fills = [];
        const specs = [
          { label: labels[0], variant, selected: true, size },
          ...labels.slice(1).map((l) => ({ label: l, variant, selected: false, size }))
        ];
        for (const spec of specs) {
          const chip = createChipNode(spec);
          row.appendChild(chip);
        }
        section.appendChild(row);
      }
    }
    const noteFrame = figma.createFrame();
    noteFrame.name = "tokens";
    noteFrame.layoutMode = "VERTICAL";
    noteFrame.primaryAxisSizingMode = "AUTO";
    noteFrame.counterAxisSizingMode = "AUTO";
    noteFrame.itemSpacing = 6;
    noteFrame.paddingTop = 16;
    noteFrame.paddingBottom = 16;
    noteFrame.paddingLeft = 16;
    noteFrame.paddingRight = 16;
    noteFrame.fills = [{ type: "SOLID", color: hexToRgb(COLORS.gray[80]) }];
    noteFrame.cornerRadius = 8;
    const tokenLines = [
      "filled + selected  \u2192  bg: color.gray.1000  /  text: white",
      "filled + default   \u2192  bg: color.gray.80  /  text: color.gray.700",
      "outlined + selected  \u2192  border: color.gray.1000  /  text: color.gray.1000",
      "outlined + default   \u2192  border: color.gray.100  /  text: color.gray.700"
    ];
    for (const line of tokenLines) {
      const t = figma.createText();
      t.fontName = { family: "Inter", style: "Regular" };
      t.fontSize = 11;
      t.characters = line;
      t.fills = [{ type: "SOLID", color: hexToRgb(COLORS.gray[700]) }];
      noteFrame.appendChild(t);
    }
    section.appendChild(noteFrame);
    page.appendChild(section);
    section.x = 100;
    section.y = 100;
  }

  // src/builders/badge.builder.ts
  init_tokens();
  var BADGE_VARIANTS = [
    { id: "event", label: "\uC774\uBCA4\uD2B8", bg: COLORS.gray[1e3], text: COLORS.white },
    { id: "md", label: "MD\uCD94\uCC9C", bg: COLORS.blue[500], text: COLORS.white },
    { id: "sale", label: "\uD2B9\uAC00", bg: COLORS.red[500], text: COLORS.white },
    { id: "new", label: "NEW", bg: COLORS.green[500], text: COLORS.white },
    { id: "neutral", label: "\uC77C\uBC18", bg: COLORS.gray[80], text: COLORS.gray[700] }
  ];
  async function buildBadgeComponent(page, xOffset) {
    await figma.loadFontAsync({ family: "Inter", style: "Bold" });
    await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });
    await figma.loadFontAsync({ family: "Inter", style: "Regular" });
    const section = figma.createFrame();
    section.name = "\u{1F3F7}\uFE0F Badge";
    section.layoutMode = "VERTICAL";
    section.primaryAxisSizingMode = "AUTO";
    section.counterAxisSizingMode = "AUTO";
    section.itemSpacing = 20;
    section.paddingTop = 32;
    section.paddingBottom = 32;
    section.paddingLeft = 32;
    section.paddingRight = 32;
    section.fills = [{ type: "SOLID", color: hexToRgb(COLORS.white) }];
    section.cornerRadius = 16;
    const title = figma.createText();
    title.fontName = { family: "Inter", style: "Bold" };
    title.fontSize = 20;
    title.characters = "Badge";
    title.fills = [{ type: "SOLID", color: hexToRgb(COLORS.gray[1e3]) }];
    section.appendChild(title);
    const desc = figma.createText();
    desc.fontName = { family: "Inter", style: "Regular" };
    desc.fontSize = 13;
    desc.characters = "\uC0C1\uD488 \uCE74\uB4DC \uC0C1\uB2E8 \uBC43\uC9C0. \uC774\uBCA4\uD2B8/MD\uCD94\uCC9C/\uD2B9\uAC00/NEW/\uC77C\uBC18 5\uAC00\uC9C0 variant";
    desc.fills = [{ type: "SOLID", color: hexToRgb(COLORS.gray[500]) }];
    section.appendChild(desc);
    const row = figma.createFrame();
    row.name = "variants";
    row.layoutMode = "HORIZONTAL";
    row.primaryAxisSizingMode = "AUTO";
    row.counterAxisSizingMode = "AUTO";
    row.itemSpacing = 8;
    row.fills = [];
    for (const v of BADGE_VARIANTS) {
      const badge = figma.createFrame();
      badge.name = `Badge / ${v.id}`;
      badge.layoutMode = "HORIZONTAL";
      badge.primaryAxisSizingMode = "AUTO";
      badge.counterAxisSizingMode = "AUTO";
      badge.paddingLeft = 8;
      badge.paddingRight = 8;
      badge.paddingTop = 4;
      badge.paddingBottom = 4;
      badge.cornerRadius = 4;
      badge.fills = [{ type: "SOLID", color: hexToRgb(v.bg) }];
      const text = figma.createText();
      text.fontName = { family: "Inter", style: "Semi Bold" };
      text.fontSize = 11;
      text.characters = v.label;
      text.fills = [{ type: "SOLID", color: hexToRgb(v.text) }];
      badge.appendChild(text);
      row.appendChild(badge);
    }
    section.appendChild(row);
    const noteFrame = figma.createFrame();
    noteFrame.layoutMode = "VERTICAL";
    noteFrame.primaryAxisSizingMode = "AUTO";
    noteFrame.counterAxisSizingMode = "AUTO";
    noteFrame.itemSpacing = 6;
    noteFrame.paddingTop = 16;
    noteFrame.paddingBottom = 16;
    noteFrame.paddingLeft = 16;
    noteFrame.paddingRight = 16;
    noteFrame.fills = [{ type: "SOLID", color: hexToRgb(COLORS.gray[80]) }];
    noteFrame.cornerRadius = 8;
    const tokenLines = [
      "event   \u2192  bg: color.gray.1000  /  text: white",
      "MD\uCD94\uCC9C  \u2192  bg: color.blue.500   /  text: white",
      "\uD2B9\uAC00    \u2192  bg: color.red.500    /  text: white",
      "NEW     \u2192  bg: color.green.500  /  text: white",
      "\uC77C\uBC18    \u2192  bg: color.gray.80    /  text: color.gray.700"
    ];
    for (const line of tokenLines) {
      const t = figma.createText();
      t.fontName = { family: "Inter", style: "Regular" };
      t.fontSize = 11;
      t.characters = line;
      t.fills = [{ type: "SOLID", color: hexToRgb(COLORS.gray[700]) }];
      noteFrame.appendChild(t);
    }
    section.appendChild(noteFrame);
    page.appendChild(section);
    section.x = xOffset;
    section.y = 100;
  }

  // src/builders/candidate-overview.builder.ts
  init_tokens();

  // src/candidates.ts
  var CANDIDATE_REGISTRY = [
    {
      id: "unified-chip",
      status: "in-progress",
      sources: ["chip/FilterChip.tsx", "chip/CategoryChip.tsx", "chip/TagChip.tsx"],
      similarity: 0.92,
      description: "\uD544\uD130/\uCE74\uD14C\uACE0\uB9AC/\uD0DC\uADF8 Chip \u2192 selected + variant \uAE30\uBC18 \uB2E8\uC77C Chip \uCEF4\uD3EC\uB10C\uD2B8",
      notes: "filled/outlined 2\uAC00\uC9C0 variant, medium/small 2\uAC00\uC9C0 size"
    },
    {
      id: "unified-badge",
      status: "in-progress",
      sources: ["badge/StatusBadge.tsx", "badge/CountBadge.tsx", "badge/TagBadge.tsx"],
      similarity: 0.88,
      description: "3\uAC00\uC9C0 Badge \u2192 variant \uAE30\uBC18 \uB2E8\uC77C Badge \uCEF4\uD3EC\uB10C\uD2B8"
    },
    {
      id: "unified-input",
      status: "pending",
      sources: ["input/TextInput.tsx", "input/SearchInput.tsx", "input/NumberInput.tsx"],
      similarity: 0.83,
      description: "3\uAC00\uC9C0 Input \u2192 type prop \uAE30\uBC18 \uB2E8\uC77C Input \uCEF4\uD3EC\uB10C\uD2B8",
      notes: "value, onChange, placeholder, disabled Props \uAD6C\uC870 \uACF5\uC720"
    },
    {
      id: "unified-card",
      status: "pending",
      sources: ["card/ProductCard.tsx", "card/HotelCard.tsx", "card/FlightCard.tsx", "card/ActivityCard.tsx"],
      similarity: 0.76,
      description: "4\uAC00\uC9C0 Card \u2192 slot \uAE30\uBC18 \uB2E8\uC77C Card \uCEF4\uD3EC\uB10C\uD2B8",
      notes: "\uACF5\uD1B5 \uAD6C\uC870: \uC774\uBBF8\uC9C0 + \uD0C0\uC774\uD2C0 + \uBD80\uAC00\uC815\uBCF4 + CTA"
    },
    {
      id: "unified-modal",
      status: "pending",
      sources: ["modal/BottomSheet.tsx", "modal/Dialog.tsx", "modal/Drawer.tsx"],
      similarity: 0.71,
      description: "\uBAA8\uB2EC \uACC4\uC5F4 \u2192 placement prop \uAE30\uBC18 \uD1B5\uD569",
      notes: "focus trap, aria-modal \uAD6C\uD604 \uC911\uBCF5"
    }
  ];

  // src/builders/candidate-overview.builder.ts
  var STATUS_CONFIG = {
    "in-progress": { emoji: "\u{1F528}", color: COLORS.blue[500], bg: COLORS.blue[80] },
    "pending": { emoji: "\u23F3", color: COLORS.yellow[500], bg: "#fffbeb" },
    "completed": { emoji: "\u2705", color: COLORS.green[500], bg: "#ecfdf5" },
    "rejected": { emoji: "\u274C", color: COLORS.red[500], bg: "#fef2f2" }
  };
  async function buildCandidateOverview(page) {
    var _a, _b, _c, _d;
    await figma.loadFontAsync({ family: "Inter", style: "Bold" });
    await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });
    await figma.loadFontAsync({ family: "Inter", style: "Regular" });
    const header = figma.createFrame();
    header.name = "\u{1F4CB} DS \uD6C4\uBCF4\uAD70 \uD604\uD669";
    header.layoutMode = "VERTICAL";
    header.primaryAxisSizingMode = "AUTO";
    header.counterAxisSizingMode = "FIXED";
    header.resize(800, 100);
    header.itemSpacing = 8;
    header.paddingTop = 32;
    header.paddingBottom = 32;
    header.paddingLeft = 32;
    header.paddingRight = 32;
    header.fills = [{ type: "SOLID", color: hexToRgb(COLORS.gray[1e3]) }];
    header.cornerRadius = 16;
    const headerTitle = figma.createText();
    headerTitle.fontName = { family: "Inter", style: "Bold" };
    headerTitle.fontSize = 28;
    headerTitle.characters = "MRT Design System \uD6C4\uBCF4\uAD70";
    headerTitle.fills = [{ type: "SOLID", color: hexToRgb(COLORS.white) }];
    header.appendChild(headerTitle);
    const summary = CANDIDATE_REGISTRY.reduce((acc, c) => {
      var _a2;
      acc[c.status] = ((_a2 = acc[c.status]) != null ? _a2 : 0) + 1;
      return acc;
    }, {});
    const summaryText = figma.createText();
    summaryText.fontName = { family: "Inter", style: "Regular" };
    summaryText.fontSize = 14;
    summaryText.characters = `\uB300\uAE30\uC911 ${(_a = summary.pending) != null ? _a : 0}  |  \uC9C4\uD589\uC911 ${(_b = summary["in-progress"]) != null ? _b : 0}  |  \uC644\uB8CC ${(_c = summary.completed) != null ? _c : 0}  |  \uAC70\uBD80 ${(_d = summary.rejected) != null ? _d : 0}`;
    summaryText.fills = [{ type: "SOLID", color: hexToRgb(COLORS.gray[300]) }];
    header.appendChild(summaryText);
    page.appendChild(header);
    header.x = 100;
    header.y = 600;
    let cardX = 100;
    const cardY = 780;
    for (const candidate of CANDIDATE_REGISTRY) {
      const card = createCandidateCard(candidate);
      page.appendChild(card);
      card.x = cardX;
      card.y = cardY;
      cardX += card.width + 16;
    }
  }
  function createCandidateCard(candidate) {
    const config = STATUS_CONFIG[candidate.status];
    const card = figma.createFrame();
    card.name = `\uD6C4\uBCF4\uAD70 / ${candidate.id}`;
    card.layoutMode = "VERTICAL";
    card.primaryAxisSizingMode = "AUTO";
    card.counterAxisSizingMode = "FIXED";
    card.resize(220, 100);
    card.itemSpacing = 8;
    card.paddingTop = 20;
    card.paddingBottom = 20;
    card.paddingLeft = 20;
    card.paddingRight = 20;
    card.fills = [{ type: "SOLID", color: hexToRgb(COLORS.white) }];
    card.cornerRadius = 12;
    card.strokes = [{ type: "SOLID", color: hexToRgb(COLORS.gray[100]) }];
    card.strokeWeight = 1;
    card.strokeAlign = "INSIDE";
    const statusBadge = figma.createFrame();
    statusBadge.layoutMode = "HORIZONTAL";
    statusBadge.primaryAxisSizingMode = "AUTO";
    statusBadge.counterAxisSizingMode = "AUTO";
    statusBadge.paddingLeft = 8;
    statusBadge.paddingRight = 8;
    statusBadge.paddingTop = 3;
    statusBadge.paddingBottom = 3;
    statusBadge.cornerRadius = 99;
    statusBadge.fills = [{ type: "SOLID", color: hexToRgb(config.bg) }];
    const statusText = figma.createText();
    statusText.fontName = { family: "Inter", style: "Semi Bold" };
    statusText.fontSize = 11;
    statusText.characters = `${config.emoji} ${candidate.status}`;
    statusText.fills = [{ type: "SOLID", color: hexToRgb(config.color) }];
    statusBadge.appendChild(statusText);
    card.appendChild(statusBadge);
    const titleText = figma.createText();
    titleText.fontName = { family: "Inter", style: "Bold" };
    titleText.fontSize = 15;
    titleText.characters = candidate.id;
    titleText.fills = [{ type: "SOLID", color: hexToRgb(COLORS.gray[1e3]) }];
    card.appendChild(titleText);
    const descText = figma.createText();
    descText.fontName = { family: "Inter", style: "Regular" };
    descText.fontSize = 12;
    descText.characters = candidate.description;
    descText.fills = [{ type: "SOLID", color: hexToRgb(COLORS.gray[600]) }];
    descText.textAutoResize = "HEIGHT";
    card.appendChild(descText);
    const similarityBar = figma.createFrame();
    similarityBar.layoutMode = "HORIZONTAL";
    similarityBar.primaryAxisSizingMode = "AUTO";
    similarityBar.counterAxisSizingMode = "AUTO";
    similarityBar.itemSpacing = 6;
    similarityBar.fills = [];
    const simLabel = figma.createText();
    simLabel.fontName = { family: "Inter", style: "Regular" };
    simLabel.fontSize = 11;
    simLabel.characters = `\uC720\uC0AC\uB3C4 ${Math.round(candidate.similarity * 100)}%`;
    simLabel.fills = [{ type: "SOLID", color: hexToRgb(COLORS.gray[500]) }];
    similarityBar.appendChild(simLabel);
    card.appendChild(similarityBar);
    return card;
  }

  // src/github.ts
  async function createApprovePR(config, candidateId, files) {
    const branchName = `ds/approve-${candidateId}-${Date.now()}`;
    const base = "main";
    const mainRef = await ghFetch(config, `git/refs/heads/${base}`);
    const baseSha = mainRef.object.sha;
    await ghFetch(config, "git/refs", "POST", {
      ref: `refs/heads/${branchName}`,
      sha: baseSha
    });
    const treeItems = await Promise.all(
      files.map(async (f) => {
        const blob = await ghFetch(config, "git/blobs", "POST", {
          content: f.content,
          encoding: "base64"
        });
        return {
          path: f.path,
          mode: "100644",
          type: "blob",
          sha: blob.sha
        };
      })
    );
    const tree = await ghFetch(config, "git/trees", "POST", {
      base_tree: baseSha,
      tree: treeItems
    });
    const commit = await ghFetch(config, "git/commits", "POST", {
      message: `feat(ds): ${candidateId} \uCEF4\uD3EC\uB10C\uD2B8 DS \uC815\uC2DD \uD3B8\uC785

- candidates.ts status: in-progress \u2192 completed
- packages/ui/src/components/${toPascalCase(candidateId)}/ \uC2A4\uCE90\uD3F4\uB529 \uC0DD\uC131

Approved via MRT DS Candidate Sync (Figma Plugin)`,
      tree: tree.sha,
      parents: [baseSha]
    });
    await ghFetch(config, `git/refs/heads/${branchName}`, "PATCH", {
      sha: commit.sha,
      force: false
    });
    const pr = await ghFetch(config, "pulls", "POST", {
      title: `feat(ds): ${candidateId} DS \uC815\uC2DD \uD3B8\uC785`,
      body: buildPRBody(candidateId),
      head: branchName,
      base
    });
    return pr.html_url;
  }
  async function ghFetch(config, endpoint, method = "GET", body) {
    const res = await fetch(`https://api.github.com/repos/${config.owner}/${config.repo}/${endpoint}`, {
      method,
      headers: {
        Authorization: `Bearer ${config.token}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
        "X-GitHub-Api-Version": "2022-11-28"
      },
      body: body ? JSON.stringify(body) : void 0
    });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`GitHub API ${method} ${endpoint} \uC2E4\uD328 (${res.status}): ${err}`);
    }
    return res.json();
  }
  function toPascalCase(str) {
    return str.split(/[-_]/).map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join("");
  }
  function buildPRBody(candidateId) {
    const pascal = toPascalCase(candidateId);
    return `## DS \uD6C4\uBCF4\uAD70 \uC815\uC2DD \uD3B8\uC785: \`${candidateId}\`

> Figma Plugin **MRT DS Candidate Sync**\uC5D0\uC11C \uB514\uC790\uC774\uB108 \uC2B9\uC778 \uD6C4 \uC790\uB3D9 \uC0DD\uC131\uB41C PR

### \uBCC0\uACBD \uC0AC\uD56D

- \`packages/mcp-server/src/tools/candidates.ts\` \u2014 status \`in-progress\` \u2192 \`completed\`
- \`packages/ui/src/components/${pascal}/${pascal}.tsx\` \u2014 \uCEF4\uD3EC\uB10C\uD2B8 \uC2A4\uCE90\uD3F4\uB529
- \`packages/ui/src/components/${pascal}/${pascal}.types.ts\` \u2014 Props \uD0C0\uC785 \uC815\uC758

### \uB2E4\uC74C \uB2E8\uACC4

- [ ] \uCEF4\uD3EC\uB10C\uD2B8 \uAD6C\uD604 \uC644\uC131 (\`${pascal}.tsx\`)
- [ ] Storybook stories \uC791\uC131 (\`${pascal}.stories.tsx\`)
- [ ] ai-index \uC7AC\uBE4C\uB4DC \u2192 MCP tool \uC790\uB3D9 \uC778\uC2DD
- [ ] \uB514\uC790\uC774\uB108 Figma \uCEF4\uD3EC\uB10C\uD2B8\uC640 \uD1A0\uD070 \uC5F0\uACB0 \uD655\uC778

\u{1F916} Generated by MRT DS Candidate Sync (Figma Plugin)
`;
  }

  // src/scaffolding.ts
  function toPascalCase2(str) {
    return str.split(/[-_]/).map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join("");
  }
  function toBase64(str) {
    return btoa(unescape(encodeURIComponent(str)));
  }
  function buildCandidatesFileContent(approvedId) {
    const lines = CANDIDATE_REGISTRY.map((c) => {
      if (c.id !== approvedId)
        return null;
      return __spreadProps(__spreadValues({}, c), { status: "completed" });
    });
    const updated = CANDIDATE_REGISTRY.map(
      (c) => c.id === approvedId ? __spreadProps(__spreadValues({}, c), { status: "completed" }) : c
    );
    return `/** mcp-server/src/tools/candidates.ts\uC640 \uB3D9\uAE30\uD654 */
export interface DSCandidate {
  id: string;
  status: 'pending' | 'in-progress' | 'completed' | 'rejected';
  description: string;
  sources: string[];
  similarity: number;
  notes?: string;
}

export const CANDIDATE_REGISTRY: DSCandidate[] = ${JSON.stringify(updated, null, 2)};
`;
  }
  function buildTypesFile(componentId) {
    var _a, _b;
    const pascal = toPascalCase2(componentId);
    const candidate = CANDIDATE_REGISTRY.find((c) => c.id === componentId);
    return `import type React from 'react';

// TODO: ${(_a = candidate == null ? void 0 : candidate.description) != null ? _a : componentId} \uAD6C\uD604
// \uC18C\uC2A4 \uCC38\uC870: ${(_b = candidate == null ? void 0 : candidate.sources.join(", ")) != null ? _b : ""}

export const ${pascal.toUpperCase()}_VARIANTS = [
  // TODO: variant \uBAA9\uB85D \uC815\uC758
] as const;

export type ${pascal}Variant = (typeof ${pascal.toUpperCase()}_VARIANTS)[number];

export interface ${pascal}Props {
  // TODO: Props \uC815\uC758
  children?: React.ReactNode;
}
`;
  }
  function buildComponentFile(componentId) {
    var _a, _b;
    const pascal = toPascalCase2(componentId);
    const candidate = CANDIDATE_REGISTRY.find((c) => c.id === componentId);
    return `/**
 * ${pascal} \uCEF4\uD3EC\uB10C\uD2B8
 * ${(_a = candidate == null ? void 0 : candidate.description) != null ? _a : ""}
 *
 * TODO: \uAD6C\uD604 \uD544\uC694
 * - Figma \uB514\uC790\uC778 \uCC38\uC870: \u{1F9E9} DS Candidates \uD398\uC774\uC9C0
 * - \uC18C\uC2A4 \uCC38\uC870: ${(_b = candidate == null ? void 0 : candidate.sources.join(", ")) != null ? _b : ""}
 */
import React from 'react';
import type { ${pascal}Props } from './${pascal}.types';

export function ${pascal}({
  children,
  ...props
}: ${pascal}Props) {
  // TODO: \uAD6C\uD604
  return (
    <div {...props}>
      {children}
    </div>
  );
}

export default ${pascal};
`;
  }
  function buildIndexFile(componentId) {
    const pascal = toPascalCase2(componentId);
    return `export { ${pascal}, default } from './${pascal}';
export type { ${pascal}Props } from './${pascal}.types';
`;
  }
  function buildApproveFiles(candidateId) {
    const pascal = toPascalCase2(candidateId);
    const base = `packages/ui/src/components/${pascal}`;
    return [
      // ui/ 컴포넌트 스캐폴딩
      {
        path: `${base}/${pascal}.types.ts`,
        content: toBase64(buildTypesFile(candidateId))
      },
      {
        path: `${base}/${pascal}.tsx`,
        content: toBase64(buildComponentFile(candidateId))
      },
      {
        path: `${base}/index.ts`,
        content: toBase64(buildIndexFile(candidateId))
      },
      // figma-plugin candidates.ts 업데이트
      {
        path: "packages/figma-plugin/src/candidates.ts",
        content: toBase64(buildCandidatesFileContent(candidateId))
      }
    ];
  }

  // src/code.ts
  figma.showUI(__html__, { width: 340, height: 620, title: "MRT DS Candidate Sync" });
  figma.ui.onmessage = async (msg) => {
    if (msg.type === "approve") {
      const { candidateId, githubToken, githubOwner, githubRepo } = msg;
      try {
        figma.ui.postMessage({ type: "progress", message: `${candidateId} PR \uC0DD\uC131 \uC911...` });
        const files = buildApproveFiles(candidateId);
        const prUrl = await createApprovePR(
          { token: githubToken, owner: githubOwner, repo: githubRepo },
          candidateId,
          files
        );
        figma.ui.postMessage({ type: "approved", candidateId, prUrl });
      } catch (err) {
        figma.ui.postMessage({ type: "error", message: String(err) });
      }
      return;
    }
    if (msg.type !== "sync")
      return;
    const { components, options } = msg;
    try {
      let page = figma.root.children.find((p) => p.name === "\u{1F9E9} DS Candidates");
      if (!page) {
        page = figma.createPage();
        page.name = "\u{1F9E9} DS Candidates";
      }
      await figma.setCurrentPageAsync(page);
      let xOffset = 100;
      const COMPONENT_GAP = 40;
      figma.ui.postMessage({ type: "progress", message: "\uD398\uC774\uC9C0 \uC900\uBE44 \uC644\uB8CC" });
      if (components.includes("chip")) {
        figma.ui.postMessage({ type: "progress", message: "Chip \uC0DD\uC131 \uC911..." });
        await buildChipComponent(page);
        const chipFrame = page.children.find((n) => n.name === "\u{1F9E9} Chip");
        if (chipFrame)
          xOffset = chipFrame.x + chipFrame.width + COMPONENT_GAP;
      }
      if (components.includes("badge")) {
        figma.ui.postMessage({ type: "progress", message: "Badge \uC0DD\uC131 \uC911..." });
        await buildBadgeComponent(page, xOffset);
        const badgeFrame = page.children.find((n) => n.name === "\u{1F3F7}\uFE0F Badge");
        if (badgeFrame)
          xOffset = badgeFrame.x + badgeFrame.width + COMPONENT_GAP;
      }
      if (components.includes("input")) {
        figma.ui.postMessage({ type: "progress", message: "Input \uC2A4\uD399 \uC0DD\uC131 \uC911..." });
        await buildInputSpec(page, xOffset);
      }
      if (components.includes("card")) {
        figma.ui.postMessage({ type: "progress", message: "Card \uC2A4\uD399 \uC0DD\uC131 \uC911..." });
        await buildCardSpec(page, xOffset);
      }
      if (options.overview) {
        figma.ui.postMessage({ type: "progress", message: "\uD6C4\uBCF4\uAD70 \uD604\uD669 \uC624\uBC84\uBDF0 \uC0DD\uC131 \uC911..." });
        await buildCandidateOverview(page);
      }
      figma.viewport.scrollAndZoomIntoView(page.children);
      figma.ui.postMessage({
        type: "done",
        message: `${components.length}\uAC1C \uCEF4\uD3EC\uB10C\uD2B8 \uC0DD\uC131 \uC644\uB8CC \u2192 "\u{1F9E9} DS Candidates" \uD398\uC774\uC9C0 \uD655\uC778`
      });
    } catch (error) {
      figma.ui.postMessage({
        type: "error",
        message: String(error)
      });
    }
  };
  async function buildInputSpec(page, xOffset) {
    await figma.loadFontAsync({ family: "Inter", style: "Bold" });
    await figma.loadFontAsync({ family: "Inter", style: "Regular" });
    const { hexToRgb: hexToRgb2 } = await Promise.resolve().then(() => (init_tokens(), tokens_exports));
    const { COLORS: COLORS2 } = await Promise.resolve().then(() => (init_tokens(), tokens_exports));
    const frame = figma.createFrame();
    frame.name = "\u{1F4DD} Input (pending)";
    frame.layoutMode = "VERTICAL";
    frame.primaryAxisSizingMode = "AUTO";
    frame.counterAxisSizingMode = "FIXED";
    frame.resize(280, 100);
    frame.itemSpacing = 12;
    frame.paddingTop = 32;
    frame.paddingBottom = 32;
    frame.paddingLeft = 32;
    frame.paddingRight = 32;
    frame.fills = [{ type: "SOLID", color: hexToRgb2(COLORS2.white) }];
    frame.cornerRadius = 16;
    frame.strokes = [{ type: "SOLID", color: hexToRgb2(COLORS2.gray[100]) }];
    frame.strokeWeight = 2;
    frame.strokeAlign = "INSIDE";
    frame.dashPattern = [6, 4];
    const title = figma.createText();
    title.fontName = { family: "Inter", style: "Bold" };
    title.fontSize = 20;
    title.characters = "Input \u23F3";
    title.fills = [{ type: "SOLID", color: hexToRgb2(COLORS2.gray[1e3]) }];
    frame.appendChild(title);
    const desc = figma.createText();
    desc.fontName = { family: "Inter", style: "Regular" };
    desc.fontSize = 13;
    desc.characters = "TextInput + SearchInput + NumberInput \u2192 type prop \uAE30\uBC18 \uD1B5\uD569\n\n\uC720\uC0AC\uB3C4: 83%\nstatus: pending";
    desc.fills = [{ type: "SOLID", color: hexToRgb2(COLORS2.gray[500]) }];
    frame.appendChild(desc);
    page.appendChild(frame);
    frame.x = xOffset;
    frame.y = 100;
  }
  async function buildCardSpec(page, xOffset) {
    await figma.loadFontAsync({ family: "Inter", style: "Bold" });
    await figma.loadFontAsync({ family: "Inter", style: "Regular" });
    const { hexToRgb: hexToRgb2, COLORS: COLORS2 } = await Promise.resolve().then(() => (init_tokens(), tokens_exports));
    const frame = figma.createFrame();
    frame.name = "\u{1F0CF} Card (pending)";
    frame.layoutMode = "VERTICAL";
    frame.primaryAxisSizingMode = "AUTO";
    frame.counterAxisSizingMode = "FIXED";
    frame.resize(280, 100);
    frame.itemSpacing = 12;
    frame.paddingTop = 32;
    frame.paddingBottom = 32;
    frame.paddingLeft = 32;
    frame.paddingRight = 32;
    frame.fills = [{ type: "SOLID", color: hexToRgb2(COLORS2.white) }];
    frame.cornerRadius = 16;
    frame.strokes = [{ type: "SOLID", color: hexToRgb2(COLORS2.gray[100]) }];
    frame.strokeWeight = 2;
    frame.strokeAlign = "INSIDE";
    frame.dashPattern = [6, 4];
    const title = figma.createText();
    title.fontName = { family: "Inter", style: "Bold" };
    title.fontSize = 20;
    title.characters = "Card \u23F3";
    title.fills = [{ type: "SOLID", color: hexToRgb2(COLORS2.gray[1e3]) }];
    frame.appendChild(title);
    const desc = figma.createText();
    desc.fontName = { family: "Inter", style: "Regular" };
    desc.fontSize = 13;
    desc.characters = "ProductCard + HotelCard + FlightCard + ActivityCard\n\u2192 slot \uAE30\uBC18 \uB2E8\uC77C Card\n\n\uC720\uC0AC\uB3C4: 76%\nstatus: pending";
    desc.fills = [{ type: "SOLID", color: hexToRgb2(COLORS2.gray[500]) }];
    frame.appendChild(desc);
    page.appendChild(frame);
    frame.x = xOffset;
    frame.y = 100;
  }
})();
