#!/bin/bash

####################
# upgrade system
####################
apt-get update && sudo apt-get -y upgrade

####################
# install git
####################
apt-get -y install git-core

####################
# install rvm and ruby v2.2.0
# https://github.com/AgilionApps/VagrantDevEnv/blob/master/scripts/ruby-2.2.0.sh
####################
if [[ -s "/home/vagrant/.rvm/scripts/rvm" ]] ; then
  echo 'RVM installed, skipping RVM install'
else
  \curl -sSL https://get.rvm.io | bash -s -- --version 1.25.0
fi

source '/home/vagrant/.rvm/scripts/rvm'

if rvm list strings | grep -lq ruby-2.2.0 ; then
  echo 'Ruby 2.2.0 installed. Skipping installed.'
else
  rvm autolibs packages
  rvm requirements
  rvm mount https://rubies.travis-ci.org/ubuntu/12.04/x86_64/ruby-2.2.0.tar.bz2
  rvm use 2.2.0 --default
  gem update bundler
fi

echo 'Setting Ruby 2.2.0 as default'

######################
# install nvm and node v4.2.3
# http://askubuntu.com/questions/589058/node-is-installed-during-provisioning-on-vagrant-but-disappears-upon-connecting
######################
curl https://raw.githubusercontent.com/creationix/nvm/v0.24.1/install.sh | bash
source $HOME/.nvm/nvm.sh

nvm install 4.2.3
nvm alias default 4.2.3

######################
####### WIP ##########
# install node_modules
####### WIP ##########
######################
cd /vagrant
npm install