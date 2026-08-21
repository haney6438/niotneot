/* item 조합 파일 */

// 아이템 미착용
export const EMPTY_BUBBLE = "아직 아무것도 안 입었어요!";

// 특정 아이템 하나만으로 발동하는 말풍선 (조합x 의상 착용 여부o)
export const RANDOM_BUBBLES = [
  "오늘 옷 잘 어울린다!",
  "이 조합 신박한데?",
  "패션 센스 있네",
];

export const SET = [
  {
    id: "set_1",
    requiredItems: ["hat_01", "shoes_01"],
    type: "bottomsheet",
    content: {
      title: "이 조합, 왠지 낯익은데?",
      links: [
        { label: "관련 기사", url: "https://example.com/article" },
        { label: "SNS 게시물", url: "https://instagram.com/..." },
      ],
    },
  },
  {
    id: "set_2",
    requiredItems: ["top_01", "shoes_02", "hat_03"],
    type: "bottomsheet",
    content: {
      title: "다른 특별 조합",
      links: [{ label: "기사 링크", url: "https://..." }],
    },
  },
];
