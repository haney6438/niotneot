/* item 조합 계산 함수 */
import { MG_EMPTY_BUBBLES, JH_EMPTY_BUBBLES, RANDOM_BUBBLES, SET } from "../data/ItemSet";

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// room은 이제 배열. bottom 카테고리 아이템이 하나라도 있으면 착용으로 침
function isRoomEmpty(room) {
  return !room.some((item) => item.category === "bottom");
}

export function getWornIds(wornItems) {
  return [...wornItems.mg, ...wornItems.jh].map((item) => item.id);
}

// 카테고리별로 하나씩 꺼내기 (FinalCharacter에서 쓰기 위해)
export function getItemByCategory(room, category) {
  return room.find((item) => item.category === category) ?? null;
}

export function getResult(wornItems) {
  if (isRoomEmpty(wornItems.mg)) {
    return { type: "bubble", content: pickRandom(MG_EMPTY_BUBBLES) };
  }

  if (isRoomEmpty(wornItems.jh)) {
    return { type: "bubble", content: pickRandom(JH_EMPTY_BUBBLES) };
  }

  const wornIds = getWornIds(wornItems);

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
      bgImage: matched.bgImage,
    };
  }

  return { type: "bubble", content: pickRandom(RANDOM_BUBBLES) };
}

export function getFinalItemImage(itemImage) {
  const parts = itemImage.split("/");
  const filename = parts.pop();
  return [...parts, "final-item-img", filename].join("/");
}

export function resolveItemImage(roomId, itemImg) {
  return roomId === "mg" ? getFinalItemImage(itemImg) : itemImg;
}