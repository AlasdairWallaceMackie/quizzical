import React from "react"
import redX from "../redX.png"

export default function Question(props){

    const [answerArray, setAnswerArray] = React.useState([])
    const answerButtons = answerArray.map((answer, index) => {
        const id = `question-${props.id}-answer-${index}`
        
        let colorClass = "btn-outline-secondary"
        if (props.revealAnswers === true){
            if (answer.isCorrect)
                colorClass = "btn-success"
            else if (props.selected_answer === answer.value)
                colorClass = "btn-danger"
        }

        return (
            <>
                <input
                    id={id}
                    name={props.id}
                    type="radio"
                    className={`btn-check`}
                    onChange={() => props.handleSelectAnswer(props.id, answer.value)}
                />
                <label
                    className={`btn mx-3 ${colorClass} ${props.revealAnswers ? "disable-clicks" : ""}`}
                    htmlFor={id}
                >
                    {answer.value}
                </label>
            </>
        )
    })

    React.useEffect(() => {
        setAnswerArray(prevState => prevState = [])
        
        const newArray = props.incorrect_answers.map(answer => (
            {
                value: answer,
                isCorrect: false,
            }
        ))

        let rand = Math.floor( Math.random() * newArray.length )
        newArray.splice(rand, 0, {value: props.correct_answer, isCorrect: true})
        
        setAnswerArray(prevState => prevState = newArray)
    }, [props.gameReset])

    return (
        <>
            <div className="question">
                <h5>
                    {props.revealAnswers === true && props.selected_answer !== props.correct_answer && <img src={redX} alt="Answer incorrect" className="red-x me-3"></img>}
                    {props.question}
                </h5>
                <div className="answer-set my-4">
                    {answerButtons}
                </div>
            </div>
            <hr className="hr"/>
        </>
    )
}