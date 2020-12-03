import Application from '---test-addon-without-base-class/app';
import config from '---test-addon-without-base-class/config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';

setApplication(Application.create(config.APP));

start();
