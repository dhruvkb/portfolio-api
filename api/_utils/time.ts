import dayjs from 'dayjs'

import calendarPlugin from 'dayjs/plugin/calendar'
import relativeDatePlugin from 'dayjs/plugin/relativeTime'
import advancedFormatPlugin from 'dayjs/plugin/advancedFormat'

import { titleCase } from './string'

dayjs.extend(calendarPlugin)
dayjs.extend(relativeDatePlugin)
dayjs.extend(advancedFormatPlugin)

/**
 * Get the absolute representation to the date given as a timestamp. This date
 * is more conveniently human readable.
 *
 * Input format:  2019-10-01
 * Output format: 1st October, 2019
 *
 * @param {string} timestamp - the timestamp to represent as an absolute date
 */
export const absoluteDate = (timestamp: string): string => {
  const time: dayjs.Dayjs = dayjs(timestamp)
  return time.format('Do MMMM, YYYY')
}

/**
 * Get the relative representation of the date given as a timestamp. This date
 * is easier to comprehend from a time-elapsed-since perspective.
 *
 * Input format:  2019-10-01
 * Output format: Varies relative to the present day
 *
 * @param {string} timestamp - the timestamp to represent as a relative date
 */
export const relativeDate = (timestamp: string): string => {
  const time: dayjs.Dayjs = dayjs(timestamp)
  let relativeDate: string = dayjs().calendar(time, {
    lastWeek: '[Last] dddd',
    lastDay: '[Yesterday]',
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: '[Coming] dddd',
    sameElse: `[${time.fromNow()}]`
  })
  relativeDate = titleCase(relativeDate)
  return relativeDate
}
