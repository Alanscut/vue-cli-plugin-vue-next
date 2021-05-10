jest.autoMockOff()

const { defineTest } = require('jscodeshift/dist/testUtils')

defineTest(__dirname, 'index', null, 'lifecycle')
defineTest(__dirname, 'index', null, 'arrow-function')
