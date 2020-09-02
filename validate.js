const express = require('express');
const router = express.Router();


const Joi = require('joi');
const schema = Joi.object({
    name: Joi.string().regex(/^[a-zA-Z0-9ğışçöĞİŞÇÖ]{3,30}$/),
    ip: Joi.string().ip({
        version: [
            'ipv4',
            'ipv6'
        ],
        cidr: 'optional'
    })
});

module.exports = {
    isValidSetIp: (input) => {
        const result = schema.validate(input);
        if (result.error) return {
            valid: false,
            error: result.error
        };

        return {
            valid: true
        };
    }
};