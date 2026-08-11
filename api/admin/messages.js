const { supabase, getAuthPayload, buildResponse } = require('./_helpers');
const { URL } = require('url');

module.exports = async (req, res) => {
  const auth = getAuthPayload(req);
  if (!auth || auth.role !== 'admin') {
    return buildResponse(res, 401, { error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    const { data, error } = await supabase.from('chat_messages').select('*').order('created_at', { ascending: true }).limit(100);
    if (error) {
      return buildResponse(res, 500, { error: error.message });
    }
    return buildResponse(res, 200, { data });
  }

  if (req.method === 'DELETE') {
    const requestUrl = new URL(req.url, 'http://localhost');
    const id = requestUrl.searchParams.get('id');
    if (!id) {
      return buildResponse(res, 400, { error: 'Missing message id' });
    }
    const { error } = await supabase.from('chat_messages').delete().eq('id', id);
    if (error) {
      return buildResponse(res, 500, { error: error.message });
    }
    return buildResponse(res, 200, { success: true });
  }

  return buildResponse(res, 405, { error: 'Method not allowed' });
};
