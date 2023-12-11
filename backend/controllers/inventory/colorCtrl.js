import asyncHandler from 'express-async-handler';
import InvColor from '../../models/inventory/color.js';

const addColor = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const color = await InvColor.create({ name });
    console.log('API_addColor_200:', 'Color has been added');
    res.status(200).send(color);
  } catch (e) {
    console.log('API_addColor_500:', e?.message);
    res.status(500);
  }
});

const editColor = asyncHandler(async (req, res) => {
  try {
    const { id, name } = req.body;
    const color = await InvColor.findOne({ id });
    color.name = name;
    await color.save();
    console.log('API_editColor_200:', 'Color has been updated');
    res.status(200).json(color);
  } catch (e) {
    console.log('API_editColor_500:', e?.message);
    res.status(500);
  }
});

const deleteColor = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;
    await InvColor.destroy({ where: { id } });
    console.log('API_deleteColor_200:', 'Color has been deleted');
    res.status(200).send('Color has been deleted');
  } catch (e) {
    console.log('API_deleteColor_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getColors = asyncHandler(async (req, res) => {
  try {
    const colors = await InvColor.findAll();
    console.log('API_getColors_200:', 'Colors are retrieved');
    res.status(200).send(colors);
  } catch (e) {
    console.log('API_getColors_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

export { addColor, editColor, deleteColor, getColors };
