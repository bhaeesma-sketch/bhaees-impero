import { MetalType } from './gold-price';

// Legacy Assets
import idiCoinImg from '@assets/generated_images/idi_branded_gold_coin_v2.png';
import idiCoinCardImg from '@assets/generated_images/luxury_light_idi_coin_packaging.png';
import idiBarImg from '@assets/generated_images/idi_10_tola_gold_bar.png';
import goldCoin5gImg from '@assets/generated_images/gold_coin_5g.png';
import goldBar100gImg from '@assets/generated_images/gold_bar_100g.png';
import diamondNecklaceImg from '@assets/generated_images/diamond_necklace_luxury.png';
import jewelrySetImg from '@assets/generated_images/luxury_gold_jewelry_set.png';

// New Brand Assets (4K)
import idiPlatinumImg from '@/assets/idi_platinum_bar_branded.png';
import idiGoldStackImg from '@/assets/idi_gold_bar_stack.png';
import idiNecklaceImg from '@/assets/idi_necklace_viral.png';
import idiSilverStackImg from '@/assets/idi_silver_stack.png';

export interface Product {
  id: string;
  name: string;
  image: string;
  images?: string[];
  purity: MetalType | 'Platinum' | 'Silver';
  baseWeight: number;
  displayWeight?: string;
  customWeights?: number[];
  makingCharge: number;
  type: 'bullion' | 'jewelry';
  category: 'coins' | 'bars' | 'silver' | 'jewelry' | 'platinum';
  description: string;
  manufacturer: string;
  availability: 'In Stock' | 'Out of Stock' | 'Made to Order';
  productCode: string;
}

const PRODUCTS_LIST: Product[] = [];

// Helper to generate products
function generateBullion(
  metal: 'Gold' | 'Silver' | 'Platinum',
  category: 'bars' | 'coins' | 'platinum' | 'silver',
  weights: number[],
  image: string,
  prefix: string,
  purity: string
) {
  weights.forEach((w, i) => {
    let display = w >= 1000 ? `${w / 1000}kg` : `${w}g`;
    if (w === 31.1) display = "1oz";
    if (w === 116.64) display = "10 Tola";

    PRODUCTS_LIST.push({
      id: `${prefix}-${w}`.replace('.', '_'),
      name: `IDi ${display} ${metal} ${category === 'coins' ? 'Coin' : 'Bar'}`,
      image: image,
      images: [image],
      purity: purity as any,
      baseWeight: w,
      displayWeight: display,
      makingCharge: metal === 'Gold' ? 15 : (metal === 'Platinum' ? 50 : 2),
      type: 'bullion',
      category: category,
      description: `Premium Investment Grade ${metal} ${category === 'coins' ? 'Coin' : 'Bar'} from Impero Di Gold. Certified ${purity}. Features the iconic IDi hallmark.`,
      manufacturer: "Impero Di Gold",
      availability: "In Stock",
      productCode: `IDI-${prefix}-${w}`
    });
  });
}

// 1. Gold Bars (Cast & Minted)
const goldBarWeights = [1, 2.5, 5, 10, 20, 50, 100, 116.64, 250, 500, 1000];
generateBullion('Gold', 'bars', goldBarWeights, idiGoldStackImg, 'GB-CAST', '24K');
generateBullion('Gold', 'bars', [1, 5, 10, 20, 50, 100], idiBarImg, 'GB-MINT', '24K'); // Minted variant

// 2. Gold Coins
const goldCoinWeights = [1, 2, 4, 5, 8, 10, 20, 31.1, 50];
generateBullion('Gold', 'coins', goldCoinWeights, idiCoinCardImg, 'GC-ROSE', '22K');

// 3. Platinum Bars
const platWeights = [10, 31.1, 100, 250, 500, 1000];
generateBullion('Platinum', 'platinum', platWeights, idiPlatinumImg, 'PB', 'Platinum');

// 4. Silver Bars & Coins
const silverWeights = [31.1, 100, 250, 500, 1000, 5000];
generateBullion('Silver', 'silver', silverWeights, idiSilverStackImg, 'SB', 'Silver');
generateBullion('Silver', 'silver', [31.1, 1000], idiSilverStackImg, 'SC', 'Silver'); // Coins

// 5. High Jewelry collection (Viral Styles)
const jewelryTypes = ['Necklace', 'Ring', 'Bracelet', 'Earrings', 'Bangle'];
const collections = ['Royal', 'Ethereal', 'Viral', 'Bridal', 'Vintage'];
const jewelryImages = [idiNecklaceImg, diamondNecklaceImg, jewelrySetImg];

let jCount = 0;
collections.forEach(col => {
  jewelryTypes.forEach(type => {
    // Create 3 variants for each combo
    for (let i = 1; i <= 3; i++) {
      jCount++;
      const isViral = col === 'Viral' || col === 'Royal';
      const img = isViral ? idiNecklaceImg : jewelryImages[jCount % jewelryImages.length];

      PRODUCTS_LIST.push({
        id: `JWL-${col}-${type}-${i}`,
        name: `IDi ${col} ${type} Collection ${i}`,
        image: img,
        images: [img],
        purity: '18K',
        baseWeight: 10 + (i * 5),
        makingCharge: 150 + (i * 20),
        type: 'jewelry',
        category: 'jewelry',
        description: `Exquisite ${col} style ${type} featuring hand-set diamonds and unique ${col === 'Viral' ? 'avant-garde' : 'timeless'} design. A true statement piece.`,
        manufacturer: "Impero Di Gold",
        availability: i === 1 ? "In Stock" : "Made to Order",
        productCode: `IDI-JWL-${jCount}`
      });
    }
  })
});

export const PRODUCTS = PRODUCTS_LIST;
