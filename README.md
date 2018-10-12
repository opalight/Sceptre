# Sceptre  

[![Build Status](https://travis-ci.com/opalight/Sceptre.svg?branch=master)](https://travis-ci.com/opalight/Sceptre) [![Coverage Status](https://coveralls.io/repos/github/opalight/Sceptre/badge.svg?branch=master)](https://coveralls.io/github/opalight/Sceptre?branch=master) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/1e293e38e4494d66a1c63898692fbb70)](https://www.codacy.com/app/CollinGrimm/Sceptre?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=opalight/Sceptre&amp;utm_campaign=Badge_Grade)

Simplifies running apps to basic commands


## Install (Yarn)
```shell
$ yarn add sceptre # install locally
$ yarn add sceptre --global
```
## With NPM:
```shell
$ npm install sceptre --save # install locally
$ npm install -g sceptre
```
Run `sceptre --help` for commands and options  

Sceptre can be installed locally by running
`yarn add sceptre`

## Build and Usage
```shell
$ git clone https://github.com/taydenite/Sceptre
$ cd Sceptre
$ yarn install # or npm install
$ yarn build && yarn exec
$ yarn test-only # or yarn test-coverage - to get code coverage
$ yarn docs # build the documentation
```
Use it in a project as follows:
```typescript
import { Sceptre as sceptre } from 'sceptre';
// or simply: import Sceptre from 'sceptre'
```

## To-dos
- [ ] Write all unit tests      
- [ ] Document all modules       
- [ ] Add more shrugs and emotes
- [ ] Clean up repository
- [ ] Add project to NPM registry
- [x] Add build integrations (Travis CI and Codacy)