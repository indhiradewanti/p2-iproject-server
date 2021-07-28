const { Doctor, Hospital, Specialist } = require('../models');

class GetData {
    static async getAll (req, res, next) {
        try {
            let getDoctor = await Doctor.findAll(
                { include : [
                    { model : Hospital },
                    { model : Specialist }
                ]});
            res.status(200).json({getDoctor});
        } catch (err) {
            console.log(err);
            next({
                code : 500,
                message : err.message
            })
        }
    }
}

module.exports = GetData