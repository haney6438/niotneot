/* item 조합 계산 함수 */

import { EMPTY_BUBBLE, RANDOM_BUBBLES, SET } from "../data/ItemSet";

export function getResult(selectedItemIds) {
  // 1. 아무것도 안 입은 경우
  if (selectedItemIds.length === 0) {
    return { type: "bubble", content: EMPTY_BUBBLE };
  }

  // 2. 그 외엔 랜덤 말풍선
  const random = RANDOM_BUBBLES[Math.floor(Math.random() * RANDOM_BUBBLES.length)];
  return { type: "bubble", content: random };

  // 3. 특정 조합과 정확히 일치하는지 확인
  const matched = SET.find((outcome) =>
    outcome.requiredItems.every((id) => selectedItemIds.includes(id))
  );

  if (matched) {
    return { type: matched.type, content: matched.content };
  }

}