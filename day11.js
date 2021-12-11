import { times, trim, cloneDeep } from 'lodash-es'

const ADJACENT_OCTOPUSES = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
]

const formatData = input => {
  const formattedInput = input.map(line =>
    trim(line)
      .split('')
      .map(digit => parseInt(digit, 10)),
  )

  return formattedInput
}

const isValid = (dumboOctopuses, y, x) => {
  if (y >= 0 && x >= 0 && y < dumboOctopuses.length && x < dumboOctopuses[y].length) {
    return true
  }
  return false
}

const incrementOctopuses = dumboOctopuses => {
  dumboOctopuses.forEach(line => {
    line.forEach((_, x, subArray) => {
      subArray[x] += 1
    })
  })
}

const applyFlash = dumboOctopuses => {
  let hasRippleEffect = true

  while (hasRippleEffect) {
    hasRippleEffect = false

    dumboOctopuses.forEach((line, y, array) => {
      line.forEach((digit, x, subArray) => {
        if (digit > 9) {
          hasRippleEffect = true
          subArray[x] = 0

          ADJACENT_OCTOPUSES.forEach(adjacentMove => {
            const yAdjacent = y + adjacentMove[0]
            const xAdjacent = x + adjacentMove[1]

            if (isValid(dumboOctopuses, yAdjacent, xAdjacent) && array[yAdjacent][xAdjacent] > 0) {
              array[yAdjacent][xAdjacent] += 1
            }
          })
        }
      })
    })
  }
}

const countStepFlashes = dumboOctopuses => {
  incrementOctopuses(dumboOctopuses)
  applyFlash(dumboOctopuses)
  return dumboOctopuses.flat().reduce((acc, curr) => acc + (curr === 0), 0)
}

const firstSolution = dumboOctopuses => {
  let totalFlashes = 0

  times(100, () => {
    totalFlashes += countStepFlashes(dumboOctopuses)
  })
  return totalFlashes
}

const secondSolution = dumboOctopuses => {
  let step = 0

  while (true) {
    step += 1

    const nbFlashes = countStepFlashes(dumboOctopuses)
    if (nbFlashes === dumboOctopuses.flat().length) {
      break
    }
  }
  return step
}

const input = `3113284886
2851876144
2774664484
6715112578
7146272153
6256656367
3148666245
3857446528
7322422833
8152175168`.split('\n')

const dumboOctopuses = formatData(input)

console.log({ firstSolution: firstSolution(cloneDeep(dumboOctopuses)) })
console.log({ secondSolution: secondSolution(cloneDeep(dumboOctopuses)) })
