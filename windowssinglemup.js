module.exports = {
  servers: {
    one: {
      host: 'The IP for your Digital Oceans, AWS, or EC2 ', // Your IP for Linux test or production server IP
      username: 'root',
      // pem: '/home/user/.ssh/id_rsa', // mup doesn't support '~' alias for home directory	  
      // 
      password: 'your password for your droplet after you change it', 
      // or leave blank for authenticate from ssh-agent
      // opts: { // (optional)
      // port: 22,
      // },
    }
  },
  meteor: {
      // 
    name: 'the name of you app goes here',
    path: './', 
      // lets you add docker volumes (optional) //
      // volumes: {
      // passed as '-v /host/path:/container/path' to the docker run command //
      // "/host/path": "/container/path",
      // "/second/host/path": "/second/container/path"
      // },
    docker: {
      image:'kadirahq/meteord:base', 
      // image: 'abernix/meteord:base', // use this image if using Meteor 1.4+ (optional)
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
      // (--server-only--) Skip building mobile apps even if mobile platforms have been added. (optional)  //
      serverOnly: true,
      // (--architecture--) Builds the server for a different architecture // 
      // than your developer machine's architecture. //
      architecture: 'os.linux.x86_64',
      // (--debug--) Build in debug mode (don't minify, etc). (optional) // 
      // debug: true,
      // (--server--) Location where mobile builds connect to the Meteor server. //
      server: 'http://example.com:80', // Use this if you using a domain name
      // server: 'http://xxx.xx.xxx.xx:80', // Use this if you dont have a domain name or sub domain name
      // server: 'http://sub.example.com:80', // Use this if you using a sub domain name
      // default (optional) //
      // cleanAfterBuild: true,
      // (--directory--) Output a directory (rather than a tarball) for the //
      // application server bundle. If the output location exists, it will be //
      // recursively deleted first. Defaults to /tmp/<uuid> (optional) //
      // buildLocation: '/my/build/folder',
      // (--mobile-settings--) Set optional data for the initial value of //
      // Meteor.settings in your mobile application. A new value for //
      // Meteor.settings can be set later by the server as part of hot code push. (optional) //
      // mobileSettings: { 
      // yourMobileSetting: "setting value"
      // }
      // (--allow-incompatible-update--) Allow packages in your project to be //
      // upgraded or downgraded to versions that are potentially incompatible //
      // with the current versions, if required to satisfy all package version //
      // constraints. (optional) //
    },
    env: {
      // You can even use NoIP for this as long you point the domain to your //
      // IP on your server. //
      // ROOT_URL: 'http://xxx.xx.xxx.xx', // use this if you dont have a domain name or sub domain
      ROOT_URL: 'http://example.com', // Use this if you using a domain name
      // ROOT_URL: 'http://sub.example.com', // Use this if you using a sub domain name
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
