/* eslint-env jasmine */

'use strict';

const util = require('util');
const mock = require('seriate.mock');
const model = require('../models/model');

describe('generic microservice delete handler', function () {

  mock(model.sql);

  var objs = [
    {
      'Id': 1,
      'name': 'Temp1',
      'description': 'google.com',
      'enabled': true
    },
    {
      'Id': 2,
      'name': 'Temp2',
      'description': 'amazon.con',
      'enabled': false
    }];

  var action = require('../actions/delete')({
    srvname: 'microservice',
    actname: 'delete',
    model: model,
    dbconfig: {}
  });


  beforeEach(function (done) {

    model.sql.addMock('delete', {
      mockResults: {},
      isError: false,
      waitTime: 100,
      once: true // if true the step is un-mocked directly
    });


    done();

  });

  afterEach(function (done) {
    done();
  });

  it('should delete a obj by id', function (done) {

    var args = {
      id: objs[0].Id
    };

    var spy = spyOn(model,'deleteById').andCallThrough();

    action(args, function (err, out) {


      expect(err).toBeNull();
      expect(model.deleteById).toHaveBeenCalled();
      expect(out.statusCode).toEqual(204);
      expect(out.content).toBeDefined();
      expect(out.content[0]).toBeUndefined();

      done();
    });
  });


});
