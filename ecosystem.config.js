const { genericSetup } = require('./utils.js');

const STATIC_APP_ENV = {
  DumbPad: {
    PORT: 4000,
  },
  DumbDrop: {
    PORT: 4001,
    UPLOAD_DIR: '/uploads/DumbDrop'
  },
  DumbBudget: {
    PORT: 4002,
  },
  DumbTerm: {
    PORT: 4003,
  },
  DumbDo: {
    PORT: 4004,
  },
  DumbAssets: {
    PORT: 4005,
  },
  DumbKan: {
    PORT: 4006,
  },
  DumbWhois: {
    PORT: 4007,
  },
};

const AllApps = Object.keys(STATIC_APP_ENV);

function appNameToConfigs(appNames) {
  const envMap = generateEnvVariables(appNames);
  return appNames.map(appName => ({
    name: appName + '_' + envMap[appName].PORT,
    cwd: `./${appName}`,
    script: 'npm start',
    env: envMap[appName],
  }));
}

const STATIC_SHARED_ENV = {
  TRUST_PROXY: 'true',
  TRUSTED_PROXY_IPS: 'loopback',
}


const envPrefix = new RegExp(`^DUMB(${AllApps.map(app => app.replace('Dumb', '').toUpperCase()).join('|')})_(.+)$`);

function generateEnvVariables(appNames) {
  const envVariablesMap = appNames.reduce((acc, appName, i) => {
    return {
      ...acc,
      [appName]: {
        ...acc[appName],
        ...STATIC_SHARED_ENV,
      },
    };
  }, STATIC_APP_ENV);

  Object.keys(process.env).forEach(key => {
    const match = key.match(envPrefix);
    if (!match) {
      return;
    }

    const appName = `Dumb${match[1][0] + match[1].slice(1).toLowerCase()}`;
    const varName = match[2];

    envVariablesMap[appName] = {
      ...envVariablesMap[appName],
      [varName]: process.env[key],
    }
  });
  return envVariablesMap; 
}

genericSetup().catch(console.error);

module.exports = {
  apps : appNameToConfigs(AllApps),
};
