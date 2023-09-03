function convertCampaign(req, res, next) {
  console.log('were in convert');
  console.log(req.body);

  campaigns = [];

  Object.entries(req.body).forEach(([key, value]) => {
    const [ attribute, campaignIndex, subAttribute ] = key.split('_');
    if(!campaigns[+campaignIndex]) {
      campaigns[+campaignIndex] = {};
    }

    if (attribute == 'buttons') {
      if (!campaigns[+campaignIndex][attribute]) {
        campaigns[+campaignIndex][attribute] = [];
      }
      if (Array.isArray(req.body[key])) {
        req.body[key].forEach((val, ind) => {
          if (!campaigns[+campaignIndex][attribute][ind]) {
            console.log('creating button' + ind);
            campaigns[+campaignIndex][attribute][ind] = {};
          }
          campaigns[+campaignIndex][attribute][ind][subAttribute] = val;
        });
      } else {
        if (!campaigns[+campaignIndex][attribute][0]) {
          campaigns[+campaignIndex][attribute][0] = {};
        }
        campaigns[+campaignIndex][attribute][0][subAttribute] = value;
      }
    } else {
      campaigns[+campaignIndex][attribute] = value;
    }
  });

  req.body = { campaigns };
  return next();
}

module.exports = convertCampaign;