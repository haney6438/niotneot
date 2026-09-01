/* item 조합 파일 */

// 민규 미착용
export const MG_EMPTY_BUBBLES = [
  { text: "민규야 너무 과해", speaker: "jh" },
];

// 정한 미착용 (텍스트 채워주세요 - 자리만 잡아둠)
export const JH_EMPTY_BUBBLES = [
  { text: "벗겨놓잖아? 꼴뚜기같아 느낌이", speaker: "mg" },
];

// 특정 아이템 하나만으로 발동하는 말풍선 (조합x 의상 착용 여부o)
export const RANDOM_BUBBLES = [
  { text: "오~ 김밍규 ㅎㅎㅎ", speaker: "jh" },
  { text: "너랑 나같다", speaker: "jh" },
  { text: "멋진 밍구", speaker: "jh" },
  { text: "가댜 김민규!", speaker: "jh" },
  { text: "정한아? ㅎ", speaker: "mg" },
  { text: "형 니는 옷이 그게 머냐", speaker: "mg" },
  { text: "우린 운명이야 🖤", speaker: "mg" },
  { text: "나 멋짖 멋짖 멋지지 맞ㅈ", speaker: "mg" },
];

export const SET = [
  {
    id: "set_1",
    requiredItems: [ //상 하의 0 신발,악세 x
      "mg_top_201", "jh_top_201","jh_top_202",
      "mg_bottom_201", "jh_bottom_201"],
    title: "제주도 빈티지 편집샵 데이트",
    info: "2026",
    type: "bottomsheet",
    bgImage: "/item-set-img/set1-bg-mobile.png",
    content: {
      links: [
        {
          label: "민규 인스타",
          url: "https://www.instagram.com/p/DbnIO8ZkxFa/?utm_source=ig_web_copy_link&igsi=MzRlODBiNWFlZA==",
          image: "/link-img/set1_1.png",
          description: "",
        },
        {
          label: "정한 인스타",
          url: "https://www.instagram.com/p/DcXqKebkRue/?utm_source=ig_web_copy_link&igsi=MzRlODBiNWFlZA==",
          image: "/link-img/set1_2.png",
          description: "🐳",
        },
        {
          label: "목격담",
          url: "https://x.com/svt_marron/status/2074271228408525005?s=20",
          image: "/link-img/set1_3.png",
          description: "하 더 자세히 알고싶어서 짜증나 밍쫑 니네가 직접 비하인드 풀어줘",
        },
        {
          label: "제품 정보",
          url: "https://www.instagram.com/p/DcAidOGHV7v/?utm_source=ig_web_copy_link&igsi=MzRlODBiNWFlZA==",
          image: "/link-img/set1_4.png",
          description: "요루거즈면 롱,숏 로브와 세븐틴바지💎🩵 오늘 밤 10시 라이브로 만나요!",
        },
      ],
    },
  },
  // set_2: 홍콩 데이트
  {
    id: "set_2",
    requiredItems: [
      "mg_top_202", "jh_top_203", "jh_top_204",
      "mg_bottom_202", "jh_bottom_202",
      "mg_acc_201", "jh_acc_201", "jh_acc_202",
      "mg_shoes_201", "jh_shoes_201",
    ],
    title: "홍콩 데이트",
    info: "2026",
    type: "bottomsheet",
    content: {
      links: [
        {
          label: "목격담", //https://www.sotwe.com/TIANXIAOBINGA
          url: "https://www.xiaohongshu.com/discovery/item/69a1488e00000000290308f6?source=webshare&xhsshare=pc_web&xsec_token=CBLFdNJAPhHTRBuAkfGjLYhwU6QmQGAJP04qccbHIHiQ4=&xsec_source=pc_share",
          image: "/link-img/set2_1.png",
          description: "香港偶遇金珉奎尹净汉260227 #seventeen #金珉奎#尹净汉#帅哥",
        },
      ],
    },
  },

  // set_3: 압구정 데이트
  {
    id: "set_3",
    requiredItems: [ //신발 x
      "mg_top_203", "mg_top_204", "jh_top_203", "jh_top_205",
      "mg_bottom_203", "jh_bottom_203",
      "mg_acc_202", "jh_acc_203",
    ],
    title: "압구정 데이트",
    info: "2022",
    type: "bottomsheet",
    bgImage: "/item-set-img/set3-bg-mobile.png",
    content: {
      links: [
        {
          label: "민규 인스타",
          url: "https://www.instagram.com/p/Cb4eDYhLdaB/?utm_source=ig_web_copy_link&igsi=MzRlODBiNWFlZA==",
          image: "/link-img/set3_1.png",
          description: "💙",
        },
        {
          label: "민규 인스타",
          url: "https://www.instagram.com/p/Cb4mLTArql2/?utm_source=ig_web_copy_link&igsi=MzRlODBiNWFlZA==",
          image: "/link-img/set3_2.png",
          description: "",
        },
        {
          label: "정한 위버스",
          url: "https://weverse.io/seventeen/artist/2-2845?hl=ko",
          image: "/link-img/set3_3.png",
          description: "인스타 사진 민규가찍어준걸로 오해하지마세요 민규는 아주 지는 멋있는데서찍고 나는 무단투기 경고 에서 여기 서보라고하거 찍어주고 하트로꾸면서 귀엽지 이러면서 보내준거니까 그렇다고 사진이 맘에안든다는건아니고 그냥 그렇다고💛다들 사랑한다구",
        },
        {
          label: "목격담",
          url: "https://x.com/a29_ev/status/1560067295094788096?s=20",
          image: "/link-img/set3_4.png",
          description: "얘들아 .. 밍쫑 압구정 목격담 떴다 아마도 이땐가봐 '뒷머리채잡고 땡기고 도망가고'",
        },
      ],
    },
  },

  // set_4: 모닝뽀뽀 (나나투어)
  {
    id: "set_4",
    requiredItems: [ //민규 신발,악세 x
      "jh_top_206",
      "mg_bottom_204", "jh_bottom_204",
      "jh_acc_05",
      "jh_acc_204",
      "jh_shoes_202",
    ],
    excludeCategories: ["mg_top"], //민규 상의 제외
    title: "모닝뽀뽀",
    info: "나나투어, 뭐하는거야? 이쁘잖아",
    type: "bottomsheet",
    content: {
      links: [
        {
          label: "[FULL] 함께가요 나나투어 EP3-2. 떠나요 옵션투어",
          url: "https://weverse.io/seventeen/media/1-132877041?hl=ko",
          image: "/link-img/set4_1.png",
          description: "16분 42초~",
        },
        {
          label: "영상 컷",
          url: "https://x.com/JEONGHAN_moment/status/1748334286988779731?s=20",
          image: "/link-img/set4_2.png",
          description: `정한이 민규 자고있는데 볼뽀뽀 해줬더 ㅜ
🦖뭐하는 거야?
😇이쁘잖아~`,
        },
      ],
    },
  },

  // set_5: 15 목동 팬싸 (15할로윈)
  {
    id: "set_5",
    requiredItems: [
      "mg_top_205", "mg_top_206", "jh_top_207",
      "mg_bottom_205", "jh_bottom_205",
      "mg_acc_203", "jh_acc_205",
      "mg_shoes_202", "jh_shoes_203",
    ],
    title: "할로윈 규정",
    info: "2015",
    type: "bottomsheet",
    bgImage: "/item-set-img/set5-bg-mobile.png",
    content: {
      links: [
        {
          label: "세븐틴 공식 X 계정",
          url: "https://x.com/pledis_17/status/660102197875621888?s=20",
          image: "/link-img/set5_1.png",
          description: `[Doogi PD] 데뷔 후 첫 할로윈 기념 코스튬!!
뱀파이어부터 멤버 체인지까지!
#네븐틴_아닌_세븐틴 #Trick_or_Treat
#MAMA 도 #신인상_후보 #세븐틴 #만세`,
        },
        {
          label: "Youtube",
          url: "https://youtu.be/nPlTZ_Ea_i4?si=AT-zpl0XT63jzVR8",
          image: "/link-img/set5_2.png",
          description: "151030 목동 팬사인회 - 정한, 민규.ver",
        },
        {
          label: "팬아트",
          url: "https://x.com/_00mjj/status/1721427791466635701?s=20",
          image: "/link-img/set5_3.png",
          description: "",
        },
        {
          label: "민규 사진",
          url: "https://x.com/past_mingyu/status/792506233655664640?s=20",
          image: "/link-img/set5_4.png",
          description: "151030 목동 팬사인회 뱀파이어 민규 💕",
        },
        {
          label: "정한 사진",
          url: "https://x.com/affection_YJH/status/665557102371274752?s=20",
          image: "/link-img/set5_5.png",
          description: "151030 목동 팬싸인회 #정한 #윤정한 #세븐틴 - 아무리봐도 낫닝겐이 분명해ㄷㄷㄷㄷ보고 또 봐도 자꾸 보고싶은 너어어어ㅓ...",
        },
        {
          label: "민규&정한 사진",
          url: "https://x.com/MyNeverland17/status/867751226179321856?s=20",
          image: "/link-img/set5_6.png",
          description: "151030 목동 팬사 #민규 #MINGYU #정한 #JEONGHAN #세븐틴 #SEVENTEEN",
        },
      ],
    },
  },
];