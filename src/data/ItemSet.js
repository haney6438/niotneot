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
      links: [
        {
          label: "관련 기사",
          url: "https://coding-factory.tistory.com/909",
          image: "/img/preview_1.png",
          description: "실제 링크의 내용 어쩌구 저쩌구.. 두줄까지 출력..",
        },
        {
          label: "SNS 게시물",
          url: "https://www.instagram.com/p/DcTA9iGFHRk/",
          image: "/img/preview_2.png",
          description: "인스타 게시물 설명 텍스트...",
        },
      ],
    },
  },
  // ...
];