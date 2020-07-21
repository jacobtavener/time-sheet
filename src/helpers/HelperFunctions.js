function msToMins(ms) {
  return  `${Math.ceil(ms / 60000)} mins`
}

function msToHMS(ms) {
  let seconds = Math.ceil(ms / 1000),
      hours = parseInt( seconds / 3600 )
  seconds = seconds % 3600
  let minutes = parseInt( seconds / 60 )
  seconds = seconds % 60
  return `${hours >= 10 ? hours : '0'+hours}:${minutes >= 10 ? minutes : '0'+minutes}:${seconds >= 10 ? seconds : '0'+seconds}`
}

export {msToMins, msToHMS}
