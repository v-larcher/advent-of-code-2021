import { trim, uniq } from 'lodash-es'

const formatData = input => {
  const edges = input.map(line => trim(line).split('-'))
  const caves = uniq(edges.flat())
  let graph = {}

  caves.forEach(cave => {
    graph[cave] = []
  })

  edges.forEach(edge => {
    edge[1] !== 'start' && graph[edge[0]].push(edge[1])
    edge[0] !== 'start' && graph[edge[1]].push(edge[0])
  })

  graph['end'] = []

  return graph
}

function countPaths(graph, canVisitTwice = false) {
  let count = 0
  let queue = graph['start'].map(neighborCave => ['start', neighborCave])

  while (queue.length) {
    const path = queue.pop()

    graph[path[path.length - 1]].forEach(neighborCave => {
      if (neighborCave === 'end') {
        count += 1
        //console.log({ path: [...path, neighborCave].join() })
        //console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
        return
      }

      if (neighborCave === neighborCave.toLowerCase() && path.includes(neighborCave)) {
        const smallCaves = path.filter(x => x === x.toLowerCase())

        if (!canVisitTwice || smallCaves.length !== uniq(smallCaves).length) {
          return
        }
      }

      queue.push([...path, neighborCave])
    })
  }
  return count
}

const firstSolution = graph => {
  return countPaths(graph)
}

const secondSolution = graph => {
  return countPaths(graph, true)
}

const input = `LP-cb
PK-yk
bf-end
PK-my
end-cb
BN-yk
cd-yk
cb-lj
yk-bf
bf-lj
BN-bf
PK-cb
end-BN
my-start
LP-yk
PK-bf
my-BN
start-PK
yk-EP
lj-BN
lj-start
my-lj
bf-LP`.split('\n')

const graph = formatData(input)

console.log({ firstSolution: firstSolution(graph) })
console.log({ secondSolution: secondSolution(graph) })
