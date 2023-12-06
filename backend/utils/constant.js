/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */

export const USER_ROLES = [100, 101, 102, 103, 104, 105, 106, 107, 1040];
/**
 * 100: Super Admin (Developer)
 * 101: Admin
 * 102: Client (Customer, Influencer)
 * 103: Stylist
 * 104: Inventory Manager
 * 105: QA (Quality Assurance)
 * 106: Support Guy
 * 107: Supplier Agent
 * 1040: Brand (by Inventory Manager)
 */
export const USER_ROLE_SUPER = 100;
export const USER_ROLE_ADMIN = 101;
export const USER_ROLE_CLIENT = 102;
export const USER_ROLE_STYLIST = 103;
export const USER_ROLE_INVENTORY = 104;
export const USER_ROLE_QA = 105;
export const USER_ROLE_SUPPORT = 106;
export const USER_ROLE_SUPPLIER = 107;
export const USER_ROLE_BRAND = 1040;

export const USER_EMPLOYEE_TYPES = ['-- Select user type --', 'Stylist', 'Inventory', 'QA', 'Support Guy'];

export const DEFAULT_SPL_PROD_CATEGORIES = [
  'Box',
  'Tag',
  'Shipping Label',
  'Wrapping Paper',
  'Printing Paper',
  'Stylist Suggestion',
  'DF Sticker Big Size',
  'DF Sticker Small Size',
  'Return Envelope',
  'Envelope',
  'Brochure'
];

export const NORMAL_SIZE_FIT_LIST = ['Sometimes too small', 'Just right', 'Sometimes too big'];

export const MEN_WAIST_SIZE_NUM_LIST = [
  '28',
  '29',
  '30',
  '31',
  '32',
  '33',
  '34',
  '36',
  '38',
  '40',
  '42',
  '44',
  '46',
  '48'
];

export const MEN_SHIRT_SIZE_NO_LIST = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];

export const MEN_INSEAM_SIZE_LIST = ['28', '30', '32', '34', '36'];

export const MEN_BOTTOM_SIZE_LIST = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];

export const MEN_SHOE_SIZE_NUM_LIST = [
  '7',
  '7.5',
  '8',
  '8.5',
  '9',
  '9.5',
  '10',
  '10.5',
  '11',
  '11.5',
  '12',
  '12.5',
  '13',
  '14',
  '15',
  '16'
];

export const MEN_SHOE_SIZE_LABEL_LIST = ['Narrow', 'Medium', 'Wide', 'Extra Wide'];

export const WOMEN_PANTS_SIZE_LIST = [
  { type: 1, value: "Women's Sizes" },
  { type: 0, value: '000' },
  { type: 0, value: '00' },
  { type: 0, value: '0' },
  { type: 0, value: '2' },
  { type: 0, value: '4' },
  { type: 0, value: '6' },
  { type: 0, value: '8' },
  { type: 0, value: '10' },
  { type: 0, value: '12' },
  { type: 1, value: "Women's Plus Sizes" },
  { type: 0, value: '14W' },
  { type: 0, value: '16W' },
  { type: 0, value: '18W' },
  { type: 0, value: '20W' },
  { type: 0, value: '22W' },
  { type: 0, value: '24W' }
];

export const WOMEN_BRA_SIZE_NUM_LIST = ['30', '32', '34', '36', '38', '40', '42', '44', '46'];

export const WOMEN_BRA_SIZE_LABEL_LIST = ['AA', 'A', 'B', 'C', 'D', 'DD', 'DDD', 'F', 'G', 'H'];

export const WOMEN_SKIRT_SIZE_LIST = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '1X', '2X', '3X', '4X'];

export const WOMEN_CASUAL_SIZE_LIST = [
  { type: 1, value: "Women's Sizes" },
  { type: 0, value: '00' },
  { type: 0, value: '0' },
  { type: 0, value: '2' },
  { type: 0, value: '4' },
  { type: 0, value: '6' },
  { type: 0, value: '8' },
  { type: 0, value: '10' },
  { type: 0, value: '12' },
  { type: 1, value: "Women's Plus Sizes" },
  { type: 0, value: '14W' },
  { type: 0, value: '16W' },
  { type: 0, value: '18W' },
  { type: 0, value: '20W' },
  { type: 0, value: '22W' },
  { type: 0, value: '24W' }
];

export const WOMEN_SIZE_ARMS_LIST = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '1X', '2X', '3X'];

export const WOMEN_JACKET_SIZE_LIST = [
  'XS (0 - 2)',
  'S (2 - 4)',
  'M (6 - 8)',
  'L (10 - 12)',
  'XL (14)',
  '1X (14W - 16W)',
  '2X (18W - 20W)',
  '3X (22W - 24W)'
];

