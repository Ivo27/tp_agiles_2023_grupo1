// const { Given, When, Then } = require('cucumber');
// const assert = require('assert');

import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'assert';
// let greeting;
import {Greeter} from './../../index'

// const assert = require('assert')
// const { When, Then } = require('@cucumber/cucumber')

When('the greeter says hello', function () {
  this.whatIHeard = new Greeter().sayHello()
});

Then('I should have heard {string}', function (expectedResponse) {
  assert.equal(this.whatIHeard, expectedResponse)
});

