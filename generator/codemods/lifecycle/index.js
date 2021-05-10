/** @type {import('jscodeshift').Transform} */

const DEPRECATED_LIFECYCLE = Object.create(null);
DEPRECATED_LIFECYCLE.destroyed = 'unmounted';
DEPRECATED_LIFECYCLE.beforeDestroy = 'beforeUnmount';

module.exports = function(fileInfo, api) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  const renameDeprecatedLifecycle = path => {
    const name = path.node.key.name;

    if (
      DEPRECATED_LIFECYCLE[name] &&
      path.parent &&
      path.parent.parent &&
      path.parent.parent.value.type === 'ExportDefaultDeclaration'
    ) {
      path.value.key.name = DEPRECATED_LIFECYCLE[name];
    }
  };

  root.find(j.ObjectProperty).forEach(renameDeprecatedLifecycle);
  root.find(j.ObjectMethod).forEach(renameDeprecatedLifecycle);
  root.find(j.ClassProperty).forEach(renameDeprecatedLifecycle);

  return root.toSource({ lineTerminator: '\n' });
};

module.exports.parser = 'babylon';
