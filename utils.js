const { existsSync, mkdirSync, symlinkSync } = require('fs');

function ensureDirExists(path) {
  if (!existsSync(path)) {
    mkdirSync(path, { recursive: true });
  }
}

const AllApps = [ 'DumbPad', 'DumbDrop', 'DumbBudget', 'DumbTerm', 'DumbDo', 'DumbAssets', 'DumbKan', 'DumbWhois' ];

async function genericSetup() {
  // Any generic setup can be done here

  // Create data and upload folder in the volme for every app
  AllApps.forEach(async (appName) => {
    ensureDirExists(`/data/${appName}`);
    ensureDirExists(`/uploads/${appName}`);
  });

  /** 
   * Create the data folders as symlinkSyncs if its not configurable via env vars
   * Eventually we should make all apps configurable via env vars.
   */
  // For DumbPad
  if (!existsSync('/root/dumb-suite/DumbPad/data')) {
    symlinkSync('/data/DumbPad', '/root/dumb-suite/DumbPad/data');
  }
  // For DumbBudget
  if (!existsSync('/root/dumb-suite/DumbBudget/data')) {
    symlinkSync('/data/DumbBudget', '/root/dumb-suite/DumbBudget/data');
  }

  // For DumbDo
  if (!existsSync('/root/dumb-suite/DumbDo/data')) {
    symlinkSync('/data/DumbPad', '/root/dumb-suite/DumbDo/data');
  }

  // For DumbAssets
  if (!existsSync('/root/dumb-suite/DumbAssets/data')) {
    symlinkSync('/data/DumbAssets', '/root/dumb-suite/DumbAssets/data');
  }
  // Create upload subfolders for DumbAssets
  ensureDirExists('/uploads/DumbAssets/Images');
  ensureDirExists('/uploads/DumbAssets/Receipts');
  ensureDirExists('/uploads/DumbAssets/Manuals');
  
  if (!existsSync('/root/dumb-suite/DumbAssets/data/Images'))
    symlinkSync('/uploads/DumbAssets/Images', '/root/dumb-suite/DumbAssets/data/Images')
  
  if (!existsSync('/root/dumb-suite/DumbAssets/data/Receipts'))
    symlinkSync('/uploads/DumbAssets/Receipts', '/root/dumb-suite/DumbAssets/data/Receipts');
  
  if (!existsSync('/root/dumb-suite/DumbAssets/data/Manuals'))  
    symlinkSync('/uploads/DumbAssets/Manuals', '/root/dumb-suite/DumbAssets/data/Manuals');

  // For DumbKan
  if (!existsSync('/root/dumb-suite/DumbKan/data')) 
    symlinkSync('/data/DumbKan', '/root/dumb-suite/DumbKan/data');
}

module.exports = {
  genericSetup,
};