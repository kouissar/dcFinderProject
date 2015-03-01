'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Article Schema
 */
var ArticleSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
    edate: {
    type: Date,
    required: true,
    trim: true
  },
    etime: {
    type: Date,
    required: true,
    trim: true
  },
    eplace: {
    type: String,
    required: true,
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

/**
 * Validations
 */
ArticleSchema.path('title').validate(function(title) {
  return !!title;
}, 'Title cannot be blank');
ArticleSchema.path('edate').validate(function(edate) {
  return !!edate;
}, 'Date cannot be blank');
ArticleSchema.path('etime').validate(function(etime) {
  return !!etime;
}, 'Time cannot be blank');
ArticleSchema.path('eplace').validate(function(eplace) {
  return !!eplace;
}, 'Location cannot be blank');
ArticleSchema.path('content').validate(function(content) {
  return !!content;
}, 'Content cannot be blank');

/**
 * Statics
 */
ArticleSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};

mongoose.model('Article', ArticleSchema);
