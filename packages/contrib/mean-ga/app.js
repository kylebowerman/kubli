'use strict';

var mean = require('meanio'),
	fs = require('fs'),
	Module = mean.Module;

var MeanGoogleAnalytics = new Module('mean-ga');

MeanGoogleAnalytics.register(function(app, auth, database) {


	var template = fs.readFileSync(__dirname + '/template.js', 'utf8');

	var trackingId = mean.config.clean.googleTrackingId;

	MeanGoogleAnalytics.aggregateAsset('js', template.replace('__TRACKING_ID__', trackingId), {
		group: 'header',
		weight: -9999,
		inline: true
	});

	return MeanGoogleAnalytics;
});
