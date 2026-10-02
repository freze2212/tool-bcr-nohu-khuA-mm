export type NhGameProvider = {
  url: string;
  link: string;
  name: string;
};

/** Logo sảnh nổ hũ — khung cyber lấy từ Figma HACK SLOT GAME */
export const NH_GAME_PROVIDERS: readonly NhGameProvider[] = [
  { url: "/assets/llwin/providers/pg.png", link: "/PG", name: "PG" },
  { url: "/assets/llwin/providers/bng.png", link: "/BNG", name: "BNG" },
  { url: "/assets/llwin/providers/cq9.png", link: "/CQ9", name: "CQ9" },
  { url: "/assets/llwin/providers/evoplay.png", link: "/EVOPLAY", name: "EVOPLAY" },
  { url: "/assets/llwin/providers/fastspin.png", link: "/FASHPIN", name: "FASTSPIN" },
  { url: "/assets/llwin/providers/jdb.png", link: "/JDB", name: "JDB" },
  { url: "/assets/llwin/providers/jili.png", link: "/JILI", name: "JILI" },
  { url: "/assets/llwin/providers/pp.png", link: "/PP", name: "PRAGMATIC PLAY" },
  { url: "/assets/llwin/providers/spade.png", link: "/SPADEGAMING", name: "SPADEGAMING" },
  { url: "/assets/llwin/providers/spribe.png", link: "/SPRIBE", name: "SPRIBE" },
  { url: "/assets/llwin/providers/va.png", link: "/VA", name: "VA" },
  { url: "/assets/llwin/providers/fc.png", link: "/FC", name: "FC" },
] as const;
