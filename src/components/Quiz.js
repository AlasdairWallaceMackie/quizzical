import React from "react"


import Question from "./Question"

export default function Quiz(){

    const [questions, setQuestions] = React.useState([])
    const questionElements = questions.map((question, index) => {
        return (
            <Question
                key={index}
                question={question.question}
                correct_answer={question.correct_answer}
                incorrect_answers={question.incorrect_answers}
                type={question.type}
            />
        )
    })

    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&encode=base64")
            .then(response => response.json())
            .then(result => {
                
                const resultsArray = result.results
                console.log(resultsArray)

                //Finds each string in results, decodes from ASCII to binary
                resultsArray.forEach(question => {
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
                })

                setQuestions(prevState => prevState = resultsArray)
            })
    }, [])

    return (
        <div id="quiz" className="p-3">
            <div id="question-list">
                {questionElements}
            </div>

            <button className="btn btn-lg btn-success">SUBMIT</button>
        </div>
    )
}