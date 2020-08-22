const moment = require('moment')

module.exports = {
  relativeDate: timestamp => moment(timestamp).calendar({
    lastWeek: '[Last] dddd',
    lastDay: '[Yesterday]',
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: '[Coming] dddd',
    sameElse: function () { return `[${this.fromNow()}]` }
  }),
  absoluteDate: timestamp => moment(timestamp).format('Do MMMM, YYYY')
}
