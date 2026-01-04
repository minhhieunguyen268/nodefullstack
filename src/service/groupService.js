import db from '../models/index.js';

const getAllGroups = async () => {
  try {
    let groups = await db.Group.findAll({
        order: [['name', 'ASC']]
    });
    return {
      EM: "Get all groups successfully",
      EC: 0,
      DT: groups
    };
  } catch (error) {
    return {
      EM: "Error from server",
      EC: -1,
      DT: ""
    };
  }
}

export default {
  getAllGroups,
};