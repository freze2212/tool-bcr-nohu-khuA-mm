export type FishingGameProvider = {
  url: string;
  link: string;
  name: string;
};

/**
 * Các sảnh Game Bắn Cá có sẵn trong hệ thống — lấy ảnh tương ứng từ Figma Node 1:17470
 */
export const FISHING_GAME_PROVIDERS: readonly FishingGameProvider[] = [
  { url: "/assets/fishing/providers/fishing_provider_02.png", link: "/JILI", name: "JILI ĐIỆN TỬ" },
  { url: "/assets/fishing/providers/fishing_provider_03.png", link: "/FC", name: "FC ĐIỆN TỬ" },
  { url: "/assets/fishing/providers/fishing_provider_09.png", link: "/JDB", name: "JDB ĐIỆN TỬ" },
  { url: "/assets/fishing/providers/fishing_provider_11.png", link: "/CQ9", name: "CQ9 ĐIỆN TỬ" },
  { url: "/assets/fishing/providers/fishing_provider_20.png", link: "/FASHPIN", name: "FASTSPIN ĐIỆN TỬ" },
  { url: "/assets/fishing/providers/fishing_provider_23.png", link: "/SPADEGAMING", name: "SPADEGAMING ĐIỆN TỬ" },
] as const;
