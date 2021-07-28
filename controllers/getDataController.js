const { Doctor, Hospital, Specialist } = require('../models');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

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

    static async payment (req, res, next) {
        try {
            const id = req.params.id
            const getId = await Doctor.findByPk(id)
            if (getId) {
                const data = {
                    email: req.body.stripeEmail, 
                    source: req.body.stripeToken, 
                    name: 'Yo Doc', 
                    address: { 
                        line1: 'Jalan Jelawang', 
                        postal_code: '18300', 
                        city: 'Gua Musang', 
                        state: 'Kelatan', 
                        country: 'Malaysia'
                    }
                }
                const createData = await stripe.customers.create(data) 
                
                if (createData) {
                    const price = getId.price
                    const charges = await stripe.charges.create({ 
                        amount: price,	 // Charing Rs 25 
                        description: 'Web Development Product', 
                        currency: 'ID', 
                        customer: customer.id 
                    });
                    res.status(200).json(charges)
                } else {
                    throw {code : 404}
                }
            } else {
                throw {code : 404}
            }
        } catch (err) {
            next({
                code : 500,
                message : err.message
            })
        }
    }
}

module.exports = GetData