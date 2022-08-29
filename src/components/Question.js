import React from "react"
import redX from "../redX.png"

export default function Question(props){
    // console.log("Rendering Question")
    // console.log("props.revealAnswers " + props.revealAnswers)
    // console.log("Opposite " + !props.revealAnswers)

    const [answerArray, setAnswerArray] = React.useState([])
    // const [showX, setShowX] = React.useState(false)
    let showX = false
    const answerButtons = answerArray.map((answer, index) => {
        let colorClass = "btn-outline-secondary"
        
        if (props.revealAnswers === true){
            if (answer.isCorrect)
                colorClass = "btn-success"
            else if (props.selected_answer === answer.value)
                colorClass = "btn-danger"
                // setShowX(prevState => prevState = true)
                showX = true
        }

        const id = `question-${props.id}-answer-${index}`
        
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
        console.log("Question useEffect")
        setAnswerArray(prevState => prevState = [])
        
        // console.log("Answer array reset: " + JSON.stringify(answerArray))

        const newArray = props.incorrect_answers.map(answer => (
            {
                value: answer,
                isCorrect: false,
            }
        ))

        let rand = Math.floor( Math.random() * newArray.length )
        newArray.splice(rand, 0, {value: props.correct_answer, isCorrect: true})
        
        setAnswerArray(prevState => prevState = newArray)
        // console.log("Answer array new: " + JSON.stringify(answerArray))
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