const express = require('express');
const nftRouter = express.Router();
const { wrapAsync } = require('../utils/utils');
const nftController = require('../controller/nft-controller');

nftRouter.get('/signature', wrapAsync(nftController.signature));
nftRouter.get('/merkle_proof', wrapAsync(nftController.proof));
module.exports = nftRouter;