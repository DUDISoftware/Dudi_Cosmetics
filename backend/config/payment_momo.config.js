const axios = require('axios');
const crypto = require('crypto');

const accessKey = 'F8BBA842ECF85';
const secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
const partnerCode = 'MOMO';
const redirectUrl = 'https://www.facebook.com/';
const ipnUrl = 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b';
const requestType = "payWithMethod";
const orderId = partnerCode + new Date().getTime();
const requestId = orderId;
const extraData ='';
const orderGroupId ='';
const autoCapture =true;
const lang = 'vi';

//before sign HMAC SHA256 with format
//accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType

// Create the request
const endpoint = 'https://test-payment.momo.vn/v2/gateway/api/create';

exports.createPayment = async (amount, orderInfo = "pay with MoMo", ) => {

  const rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" + requestType;
  
  const signature = crypto.createHmac('sha256', secretKey)
    .update(rawSignature)
    .digest('hex');
  const requestBody = JSON.stringify({
    partnerCode : partnerCode,
    partnerName : "Test",
    storeId : "MomoTestStore",
    requestId : requestId,
    amount : amount,
    orderId : orderId,
    orderInfo : orderInfo,
    redirectUrl : redirectUrl,
    ipnUrl : ipnUrl,
    lang : lang,
    requestType: requestType,
    autoCapture: autoCapture,
    extraData : extraData,
    orderGroupId: orderGroupId,
    signature : signature
  });

  try {
    const response = await axios.post(endpoint, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(requestBody)
      },
    });
    return response.data;
  } catch (error) {
    console.error("Payment creation failed:", error);
    throw error;
  }
}

exports.checkTransactionStatus = async (requestId, orderId) => {
  // HMAC_SHA256(accessKey=$accessKey&orderId=$orderId&partnerCode=$partnerCode&requestId=$requestId,secretKey)
  const rawSignature = "accessKey=" + accessKey + "&orderId=" + orderId + "&partnerCode=" + partnerCode + "&requestId=" + requestId;
  
  const signature = crypto.createHmac('sha256', secretKey)
    .update(rawSignature)
    .digest('hex');

  const endpoint = 'https://test-payment.momo.vn/v2/gateway/api/query';
  const requestBody = JSON.stringify({
    partnerCode: partnerCode,
    accessKey: accessKey,
    requestId: requestId,
    orderId: orderId,
    lang: lang,
    signature: signature
  });

  try {
    const response = await axios.post(endpoint, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(requestBody)
      },
    });
    return response.data;
  } catch (error) {
    console.error("Payment creation failed:", error);
    throw error;
  }
}