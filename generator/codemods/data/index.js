/** @type {import('jscodeshift').Transform} */
module.exports = function(fileInfo, api) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);
  // data: {} => data() { return {} }
  const dataOptions = root
    .find(j.ExportDefaultDeclaration)
    .at(0)
    .find(j.ObjectProperty, n => {
      return n.key.name === 'data';
    });

  if (!dataOptions.length) {
    return;
  }

  var index = 0;
  var findData = false;
  dataOptions.forEach(path => {
    if (
      path.parent &&
      path.parent.parent &&
      path.parent.parent.value.type === 'ExportDefaultDeclaration'
    ) {
      findData = true;
    } else if (!findData) {
      index++;
    }
  });

  dataOptions.at(index).replaceWith(({ node }) => {
    const objectExpression = node.value;

    return j.objectMethod(
      'method',
      j.identifier('data'),
      [],
      j.blockStatement([j.returnStatement(objectExpression)])
    );
  });

  return root.toSource({ lineTerminator: '\n' });
};

module.exports.parser = 'babylon';
