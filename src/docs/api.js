/**
 * @api {post} /api/auth/login Login
 * @apiName Login
 * @apiGroup Auth
 * @apiVersion 1.0.0
 * 
 * @apiParam {String} email User's email
 * @apiParam {String} password User's password
 * 
 * @apiSuccess {String} token JWT token
 * @apiSuccess {Object} user User details
 */ 