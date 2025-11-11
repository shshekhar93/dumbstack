#!/bin/bash
echo "Starting dumb suite"
declare -A APPS=(
  [DumbPad]='4000'
  [DumbDrop]='4001'
  [DumbBudget]='4002'
  [DumbTerm]='4003'
  [DumbDo]='4004'
  [DumbAssets]='4005'
  [DumbKan]='4006'
  [DumbWhoIs]='4007'
)
for app in ${!APPS[@]}; do
  export PORT="${APPS[$app]}"
  cd ~/dumb-suite/$app

  echo "Starting $app on port $PORT";
  pm2 start --name="$app" npm -- start
done

nginx;
/bin/bash