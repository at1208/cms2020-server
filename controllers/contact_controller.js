const Contact from '../models/contact_model';

module.exports.create_contact = (req, res) => {
    const {name, email, phone, contactType } = req.body;
    const newContact = Contact({ name, email, phone, contactType})
      newContact.save((err, result) => {
        if(err){
          return res.status(400).json({
            error: err
          })
        }
        res.status(200).json({
          response: "Contact created successfully"
        })
      })
}
