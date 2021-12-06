import { times, sum } from 'lodash-es'

const formatData = input => {
  const formattedInput = input.map(element => parseInt(element, 10))
  let lanternFishesByStep = Array(9)
    .fill(0)
    .map((_, index) => formattedInput.filter(fish => fish === index).length)

  return lanternFishesByStep
}

const oneDayGoesBy = lanternFishesByStep => {
  const nbOfNewParents = lanternFishesByStep.shift()

  lanternFishesByStep[6] += nbOfNewParents
  lanternFishesByStep.push(nbOfNewParents)
  return lanternFishesByStep
}

const calculatePopulationIncrease = (input, nbOfDays) => {
  let lanternFishesByStep = formatData(input)

  times(nbOfDays, _ => {
    oneDayGoesBy(lanternFishesByStep)
  })
  return sum(lanternFishesByStep)
}

const firstSolution = input => {
  return calculatePopulationIncrease(input, 80)
}

const secondSolution = input => {
  return calculatePopulationIncrease(input, 256)
}

const input =
  `1,1,1,1,2,1,1,4,1,4,3,1,1,1,1,1,1,1,1,4,1,3,1,1,1,5,1,3,1,4,1,2,1,1,5,1,1,1,1,1,1,1,1,1,1,3,4,1,5,1,1,1,1,1,1,1,1,1,3,1,4,1,1,1,1,3,5,1,1,2,1,1,1,1,4,4,1,1,1,4,1,1,4,2,4,4,5,1,1,1,1,2,3,1,1,4,1,5,1,1,1,3,1,1,1,1,5,5,1,2,2,2,2,1,1,2,1,1,1,1,1,3,1,1,1,2,3,1,5,1,1,1,2,2,1,1,1,1,1,3,2,1,1,1,4,3,1,1,4,1,5,4,1,4,1,1,1,1,1,1,1,1,1,1,2,2,4,5,1,1,1,1,5,4,1,3,1,1,1,1,4,3,3,3,1,2,3,1,1,1,1,1,1,1,1,2,1,1,1,5,1,3,1,4,3,1,3,1,5,1,1,1,1,3,1,5,1,2,4,1,1,4,1,4,4,2,1,2,1,3,3,1,4,4,1,1,3,4,1,1,1,2,5,2,5,1,1,1,4,1,1,1,1,1,1,3,1,5,1,2,1,1,1,1,1,4,4,1,1,1,5,1,1,5,1,2,1,5,1,1,1,1,1,1,1,1,1,1,1,1,3,2,4,1,1,2,1,1,3,2`.split(
    ',',
  )

console.log({ firstSolution: firstSolution(input) })
console.log({ secondSolution: secondSolution(input) })
