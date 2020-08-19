import { fill, min } from 'lodash'
import faker from 'faker'

const hashStr = (str) => {
  var hash = 0,
    i,
    chr,
    len
  if (str.length === 0) return hash
  for (i = 0, len = str.length; i < len; i++) {
    chr = str.charCodeAt(i)
    hash = (hash << 5) - hash + chr
    hash |= 0 // Convert to 32bit integer
  }
  return hash
}

const parseData = (data) => {
  const {
    allCharactersCsv: { edges: characters },
    allQuestionsCsv: { edges: questions },
  } = data
  return {
    characters: characters.map((c) => c.node),
    questions: questions.map((q) => q.node),
  }
}

const getStudio60Character = (name, characters, questions, answers) => {
  const penalties = fill(Array(characters.length), 0)
  answers.forEach((answer, questionIndex) => {
    const questionKey = `Answer_${questionIndex + 1}`
    const answerLabel = questions[questionIndex][`Answer_${answer}`]
    characters.forEach((character, characterIndex) => {
      const characterAnswerLabel = character[questionKey]
      if (characterAnswerLabel !== answerLabel) {
        penalties[characterIndex] = penalties[characterIndex] + 1
      }
    })
  })
  const minPenalty = min(penalties)
  const possibleCharacters = characters.filter(
    (_, index) => penalties[index] === minPenalty
  )
  console.log(possibleCharacters.map((c) => c.Character))

  faker.seed(hashStr(name))
  return faker.random.arrayElement(possibleCharacters)
}

export { parseData, getStudio60Character }
