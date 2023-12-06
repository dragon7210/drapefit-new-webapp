/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import express from 'express';
import * as purchaseOrderCtrl from '../../controllers/supply/purchaseOrderCtrl.js';
import { protectSupplier } from '../../middleware/authMdware.js';

const purchaseOrderRoutes = express.Router();

/**
 * @method post
 * @route dfnew/admsupplier/manage/purchaseOrder/tblist
 * @access private
 * @desc Display the purchase order in PO-System.
 */
purchaseOrderRoutes.route('/tblist').get(protectSupplier, purchaseOrderCtrl.getPurchaseOrders);

/**
 * @method POST
 * @route dfnew/admsupplier/manage/purchaseOrder/add
 * @access private
 * @desc Display the purchase order in PO-System.
 */
purchaseOrderRoutes.route('/add').post(protectSupplier, purchaseOrderCtrl.addPurchaseOrder);
/**
 * @method POST
 * @route dfnew/admsupplier/manage/purchaseOrder/assign
 * @access private
 * @desc Set the purchase-order valuse as true..
 */
purchaseOrderRoutes.route('/assign').post(protectSupplier, purchaseOrderCtrl.setAssignPurchaseOrder);
/**
 * @method POST
 * @route dfnew/admsupplier/manage/purchaseOrdersAssigned
 * @access private
 * @desc Set the purchase-order valuse as true..
 */
purchaseOrderRoutes.route('/assigned').post(protectSupplier, purchaseOrderCtrl.getpurchaseOrdersAssigned);

/**
 * @method POST
 * @route dfnew/admsupplier/manage/purchaseOrderAssigned/approve
 * @access private
 * @desc Set the purchase-order valuse as true..
 */
purchaseOrderRoutes.route('/assigned/approve').post(protectSupplier, purchaseOrderCtrl.setApprovePurchaseOrder);

/**
 * @method POST
 * @route dfnew/admsupplier/manage/PurchaseOrder/addRequiredQuantity
 * @access private
 * @desc Add the required Quantity purchase-order.
 */
purchaseOrderRoutes
  .route('/addRequiredQuantity')
  .post(protectSupplier, purchaseOrderCtrl.addRequiredQuantityPurchaseOrder);
/**
 * @method POST
 * @route dfnew/admsupplier/manage/purchaseOrder/mail
 * @access private
 * @desc Set the purchase-order valuse as true..
 */
purchaseOrderRoutes.route('/mail').post(protectSupplier, purchaseOrderCtrl.setAssignedPurchaseOrder);
/**
 * @method POST
 * @route dfnew/admsupplier/manage/purchaseOrder/delete
 * @access private
 * @desc Display the purchase order in PO-System.
 */
purchaseOrderRoutes.route('/delete').post(protectSupplier, purchaseOrderCtrl.deletePurchaseOrder);

/**
 * @method POST
 * @route dfnew/admsupplier/manage/PurchaseOrder/edit
 * @access private
 * @desc Set the purchase-order valuse as true..
 */
purchaseOrderRoutes.route('/edit').post(protectSupplier, purchaseOrderCtrl.editPurchaseOrder);

/**
 * @method post
 * @route dfnew/admsupplier/manage/purchaseOrdersApproved
 * @access private
 * @desc Display the purchase order in PO-System.
 */
purchaseOrderRoutes.route('/approved').post(protectSupplier, purchaseOrderCtrl.getPurchaseOrdersApproved);
/**
 * @method POST
 * @route dfnew/admsupplier/manage/purchaseOrderAssigned/close
 * @access private
 * @desc Close the purchase order.
 */
purchaseOrderRoutes.route('/assigned/close').post(protectSupplier, purchaseOrderCtrl.closePurchaseOrder);
/**
 * @method POST
 * @route dfnew/admsupplier/manage/PurchaseOrder/change
 * @access private
 * @desc Close the purchase order.
 */
purchaseOrderRoutes.route('/ordered/change').post(protectSupplier, purchaseOrderCtrl.changePurchaseOrder);

/**
 * @method POST
 * @route dfnew/admsupplier/manage/PurchaseOrder/ordered
 * @access private
 * @desc Close the purchase order.
 */
purchaseOrderRoutes.route('/ordered').post(protectSupplier, purchaseOrderCtrl.orderedPurchaseOrder);
/**
 * @method POST
 * @route dfnew/admsupplier/manage/PurchaseOrder/ordered
 * @access private
 * @desc get the ordered purchase order.
 */
purchaseOrderRoutes.route('/ordered/tblist').post(protectSupplier, purchaseOrderCtrl.getPurchaseOrdered);

/**
 * @method POST
 * @route dfnew/admsupplier/manage/PurchaseOrder/getOrdered
 * @access private
 * @desc get the ordered purchase order.
 */
purchaseOrderRoutes.route('/ordered/edit').post(protectSupplier, purchaseOrderCtrl.handleOrderedEdit);

/**
 * @method POST
 * @route dfnew/admsupplier/manage/PurchaseOrder/getOrdered
 * @access private
 * @desc get the ordered purchase order.
 */
purchaseOrderRoutes.route('/all').get(protectSupplier, purchaseOrderCtrl.getAllPurchaseOrder);

export default purchaseOrderRoutes;
