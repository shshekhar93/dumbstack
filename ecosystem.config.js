const AllApps = [
  'DumbPad', 'DumbDrop', 'DumbBudget', 'DumbTerm', 'DumbDo', 'DumbAssets', 'DumbKan', 'DumbWhois'
];

function appNameToConfigs(appNames) {
  const envMap = generateEnvVariables(appNames);
  return appNames.map(appName => ({
    name: appName + '_' + envMap[appName].PORT,
    cwd: `./${appName}`,
    script: 'npm start',
    env: envMap[appName],
  }));
}

const envPrefix = new RegExp(`^DUMB(${AllApps.map(app => app.replace('Dumb', '').toUpperCase()).join('|')})_(.+)$`);
const FIRST_PORT = 4000;

function generateEnvVariables(appNames) {
  const envVariablesMap = appNames.reduce((acc, appName, i) => {
    acc[appName] = {
      PORT: FIRST_PORT + i,
    };
    return acc;
  }, {});

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

module.exports = {
  apps : appNameToConfigs(AllApps),
};
