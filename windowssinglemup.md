README.md# meteor-up [![Stories in Ready](https://badge.waffle.io/kadirahq/meteor-up.svg?label=ready&title=Ready)](http://waffle.io/kadirahq/meteor-up)

#### Production Quality Meteor Deployments

Meteor Up is a command line tool that allows you to deploy any [Meteor](http://meteor.com) app to your own server. It currently supports Ubuntu.

This version of Meteor Up is powered by [Docker](http://www.docker.com/), making deployment easy to manage and reducing a lot of server specific errors.

This is for a single app on windows to your linux server

**Table of Contents**

- [Server Configuration](#server-configuration)
- [Installing Meteor](#install-meteor)
- [Create Meteor Project](#create-meteor-project)
- [Installing NPM and Meteor Up packages](#installing-npm-and-meteor-up-packages)
- [Create the Deploy Folder](#create-the-deploy-folder)
- [Create the Mup.js File](#create-the-mup.js-file)
- [Setting Up a Server](#setting-up-a-server)
- [Deploying an App](#deploying-an-app)
- [Other Utility Commands](#other-utility-commands)
- [Updating](#updating-mup)

### Install Meteor
	curl https://install.meteor.com/ | sh

### Create Meteor Project
	meteor create appname
	cd appname

### Installing NPM and Meteor Up packages
	meteor npm install
	meteor npm install -g mup

You will need to make sure this is installed on deveploment or test server

  * `sudo apt-get update`
  * `sudo apt-get upgrade`
  * `sudo apt install npm`
  * `sudo apt install nodejs-legacy`
  * `sudo reboot`

### Create the Deploy Folder
    mkdir .deploy
    cd .deploy

### Create the Mup.js File
    meteor mup init

This will create two files in your Meteor Up project directory:

  * `mup.js` - Meteor Up configuration file
  * `settings.json` - Settings for Meteor's [settings API](http://docs.meteor.com/#meteor_settings)

### Setting Up a Server

    meteor mup setup

This will set up the server for the `mup` deployments. It will take around 2-5 minutes depending on the server's performance and network availability.

### Deploying an App

    meteor mup deploy

This will bundle the Meteor project and deploy it to the server. The bundling process is exactly how `meteor deploy` does it.

### Other Utility Commands

* `mup reconfig` - reconfigure app with new environment variables and Meteor settings
* `mup stop` - stop the app
* `mup start` - start the app
* `mup restart` - restart the app
* `mup logs [-f --tail=50]` - get logs

### Updating Mup

To update `mup` to the latest version, just type:

    npm update mup -g

You should try and keep `mup` up to date in order to keep up with the latest Meteor changes.
