#!/bin/bash

# Configure list of apps and its repo
declare -A APPS=(
  [DumbPad]='https://github.com/DumbWareio/DumbPad'
  [DumbDrop]='https://github.com/DumbWareio/DumbDrop'
  [DumbBudget]='https://github.com/DumbWareio/DumbBudget'
  [DumbTerm]='https://github.com/DumbWareio/DumbTerm'
  [DumbDo]='https://github.com/DumbWareio/DumbDo'
  [DumbAssets]='https://github.com/DumbWareio/DumbAssets'
  [DumbKan]='https://github.com/DumbWareio/DumbKan'
  [DumbWhoIs]='https://github.com/DumbWareio/DumbWhoIs'
)

# Clone & setup all repos
mkdir -p ~/dumb-suite

for app in ${!APPS[@]}; do
  cd ~/dumb-suite
  echo "Cloning ${APPS[$app]} in ~/dumb-suite/$app"
  mkdir -p $app
  git clone ${APPS[$app]} $app

  cd $app
  npm i;
done

# install nodemon
npm i -g pm2
