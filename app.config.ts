module.exports = {
  expo: {
    name               : 'WriteDownAPP',
    slug               : 'WriteDownAPP',
    version            : '1.0.0',
    orientation        : 'portrait',
    icon               : './src/assets/images/icon.png',
    scheme             : 'myapp',
    userInterfaceStyle : 'automatic',
    splash             : {
      image           : './src/assets/images/splash.png',
      resizeMode      : 'contain',
      backgroundColor : '#ffffff'
    },
    assetBundlePatterns : ['**/*'],
    ios                 : {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage : './src/assets/images/adaptive-icon.png',
        backgroundColor : '#ffffff'
      }
    },
    web: {
      bundler : 'metro',
      favicon : './src/assets/images/favicon.png'
    }
  }
};
