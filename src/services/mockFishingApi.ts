/**
 * Mock API — Danh sách game bắn cá chi tiết và đầy đủ cho tất cả 30 sảnh game.
 * Dùng cho `/fishing/slot/:room`.
 */

export type FishingMockRow = { name: string; showIcon: string; id: number; vassalage: string };

// 1. JILI
const JILI_FISHING_TABLE: FishingMockRow[] = [
  { id: 171071, name: "Jackpot Đánh Cá", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JL/EN/JL0005.avif", vassalage: "JILI" },
  { id: 171070, name: "Nhà Tư Bản Khủng Long", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JL/EN/JL0004.webp", vassalage: "JILI" },
  { id: 188833, name: "Jackpot Vua Tài Lộc", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JL/VI/JL0183.png", vassalage: "JILI" },
  { id: 171073, name: "Bắn Cá Vương Giả", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JL/EN/JL0007.avif", vassalage: "JILI" },
  { id: 171074, name: "Đoạt Bảo Truyền Kỳ", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JL/EN/JL0008.avif", vassalage: "JILI" },
  { id: 180386, name: "Jackpot Vua Đại Dương", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JL/EN/JL0136.avif", vassalage: "JILI" },
  { id: 171075, name: "Đánh Cá Vui Vẻ", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JL/EN/JL0009.avif", vassalage: "JILI" },
  { id: 197460, name: "Câu Cá Hũ Vàng Tốc Độ 2", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JL/EN/736.avif", vassalage: "JILI" },
  { id: 197027, name: "Giải Đặc Biệt Rạp Xiếc", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JL/EN/667.avif", vassalage: "JILI" },
  { id: 176834, name: "Nhà Tư Bản Khủng Long 2", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JL/EN/JL0111.webp", vassalage: "JILI" },
  { id: 172438, name: "Dàn Sao Đánh Cá", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JL/EN/JL0050.webp", vassalage: "JILI" },
  { id: 193852, name: "Thây Ma May Mắn", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JL/EN/JL0231.avif", vassalage: "JILI" },
  { id: 171068, name: "Tiền Long Đánh Cá", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JL/EN/JL0002.webp", vassalage: "JILI" },
  { id: 171072, name: "Phi Long Tàng Bảo", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JL/EN/JL0006.avif", vassalage: "JILI" },
  { id: 171069, name: "Nổ Cá Đến Rồi", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JL/EN/JL0003.avif", vassalage: "JILI" },
];

// 2. FC (FA CHAI)
const FC_FISHING_TABLE: FishingMockRow[] = [
  { id: 171614, name: "Thợ săn ngôi sao", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/FC/EN/FC0027.avif", vassalage: "FC" },
  { id: 186755, name: "Các Vị Thần Ban Phước Lành", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/FC/EN/FC0053.avif", vassalage: "FC" },
  { id: 171145, name: "Monkey King Fishing", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/FC/EN/FC0018.avif", vassalage: "FC" },
  { id: 171148, name: "Câu cá Fa Chai", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/FC/EN/FC0021.avif", vassalage: "FC" },
  { id: 171146, name: "Bao Chuan Fishing", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/FC/EN/FC0019.avif", vassalage: "FC" },
  { id: 171147, name: "Câu cá khốc liệt", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/FC/EN/FC0020.avif", vassalage: "FC" },
];

// 3. JDB
const JDB_FISHING_TABLE: FishingMockRow[] = [
  { id: 11981, name: "Bắn Cá Thần Tài", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JDB/EN/JDB082.avif", vassalage: "JDB" },
  { id: 11982, name: "Bắn Cá Ngũ Long", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JDB/EN/JDB083.avif", vassalage: "JDB" },
  { id: 165532, name: "Bắn Cá Phát Tài", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JDB/EN/JDB141.avif", vassalage: "JDB" },
  { id: 11979, name: "Bắn Cá Long Vương 1", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JDB/EN/JDB080.avif", vassalage: "JDB" },
  { id: 167627, name: "Thợ Săn Rồng", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JDB/EN/JDB152.avif", vassalage: "JDB" },
  { id: 181436, name: "Truyền Thuyết Thủy Triều Linh Hồn", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JDB/VI/JDB206.png", vassalage: "JDB" },
  { id: 193447, name: "Truyền Thuyết Rồng Tà Ác", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JDB/EN/JDB234.avif", vassalage: "JDB" },
  { id: 11980, name: "Bắn Cá Long Vương 2", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JDB/EN/JDB081.avif", vassalage: "JDB" },
  { id: 184688, name: "Chiến Binh Lửa", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JDB/EN/JDB213.avif", vassalage: "JDB" },
  { id: 168191, name: "Vũ trường câu cá", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JDB/EN/JDB154.avif", vassalage: "JDB" },
];

// 4. CQ9
const CQ9_FISHING_TABLE: FishingMockRow[] = [
  { id: 12049, name: "Bắn Cá Long Châu", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/CQ9/EN/CQ0232.avif", vassalage: "CQ9" },
  { id: 10294, name: "Thiên Đường", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/CQ9/EN/CQ0158.avif", vassalage: "CQ9" },
  { id: 171580, name: "Bắn Cá Anh Hùng", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/CQ9/EN/CQ0396.webp", vassalage: "CQ9" },
  { id: 193088, name: "Câu Cá Một Gậy", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/CQ9/EN/CQ0469.avif", vassalage: "CQ9" },
  { id: 194159, name: "Thiên Đường 2", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/CQ9/EN/CQ0491.avif", vassalage: "CQ9" },
  { id: 165492, name: "Bắn Cá May Mắn", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/CQ9/EN/CQ0305.avif", vassalage: "CQ9" },
];

// 5. FASHPIN / FASTSPIN
const FASHPIN_FISHING_TABLE: FishingMockRow[] = [
  { id: 199850, name: "Câu Cá Kho Báu", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/FS/EN/F-BF01.avif", vassalage: "FASHPIN" },
  { id: 182555, name: "Kho Báu Loài Cá", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/FS/EN/FS0045.avif", vassalage: "FASHPIN" },
  { id: 199572, name: "Lễ Hội Đại Dương", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/FS/EN/F-OC01.avif", vassalage: "FASHPIN" },
  { id: 199573, name: "Bắn Cá Vực Thẳm", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/FS/EN/F-BF01.avif", vassalage: "FASHPIN" },
];

// 6. SPADEGAMING
const SPADEGAMING_FISHING_TABLE: FishingMockRow[] = [
  { id: 171395, name: "Cuộc chiến câu cá", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/SG/EN/SG0131.avif", vassalage: "SPADEGAMING" },
  { id: 171394, name: "Thần câu cá", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/SG/EN/SG0130.avif", vassalage: "SPADEGAMING" },
  { id: 171392, name: "Bữa tiệc xác sống", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/SG/EN/SG0128.avif", vassalage: "SPADEGAMING" },
  { id: 190373, name: "Huyền Thoại Câu Cá", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/SG/VI/SG0179.png", vassalage: "SPADEGAMING" },
  { id: 171393, name: "Thợ săn người ngoài hành tinh", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/SG/EN/SG0129.avif", vassalage: "SPADEGAMING" },
];

// 7. PG (POCKET GAMES SOFT)
const PG_FISHING_TABLE: FishingMockRow[] = [
  { id: 201001, name: "Tiền Thưởng Cá Mập Hoàng Kim", showIcon: "https://images.484930494.com/TCG_GAME_ICONS/PG/EN/PG0150.png", vassalage: "PG" },
  { id: 201002, name: "Win Win Fish Prawn Crab", showIcon: "https://images.484930494.com/TCG_GAME_ICONS/PG/EN/PG0108.png", vassalage: "PG" },
  { id: 201003, name: "Nàng Tiên Cá Thủy Cung", showIcon: "https://images.484930494.com/TCG_GAME_ICONS/PG/EN/PG0089.png", vassalage: "PG" },
  { id: 201004, name: "Bí Mật Biển Sâu Poseidon", showIcon: "https://images.484930494.com/TCG_GAME_ICONS/PG/EN/PG0039.png", vassalage: "PG" },
  { id: 201005, name: "Thần Long Đánh Cá 3D", showIcon: "https://images.484930494.com/TCG_GAME_ICONS/PG/EN/PG0140.png", vassalage: "PG" },
  { id: 201006, name: "Vận May Đại Dương Xanh", showIcon: "https://images.484930494.com/TCG_GAME_ICONS/PG/EN/PG0066.png", vassalage: "PG" },
];

// 8. 168GAME
const GAME168_FISHING_TABLE: FishingMockRow[] = [
  { id: 202001, name: "168 Bắn Cá Phát Tài", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JL/EN/JL0005.avif", vassalage: "168GAME" },
  { id: 202002, name: "168 Vua Biển Sâu", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JDB/EN/JDB082.avif", vassalage: "168GAME" },
  { id: 202003, name: "168 Săn Thủy Quái", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/CQ9/EN/CQ0232.avif", vassalage: "168GAME" },
  { id: 202004, name: "168 Đại Chiến Rồng Thần", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/FC/EN/FC0018.avif", vassalage: "168GAME" },
  { id: 202005, name: "168 Câu Cá VIP 3D", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/SG/EN/SG0130.avif", vassalage: "168GAME" },
];

// 9. TURBO GAMES
const TURBO_GAMES_FISHING_TABLE: FishingMockRow[] = [
  { id: 203001, name: "Turbo Fish Hunter Pro", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JL/EN/736.avif", vassalage: "TURBO_GAMES" },
  { id: 203002, name: "Turbo Ocean Strike", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JDB/EN/JDB152.avif", vassalage: "TURBO_GAMES" },
  { id: 203003, name: "Turbo Fishing Boom", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/FS/EN/F-BF01.avif", vassalage: "TURBO_GAMES" },
  { id: 203004, name: "Turbo Aqua Rush", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/SG/EN/SG0131.avif", vassalage: "TURBO_GAMES" },
];

// 10. TOP PLAYER
const TOP_PLAYER_FISHING_TABLE: FishingMockRow[] = [
  { id: 204001, name: "Top Player Đánh Cá Vương", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JL/EN/JL0007.avif", vassalage: "TOP_PLAYER" },
  { id: 204002, name: "Top Player Bắn Cá Thần Kỳ", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JDB/EN/JDB080.avif", vassalage: "TOP_PLAYER" },
  { id: 204003, name: "Top Player Thợ Săn Rồng Biển", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/FC/EN/FC0027.avif", vassalage: "TOP_PLAYER" },
  { id: 204004, name: "Top Player Cá Mập Bất Tử", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/CQ9/EN/CQ0396.webp", vassalage: "TOP_PLAYER" },
];

// 11. SPRIBE
const SPRIBE_FISHING_TABLE: FishingMockRow[] = [
  { id: 205001, name: "Spribe Fishing Rush", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/SG/VI/SG0179.png", vassalage: "SPRIBE" },
  { id: 205002, name: "Spribe Ocean Miner", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JL/EN/JL0136.avif", vassalage: "SPRIBE" },
  { id: 205003, name: "Spribe Aqua Pilot", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JDB/VI/JDB206.png", vassalage: "SPRIBE" },
  { id: 205004, name: "Spribe Deep Blue Turbo", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/FS/EN/F-OC01.avif", vassalage: "SPRIBE" },
];

// 12. MEGAWIN
const MEGAWIN_FISHING_TABLE: FishingMockRow[] = [
  { id: 206001, name: "Megawin Bắn Cá Nổ Hũ", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JL/VI/JL0183.png", vassalage: "MEGAWIN" },
  { id: 206002, name: "Megawin Đại Dương Hoàng Kim", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JDB/EN/JDB083.avif", vassalage: "MEGAWIN" },
  { id: 206003, name: "Megawin Săn Boss Thần Tài", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/FC/EN/FC0053.avif", vassalage: "MEGAWIN" },
  { id: 206004, name: "Megawin Bắn Cá Siêu Cấp", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/CQ9/EN/CQ0491.avif", vassalage: "MEGAWIN" },
];

// 13. PP (PRAGMATIC PLAY)
const PP_FISHING_TABLE: FishingMockRow[] = [
  { id: 207001, name: "Big Bass Bonanza Fishing", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/FS/EN/F-BF01.avif", vassalage: "PP" },
  { id: 207002, name: "Big Bass Splash Hunter", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JL/EN/JL0009.avif", vassalage: "PP" },
  { id: 207003, name: "Mega Fishing Pragmatic", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JDB/EN/JDB082.avif", vassalage: "PP" },
  { id: 207004, name: "Release the Kraken Fish", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/SG/EN/SG0131.avif", vassalage: "PP" },
];

// 14. OCTOPLAY
const OCTOPLAY_FISHING_TABLE: FishingMockRow[] = [
  { id: 208001, name: "Octo Strike Fishing", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/CQ9/EN/CQ0158.avif", vassalage: "OCTOPLAY" },
  { id: 208002, name: "Octoplay Deep Sea Quest", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JL/EN/JL0008.avif", vassalage: "OCTOPLAY" },
  { id: 208003, name: "Octo Treasure Hunter", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JDB/EN/JDB141.avif", vassalage: "OCTOPLAY" },
];

// 15. VA
const VA_FISHING_TABLE: FishingMockRow[] = [
  { id: 209001, name: "VA Bắn Cá Thần Thú", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JL/EN/JL0006.avif", vassalage: "VA" },
  { id: 209002, name: "VA Long Vương Đại Chiến", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JDB/EN/JDB081.avif", vassalage: "VA" },
  { id: 209003, name: "VA Hải Tặc Bắn Cá", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/FC/EN/FC0019.avif", vassalage: "VA" },
];

// 16. ASKMESLOT
const ASKMESLOT_FISHING_TABLE: FishingMockRow[] = [
  { id: 210001, name: "Askme Fish Hunter 3D", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JL/EN/JL0005.avif", vassalage: "ASKMESLOT" },
  { id: 210002, name: "Askme Dragon Fish", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/SG/EN/SG0130.avif", vassalage: "ASKMESLOT" },
  { id: 210003, name: "Askme Mermaid Treasure", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JDB/EN/JDB154.avif", vassalage: "ASKMESLOT" },
];

// 17. KA GAMING
const KA_GAMING_FISHING_TABLE: FishingMockRow[] = [
  { id: 211001, name: "KA Legend of Erlang Fishing", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/FC/EN/FC0020.avif", vassalage: "KA_GAMING" },
  { id: 211002, name: "KA Golden Dragon King", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JDB/EN/JDB080.avif", vassalage: "KA_GAMING" },
  { id: 211003, name: "KA Ocean King 3D", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JL/EN/JL0002.webp", vassalage: "KA_GAMING" },
  { id: 211004, name: "KA Shark Hunter Pro", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/CQ9/EN/CQ0469.avif", vassalage: "KA_GAMING" },
];

// 18. EVOPLAY
const EVOPLAY_FISHING_TABLE: FishingMockRow[] = [
  { id: 212001, name: "Evoplay Ocean Legend", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JL/EN/JL0111.webp", vassalage: "EVOPLAY" },
  { id: 212002, name: "Evoplay Sea of Gold", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JDB/EN/JDB213.avif", vassalage: "EVOPLAY" },
  { id: 212003, name: "Evoplay Deep Hunter 3D", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/FS/EN/FS0045.avif", vassalage: "EVOPLAY" },
];

// 19. PLAYSTAR
const PLAYSTAR_FISHING_TABLE: FishingMockRow[] = [
  { id: 213001, name: "Playstar Fishing King", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/CQ9/EN/CQ0232.avif", vassalage: "PLAYSTAR" },
  { id: 213002, name: "Playstar Haiba Fishing", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JL/EN/JL0050.webp", vassalage: "PLAYSTAR" },
  { id: 213003, name: "Playstar Ocean Paradise", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/SG/EN/SG0128.avif", vassalage: "PLAYSTAR" },
];

// 20. AMIGO GAMING
const AMIGO_GAMING_FISHING_TABLE: FishingMockRow[] = [
  { id: 214001, name: "Amigo Fiesta Fishing", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JL/EN/667.avif", vassalage: "AMIGO_GAMING" },
  { id: 214002, name: "Amigo Sea Monster Strike", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JDB/EN/JDB234.avif", vassalage: "AMIGO_GAMING" },
  { id: 214003, name: "Amigo Golden Catch", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/FC/EN/FC0021.avif", vassalage: "AMIGO_GAMING" },
];

// 21. BP GAMES
const BP_GAMES_FISHING_TABLE: FishingMockRow[] = [
  { id: 215001, name: "BP Ocean Destroyer", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JDB/EN/JDB152.avif", vassalage: "BP_GAMES" },
  { id: 215002, name: "BP Dragon Hunter VIP", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JL/EN/JL0007.avif", vassalage: "BP_GAMES" },
  { id: 215003, name: "BP Fishing Strike 3D", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/CQ9/EN/CQ0305.avif", vassalage: "BP_GAMES" },
];

// 22. PLAYACE
const PLAYACE_FISHING_TABLE: FishingMockRow[] = [
  { id: 216001, name: "PlayAce Ace Fish Strike", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JL/EN/JL0004.webp", vassalage: "PLAYACE" },
  { id: 216002, name: "PlayAce Ocean Fortune", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JDB/EN/JDB082.avif", vassalage: "PLAYACE" },
  { id: 216003, name: "PlayAce Golden Shark", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/SG/EN/SG0129.avif", vassalage: "PLAYACE" },
];

// 23. LUCKY MONACO
const LUCKY_MONACO_FISHING_TABLE: FishingMockRow[] = [
  { id: 217001, name: "Monaco Casino Fishing", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JL/VI/JL0183.png", vassalage: "LUCKY_MONACO" },
  { id: 217002, name: "Monaco Royal Fish Quest", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/FC/EN/FC0053.avif", vassalage: "LUCKY_MONACO" },
  { id: 217003, name: "Monaco Deep Wealth", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/CQ9/EN/CQ0396.webp", vassalage: "LUCKY_MONACO" },
];

// 24. RICH88
const RICH88_FISHING_TABLE: FishingMockRow[] = [
  { id: 218001, name: "Rich88 Bắn Cá Thần Tài", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JDB/EN/JDB082.avif", vassalage: "RICH88" },
  { id: 218002, name: "Rich88 Đoạt Bảo Hoàng Kim", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JL/EN/JL0008.avif", vassalage: "RICH88" },
  { id: 218003, name: "Rich88 Bắn Cá Hải Vương", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/FC/EN/FC0027.avif", vassalage: "RICH88" },
  { id: 218004, name: "Rich88 Săn Cá May Mắn", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/SG/EN/SG0130.avif", vassalage: "RICH88" },
];

// 25. MASCOT
const MASCOT_FISHING_TABLE: FishingMockRow[] = [
  { id: 219001, name: "Mascot Ocean Storm", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JL/EN/JL0231.avif", vassalage: "MASCOT" },
  { id: 219002, name: "Mascot Coral Reef Strike", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/FS/EN/F-OC01.avif", vassalage: "MASCOT" },
  { id: 219003, name: "Mascot Deep Ocean VIP", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JDB/EN/JDB083.avif", vassalage: "MASCOT" },
];

// 26. VIRTUAL TECH
const VIRTUAL_TECH_FISHING_TABLE: FishingMockRow[] = [
  { id: 220001, name: "Virtual Tech Cyber Fishing", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JL/EN/JL0006.avif", vassalage: "VIRTUAL_TECH" },
  { id: 220002, name: "Virtual Tech Ocean AI", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/CQ9/EN/CQ0469.avif", vassalage: "VIRTUAL_TECH" },
  { id: 220003, name: "Virtual Tech Aqua Bot", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JDB/EN/JDB080.avif", vassalage: "VIRTUAL_TECH" },
];

// 27. GEMINI
const GEMINI_FISHING_TABLE: FishingMockRow[] = [
  { id: 221001, name: "Gemini Twin Dragon Fish", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/FC/EN/FC0018.avif", vassalage: "GEMINI" },
  { id: 221002, name: "Gemini Star Ocean Catch", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JL/EN/JL0050.webp", vassalage: "GEMINI" },
  { id: 221003, name: "Gemini Crystal Reef", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/SG/VI/SG0179.png", vassalage: "GEMINI" },
];

// 28. SKYWIND
const SKYWIND_FISHING_TABLE: FishingMockRow[] = [
  { id: 222001, name: "Skywind Sea Monster Hunting", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JDB/EN/JDB234.avif", vassalage: "SKYWIND" },
  { id: 222002, name: "Skywind Dragon King 3D", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JL/EN/JL0005.avif", vassalage: "SKYWIND" },
  { id: 222003, name: "Skywind Ocean Fortune", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/FS/EN/F-BF01.avif", vassalage: "SKYWIND" },
];

// 29. MEGA ENTERTAINMENT
const MEGA_ENTERTAINMENT_FISHING_TABLE: FishingMockRow[] = [
  { id: 223001, name: "Mega Entertainment Fish Party", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JL/EN/JL0009.avif", vassalage: "MEGA_ENTERTAINMENT" },
  { id: 223002, name: "Mega Entertainment Aqua Carnival", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JDB/EN/JDB154.avif", vassalage: "MEGA_ENTERTAINMENT" },
  { id: 223003, name: "Mega Entertainment Grand Fish", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/FC/EN/FC0020.avif", vassalage: "MEGA_ENTERTAINMENT" },
];

// 30. 1X2
const ONE_X_TWO_FISHING_TABLE: FishingMockRow[] = [
  { id: 224001, name: "1X2 Deep Sea Strike", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/CQ9/EN/CQ0232.avif", vassalage: "1X2" },
  { id: 224002, name: "1X2 Fishing League 3D", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/JL/EN/JL0003.avif", vassalage: "1X2" },
  { id: 224003, name: "1X2 Golden Shark Blitz", showIcon: "https://images.7087053.com/TCG_GAME_ICONS/SG/EN/SG0131.avif", vassalage: "1X2" },
];

/**
 * Mapping đầy đủ 30 sảnh game chuẩn xác theo key và alias
 */
export const FISHING_MOCK_TABLES: Record<string, FishingMockRow[]> = {
  // 1. PG
  PG: PG_FISHING_TABLE,
  // 2. JILI
  JILI: JILI_FISHING_TABLE,
  // 3. FC
  FC: FC_FISHING_TABLE,
  // 4. 168GAME
  "168GAME": GAME168_FISHING_TABLE,
  GAME168: GAME168_FISHING_TABLE,
  "168_GAME": GAME168_FISHING_TABLE,
  // 5. TURBO GAMES
  TURBO_GAMES: TURBO_GAMES_FISHING_TABLE,
  TURBOGAMES: TURBO_GAMES_FISHING_TABLE,
  "TURBO GAMES": TURBO_GAMES_FISHING_TABLE,
  // 6. TOP PLAYER
  TOP_PLAYER: TOP_PLAYER_FISHING_TABLE,
  TOPPLAYER: TOP_PLAYER_FISHING_TABLE,
  "TOP PLAYER": TOP_PLAYER_FISHING_TABLE,
  // 7. SPRIBE
  SPRIBE: SPRIBE_FISHING_TABLE,
  // 8. MEGAWIN
  MEGAWIN: MEGAWIN_FISHING_TABLE,
  // 9. JDB
  JDB: JDB_FISHING_TABLE,
  // 10. PP (PRAGMATIC PLAY)
  PP: PP_FISHING_TABLE,
  PRAGMATIC: PP_FISHING_TABLE,
  "PRAGMATIC PLAY": PP_FISHING_TABLE,
  PRAGMATIC_PLAY: PP_FISHING_TABLE,
  // 11. CQ9
  CQ9: CQ9_FISHING_TABLE,
  // 12. OCTOPLAY
  OCTOPLAY: OCTOPLAY_FISHING_TABLE,
  // 13. VA
  VA: VA_FISHING_TABLE,
  // 14. ASKMESLOT
  ASKMESLOT: ASKMESLOT_FISHING_TABLE,
  ASKME_SLOT: ASKMESLOT_FISHING_TABLE,
  // 15. KA GAMING
  KA_GAMING: KA_GAMING_FISHING_TABLE,
  KAGAMING: KA_GAMING_FISHING_TABLE,
  "KA GAMING": KA_GAMING_FISHING_TABLE,
  KA: KA_GAMING_FISHING_TABLE,
  // 16. EVOPLAY
  EVOPLAY: EVOPLAY_FISHING_TABLE,
  // 17. PLAYSTAR
  PLAYSTAR: PLAYSTAR_FISHING_TABLE,
  // 18. AMIGO GAMING
  AMIGO_GAMING: AMIGO_GAMING_FISHING_TABLE,
  AMIGOGAMING: AMIGO_GAMING_FISHING_TABLE,
  "AMIGO GAMING": AMIGO_GAMING_FISHING_TABLE,
  // 19. BP GAMES
  BP_GAMES: BP_GAMES_FISHING_TABLE,
  BPGAMES: BP_GAMES_FISHING_TABLE,
  "BP GAMES": BP_GAMES_FISHING_TABLE,
  // 20. FASHPIN / FASTSPIN
  FASHPIN: FASHPIN_FISHING_TABLE,
  FASTSPIN: FASHPIN_FISHING_TABLE,
  // 21. PLAYACE
  PLAYACE: PLAYACE_FISHING_TABLE,
  PLAY_ACE: PLAYACE_FISHING_TABLE,
  // 22. LUCKY MONACO
  LUCKY_MONACO: LUCKY_MONACO_FISHING_TABLE,
  LUCKYMONACO: LUCKY_MONACO_FISHING_TABLE,
  "LUCKY MONACO": LUCKY_MONACO_FISHING_TABLE,
  // 23. SPADEGAMING
  SPADEGAMING: SPADEGAMING_FISHING_TABLE,
  SPADE_GAMING: SPADEGAMING_FISHING_TABLE,
  // 24. RICH88
  RICH88: RICH88_FISHING_TABLE,
  // 25. MASCOT
  MASCOT: MASCOT_FISHING_TABLE,
  // 26. VIRTUAL TECH
  VIRTUAL_TECH: VIRTUAL_TECH_FISHING_TABLE,
  VIRTUALTECH: VIRTUAL_TECH_FISHING_TABLE,
  "VIRTUAL TECH": VIRTUAL_TECH_FISHING_TABLE,
  // 27. GEMINI
  GEMINI: GEMINI_FISHING_TABLE,
  // 28. SKYWIND
  SKYWIND: SKYWIND_FISHING_TABLE,
  // 29. MEGA ENTERTAINMENT
  MEGA_ENTERTAINMENT: MEGA_ENTERTAINMENT_FISHING_TABLE,
  MEGAENTERTAINMENT: MEGA_ENTERTAINMENT_FISHING_TABLE,
  "MEGA ENTERTAINMENT": MEGA_ENTERTAINMENT_FISHING_TABLE,
  // 30. 1X2
  "1X2": ONE_X_TWO_FISHING_TABLE,
  "1X2GAMING": ONE_X_TWO_FISHING_TABLE,
};

export const mockFishingApi = {
  tableListData: FISHING_MOCK_TABLES,

  async getTableList(typeGame: string) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const upperKey = (typeGame || "").toUpperCase().replace(/\s+/g, "_");
    const exactKey = (typeGame || "").toUpperCase();
    
    let baseData = this.tableListData[exactKey] || this.tableListData[upperKey];

    if (!baseData || baseData.length === 0) {
      // Fallback nếu có sảnh chưa map
      baseData = JILI_FISHING_TABLE.map((item, idx) => ({
        ...item,
        id: 300000 + idx * 10,
        vassalage: exactKey,
      }));
    }

    const data = baseData.map((item) => {
      const isHighPercent = Math.random() < 0.35;
      const percent = isHighPercent
        ? Math.floor(Math.random() * 10) + 86
        : Math.floor(Math.random() * 85) + 1;
      return { ...item, percent };
    });
    return { data };
  },
};
