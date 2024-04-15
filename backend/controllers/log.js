const Log = require('../models/log');

exports.createLog = async (req, res) => {
    // console.log("here", req.body)
    try {
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const ipAddress = ip.includes('::ffff:') ? ip.split(':').pop() : ip;
        const userAgent = req.headers['user-agent'];
        const deviceType = getDeviceTypeFromUserAgent(userAgent);
        const browser = getBrowserFromUserAgent(userAgent);

        let log = await Log.create({ ipAddress, userAgent, deviceType, browser });
        return res.status(201).send({
            success: true,
            log
        }
        );
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: "Error while creating log",
            error
        })
    }
};

function getDeviceTypeFromUserAgent(userAgent) {
    if (userAgent.includes('Mobile')) {
        return 'Mobile';
    } else if (userAgent.includes('Tablet')) {
        return 'Tablet';
    } else {
        return 'Desktop';
    }
};


function getBrowserFromUserAgent(userAgent) {
    if (userAgent.includes('Chrome')) {
        return 'Chrome';
    } else if (userAgent.includes('Firefox')) {
        return 'Firefox';
    } else if (userAgent.includes('Safari')) {
        return 'Safari';
    } else if (userAgent.includes('Edge')) {
        return 'Edge';
    } else if (userAgent.includes('Opera')) {
        return 'Opera';
    } else {
        return 'Unknown';
    }
};
