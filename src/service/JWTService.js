
import db from '../models/index.js'

const getGroupWithRoles = async (user) => {
  if (!user.groupId) {
    return {};
  }

  const roles = await db.Group.findOne({
    where: { id: user.groupId },
    attributes: ["id", "name", "description"],
    include: {
      model: db.Role,
      attributes: ["id", "url", "description"],
      through: { attributes: [] },
    },
  });

  return roles || {};
};

export {
    getGroupWithRoles
}