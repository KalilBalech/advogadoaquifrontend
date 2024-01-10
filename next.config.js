const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')
/** @type {import('next').NextConfig} */

module.exports = (phase) => {
    if(phase === PHASE_DEVELOPMENT_SERVER){
        return {
            env: {
                BASE_URL: 'http://127.0.0.1:8000/api/v1'
            }
        };
    }

    return {
        env: {
            BASE_URL: 'http://15.229.23.70:8000/api/v1'
        }
    }
}