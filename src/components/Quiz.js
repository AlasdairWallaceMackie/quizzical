import React from "react"


import Question from "./Question"

export default function Quiz(){
    const [gameReset, setGameReset] = React.useState(false)
    const [numCorrect, setNumCorrect] = React.useState(0)
    const [revealAnswers, setRevealAnswers] = React.useState(false)
    const [questions, setQuestions] = React.useState([])
    const allQuestionsAnswered = questions.every(question => question.selectedAnswer !== "")
    const questionElements = questions.map((question, index) => {
        return (
            <Question
                key={index}
                id={question.id}
                question={question.question}
                correct_answer={question.correct_answer}
                incorrect_answers={question.incorrect_answers}
                selected_answer={question.selectedAnswer}
                handleSelectAnswer={handleSelectAnswer}
                revealAnswers={revealAnswers}
                gameReset={gameReset}
            />
        )
    })

    function handleSelectAnswer(questionId, answer){

        setQuestions(prevQuestions => prevQuestions.map(question => {
            return question.id === questionId ? 
            {...question, selectedAnswer: answer} :
            question
        }))
    }

    function checkAnswers(){
        let count = 0

        questions.forEach(question => {
            if (question.selectedAnswer === question.correct_answer)
                count += 1
        })

        setRevealAnswers(prevState => prevState=true)
        setNumCorrect(prevCount => prevCount = count)
    }

    function resetGame(){
        setGameReset(prevState => prevState=true)
    }

    React.useEffect(() => {
        setGameReset(prevState => prevState=false)
        setNumCorrect(prevState => prevState=0)
        setRevealAnswers(prevState => prevState=false)
    


        fetch("https://opentdb.com/api.php?amount=5&encode=base64")
            .then(response => response.json())
            .then(result => {
                
                const resultsArray = result.results

                //Finds each string in results, decodes from ASCII to binary
                resultsArray.forEach((question, index) => {
                    for (let key in question){
                        if(Object.hasOwn(question, key)){
                            if (typeof question[key] == "string")
                                question[key] = atob(question[key])

                            else if (question[key].constructor === Array)
                                for (var i=0; i<question[key].length; i++){
                                    question[key][i] = atob(question[key][i])
                                }
                        }
                    }

                    question['id'] = `question-${index}`
                    question['selectedAnswer'] = ""
                })

                setQuestions(prevState => prevState = resultsArray)
            })

    }, [gameReset])

    return (
        <div id="quiz" className="p-3">
            <div id="question-list">
                {questionElements}
            </div>

            {revealAnswers ?
                <div className="d-flex">
                    <button onClick={resetGame} className="btn btn-lg btn-warning me-5">Play Again?</button>
                    <h1>You got {numCorrect} correct!</h1>
                </div> :

                <button onClick={checkAnswers} className="btn btn-lg btn-warning" disabled={!allQuestionsAnswered}>SUBMIT</button>
            }
        </div>
    )
}