/* item 조합 계산 함수 */
import { MG_EMPTY_BUBBLES, JH_EMPTY_BUBBLES, RANDOM_BUBBLES, SET } from "../data/ItemSet";

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function isRoomEmpty(room) {
  return room.bottom === null; // 하의 미착용 = 미착용으로 침
}

export function getWornIds(wornItems) {
  return [wornItems.mg, wornItems.jh]
    .flatMap((room) => Object.values(room))
    .filter(Boolean)
    .map((item) => item.id);
}

export function getResult(wornItems) {
  // 1. 민규 미착용
  if (isRoomEmpty(wornItems.mg)) {
    return { type: "bubble", content: pickRandom(MG_EMPTY_BUBBLES) };
  }

  // 2. 정한 미착용
  if (isRoomEmpty(wornItems.jh)) {
    return { type: "bubble", content: pickRandom(JH_EMPTY_BUBBLES) };
  }

  const wornIds = getWornIds(wornItems);

  // 3. 세트 매칭
  const matched = SET.find((set) => {
    const hasAllRequired = set.requiredItems.every((id) => wornIds.includes(id));
    if (!hasAllRequired) return false;

    const excludeCategories = set.excludeCategories ?? [];
    return !excludeCategories.some((prefix) =>
      wornIds.some((id) => id.startsWith(prefix))
    );
  });

  if (matched) {
    return {
      type: matched.type,
      title: matched.title,
      info: matched.info,
      content: matched.content,
    };
  }

  // 4. 매칭 없으면 일반 랜덤
  return { type: "bubble", content: pickRandom(RANDOM_BUBBLES) };
}