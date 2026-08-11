const { ADMIN_PASSWORD_HASH, signToken, parseJsonBody, constantTimeCompare, buildResponse, JWT_EXPIRES_IN } = require('./_helpers');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return buildResponse(res, 405, { error: 'Method not allowed' });
  }

  try {
    const body = await parseJsonBody(req);
    const hash = body?.hash;
    if (!hash) {
      return buildResponse(res, 400, { error: 'Missing password hash' });
    }

    if (!constantTimeCompare(hash, ADMIN_PASSWORD_HASH)) {
      return buildResponse(res, 401, { error: 'Invalid credentials' });
    }

    const token = signToken({ role: 'admin', exp: Math.floor(Date.now() / 1000) + JWT_EXPIRES_IN });
    return buildResponse(res, 200, { token });
  } catch (error) {
    return buildResponse(res, 400, { error: 'Invalid request body' });
  }
};
