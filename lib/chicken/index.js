'use strict';

const path = require('path');
const Funnel = require('broccoli-funnel');

const InstanceCache = new WeakMap();

// a prototype simpler base class, with less overall functionality
class SimpleAddonBase {
  static buildInstance(_parent, project) {
    let instance = InstanceCache.get(project);

    if (instance === undefined) {
      instance = new this(...arguments);
      InstanceCache.set(project, instance);
    }

    return instance;
  }

  constructor(_, project) {
    this.project = project;
    this.babel = null;
  }

  isDevelopingAddon() {
    return true;
  }

  included() {
    this.babel = this.project.addons.find(a => a.name === 'ember-cli-babel');
  }

  treeFor(type) {
    if (!this.supportedTrees.includes(type)) {
      return;
    }

    switch (type) {
      case 'addon':
      case 'addon-test-support': {
        let tree = new Funnel(path.join(__dirname, type), {
          destDir: this.name,
        });

        return this.babel.transpileTree(tree);
      }
    }
  }
}

// This is what subclasses would be able to do
class Chicken extends SimpleAddonBase {
  name = require('./package').name;
  root = __dirname;

  supportedTrees = ['addon'];
}

module.exports = function(_parent, project) {
  return Chicken.buildInstance(_parent, project);
}
