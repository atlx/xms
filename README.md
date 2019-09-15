## XMS

A Server-less LAN messenger application.

### Technical Details

#### Serverless

To accomplish a server-less system, [Multicast](https://en.wikipedia.org/wiki/Multicast) is implemented.

#### Security

Because IP addresses are temporary, and there is always the chance of a local network being compromised, certain security procedures are applied to ensure data is transmitted securely from client to client.

1. In order to verify identities, all transmitted is [digitally signed](https://en.wikipedia.org/wiki/Digital_signature).

2. All transmitted data is encrypted using [RSA asymetric encryption](https://en.wikipedia.org/wiki/RSA_(cryptosystem)).

#### Technology

The technology stack used in this project is as follows:

* [TypeScript](https://en.wikipedia.org/wiki/TypeScript)
* [Electron](https://en.wikipedia.org/wiki/Electron_(software_framework))
* [React.js](https://en.wikipedia.org/wiki/React_(JavaScript_library))
* [Wepback](https://en.wikipedia.org/wiki/Webpack)
* [SCSS](https://en.wikipedia.org/wiki/Sass_(stylesheet_language))

### Screenshots

![Preview](https://i.imgur.com/gIOT1bZ.png)

#### Build and run

1. Install packages if you haven't already done so `npm install`.
2. Run the application using `npm run dev`.

### Developer Note(s)

Rebuilding Node-SASS:

```
npm update
npm install
nodejs node_modules/node-sass/scripts/install.js

npm rebuild node-sass
```
