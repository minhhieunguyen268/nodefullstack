import userApiService from "../service/userApiService.js";


const handleGetAllUsers = async (req, res) => {
    try {
        if (req.query.page && req.query.limit) {

            let page = parseInt(req.query.page);
            let limit = parseInt(req.query.limit);

            if (page <= 0 || limit <= 0) {
                return res.status(400).json({
                    EM: "Page and limit must be greater than 0",
                    EC: 1,
                    DT: ""
                });
            }

            let users = await userApiService.getUsersWithPagination(page, limit);

            return res.status(200).json({
                EM: users.EM,
                EC: users.EC,
                DT: users.DT
            });
        }

        return res.status(400).json({
            EM: "Missing page or limit",
            EC: 1,
            DT: ""
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            EM: "Error from server",
            EC: -1,
            DT: ""
        });
    }
};

const handleCreateNewUser = async (req, res) => {
    try {
        if (!req.body.email || !req.body.phoneNumber || !req.body.password) {
      return res
        .status(400)
        .json({ EM: "Missing inputs parameter!", EC: "1", DT: "" });
    }

    if (req.body.password.length < 6) {
      return res
        .status(400)
        .json({ EM: "Your password must be at least 6 characters!", EC: "1", DT: "" });
    }
         let users = await userApiService.createNewUser(req.body);
        return res.status(200).json({ EM: users.EM, EC: users.EC, DT: users.DT });
    } catch (error) {
        return res.status(500).json({
            EM: "Error from serverr",
            EC: -1,
            DT: ''
        });
    }
};

const handleEditUser = async (req, res) => {
    try {
        await userApiService.editUser(req.body);
        return res.status(200).json({
            EM: "User updated successfully",
            EC: 0,
            DT: ''
        });
    } catch (error) {
        return res.status(500).json({
            EM: "Error from server",
            EC: -1,
            DT: ''
        });
    }
};

const handleDeleteUser = async (req, res) => {
    try {
        await userApiService.deleteUser(req.params.id);
        return res.status(200).json({
            EM: "User deleted successfully",
            EC: 0,
            DT: ''
        });
    } catch (error) {
        return res.status(500).json({
            EM: "Error from server",
            EC: -1,
            DT: ''
        });
    }
};

export default {
  handleGetAllUsers,
  handleCreateNewUser,
  handleEditUser,
  handleDeleteUser
};

