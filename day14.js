import { times, trim, cloneDeep, min, max } from 'lodash-es'

const formatData = input => {
  const formattedInput = input.split('\n\n')
  const polymerTemplate = [...trim(formattedInput[0])]
  let instructions = {}

  formattedInput[1].split('\n').forEach(line => {
    const instruction = line.split(' -> ')
    instructions[instruction[0]] = instruction[1]
  })

  return { polymerTemplate, instructions }
}

const countPolymer = polymer => {
  const alphabet = {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    E: 0,
    F: 0,
    G: 0,
    H: 0,
    I: 0,
    J: 0,
    K: 0,
    L: 0,
    M: 0,
    N: 0,
    O: 0,
    P: 0,
    Q: 0,
    R: 0,
    S: 0,
    T: 0,
    U: 0,
    V: 0,
    W: 0,
    X: 0,
    Y: 0,
    Z: 0,
  }

  for (const [key, value] of Object.entries(polymer)) {
    alphabet[key[0]] += value
    alphabet[key[1]] += value
  }

  const countsValues = Object.values(alphabet).filter(Boolean)
  return max(countsValues) - min(countsValues)
}

const initObject = (instructions, polymerTemplate) => {
  const polymer = {}

  for (const [key, _] of Object.entries(instructions)) {
    polymer[key] = 0

    for (let index = 0; index < polymerTemplate.length; index += 1) {
      if (index + 1 < polymerTemplate.length) {
        if (key === `${polymerTemplate[index]}${polymerTemplate[index + 1]}`) {
          polymer[key] += 1
        }
      }
    }
  }

  return polymer
}

const polymerization = ({ nbIterations, polymerTemplate, instructions }) => {
  let polymer = initObject(instructions, polymerTemplate)

  times(nbIterations, () => {
    let newPolymer = cloneDeep(polymer)

    for (const [key, value] of Object.entries(polymer)) {
      if (value) {
        const intermediate = instructions[key]

        newPolymer[key] -= value
        newPolymer[`${key[0]}${intermediate}`] += value
        newPolymer[`${intermediate}${key[1]}`] += value
      }
    }
    polymer = newPolymer
  })

  return countPolymer(polymer) / 2
}

const firstSolution = input => {
  return polymerization({ ...input, nbIterations: 10 })
}

const secondSolution = input => {
  return polymerization({ ...input, nbIterations: 40 })
}

const input = `BSONBHNSSCFPSFOPHKPK

PF -> P
KO -> H
CH -> K
KN -> S
SS -> K
KB -> B
VS -> V
KV -> O
KP -> B
OF -> C
HB -> C
NP -> O
NS -> V
VO -> P
VF -> H
CK -> B
PC -> O
SK -> O
KF -> H
FV -> V
PP -> H
KS -> B
FP -> N
BV -> V
SB -> F
PB -> B
ON -> F
SF -> P
VH -> F
FC -> N
CB -> H
HP -> B
NC -> B
FH -> K
BF -> P
CN -> N
NK -> H
SC -> S
PK -> V
PV -> C
KC -> H
HN -> K
NO -> H
NN -> S
VC -> P
FF -> N
OO -> H
BK -> N
FS -> V
BO -> F
SH -> S
VK -> F
OC -> F
FN -> V
OV -> K
CF -> F
NV -> V
OP -> K
PN -> K
SO -> P
PS -> S
KK -> H
HH -> K
NH -> O
FB -> K
HS -> B
BB -> V
VB -> O
BH -> H
OK -> C
CC -> B
FK -> N
SN -> V
HK -> N
KH -> F
OS -> O
FO -> P
OH -> B
CP -> S
BN -> H
OB -> B
BP -> B
CO -> K
SP -> K
BS -> P
VV -> N
VN -> O
NF -> F
CV -> B
HC -> B
HV -> S
BC -> O
HO -> H
PO -> P
CS -> B
PH -> S
SV -> V
VP -> C
NB -> K
HF -> C`

console.log({ firstSolution: firstSolution(formatData(input)) })
console.log({ secondSolution: secondSolution(formatData(input)) })
