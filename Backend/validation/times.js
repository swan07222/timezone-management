const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateTimesInput(data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.city = !isEmpty(data.city) ? data.city : '';
    data.difference = !isEmpty(data.difference) ? data.difference : '';

    if(Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }

    if(Validator.isEmpty(data.city)) {
        errors.city = 'City field is required';
    }

    if(Validator.isEmpty(data.difference)) {
        errors.difference = 'difference is invalid';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}