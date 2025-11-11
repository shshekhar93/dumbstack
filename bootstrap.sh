#!/bin/bash

# nginx stuff
# domainName=$1
# echo "Domain is $domainName"
# sed -i "9i server_name $domainName" /etc/nginx/http.d/dumbstack.conf
# rm /etc/nginx/http.d/default.conf

# Configure list of apps and its repo
DUMB_PAD_REPO=https://github.com/DumbWareio/DumbPad
DUMB_DROP_REPO=https://github.com/DumbWareio/DumbDrop
DUMB_BUDGET_REPO=https://github.com/DumbWareio/DumbBudget
DUMB_TERM_REPO=https://github.com/DumbWareio/DumbTerm
DUMB_DO_REPO=https://github.com/DumbWareio/DumbDo
DUMB_ASSETS_REPO=https://github.com/DumbWareio/DumbAssets
DUMB_KAN_REPO=https://github.com/DumbWareio/DumbKan
DUMB_WHOIS_REPO=https://github.com/DumbWareio/DumbWhoIs

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