export const WOMEN_BOTTOM_SIZE_LIST = [
  'XS (0 - 2)',
  'S (2 - 4)',
  'M (6 - 8)',
  'L (10 - 12)',
  'XL (14)',
  '1X (14W - 16W)',
  '2X (18W - 20W)',
  '3X (22W - 24W)',
  '4X (26W - 28W)'
];

export const WOMEN_DRESS_SIZE_LABEL_LIST = [
  { type: 0, value: 'L (10 - 12)' },
  { type: 1, value: "Women's Sizes" },
  { type: 0, value: 'XXS (00)' },
  { type: 0, value: 'XS (0)' },
  { type: 0, value: 'S (2 - 4)' },
  { type: 0, value: 'M (6 - 8)' },
  { type: 0, value: 'L (10 - 12)' },
  { type: 0, value: 'XL (14)' },
  { type: 0, value: 'XXL (16)' },
  { type: 1, value: "Women's Plus Sizes" },
  { type: 0, value: '1X (14W - 16W)' },
  { type: 0, value: '2X (18W - 20W)' },
  { type: 0, value: '3X (22W - 24W)' }
];

export const WOMEN_SHIRT_BLOUSE_SIZE_LABEL_LIST = [
  { type: 1, value: 'Recommended for 2' },
  { type: 0, value: 'S (2 - 4)' },
  { type: 1, value: "Women's Sizes" },
  { type: 0, value: 'S (2 - 4)' },
  { type: 1, value: "Women's Sizes" },
  { type: 0, value: 'XXS (00)' },
  { type: 0, value: 'XS (0)' },
  { type: 0, value: 'S (2 - 4)' },
  { type: 0, value: 'M (6 - 8)' },
  { type: 0, value: 'L (10 - 12)' },
  { type: 0, value: 'XL (14)' },
  { type: 0, value: 'XXL (16)' },
  { type: 1, value: "Women's Plus Sizes" },
  { type: 0, value: '1X (14W - 16W)' },
  { type: 0, value: '2X (18W - 20W)' },
  { type: 0, value: '3X (22W - 24W)' }
];

export const WOMEN_SHOE_SIZE_NUM_LIST = [
  '4',
  '4.5',
  '5',
  '5.5',
  '6',
  '6.5',
  '7',
  '7.5',
  '8',
  '8.5',
  '9',
  '9.5',
  '10',
  '10.5',
  '11',
  '11.5',
  '12',
  '12.5',
  '13'
];

export const WOMEN_SHOES_STYLE_LABEL_LIST = [
  'Pumps',
  'Sandals',
  'Sneakers',
  'Boots & Booties',
  'Loafers & Flats',
  'Wedges',
  'Clogs & Mules',
  'Platforms'
];

export const WOMEN_HEEL_HEIGHT_LABEL_LIST = [
  'Flat (Under 1")',
  'Low (1"-2")',
  'Mid (2"-3")',
  'High (3"-4")',
  'Ultra High (4.5"+)'
];

export const WOMEN_TOP_SIZE_NO_LIST = ['4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5'];

export const WOMEN_TOP_SIZE_LABEL_LIST = ['Narrow', 'Medium', 'Wide', 'Extra Wide'];

export const KID_CASUAL_SIZE_LIST = [
  { type: 1, value: 'Toddler Sizing' },
  { type: 0, value: '2T' },
  { type: 0, value: '3T' },
  { type: 0, value: '4T' },
  { type: 1, value: 'Kid Sizing' },
  { type: 0, value: '5' },
  { type: 0, value: '6' },
  { type: 0, value: '7' },
  { type: 0, value: '8' },
  { type: 0, value: '10' },
  { type: 0, value: '12' },
  { type: 0, value: '14' },
  { type: 0, value: '16' },
  { type: 0, value: '18' }
];

export const KID_SHOE_SIZE_LIST = [
  { type: 1, value: 'Toddler Sizing' },
  { type: 0, value: '2 Child' },
  { type: 0, value: '3 Child' },
  { type: 0, value: '4 Child' },
  { type: 0, value: '5 Child' },
  { type: 0, value: '6 Child' },
  { type: 0, value: '7 Child' },
  { type: 0, value: '8 Child' },
  { type: 0, value: '9 Child' },
  { type: 1, value: 'Kid Sizing' },
  { type: 0, value: '10 Child' },
  { type: 0, value: '11 Child' },
  { type: 0, value: '12 Child' },
  { type: 0, value: '13 Child' },
  { type: 0, value: '1 Youth' },
  { type: 0, value: '2 Youth' },
  { type: 0, value: '3 Youth' },
  { type: 0, value: '4 Youth' },
  { type: 0, value: '5 Youth' }
];

export const LABEL_SEL_CATEGORY = '-- Select category --';

export const MOB_PLT_LIST = ['ios', 'android', 'mobileweb'];
