/* item 조합 계산 함수 */
import { MG_EMPTY_BUBBLES, JH_EMPTY_BUBBLES, RANDOM_BUBBLES, SET } from "../data/ItemSet";

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// room은 이제 { top, outer, bottom, shoes, acc: [] } 객체
function isRoomEmpty(room) {
  return room.bottom === null; // 하의 미착용 = 미착용으로 침
}

// 슬롯(top/outer/bottom/shoes) + acc 배열을 합쳐서 id 목록으로
function getWornIds(wornItems) {
  const collectRoom = (room) => {
    const slots = [room.top, room.outer, room.bottom, room.shoes].filter(Boolean);
    return [...slots, ...room.acc].map((item) => item.id);
  };

  return [...collectRoom(wornItems.mg), ...collectRoom(wornItems.jh)];
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