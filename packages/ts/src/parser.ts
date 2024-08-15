import * as chevrotain from 'chevrotain'

// ----------------- Lexer -----------------
const createToken = chevrotain.createToken
const Lexer = chevrotain.Lexer

const LCurly = createToken({ name: 'LCurly', pattern: /{/ })
const RCurly = createToken({ name: 'RCurly', pattern: /}/ })
const LSquare = createToken({ name: 'LSquare', pattern: /\[/ })
const RSquare = createToken({ name: 'RSquare', pattern: /]/ })
const Comma = createToken({ name: 'Comma', pattern: /,/ })
const Colon = createToken({ name: 'Colon', pattern: /:/ })
const StringLiteral = createToken({
  name: 'StringLiteral',
  pattern: /(\w|\.)+/,
})
const WhiteSpace = createToken({
  name: 'WhiteSpace',
  pattern: /\s+/,
  group: Lexer.SKIPPED,
})

const tokens = [WhiteSpace, StringLiteral, RCurly, LCurly, LSquare, RSquare, Comma, Colon]

const PlaintextLexer = new Lexer(tokens)

// Labels only affect error messages and Diagrams.
LCurly.LABEL = "'{'"
RCurly.LABEL = "'}'"
LSquare.LABEL = "'['"
RSquare.LABEL = "']'"
Comma.LABEL = "','"
Colon.LABEL = "':'"

// ----------------- parser -----------------
const EmbeddedActionsParser = chevrotain.EmbeddedActionsParser

class PlaintextParser extends EmbeddedActionsParser {
  constructor() {
    super(tokens, { recoveryEnabled: true })

    const $ = this as any

    $.RULE('object', () => {
      const obj = {}

      $.CONSUME(LCurly)
      $.MANY_SEP({
        SEP: Comma,
        DEF: () => {
          Object.assign(obj, $.SUBRULE($.objectItem))
        },
      })
      $.CONSUME(RCurly)

      return obj
    })

    $.RULE('objectItem', () => {
      let lit, key, value
      const obj: any = {}

      lit = $.CONSUME(StringLiteral)
      $.CONSUME(Colon)
      value = $.SUBRULE($.value)

      key = lit.isInsertedInRecovery ? 'BAD_KEY' : lit.image
      obj[key] = value
      return obj
    })

    $.RULE('array', () => {
      const arr: any[] = []
      $.CONSUME(LSquare)
      $.MANY_SEP({
        SEP: Comma,
        DEF: () => {
          arr.push($.SUBRULE($.value))
        },
      })
      $.CONSUME(RSquare)

      return arr
    })

    $.RULE('value', () =>
      $.OR([
        {
          ALT: () => {
            return $.CONSUME(StringLiteral).image
          },
        },
        { ALT: () => $.SUBRULE($.object) },
        { ALT: () => $.SUBRULE($.array) },
      ])
    )

    this.performSelfAnalysis()
  }
}

const parser = new PlaintextParser()

// ----------------- wrapping it all together -----------------
export function parsePlaintextToCst(text: string) {
  const lexResult = PlaintextLexer.tokenize(text)

  // setting a new input will RESET the parser instance's state.
  parser.input = lexResult.tokens

  // any top level rule may be used as an entry point
  const cst = (parser as any).value()

  return {
    cst: cst,
    lexErrors: lexResult.errors,
    parseErrors: parser.errors,
  }
}
