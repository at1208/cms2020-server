const Member = require('../models/member_model');
const Designation = require('../models/designation_model');
const Department = require('../models/department_model');

const jwt = require('jsonwebtoken');
const { errorHandler } = require('../helpers/dbErrorHandler');


// sendgrid
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.inviteonBoard = (req, res) => {
    const { firstName, lastName, email, designation, department, contactNumber } = req.body;
    Member.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (user) {
            return res.status(400).json({
                error: 'Email is taken'
            });
        }
        const token = jwt.sign({ firstName, lastName, email, designation, department, contactNumber }, process.env.JWT_INVITATION, { expiresIn: '1d' });
        const emailData = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: `Account activation`,
            html: `
            <div style="padding-left:20px; padding-right:20px">
             <h1 style="text-align:center">Welcome you on board!</h1>
             <div style="text-align:left;">Hi ${firstName},</div>
             <p>Congratulations on being part of the team! The whole company welcomes you and we look forward to a successful journey with you! Welcome aboard!</p>
             <p>Please click on the following button to activate your acccount:</p>
             <div style= "text-align:center; padding:20px 20px 20px 20px;" ><a href=${process.env.CLIENT_URL}/auth/onboard/${token}><button style="padding:10px 30px; background:linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%); color:white; font-weight:700; border:0px; font-size:20px">Activate</button></a></div>
             <hr />
             <p>This email may contain sensetive information</p>
          </div>
        `
        };
        sgMail.send(emailData).then(sent => {
            return res.json({
                message: `Invitation has been sent to ${email}`
            })
        })
        .catch((err) => {
          console.log(err.response.body)
        });
    });
};


exports.signup = (req, res) => {
     const { token, password } = req.body;
     if(!password){
       return res.status(400).json({
         error: "Password is required"
       })
     }
    if (token) {
        jwt.verify(token, process.env.JWT_INVITATION, function(err, decoded) {
            if (err) {
                return res.status(401).json({
                    error: 'Expired link'
                });
            }

            const { firstName, lastName, email, designation, department, contactNumber } = jwt.decode(token);
            const fullName = firstName+' '+lastName;
            Member.find({ email })
              .exec((err, result) => {
                if(err){
                  return res.status(400).json({
                    error: err
                  })
                }
                if(result.length>0){
                  return res.status(200).json({
                      result:"Account is activated already"
                  })
                }


                const newMember = new Member({ firstName, lastName,fullName, email, password, designation, department, contactNumber });
                newMember.save((err, user) => {
                    if (err) {
                        return res.status(401).json({
                            error: errorHandler(err)
                        });
                    }
                    console.log(designation, department)
                    Designation.findByIdAndUpdate({ _id: designation[0]}, {member: user._id}, {new: true})
                     .exec((err, resp) => {
                       if(err){
                         return res.status(400).json({
                           error: err
                         })
                       }
                       Department.findByIdAndUpdate({ _id: department[0]}, {member: user._id}, {new:true})
                       .exec((err, response) => {
                         if(err){
                           return res.status(400).json({
                             error: err
                           })
                         }
                         return res.json({
                             message: 'On board success! Please login'
                         });
                       })
                     })
                });
              })
        });
    } else {
        return res.json({
            message: 'Something went wrong. Try again'
        });
    }
};

exports.signin = (req, res) => {
    const { email, password } = req.body;
    if((email === process.env.ADMIN_EMAIL) && (password === process.env.ADMIN_PASSWORD)){
        const token = jwt.sign({ _id: 'ahbcbjdbcbd123bbcdhbx' }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.cookie('token', token, { expiresIn: '1d' });
        return res.json({
            token,
            member: { _id: "ahbcbjdbcbd123bbcdhbx", firstName:"admin", email:"admin@"  }
        });
    }
    // check if user exist
    Member.findOne({ email }).exec((err, member) => {
        if (err || !member) {
            return res.status(400).json({
                error: 'User with that email does not exist.'
            });
        }
        // authenticate
        if (!member.authenticate(password)) {
            return res.status(400).json({
                error: 'Email and password do not match.'
            });
        }
        // generate a token and send to client
        const token = jwt.sign({ _id: member._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie('token', token, { expiresIn: '1d' });
        const { _id, firstName, email } = member;
        return res.json({
            token,
            member: { _id, firstName, email  }
        });
    });
};
