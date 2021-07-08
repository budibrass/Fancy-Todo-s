function errHandler(err, req, res, next)
{
    let errs = []
    let statusCode = 500

    console.log(err, `<<<<ERROOOR dari ERR HANDLER`);
    if (err.name === `SequelizeValidationError`){
        err.errors.forEach(element => {
            errs.push(element.message)
        });
        statusCode = 400;
    } else if (err.name === `SequelizeUniqueConstraintError`) {
        err.errors.forEach(element => {
            errs.push(element.message)
        });
        statusCode = 400;
    } else if (err.name === `authenticationFailed`) {
        errs.push(err.msg)
        statusCode = 400;
    } else if (err.name === `failedAuthorization`) {
        errs.push(err.msg)
        statusCode = 400;
    } else if (err.name === `JsonWebTokenError`) {
        errs.push(`jwt must be provided`)
        statusCode = 400;
    } else if (err.name === `emptyData`) {
        errs.push(err.msg)
        statusCode = 404;
    } else if (err.name === `nullValue`) {
        errs.push(err.msg)
        statusCode = 404;
    } else if (err.name === `invalidEmailOrPassword`) {
        errs.push(err.msg)
        statusCode = 500;
    } else if (err.name === `expiredDate`) {
        errs.push(err.msg)
        statusCode = 400;
    }
   
    res.status(statusCode).json({ errs })
    // res.status(statusCode).json({ err })
};

module.exports = errHandler;