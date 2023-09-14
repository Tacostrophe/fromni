function convertCampaign(req, res, next) {
  const campaigns = [];

  Object.entries(req.body).forEach(([key, value]) => {
    const [attribute, campaignIndex, subAttribute] = key.split('_');
    if (!campaigns[+campaignIndex]) {
      campaigns[+campaignIndex] = {};
    }

    if (attribute === 'buttons') {
      if (!campaigns[+campaignIndex][attribute]) {
        campaigns[+campaignIndex][attribute] = [];
      }
      if (Array.isArray(req.body[key])) {
        req.body[key].forEach((val, ind) => {
          if (!campaigns[+campaignIndex][attribute][ind]) {
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

  // if some campaign was deleted campaign list (campaigns var here) will include empty values
  // so we filter them
  req.body = { campaigns: campaigns.filter((campaign) => campaign) };
  return next();
}

module.exports = convertCampaign;
