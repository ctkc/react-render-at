import breakpoints from './breakpoints'

export const query = device => {
  if (breakpoints[device].max === Infinity) {
    return `screen and (min-width: ${breakpoints[device].min})`
  }

  return `screen and (min-width: ${breakpoints[device].min}) and (max-width: ${breakpoints[device].max})`
}
