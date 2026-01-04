import groupService from "../service/groupService.js";

const handleGetAllGroups = async (req, res) => {
  try {
    let response = await groupService.getAllGroups();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      EM: "Error from server",
      EC: -1,
      DT: ""
    });
  }
}

export default {
  handleGetAllGroups,
};