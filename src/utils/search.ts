import { metaphone } from "metaphone";
import { stemmer } from "stemmer";
import { levenshteinEditDistance } from "levenshtein-edit-distance";
import { soundex } from "soundex-code";

import { pinyin } from "pinyin-pro";
import { franc } from "franc";
//const { pinyin } = pinyinPro;

type IndexedVocabluary = {
  original: string;
  originalPinYin: string;
  pinyin: string;
  metaphone: string;
  soundex: string;
  stemmed: string;
  translation: string;
  distance?: number;
};

export function langaugeDetection(str: string) {
  return franc(str, {
    minLength: 1,
    only: [
      "cmn",
      "eng",
      "jpn",
      "kor",
      "may",
      "vie",
      "rus",
      "zlm",
      "npi",
      "tam",
    ],
  });
}

export function getSimilarity(a: string, b: string) {
  return 1 - levenshteinEditDistance(a, b) / Math.max(a.length, b.length);
}

export function getPinyin(str: string) {
  return pinyin(str);
}

export function getMetaphone(str: string) {
  return metaphone(stemmer(getPinyin(str)));
}

export function getSoundex(str: string) {
  return soundex(str);
}

export function searchClosestLevinsteinDistance(
  str: string,
  vocabluary: IndexedVocabluary[]
): IndexedVocabluary[] {
  let closest = [{}] as IndexedVocabluary[];
  let firstclosestDistance = 0;
  let secondClosest = 0;
  let thirdClosest = 0;
  const strMetaphone = getMetaphone(str);
  vocabluary.forEach((item) => {
    const distance = getSimilarity(strMetaphone, item.metaphone);
    console.log(
      `Distance between ${str}(${strMetaphone}) and ${item.original}(${item.metaphone}) is - `,
      distance
    );
    if (distance > firstclosestDistance) {
      firstclosestDistance = distance;
      item.distance = distance;
      closest[2] = closest[1];
      closest[1] = closest[0] 
      closest[0] = item;
    } else if (distance > secondClosest) {
      secondClosest = distance;
      closest[2] = closest[1];
      closest[1] = item;
    } else if (distance > thirdClosest) {
      thirdClosest = distance;
      closest[2] = item;
    }
  });
  return closest;
}

export const vocabluary = [
  ["玉米", "yù mǐ", "Corn"],
  ["土豆", "tǔ dòu", "Potato"],
  ["生姜", "shēng jiāng", "Ginger"],
  ["大蒜", "dà suàn", "Garlic"],
  ["豆", "dòu", "Bean"],
  ["西兰花", "xī lán huā", "Broccoli"],
  ["黄瓜", "huáng guā", "Cucumber"],
  ["韭菜", "jiǔ cài", "Leek"],
  ["蘑菇", "mó gū", "Mushroom"],
  ["木耳", "mù ěr", "Agarics"],
  ["青椒", "qīng jiāo", "Green pepper"],
  ["辣椒", "là jiāo", "Pepper"],
  ["西红柿", "xī hóng shì", "Tomato"],
  ["茄子", "qié zǐ", "Aborigine"],
  ["萝卜", "luó bo", "Radish"],
  ["芋头", "yù tóu", "Taro"],
  ["白菜", "bái cài", "Cabbage"],
  ["菠菜", "bō cài", "Spinach"],
  ["南瓜", "nán guā", "Pumpkin"],
  ["苦瓜", "kǔ guā", "Bitter gourd"],
  ["猪肉", "zhū ròu", "Pork"],
  ["鸡肉", "jī ròu", "Chicken"],
  ["火鸡", "huǒ jī", "Turkey"],
  ["鸡翅膀", "jī chì bǎng", "Chicken wing"],
  ["鸭肉", "yā ròu", "Duck"],
  ["鹅肉", "é ròu", "Goose"],
  ["狗肉", "gǒu ròu", "Dog meat"],
  ["牛肉", "niú ròu", "Beef"],
  ["鱼", "yú", "Fish"],
  ["虾", "xiā", "Shrimp"],
  ["火腿", "huǒ tuǐ", "Ham"],
  ["热狗", "rè gǒu", "Hot dog"],
  ["羊肉", "yáng ròu", "Mutton"],
  ["兔子肉", "tù zǐ ròu", "Rabbit meat"],
  ["苹果", "píng guǒ", "Apple"],
  ["香蕉", "xiāng jiāo", "Banana"],
  ["芒果", "máng guǒ", "Mango"],
  ["葡萄", "pú táo", "Grape"],
  ["橙子", "chéng zǐ", "Orange"],
  ["草莓", "cǎo méi", "Strawberry"],
  ["西瓜", "xī guā", "Melon"],
  ["樱桃", "yīng táo", "Cherry"],
  ["柑橘", "gān jú", "Mandarin"],
  ["桃子", "táo zǐ", "Peach"],
  ["梨", "lí", "Pear"],
  ["蓝莓", "lán méi", "Blueberry"],
  ["椰子", "yē zǐ", "Coconut"],
  ["奇异果", "qí yì guǒ", "Kiwi"],
  ["柠檬", "níng méng", "Lemon"],
  ["牛油果", "niú yóu guǒ", "Avocado"],
  ["菠萝", "bō luó", "Pineapple"],
  ["石榴", "shí liú", "Pomegranate"],
  ["茶", "chá", "Tea"],
  ["牛奶", "niú nǎi", "Milk"],
  ["奶茶", "nǎi chá", "Milky tea"],
  ["咖啡", "kā fēi", "Coffee"],
  ["汽水", "qì shuǐ", "Pop"],
  ["可口可乐", "kě kǒu kě lè", "Cocoa"],
  ["雪碧", "xuě bì", "Sprite"],
  ["果汁", "guǒ zhī", "Fruit juice"],
  ["柠檬水", "níng méng shuǐ", "Lemonade"],
  ["啤酒", "pí jiǔ", "Beer"],
  ["白酒", "bái jiǔ", "White spirits"],
  ["红酒", "hóng jiǔ", "Red wine"],
];

console.log("Starting...");
console.log("Indexing vocabluary...");
export let indexedVocabluary = vocabluary.map(async (item) => {
  return {
    original: item[0],
    originalPinYin: item[1],
    pinyin: getPinyin(item[0]),
    metaphone: getMetaphone(item[0]),
    soundex: getSoundex(getMetaphone(item[0])),
    stemmed: stemmer(getPinyin(item[0])),
    translation: item[2],
  };
});

export const indexedVocabluaryResolved = await Promise.all(indexedVocabluary);

// console.log("Original string: ", FOOD);
// console.log("Pinyin: ", getPinyin(FOOD));
// console.log("Metaphoned and stemmed: ", getMetaphone(FOOD));
// console.log(
//   `Leventshtein distance Metaphoned ${getMetaphone(FOOD)}: ${getSimilarity(
//     getMetaphone(FOOD),
//     getMetaphone(FOOD)
//   )}`
// );
// console.log(
//   `Leventshtein distance Original: ${FOOD}`,
//   getSimilarity(FOOD, FOOD)
// );
// console.log("Soundex: ", getSoundex(getMetaphone(FOOD)));
