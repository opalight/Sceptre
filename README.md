## Sceptre  
Simplifies running apps to basic commands


Install by running
```shell
$ yarn add sceptre # install locally
$ yarn add sceptre --global
```
or with NPM:
```shell
$ (sudo) npm install sceptre --save # install locally
$ (sudo) npm install -g sceptre
```
Run `sceptre --help` for commands and options  

Sceptre can be installed locally by running
`yarn add sceptre`

## Build and Usage
```python
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

#### To-dos
- [ ] Write all unit tests      
- [ ] Document all modules       
- [ ] Add more shrugs and emotes
- [ ] Clean up repository
- [ ] Add project to NPM registry
- [ ] Add build integrations (Travis CI and Codacy)