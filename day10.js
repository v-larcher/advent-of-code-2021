import { reverse, take, trim } from 'lodash-es'

const OPENING_CHAR = ['(', '[', '{', '<']
const CLOSING_CHAR = [')', ']', '}', '>']
const POINTS_CHAR = [3, 57, 1197, 25137]

const formatData = input => {
  const formattedInput = input.map(line => trim(line))

  return formattedInput
}

const firstSolution = navigationSubsystem => {
  let points = 0
  navigationSubsystem.forEach(line => {
    const chunks = [line[0]]

    for (let index = 1; index < line.length; index++) {
      const char = line[index]

      if (CLOSING_CHAR.includes(char)) {
        const lastChar = chunks[chunks.length - 1]
        if (
          OPENING_CHAR.includes(lastChar) &&
          CLOSING_CHAR.findIndex(c => c === char) === OPENING_CHAR.findIndex(c => c === lastChar)
        ) {
          chunks.pop()
        } else {
          const indexChar = CLOSING_CHAR.findIndex(c => c === char)
          points += POINTS_CHAR[indexChar]
          break
        }
      } else {
        chunks.push(char)
      }
    }
  })

  return points
}

const secondSolution = navigationSubsystem => {
  let total = []
  navigationSubsystem.forEach(line => {
    const chunks = [line[0]]
    let hasSyntaxError = false

    for (let index = 1; index < line.length; index++) {
      const char = line[index]

      if (CLOSING_CHAR.includes(char)) {
        const lastChar = chunks[chunks.length - 1]
        if (
          OPENING_CHAR.includes(lastChar) &&
          CLOSING_CHAR.findIndex(c => c === char) === OPENING_CHAR.findIndex(c => c === lastChar)
        ) {
          chunks.pop()
        } else {
          hasSyntaxError = true
          break
        }
      } else {
        chunks.push(char)
      }
    }

    if (chunks.length > 0 && !hasSyntaxError) {
      const reverseChunks = reverse(chunks)
      let linePoints = 0

      reverseChunks.forEach(openChar => {
        linePoints *= 5
        linePoints += OPENING_CHAR.findIndex(c => c === openChar) + 1
      })
      total.push(linePoints)
    }
  })
  total = total.sort((a, b) => a - b)
  const half = Math.floor(total.length / 2)
  return total[half]
}

