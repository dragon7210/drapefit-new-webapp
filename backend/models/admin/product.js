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
import User from './user.js';
import PaymentGetway from './paymentGetway.js';
import KidsDetail from '../client/kidsDetail.js';

const Product = sequelize.define(
  'products',
  {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    },
    kid_id: {
      type: DataTypes.INTEGER,
      references: {
        model: KidsDetail,
        key: 'id'
      }
    },
    payment_id: {
      type: DataTypes.INTEGER,
      references: {
        model: PaymentGetway,
        key: 'id'
      }
    },
    product_name_one: {
      type: DataTypes.STRING
    },
    product_name_two: {
      type: DataTypes.STRING
    },
    size: {
      type: DataTypes.STRING
    },
    purchase_price: {
      type: DataTypes.NUMBER
    },
    sell_price: {
      type: DataTypes.NUMBER
    },
    store_name: {
      type: DataTypes.STRING
    },
    store_address: {
      type: DataTypes.STRING
    },
    store_ph: {
      type: DataTypes.STRING
    },
    store_email: {
      type: DataTypes.STRING
    },
    store_fax: {
      type: DataTypes.STRING
    },
    product_purchase_date: {
      type: DataTypes.DATE
    },
    product_valid_return_date: {
      type: DataTypes.DATE
    },
    return_status: {
      type: DataTypes.NUMBER
    },
    note: {
      type: DataTypes.STRING
    },
    customer_purchase_status: {
      type: DataTypes.NUMBER
    },
    purchase_receipt_image_id: {
      type: DataTypes.NUMBER
    },
    exchange_status: {
      type: DataTypes.NUMBER
    },
    store_exchange_date: {
      type: DataTypes.DATE
    },
    exchange_product_id: {
      type: DataTypes.NUMBER
    },
    order_usps_tracking_no: {
      type: DataTypes.NUMBER
    },
    return_usps_tracking_no: {
      type: DataTypes.NUMBER
    },
    replace_status: {
      type: DataTypes.STRING
    },
    product_image: {
      type: DataTypes.STRING
    },
    color: {
      type: DataTypes.STRING
    },
    product_receipt: {
      type: DataTypes.STRING
    },
    barcode_image: {
      type: DataTypes.STRING
    },
    barcode_value: {
      type: DataTypes.STRING
    },
    product_unique_code: {
      type: DataTypes.STRING
    },
    customer_purchasedate: {
      type: DataTypes.DATE
    },
    keep_status: {
      type: DataTypes.NUMBER
    },
    size_status: {
      type: DataTypes.NUMBER
    },
    fit_cut_status: {
      type: DataTypes.NUMBER
    },
    style_status: {
      type: DataTypes.NUMBER
    },
    quality_status: {
      type: DataTypes.NUMBER
    },
    price_status: {
      type: DataTypes.NUMBER
    },
    checkedout: {
      type: DataTypes.STRING
    },
    is_retrun: {
      type: DataTypes.NUMBER
    },
    store_return_date: {
      type: DataTypes.DATE
    },
    store_return_status: {
      type: DataTypes.NUMBER
    },
    product_exchange_date: {
      type: DataTypes.DATE
    },
    created: {
      type: DataTypes.DATE
    },
    is_altnative_product: {
      type: DataTypes.NUMBER
    },
    is_complete: {
      type: DataTypes.NUMBER
    },
    is_exchange_pending: {
      type: DataTypes.NUMBER
    },
    matching_id: {
      type: DataTypes.NUMBER
    },
    is_finalize: {
      type: DataTypes.NUMBER
    },
    is_replace: {
      type: DataTypes.NUMBER
    },
    product_review: {
      type: DataTypes.NUMBER
    },
    inv_product_id: {
      type: DataTypes.INTEGER
    },
    inv_dtls: {
      type: DataTypes.NUMBER
    },
    return_inventory: {
      type: DataTypes.NUMBER
    },
    df_matching: {
      type: DataTypes.NUMBER
    },
    in_rack: {
      type: DataTypes.NUMBER
    },
    prod_id: {
      type: DataTypes.NUMBER
    },
    is_stylist: {
      type: DataTypes.NUMBER
    },
    is_complete_by_admin: {
      type: DataTypes.NUMBER
    },
    is_payment_fail: {
      type: DataTypes.NUMBER
    },
    shipping_date: {
      type: DataTypes.DATE
    },
    auto_checkout_date: {
      type: DataTypes.DATE
    }
  },
  {
    timestamps: false
  }
);

Product.belongsTo(User, {
  foreignKey: 'user_id'
});
Product.belongsTo(KidsDetail, {
  foreignKey: 'kid_id'
});
Product.belongsTo(PaymentGetway, {
  foreignKey: 'payment_id'
});

export default Product;
