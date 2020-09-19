const moment = require('moment')

const constants = require('./constants')

const relativeDate = timestamp => moment(timestamp).calendar({
  lastWeek: '[Last] dddd',
  lastDay: '[Yesterday]',
  sameDay: '[Today]',
  nextDay: '[Tomorrow]',
  nextWeek: '[Coming] dddd',
  sameElse: function () { return `[${this.fromNow()}]` }
})

const absoluteDate = timestamp => moment(timestamp).format('Do MMMM, YYYY')

const insertUrls = post => {
  post.urls = {
    api: constants.api.blogPosts.retrieve(post.slug),
    portfolio: constants.portfolio.post(post.slug)
  }
}

const insertDates = post => {
  post.publicationDate = {
    absolute: absoluteDate(post.publicationDate),
    relative: relativeDate(post.publicationDate)
  }
}

module.exports = {
  relativeDate,
  absoluteDate,
  insertUrls,
  insertDates
}
