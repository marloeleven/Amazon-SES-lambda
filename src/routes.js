import * as services from './services';

/**
 * @typedef {import('./utils').PostEndPoint} PostEndPoint
 * @typedef {import('./utils').GetEndPoint} GetEndPoint
 * @typedef {import('./utils').EndPoints} EndPoints
 */

const ENDPOINTS = {
  EMAIL: '/email',
  TEMPLATE: '/template',
  REFRESH_SECRET: '/refresh-secret',
};

/** @type {PostEndPoint} */
const POST_ENPOINTS = {
  [ENDPOINTS.EMAIL]: {
    auth: true,
    handler: services.handleSendBulkEmail,
  },
  [ENDPOINTS.TEMPLATE]: {
    auth: true,
    handler: services.handleCreateTemplate,
  },
};

/** @type {GetEndPoint} */
const GET_ENDPOINTS = {
  [ENDPOINTS.TEMPLATE]: {
    auth: true,
    handler: services.handleGetTemplate,
  },
  [ENDPOINTS.REFRESH_SECRET]: {
    auth: false,
    handler: services.handleGetTemplate,
  },
};

/**
 * @param {'POST' | 'GET'} method
 * @returns {EndPoints}
 */
export function getEndpoints(method) {
  return method === 'POST' ? POST_ENPOINTS : GET_ENDPOINTS;
}
