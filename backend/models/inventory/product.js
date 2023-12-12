/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import { sequelize } from '../../config/db.js';
import { DataTypes } from 'sequelize';
import InvProductType from './productType.js';
import InvColor from './color.js';
import InvRack from './rack.js';
import MatchingCase from '../admin/matchingCase.js';
import Product from '../admin/product.js';

const InvProduct = sequelize.define(
  'in_product',
  {
    user_id: {
      type: DataTypes.INTEGER
    },
    profile_type: {
      type: DataTypes.INTEGER
    },
    product_type: {
      type: DataTypes.INTEGER,
      references: {
        model: InvProductType,
        key: 'id'
      }
    },
    product_name_one: {
      type: DataTypes.STRING
    },
    product_name_two: {
      type: DataTypes.STRING
    },
    brand_id: {
      type: DataTypes.INTEGER
    },
    tall_feet: {
      type: DataTypes.NUMBER
    },
    tall_inch: {
      type: DataTypes.NUMBER
    },
    best_fit_for_weight: {
      type: DataTypes.NUMBER
    },
    best_size_fit: {
      type: DataTypes.NUMBER
    },
    waist_size: {
      type: DataTypes.STRING
    },
    waist_size_run: {
      type: DataTypes.STRING
    },
    shirt_size: {
      type: DataTypes.STRING
    },
    shirt_size_run: {
      type: DataTypes.STRING
    },
    inseam_size: {
      type: DataTypes.STRING
    },
    men_bottom: {
      type: DataTypes.NUMBER
    },
    shoe_size_run: {
      type: DataTypes.STRING
    },
    shoe_size: {
      type: DataTypes.STRING
    },
    better_body_shape: {
      type: DataTypes.NUMBER
    },
    skin_tone: {
      type: DataTypes.NUMBER
    },
    work_type: {
      type: DataTypes.NUMBER
    },
    casual_shirts_type: {
      type: DataTypes.NUMBER
    },
    bottom_up_shirt_fit: {
      type: DataTypes.NUMBER
    },
    jeans_Fit: {
      type: DataTypes.NUMBER
    },
    shorts_long: {
      type: DataTypes.NUMBER
    },
    color: {
      type: DataTypes.INTEGER,
      references: {
        model: InvColor,
        key: 'id'
      }
    },
    men_bottom_prefer: {
      type: DataTypes.STRING
    },
    outfit_matches: {
      type: DataTypes.STRING
    },
    pants: {
      type: DataTypes.STRING
    },
    bra: {
      type: DataTypes.NUMBER
    },
    bra_recomend: {
      type: DataTypes.NUMBER
    },
    skirt: {
      type: DataTypes.NUMBER
    },
    jeans: {
      type: DataTypes.NUMBER
    },
    active_wr: {
      type: DataTypes.STRING
    },
    wo_jackect_size: {
      type: DataTypes.NUMBER
    },
    wo_bottom: {
      type: DataTypes.STRING
    },
    dress: {
      type: DataTypes.STRING
    },
    dress_recomended: {
      type: DataTypes.STRING
    },
    shirt_blouse: {
      type: DataTypes.NUMBER
    },
    shirt_blouse_recomend: {
      type: DataTypes.NUMBER
    },
    pantsr1: {
      type: DataTypes.NUMBER
    },
    pantsr2: {
      type: DataTypes.NUMBER
    },
    womenHeelHightPrefer: {
      type: DataTypes.NUMBER
    },
    proportion_shoulders: {
      type: DataTypes.NUMBER
    },
    proportion_legs: {
      type: DataTypes.NUMBER
    },
    proportion_arms: {
      type: DataTypes.NUMBER
    },
    proportion_hips: {
      type: DataTypes.NUMBER
    },
    top_size: {
      type: DataTypes.NUMBER
    },
    bottom_size: {
      type: DataTypes.NUMBER
    },
    purchase_price: {
      type: DataTypes.NUMBER
    },
    quantity: {
      type: DataTypes.NUMBER
    },
    note: {
      type: DataTypes.NUMBER
    },
    product_image: {
      type: DataTypes.NUMBER
    },
    available_status: {
      type: DataTypes.NUMBER
    },
    is_active: {
      type: DataTypes.NUMBER
    },
    created: {
      type: DataTypes.DATE
    },
    prodcut_id: {
      type: DataTypes.STRING
    },
    dtls: {
      type: DataTypes.NUMBER
    },
    rack: {
      type: DataTypes.INTEGER,
      references: {
        model: InvRack,
        key: 'id'
      }
    },
    p_type: {
      type: DataTypes.STRING
    },
    sale_price: {
      type: DataTypes.STRING
    },
    primary_size: {
      type: DataTypes.STRING
    },
    picked_size: {
      type: DataTypes.NUMBER
    },
    prod_id: {
      type: DataTypes.NUMBER
    },
    bar_code_img: {
      type: DataTypes.NUMBER
    },
    wo_style_insp: {
      type: DataTypes.NUMBER
    },
    wo_dress_length: {
      type: DataTypes.NUMBER
    },
    wo_top_half: {
      type: DataTypes.NUMBER
    },
    wo_pant_length: {
      type: DataTypes.NUMBER
    },
    wo_pant_rise: {
      type: DataTypes.NUMBER
    },
    wo_pant_style: {
      type: DataTypes.NUMBER
    },
    wo_appare: {
      type: DataTypes.NUMBER
    },
    wo_bottom_style: {
      type: DataTypes.NUMBER
    },
    wo_top_style: {
      type: DataTypes.NUMBER
    },
    wo_patterns: {
      type: DataTypes.NUMBER
    },
    budget_type: {
      type: DataTypes.NUMBER
    },
    budget_value: {
      type: DataTypes.NUMBER
    },
    match_status: {
      type: DataTypes.NUMBER
    },
    kid_body_shape: {
      type: DataTypes.NUMBER
    },
    denim_styles: {
      type: DataTypes.NUMBER
    },
    outfit_prefer: {
      type: DataTypes.NUMBER
    },
    missing_from_your_fIT: {
      type: DataTypes.NUMBER
    },
    tall_feet2: {
      type: DataTypes.NUMBER
    },
    tall_inch2: {
      type: DataTypes.NUMBER
    },
    best_fit_for_weight2: {
      type: DataTypes.NUMBER
    },
    age1: {
      type: DataTypes.NUMBER
    },
    age2: {
      type: DataTypes.NUMBER
    },
    profession: {
      type: DataTypes.NUMBER
    },
    occasional_dress: {
      type: DataTypes.NUMBER
    },
    take_note_of: {
      type: DataTypes.NUMBER
    },
    style_sphere_selections_v5: {
      type: DataTypes.NUMBER
    },
    style_number: {
      type: DataTypes.NUMBER
    }
  },
  {
    timestamps: false
  }
);

InvProduct.belongsTo(InvProductType, {
  foreignKey: 'product_type'
});
InvProduct.belongsTo(InvColor, {
  foreignKey: 'color'
});
InvProduct.belongsTo(InvRack, {
  foreignKey: 'rack'
});

InvProduct.hasOne(MatchingCase, {
  foreignKey: 'product_id'
});
InvProduct.hasMany(Product, {
  foreignKey: 'inv_product_id'
});

export default InvProduct;
