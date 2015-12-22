# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|
  config.vm.box = "ubuntu/trusty64"
  config.vm.network "forwarded_port", guest: 8080, host: 8080, auto_correct: true
  config.vm.provider 'virtualbox' do |vb|
    vb.memory = '1024'
  end
  config.vm.provision 'shell', path: 'vagrant/provision_script.sh'
end
