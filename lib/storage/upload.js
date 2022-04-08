import pcloudSdk from 'pcloud-sdk-js';

export const pCloud = async() => {
	pcloudSdk.oauth.initOauthPollToken({
	  client_id: "3d6l0s1hPPY",
	  receiveToken: function(access_token) {
	    console.log('access_token',access_token)
	  },
	  onError: function(err) {
	  	console.log('error:', err)
	  }
	});
}