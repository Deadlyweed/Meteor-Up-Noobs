README_NEW.md# meteor-up [![Stories in Ready](https://badge.waffle.io/kadirahq/meteor-up.svg?label=ready&title=Ready)](http://waffle.io/kadirahq/meteor-up)

#### Production Quality Meteor Deployments

Meteor Up is a command line tool that allows you to deploy any [Meteor](http://meteor.com) app to your own server. It currently supports Ubuntu.

You can install and use Meteor Up on Linux, Mac and Windows.

This version of Meteor Up is powered by [Docker](http://www.docker.com/), making deployment easy to manage and reducing a lot of server specific errors.

I'm making this new read file on my account because I will be making more changes to this. I only tested it for a single app on a server.

I know my mup.js work 100% the way i have it set up. Anything I dont have comment out is what i got to work. I dont think anything that you uncomment to use should work. I'm using windows and deploy right to digital ocean account with no problem. 

This will work for:
Windows to Linux

Haven't been test for:
Mac to Windows-
Mac to Linux

**Table of Contents**

- [Features](#features)
- [Server Configuration](#server-configuration)
- [Installing Meteor](#install-meteor)
- [Create Meteor Project](#create-meteor-project)
- [Installing NPM and Meteor Up packages](#installing-npm-and-meteor-up-packages)
- [Create the Deploy Folder](#create-the-deploy-folder)
- [Create the Mup.js File](#create-the-mup.js-file)
- [Example File](#example-file)
- [Setting Up a Server](#setting-up-a-server)
- [Deploying an App](#deploying-an-app)
- [Build Options](#build-options)
- [Additional Setup/Deploy Information](#additional-setupdeploy-information)
    - [Server Setup Details](#server-setup-details)
    - [Deploy Wait Time](#deploy-wait-time)
    - [Multiple Deployment Targets](#multiple-deployment-targets)
- [Accessing the Database](#accessing-the-database)
- [Multiple Deployments](#multiple-deployments)
- [SSL Support](#ssl-support)
- [Updating](#updating-mup)
- [Troubleshooting](#troubleshooting)
- [Migrating from Meteor Up 0.x](#migrating-from-meteor-up-0x)
- [FAQ](#faq)

### Features

* Single command server setup
* Single command deployment
* Multi server deployment
* Environment Variable management
* Support for [`settings.json`](http://docs.meteor.com/#meteor_settings)
* Password or Private Key (pem) based server authentication
* Access logs from the terminal (supports log tailing)
* Support for custom docker images

### Server Configuration

* Auto-restart if the app crashes
* Auto-start after server reboot
* Runs with docker for better security and isolation
* Reverts to the previous version if the deployment failed
* Pre-installed PhantomJS

### Install Meteor
	curl https://install.meteor.com/ | sh

### Create Meteor Project
	meteor create appname
	cd appname

### Installing NPM and Meteor Up packages
	meteor npm install
	meteor npm install -g mup

You will need to make sure this is installed on deveploment or test server

  * `sudo apt install nodejs-legacy` 
  * `sudo apt-get update` 
  * `sudo apt-get upgrade` 
  * `sudo reboot` 

### Create the Deploy Folder
    mkdir .deploy
    cd .deploy

### Create the Mup.js File
    meteor mup init

This will create two files in your Meteor Up project directory:

  * `mup.js` - Meteor Up configuration file
  * `settings.json` - Settings for Meteor's [settings API](http://docs.meteor.com/#meteor_settings)

### Example File

```js
module.exports = {
  servers: {
    one: {
      host: 'xxx.xxx.xx.xx', // Your IP for test or production server
      username: 'root',
      // pem: '/home/user/.ssh/id_rsa', // mup doesn't support '~' alias for home directory
      // password: 'password',
      // or leave blank for authenticate from ssh-agent
      // opts: { // (optional)
      // port: 22,
      // },
    }
  },

  meteor: {
    name: 'appname',
    path: './', // mup for a single app (best for windows to linux)
      // path: './home/multipleapp/', // mup for multiple app

	  // useful when deploying multiple instances (optional) //
      // port: 000,

	  // lets you add docker volumes (optional) //
      // volumes: {
	  // passed as '-v /host/path:/container/path' to the docker run command //
      // "/host/path": "/container/path", 
      // "/second/host/path": "/second/container/path"
      // },
    docker: {
      image:'kadirahq/meteord:base', // (optional) //
      // image: 'abernix/meteord:base', // use this image if using Meteor 1.4+ //
	  
      // lets you add/overwrite any parameter on the docker run command (optional) //
	  // args:[
      // "--link=myCustomMongoDB:myCustomMongoDB", // linking example
      // "--memory-reservation 200M" // memory reservation example
      // ]

    },
    servers: {
      one: {}, two: {}, three: {} // list of servers to deploy, from the 'servers' list
    },
    buildOptions: {
      // (--server-only--) Skip building mobile apps even if mobile platforms have been added. (optional) //
      serverOnly: true,

	  // (--architecture--) Builds the server for a different architecture than your developer machine's //
	  // architecture. Valid architectures include os.osx.x86_64, os.linux.x86_32, os.linux.x86_64, //
	  // os.windows.x86_32 and os.windows.x86_64 //
	  architecture: 'os.linux.x86_64',

	  // (--debug--) Build in debug mode (don't minify, etc). (optional) // 
      // debug: true,

	  // (--server--) Location where mobile builds connect to the Meteor server. Defaults to localhost:3000. //
	  // Can include a URL scheme (Example 1, http://example.com:80 Example 2, http://sub.example.com:80). //
	  server: 'http://xxx.xxx.xx.xx:80',

	  // default (optional) //
      // cleanAfterBuild: true,

	  // (--directory--) Output a directory (rather than a tarball) for the application server bundle. //
	  // If the output location exists, it will be recursively deleted first. //
	  // Defaults to /tmp/<uuid> (optional) //
      // buildLocation: '/my/build/folder',

	  // (--mobile-settings--) Set optional data for the initial value of Meteor.settings in your mobile //
	  // application. A new value for Meteor.settings can be set later by the server as //
	  // part of hot code push. (optional) //
      // mobileSettings: { 
      // yourMobileSetting: "setting value"
      // }

	  // (--allow-incompatible-update--) Allow packages in your project to be upgraded or downgraded //
	  // to versions that are potentially incompatible with the current versions, if required to satisfy //
	  // all package version constraints. (optional) //
    },
    env: {
      // (Example 1, http://sub.example.com Example 2, http://xxx.xxx.xx.xx). You can even use NoIP //
      // for this as long you point the domain to your IP on your server. //
      ROOT_URL: 'http://example.com',
      MONGO_URL: 'mongodb://localhost/meteor'
    },
      // log: { // (optional)
      // driver: 'syslog',
      // opts: {
      // "syslog-address":'udp://syslogserverurl.com:1234'
      // }
      // },
      // ssl: {
      // port: 443,
      // crt: 'bundle.crt',
      // key: 'private.key',
      // },
    deployCheckWaitTime: 60 // default 10
  },

  mongo: { // (optional)
    oplog: true,
    port: 27017,
    servers: {
      one: {},
    },
  },
};
```

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

### Build Options

You can define Meteor build options in `mup.js` like this:

~~~js
...
meteor: {
  buildOptions: {
    // build with the debug mode on
    debug: true,
    // mobile setting for cordova apps
    mobileSettings: {
      public: {
        'meteor-up': 'rocks',
      }
    },
    // executable used to build the meteor project
    // you can set a local repo path if needed
    executable: 'meteor',
  }
}
...
~~~

### Additional Setup/Deploy Information

#### Deploy Wait Time

Meteor Up checks if the deployment is successful or not just after the deployment. By default, it will wait 15 seconds before the check. You can configure the wait time with the `meteor.deployCheckWaitTime` option in `mup.js`.

#### SSH keys with passphrase (or ssh-agent support)

> This only tested with Mac/Linux

It's common to use passphrase enabled SSH keys to add an extra layer of protection to your SSH keys. You can use those keys with `mup` too. In order to do that, you need to use `ssh-agent`.

Here's the process:

* Remove the `pem` field from `mup.js` so your `mup.js` has `username` and `host` only.
* Start ssh agent with `eval $(ssh-agent)`
* Add your ssh key with `ssh-add <path-to-key>`
* You'll be asked to enter the passphrase to the key
* After that, simply invoke `mup` commands and they'll just work
* Once you've deployed your app, kill ssh agent with `ssh-agent -k`

#### SSH based authentication with `sudo`

**If your username is `root` or you're using AWS EC2, you don't need to follow these steps**

Please ensure your key file (pem) is not protected by a passphrase. This setup process will require NOPASSWD access to sudo. (Since Meteor needs port 80, sudo access is required.)

Make sure you also add your ssh key to the `/YOUR_USERNAME/.ssh/authorized_keys` list.

You can add your user to the sudo group:

    sudo adduser *username*  sudo

And you also need to add NOPASSWD to the sudoers file:

    sudo visudo

    # replace this line
    %sudo  ALL=(ALL) ALL

    # by this line
    %sudo ALL=(ALL) NOPASSWD:ALL

When this process is not working you might encounter the following error:

    'sudo: no tty present and no askpass program specified'

#### Server Setup Details

Meteor Up uses Docker to run and manage your app. It uses [MeteorD](https://github.com/meteorhacks/meteord) behind the scenes. Here's how we manage and utilize the server.

* Your currently running meteor bundle lives at `/opt/<appName>/current`
* We have a demonized docker container running the above bundle
* The docker container is started with `--restart=always` flag and it'll re-spawn the container if it dies
* Logs are maintained via Docker
* If you decided to use MongoDB, it will be running as its own Docker container. It's bound to the local interface and to port `27017` (you cannot access it from the outside)
* The database is named `<appName>`

#### Multiple Deployment Targets

You can use an array to deploy to multiple servers at once.

To deploy to *different* environments (e.g. staging, production, etc.), use separate Meteor Up configurations in separate directories, with each directory containing separate `mup.js` and `settings.json` files, and the `mup.js` files' `app` field pointing back to your app's local directory.

### Accessing the Database

You can't access the MongoDB from outside the server. To access the MongoDB shell you need to log into your server via SSH first and then run the following command:

    docker exec -it mongodb mongo <appName>

> Later on we'll be using a separate MongoDB instance for every app.

### Multiple Deployments

Meteor Up supports multiple deployments to a single server. Meteor Up only does the deployment; if you need to configure subdomains, you need to manually set up a reverse proxy yourself.

Let's assume we need to deploy production and staging versions of the app to the same server. The production app runs on port 80 and the staging app runs on port 8000.

We need to have two separate Meteor Up projects. For that, create two directories and initialize Meteor Up and add the necessary configurations.

In the staging `mup.js`, add a field called `appName` with the value `staging`. You can add any name you prefer instead of `staging`. Since we are running our staging app on port 8000, add an environment variable called `PORT` with the value 8000.

You might also have to tell docker to use this custom port like this:

```js
meteor: {
  ...
  port: 8000
  ...
}
```

Now set up both projects and deploy as you need.

### Changing `appName`

It's pretty okay to change the `appName`. But before you do so, you need to stop the project with older `appName`.

### Custom configuration and settings files

You can keep multiple configuration and settings files in the same directory and pass them to mup using the command parameters `--settings` and `--config`. For example, to use a file `mup-staging.js` and `staging-settings.json`, add the parameters like this:

    mup deploy --config=mup-staging.js --settings=staging-settings.json

### SSL Support

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

### Build Options

You can define Meteor build options in `mup.js` like this:

~~~js
...
meteor: {
  buildOptions: {
    // build with the debug mode on
    debug: true,
    // mobile setting for cordova apps
    mobileSettings: {
      public: {
        'meteor-up': 'rocks',
      }
    },
    // executable used to build the meteor project
    // you can set a local repo path if needed
    executable: 'meteor',
  }
}
...
~~~

### Additional Setup/Deploy Information

#### Deploy Wait Time

Meteor Up checks if the deployment is successful or not just after the deployment. By default, it will wait 15 seconds before the check. You can configure the wait time with the `meteor.deployCheckWaitTime` option in `mup.js`.

#### SSH keys with passphrase (or ssh-agent support)

> This only tested with Mac/Linux

It's common to use passphrase enabled SSH keys to add an extra layer of protection to your SSH keys. You can use those keys with `mup` too. In order to do that, you need to use `ssh-agent`.

Here's the process:

* Remove the `pem` field from `mup.js` so your `mup.js` has `username` and `host` only.
* Start ssh agent with `eval $(ssh-agent)`
Remove old mongodb container with: `docker rm -f mongodb`
If present remove nginx container with: `docker rm -f meteor-frontend`

Then do `mup setup` and then `mup deploy`.

### FAQ

Q) I get a deploy verification error with logs like below (Similar to [issue 88](https://github.com/kadirahq/meteor-up/issues/88))
```
Verifying Deployment: FAILED

Error:
-----------------------------------STDERR-----------------------------------
 run:
npm WARN deprecated
npm WARN deprecated   npm -g install npm@latest
npm WARN deprecated
```

A) Try increasing the value of the `deployCheckWaitTime` field in `mup.js`.


Q) I get "Windows script error" in Windows. ([issue 185](https://github.com/kadirahq/meteor-up/issues/185))

A) This happens because Windows tries to run the `mup.js` config file instead of the actual `mup` binary. Use the absolute path to the `mup` binary: `C:/<where mup is installed>/mup setup`


Q) Mup commands silently fail when I have a `~` in a relative path. ([issue 189](https://github.com/kadirahq/meteor-up/issues/189))

A) Mup doesn't support the `~` alias for the home directory, use the absolute path instead.
