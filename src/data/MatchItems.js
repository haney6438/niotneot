/* item 조합 계산 함수 */

import { EMPTY_BUBBLE, RANDOM_BUBBLES, SET } from "../data/ItemSet";

export function getResult(selectedItemIds) {
  // 1. 아무것도 안 입은 경우
  if (selectedItemIds.length === 0) {
    return { type: "bubble", content: EMPTY_BUBBLE };
  }

  // 2. 특정 조합과 일치하는지 먼저 확인 (필수템 + 제외 카테고리)
  const matched = SET.find((set) => {
    const hasAllRequired = set.requiredItems.every((id) =>
      selectedItemIds.includes(id)
    );
    if (!hasAllRequired) return false;

    const excludeCategories = set.excludeCategories ?? [];
    const violatesExclude = excludeCategories.some((prefix) =>
      selectedItemIds.some((id) => id.startsWith(prefix))
    );
    if (violatesExclude) return false;

    return true;
  });

  if (matched) {
    return { type: matched.type, content: matched.content };
  }

  // 3. 매칭되는 세트 없으면 랜덤 말풍선
  const random =
    RANDOM_BUBBLES[Math.floor(Math.random() * RANDOM_BUBBLES.length)];
  return { type: "bubble", content: random };
}