/**
 * @typedef {'lost' | 'found'} ItemType
 * @typedef {'active' | 'possible_match' | 'claim_pending' | 'verified' | 'returned' | 'closed'} ItemStatus
 *
 * @typedef {Object} Item
 * @property {string} id
 * @property {ItemType} type
 * @property {string} name
 * @property {string} category
 * @property {string} description
 * @property {string|null} image
 * @property {string} location
 * @property {string} date ISO date (YYYY-MM-DD)
 * @property {string} time HH:mm (24h)
 * @property {ItemStatus} status
 * @property {string} reportedBy
 * @property {string} createdAt ISO datetime
 *
 * @typedef {Object} MatchSignals
 * @property {number} visual
 * @property {number} category
 * @property {number} location
 * @property {number} date
 *
 * @typedef {Object} MatchResult
 * @property {string} id
 * @property {string} queryItemId
 * @property {string} candidateItemId
 * @property {number} score
 * @property {MatchSignals} signals
 * @property {string} explanation
 *
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} [token]
 */

export {}