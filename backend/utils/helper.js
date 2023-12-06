/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import mongoose from 'mongoose';

const createNewMongoConnect = (dbURI) => {
  try {
    mongoose.set('strictQuery', false);
    const connection = mongoose.createConnection(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    return connection;
  } catch (err) {
    console.log(`ERROR_Mongo_Connect_[ ${dbURI} ]: ${err?.message}`);
    process.exit(1); //-- `failure` code `1`
  }
};

const chkEmailVeriToken = (tokenStr) => {
  try {
    const regex = new RegExp('^(?!.*[0-9]-[0-9])[A-Za-z0-9]+(-[A-Za-z0-9]+)?$');
    if (tokenStr.indexOf('-') === -1) {
      return false;
    } else {
      return regex.test(tokenStr);
    }
  } catch (e) {
    console.log('UTILS_chkEmailVeriToken_ERROR:', e?.message);
    return false;
  }
};

const genUsername = (firstname, lastname) => {
  try {
    const fname = firstname.substring(0, 1).toLowerCase();
    const lname = lastname.toLowerCase();
    return `${fname}${lname}`;
  } catch (e) {
    console.log('UTILS_genUsername_ERROR:', e?.message);
    return '';
  }
};

const isValidEmailVeriTokenTTL = (token) => {
  try {
    const { tokenSetAt } = token;
    const tset = new Date(tokenSetAt);
    const tnow = new Date();
    const ttl = 1000 * 60 * 60 * 24; // 1 day
    return !(tnow - tset > ttl);
  } catch (e) {
    console.log('UTILS_isValidEmailVeriTokenTTL_ERROR:', e?.message);
    return false;
  }
};

const genKebabCaseStr = (param) => {
  try {
    const groups = String(param).match(/[a-z]+|[^a-z]+/gi);
    return groups.join('-');
  } catch (e) {
    console.log('UTILS_genKebabCaseStr_ERROR:', e?.message);
    return '';
  }
};

const listMRTableHandler = async (dbModel, reqBody) => {
  try {
    const { start = 0, size = 10, filters = '[]', sorting = '[]', globalFilter = '' } = reqBody;

    const parsedColumnFilters = JSON.parse(filters);
    const filterObject = {};
    if (parsedColumnFilters?.length) {
      parsedColumnFilters.map((filter) => {
        const { id: columnId, value: filterValue } = filter;
        filterObject[columnId] = { $regex: filterValue, $options: 'i' };
      });
    }
    const globalFilterObject = {};
    if (globalFilter) {
      const globalFilterRegex = new RegExp(globalFilter, 'i');
      globalFilterObject['$or'] = Object.values(dbModel?.schema?.obj)
        .map((key, index) => {
          if (key?.type?.name === 'String') {
            return {
              [Object.keys(dbModel?.schema?.obj)[index]]: globalFilterRegex
            };
          } else {
            return null;
          }
        })
        .filter(Boolean);
    }
    const parsedSorting = JSON.parse(sorting);
    const sortOptions = {};
    if (parsedSorting?.length) {
      const { id, desc } = parsedSorting[0];
      sortOptions[id] = desc ? -1 : 1;
    }
    const totalRowCount = await dbModel.countDocuments({
      $and: [filterObject, globalFilterObject]
    });
    const data = await dbModel
      .find({ $and: [filterObject, globalFilterObject] })
      .sort(sortOptions)
      .skip(start)
      .limit(size);
    return {
      data,
      meta: { totalRowCount }
    };
  } catch (e) {
    console.log('UTILS_listMRTableHandler_ERROR:', e?.message);
    return null;
  }
};

const compareStartAndEndDates = (start, end) => {
  try {
    const startDate = new Date(start);
    const endDate = new Date(end);
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return false;
    }
    const startStr = startDate.toISOString().slice(0, 10).replace(/-/g, '/');
    const endStr = endDate.toISOString().slice(0, 10).replace(/-/g, '/');
    if (new Date(startStr) > new Date(endStr)) {
      return false;
    }
    return true;
  } catch (e) {
    console.log('UTILS_compareStartAndEndDates_ERROR:', e?.message);
    return false;
  }
};

const numsArrValidMdware = (value, min, max, label, isRequired) => {
  try {
    if (!value && isRequired !== true) {
      return true;
    }
    const data = typeof value === 'string' ? JSON.parse(value) : value;
    if (Array.isArray(data)) {
      if (data.length) {
        const isOnlyNumOrNumStrRange = data.every((item) => {
          return !isNaN(item) && parseInt(item) >= min && parseInt(item) <= max;
        });
        const isDupArr = new Set(data).size !== data.length;
        if (!isOnlyNumOrNumStrRange || isDupArr) {
          throw new Error(`${label} is incorrect`);
        }
        //-- okay
        return true;
      } else {
        if (isRequired) {
          throw new Error(`${label} is mandatory`);
        } else {
          return true;
        }
      }
    } else {
      throw new Error(`${label} is invalid`);
    }
  } catch (e) {
    console.log('UTILS_numsArrValidMdware_ERROR:', e?.message);
    return false;
  }
};

export {
  createNewMongoConnect,
  chkEmailVeriToken,
  genUsername,
  isValidEmailVeriTokenTTL,
  genKebabCaseStr,
  listMRTableHandler,
  compareStartAndEndDates,
  numsArrValidMdware
};
