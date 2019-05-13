module.exports = {
  name: 'magicateball',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/magicateball/',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
