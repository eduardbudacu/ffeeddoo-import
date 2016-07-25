#!/usr/bin/env node
'use strict';

var Transform = {
    toJSON : function(object) {
        return JSON.parse(object);
    }
}

module.exports = Transform;