const input =
  `{{[<[{({<[{(<[<>{}]({}[])>)({<()<>>(<>[])}[[()<>]{<>[]}])}[{{({}<>)[(){}]}{{<>[]}(<><>)}}<{[<>{}]{[]<>}}>]]>[
    {{<((<<<[{(([[<>[]]]<(()<>){[]{}}>])}]([{[<<[]()>[()[]]>{(()[]){<><>}}][{(<>())([]{})}{{<>{}}[{}[
    {{[<{{<[[<[<<([]())>>[<<(){}>{<><>}><{<><>}<[]<>>>]]]{<([<<>[]>[[]<>]]{{()[]}})<{{[][]}(()<>)}((
    {((<<[{{{{<{[(<>)]<[<>{}](<>{})>}>{(<[[]<>]([][])>[<<>()>([]<>)])<<[{}<>](<>[])><<[]<>>{{}<>}>>}}{(
    {{{[{([[<<{{(<[]<>><[]>){[<>()][[]{}]}}{({[][]}(<>[]))}}{(((()())(<>{}))({<>()}(<><>)))([{()[]}[()[]]][{
    {[<[{((((<([<<<>[]>>(<[]{}>]]([(<>())<()<>>]))>((<{<<><>><{}<>>}[{{}{}}{{}[]}]>(<{[]()}>[{<>()}(<
    [(({({{<{[[([[()()]]{{()<>}[{}{}]}><(([]{}){[]{}}){(()<>)[()[]]}>]<<({[]()}{()()})({[]()}{<><
    {<<<<({{([[{[[()<>]{[]()}]([(){}]({}()))}{{<{}<>>}{[{}()]<(){})}}]{[{[()()]<[][]>}]}]([({<{}>(<>())})
    ({(((([{{[[[{(<><>)({}<>)}]{{{[][]}{{}()}}{{<><>}(()<>)}}]][{[{{[]<>}([]()))]}[<({[]<>}<(){}>){<<><>>({}{}
    <[[{[<{<{[{[({{}()}[{}<>])[([]())[<><>]]]<{{{}<>}[[]{}]}>}[{[{<>{}}([]{})]}])}>[{<[(({<>{}}([]()))(<{}<>><{}(
    ({[({{([(<[{(([]()))<{<>()}[()<>]>}](({{()()}[<>()]}<<<>[]>[<><>]>))>{(({<[][]>}<{[][]}[()[]]>)<[<
    {{<(<[<{{<[{[(()[])([]())}<[<>()]<<>>>}{[[()[]]{()[]}][{{}}{{}()}]}]{<<({}<>)[{}{}]>(<{}[]>{()[]})>{(
    <{<<<({[({[{{<<>()>{[]{}}}}{<<()<>>[[][]]>[<{}<>>[{}{}]]}}}{({{{()[]}[{}]}<((){}){()<>}>}<<[()<>]>[{[][]
    <<[[<{<{(<[[(({}[])[()[]]){<[]()>}]<(<<>[]>(<>[]))[[[]()]<[]()>]}]{[[{<>[]}[{}]][<[]{}>({}<>
    ((({[{{{<[([({<>[]}[()()]}[[{}[]]([]<>)]]<(((){})(<><>))([()[]](<>()))>)]<(<([[]()]({}<>))[({}[])]>)<[<<()[
    <<[{({[[([{{<<<>{}><[]()>><([][])[()[]]>}<([()[]]([]{})){(()){[][]}}}}]<{<<[<><>]<(){}>>(([]<>)<{}{}>)><
    (<[([<<((<<[({[]{}}([]{}))({[]()}<()>)]{{<()<>><(){}>}{([]{})}}>[(((()()){()}){({}<>)[()()]}){{(())<<>[]>}}
    [<{{[(<[(<[[({<>{}}<<>[]>){[<><>]{<><>}}]<<[<><>]({}())>[{{}[]}[[]{}]]>]{{{{<>()}}{<{}[]){[]{}}}}<
    (<(<(({(<<(<[{{}{}}[[]<>]]>{[<()[]>(()<>)]({[]<>}}})>>)})[[<[[{[[<[][]>{()[]}]]}[[{<{}>{[][]}}]<{
    (<{{{<[<<{{[[[{}<>]<[]>]](<[[]{}]((){})>((()[])))}<([{()<>}{<>{}})[[[]{}]{<>()}])>}>{<<[({{}{}}([]()))<([]
    (<(({[{<{<<<(([][])(()()))(<{}()>)><({[]<>}[()[]])<<(){}>[{}{}]>>>[<[[[]<>]<<>()>][[(){}](<><>)]
    [[[[[<{{{<<<{{<>()}(()[])}<{<>{}}<<>[]>>>([[{}<>][[]()]]({()()}(<>[])))>>}}[(([[((()()))[([]())[{}{}]]]{(<{
    {{({([<([{[<{[<>[]]<<><>>}[(<><>)([][])]>({[()<>]<[]()>}{<{}()>})]<([<{}{}>([]())))>}{[<(([]<>)(
    <<{<((<(<{{[([<>[]][{}<>]){({}())[()()]}]([({}())<()[]>]({{}}>)}[<<(<>{})>(<()[]>([][]))>(([<>[]]<()<>>)<[{
    {[<[<<(<{{((<{{}()}<[][]>>[[(){}]{()()}])<{[<>[]][{}{}]}{[[]{}]}>){<<{()()}{<>()}>>({[<>[]]<(){}
    {<[((<{<(<([(<()<>><[]{}>){{<>}[{}[]]}]{(<()()>((){}))({{}<>}[()[]])})[{({<>[]})<{<>{}}<[][]>
    <(<{{<(([<<{<([]{})[<><>]>{<<><>><(){}>}}<<<[]{}>>{[<><>](<>{})}>>({<{()[]}({}())><[{}[]]<(){}>>})>[{<[{{
    <<(([<[<({{{([[]<>]<{}{}>)}[{(<>[])<[][]>}{{{}{}}(<>())}]}})<({[[<<><>><<>()>][{<>[]}({}())]]<<[{}()
    <<<{{[<({<<{{{[]{}}{{}[]}}{{()[]}<{}{}>}}>{({{()<>}[<>[]]}({[]<>}(()()))){<<[]<>>{[][]}><<
    [([[{[(<[{<<[((){})<()>]><{(()())([]())}{<()<>]<[][]>}>>[{{((){}){<>[]}}<[()()](<><>)>}[[([
    (<{(<{<<{{<<[<[]<>><[][]>]{{{}{}}}>([[()[]]{[]<>}]<[()[]]<<><>>>)>[({[[]{}]({}[])}{{(){}}{<><
    [{<<<<({{[({({[]{}}[<>{}])[<<>{}>({}<>)]}{{({})}({[]{}}({}{}))}){<<{{}[]}<{}<>>>[{<>[]}<[][]>]
    {{<<({<{<[[([[()<>][[]{}>]((()[])))]([{((){}){()[]}}<<<>{}>{{}<>}>])]>}>}){([[[[(<([<>()])<<()()><[]()>>>
    [<<[(<<<<<{([{<>}]<({}{})<[]<>>>)<[[(){}]<<><>>]{{{}[]}{{}[]}}>}<{<{[]<>}([][])><[{}()]{{}[]}>}(<{<><>}{<>()
    (([(([<{(<{{<[()[]][{}[]]><<()>([]())>}[(<()<>>({}()))<{[]()}{[]()}>]}[({{[]{}}}<{<><>}(()[])>)<[{<>[]}{<>[]
    ([<{<{<[{({<{[[]()](<><>)}(<<>{}>{{}{}})><<<[]<>>{{}()}>{<(){}>[[]()]}>}[{[{{}}([]{})]]])(({{{
    [<{[{[{<[{{[(([]<>)<()<>>)(<()()><()()>)][<([]<>)<<>{}>>[(<>{}){(){}}]]}{(<{()<>}{[]{}}>(((){
    <(<{[[{<{<{(<(<>[])[{}<>]>(<{}<>>[{}[]]))[{{<>[]}([]{})}[(<>()){<>()}]]}<[((<>){()[]})[({}<>)(()[]
    {{(<[{<{<(<[<(<>[])([][])>[([][])]][<({}<>)<<><>>><[()<>]{<>{}}>]>)[(([[[]]]<<()[]>>)<[<()[]>[()[]]]([()()]
    {<({{<[([([{[[<><>]{{}{}}]}<{[{}<>]({}{})}<<()>[<>[]]>>])<(<{([]{}){[]()}}[<{}()>{{}}]>(<(<
    {<[{{{{{<[{(<({}{})[()]>[([]{}){<>()}])[{[<>[]](<>{})}<<<>[]>[()<>]>]}]>([({(<()[]>[{}[]]){{[][
    {<{{<{[[{[<<{(<>()){(){}}}>{({[][]}[[]()])([{}{}](()))}><{{<<>[]>{{}{}>}<([]<>)<<>()>>}({[[]{}][[]<>]}
    <(<[(((([{<<{{()[]}[()[]]}({[]<>}<(){}>)>({{[]{}}<<>>}{[<>[]]<()<>>})><<[<[]<>>{<><>}]({[]{}
    <([[[[<(((({[({}()){<>{}}][{<>}<()[]>]}(([()[]]<{}<>>)[<<>()>(<>[])]))<[<[[]()]{[]<>}>([<>{}]<[]{}>)](<(()[
    ([<{[{([[{[{(<(){}>(<>())){([]())[()()]}}([(<>{})<[]<>>]{<{}()>[[]()]})]<(([<>{}](<>[]))[<{}
    [[<<{[{[<[{(<{{}<>}<()<>>>([[]{}]{<><>}))<<[{}()]{<>[]}>[{{}[]}{{}<>}]>}]>[{{{<<()<>>{{}[]}
    ((<[{<({([{{(([]{})(<>()))}[[<[]<>>][[[]<>][()()]]]}[{[({})({}[])]<[[]()][[]()}>}[{[()[]]<<>
    {[(<((<{(<[[{([]()){{}()}}][{<[][]>[<>()]}{[[]][[]{}]}]][{{<()()>{<><>}}<{{}[]}{<>()}>}]>(
    {{[<(({<[{{[{(<>{})([]<>)}{{()<>}[[][]]}](((<>{})[{}[]])([{}<>]{{}[]}))}[<<[()()][<><>]><[
    {(({[[([[({{[({}{})[{}{}]][<()()>({}{})]}{(<<>{}>{()[]}){[()]({}[])}>}){((<<{}{}>{{}{}}>[<()<
    [<{(<[([(((<{<<>[]>[<>()]}({[]()}({}()))>(({<>{}}{[]})<{()<>}(<><>)>)))([<<<{}()>{<>{}}>[<[
    [{{[(<{[<([[<{<>{}}<(){}>>]{{(())}((<>[]))}]({({{}<>}[(){}])>))({<{(<><>)[<>{}]}<<[][]><<>{}>>>}((
    ([[(({({(<([({{}}[<>()])<({}{})>]((([]()>[[][]])))>)})(<<<[<{[<>](()())}[(()[])(()())]>]{([[[][]]{[]{}}
    {([({{<([[<<[[{}<>]<()()>]><{{[]}(<><>)}>><<{<{}()>[<><>]}>[[{()}{{}{}}]]>]])[({([<<()<>>([]<
    <{{{(({{[(((<([][])[{}[]]>((<>())[{}{}]))[<[[]()](<>{})>[(()()){{}[]}]]))][<[[[<<>[])(<>[])][
    <<<[[[<[[[<[[({}[])<[]<>>]([{}<>][{}[]])]><(({{}()}))({[()]<[]<>>}<[<>{}]({}{})>)]]<[[<{[]
    ({{[<[(<{<{{([<>[]])(([][]){<><>})}}{(({[]{}})<{{}}[<>{}]>){[<[]<>>{()<>}]}}>}{<(<<[<>[]](<><>)>[<()>{()
    <<[(<[{[[(({{(<>{})<{}{}>}}))<<(((()[]){(){}})([[]<>]<<>{}>})<[<{}{}>]([()]<<>[]>)>>>]]<{(((
    ({({(<<{<(<([{<>[]}<<><>>])>[(<[<>()](<>())>[<[]{}><()()>]){([[]{}])[[{}{}]{[]}]}])<[((<(){}>){([]
    {{[<<[{[<[(((({}<>){{}{}})<<<>[]>[{}[]]>)[{<{}[]>{<>()}}[<{}[]>[<>[]]]])<(<[[]()>><(<>{})<()<
    <(<(<<[<({[[(({}{})[[][]])<[{}{}][<>[]]>]]{<[{<>[]}<[]<>>]{{<>{}}{[]{}}}>{<[<><>](<>())>[[<>
    {(((({{<<<[[{[[][]>{<>{}}}{[{}{}]{()<>}}]{{[[]]}[[[][]][()()]]}]({{[[]<>][[]<>]}<{{}{}}({}
    ({([{<{(<{({[([]())[()[]]]{([]<>){<>[])}}[([[]{}](()<>))<<()<>><{}[]>>])<((<()[]>{<>[]}){{{}()
    [{<{[{[<[{(<<({}{})<()[])>(<()<>>(()))>{((<>())[{}()])<{<><>}<[]<>>>}){{(<{}{}>{<>[]})[{{}}[[]{}]]}<[
    {[{<[[[[[(<{{[()[]]{{}<>}}{([][])[(){}]}}>{{<{<>()>([]<>)>[({}{})]}{{<[]>}[[[]<>]([]<>)]}})<
    {[<{{({((<<(<({}<>)<<>[]>>({{}}[()()]))[[{<><>}[[]{}]]]>>){{<{{([]{})[<><>]}}>(([<{}{}><(){}>]{({}<>)
    {{{<[((({(<{{({}<>)[<>[]]}[([]<>){()[]}]}{(<[]<>>[[]{}])}>){<<{{[]()}[<>[]]}>[<<[]{}>[(){}]>]>
    [{{[<{[{({{<<(())<()<>}>(<{}{}><<>[]>)>[[<{}>([]{})]<<<>[]><{}[]>>]}((<{{}<>}{()()}>([()()]{{}<>})))
    ({<[<[<[<<{<[<{}[]>]>{<{{}<>}{()<>}>([()<>][<><>])}}{{[<<>()>]{{[][]}{<>()}}}{<(<>[])<<><>>><(<>{})<<><
    {{{([[<[[(((<(<>[])<<>[]>>{<{}<>>{()}}><[{(){}}({}<>)][[<>[]][{}{}]]>)([({[][]}[[]<>]){<(){}>}]
    {(<{{{<[<[[[(<<>[]>([][]))]]]>]>}}([((<<[{(<{}>(<>{})){[()()]{[][]}}}{{([]<>><{}<>>}<{{}()}(
    ([(<[[((([[((((){})({}()))({[]()}{<>()}))[([<><>])[[<>[]]<{}[]>]]]]<<({<(){}>{{}<>}}({(){}}[{}<>]))([(
    {[[[[{{[[{{<(([][]))(([]<>){[]{}})><{<{}{}>{[]<>}}<{{}<>}(()())>>}([{<[][]>{[][]}}<[<>]{<>[]}>]<{<()()>[()
    <({{[((<<<([<({}())[()<>]>(<()<>>[<><>])][{(<><>)[<>{}]}([<>{}](<>()))])(<[{(){}}[[]{}]>>)
    <((({([{<<<[((()[])[<>[]]){[<>{}](()<>)}]{[<{}[]>]<([]<>){<>{}}>}>[<<[{}[]]<(){}>>>]>{<(((<>[]){<>()}){{<
    [<(<<({<<[<{{<[]()>{{}()}}[{{}{}}{[][]}]}>[{(({}[])({}{}))<((){}){{}[]}>}{(([]{})([]{}))}]][({<<()>(<>())>{{<
    ({<({(([<{[(({(){}}{<><>}){({}[])<()()>})]<<{[[]()]<[][]>}>[{<<>[]>[[]{}]}[([]<>]]]>}[<{({{}()})((()<>)({}())
    {({[[{({{<<(<[[]{}]{<>[]}>([[]<>]))((<{}()>{()()})<<{}()><(){}>>}>{{[{[]{}}<[]()>](({}[])[<>{}])}<{[<>[]]
    [([<({{<<([<[[{}{}]((){})]<(<>[])>>][{[[<>[]]{<>()}]{<<>{}>({}())}}({[<>()]{<>[])}{<<>()>({}())})]
    [[([[(<<({([{<[]()>({})}[<()()>{()[]}]][<[{}<>>{[]{}}>])<[(<[]()>)({<>[]}<[]{}>)]>})>{[<<{{{{}[]}[{}<
    [<[{<([(<[([[([]<>){()()}][[[]<>]{{}<>}]]{[[<><>]][<<>{}><{}{}>]}){{(([])[()<>])(<<>{}><{}[]>)}}]({<((<>
    {(<(<{<<({{[[<()()><{}[]>]{<()<>>[{}{}]}][(<()()>({}{}))({<><>}<{}[]>)]}{<<([]{}){[]()}>[((){})[()
    {({[[<[<<{[(<([][])><[<><>][{}<>]>)<<{<>()}(<>[])>{({}{})[()]}>]{[{<()[]>[(){}]}[<[]()>[(){}]]]{<
    {(<[[[<(<{{{[{()()}[<>]](({}[])[[][]])}({([][])[(){}]}{{[]{}}{()<>}}}}}<{[(({}<>)<()()>){<(){}>[{}<>]}](<<<
    {{{{{[[[<[(<<([][])<<>()>>[{{}{}}{[]<>}]><{<{}{}>({}())}>)(({{<>{}}}))][({<<[]{}>>{<()()>}
    (([[({{[<<[{{({}<>)(<><>)>}([<[]<>>{{}()}]({[]()}[(){}]))]><[(((()<>)<<>[]>))[(<()[]>[()<>]){[()()][{}()]}]
    [({[[<{<{((<<([][])<()()>>{([]{})([]{})}>(<[[]<>](())><{{}[]>({}[])>))({<[{}]<()[]>><({}<>)([]<>)>}<[<()()>
    {([<<({<{[{[{([]<>){()()}}][[(<>[])<()()>]({(){}})]}[{[{[][]}<{}[]>]{<()()>>}{<{[]()}<<>()>>[({}<>)[(
    [[((<{(([<((<(<>)[()]>(<{}{}>)){<{<><>}<()[]>>([<>()]({}[]))})<{<(()()){()[]}>}[({{}{}}([]()))<{
    <{[(<{({<(<[{[{}[]]}(({}()){{}<>})]{((()[])[[]<>])<[()<>]>}>((<{<><>}([]<>)>))){[[({(){}}<<><>>)<{{
    ({([{[<{(<({<[()<>]<{}()>>[[{}{}][()()]]}[(<[]<>><{}{}>)<{{}<>}[<>()]>])>{([{<[]{}><{}<>>}<({}{}){
    <([[<<[<{({<([()<>](()<>))[{<>())<{}{}>]><[{[]<>}](([]<>)([]<>))>})[<[{((){})[()<>]}{[{}<>]<<><>>}]>]}><
    <{<[((<{[{([{(()<>)([][])}][(({}[])(()[])){{()[]}<<><>>}])<{[{[]()}<[]{}>]}<{({}{})<<><>>}<{()()}(<>{})>>>}
    {{<[<({(<[[<{(())}([<><>]([]<>))>(({<>()}<()()>){{<>()}{[]{}}})]<{([[]<>]{[]()})<<[]()>{()<>)>}<{{[
    [<([{{[[<(({{(<>())<<>()>}<[[]<>][[]{}]>}<(<{}()>(<>[]))[{[]()}[{}<>]}>)[[{[[]<>](<>{})}[[[]{}][[]{}]
    {[{([<({<{[{<(<><>)([][])>([[]<>](()()))}<{<[]<>>}[[{}()]{<>[]}]>](<<[<>()]<<>()>>([[]<>])>{{[{}{}][<>[]]}{
    {{<<<<((({(([{{}()}(<>{})]{{<>()}[()]})<[(()()){<>[]}]{<<>{}>}>)([({[]{}}<{}<>>)]<[([][]){(){})]([[]
    ({[(((<[([[[(({}<>)<()<>>)<{<>()}>]]{{(<{}[]>[<>[]])<({}<>)>}[{<<>>}{[[]{}][{}()]}]}])<<(<{{<>{}}[{}[]`.split(
    '\n',
  )

const navigationSubsystem = formatData(input)

console.log({ firstSolution: firstSolution(navigationSubsystem) })
console.log({ secondSolution: secondSolution(navigationSubsystem) })