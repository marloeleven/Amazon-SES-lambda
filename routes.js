import * as services from './services';

const ENDPOINTS = {
  EMAIL: '/email',
  TEMPLATE: '/template',
};

/**
 * @typedef {import('./utils').EndPoint} EndPoint
 *
 * @type {EndPoint}
 */
const POST_ENPOINTS = {
  [ENDPOINTS.EMAIL]: services.handleSendBulkEmail,
  [ENDPOINTS.TEMPLATE]: services.handleCreateTemplate,
};

/**
 * @type {EndPoint}
 */
const GET_ENDPOINTS = {
  [ENDPOINTS.TEMPLATE]: services.handleGetTemplate,
};

/**
 *
 * @param {'POST' | 'GET'} method
 * @returns {EndPoint}
 */
export function getEndpoints(method) {
  return method === 'POST' ? POST_ENPOINTS : GET_ENDPOINTS;
}
