import React from "react"

export default function Question(props){
    const [answerArray, setAnswerArray] = React.useState([])
    const answerButtons = answerArray.map((answer, index) => {
        const id = `question-${props.id}-answer-${index}`
        return (
            <>
                <input
                    key={id}
                    id={id}
                    name={`question-${props.id}`}
                    type="radio"
                    className="btn-check"
                />
                <label className="btn btn-outline-secondary mx-3" htmlFor={id}>{answer.value}</label>
            </>
        )
    })

    React.useEffect(() => {
        const newArray = props.incorrect_answers
        let rand = Math.floor( Math.random() * newArray.length )
        
        newArray.splice(rand, 0, props.correct_answer)
        
        setAnswerArray(prevState => newArray.map(item => {
            return {
                value: item,
                status: "unselected",
            }
        }))
    }, [])

    return (
        <>
            <div className="question">
                <h5>{props.question}</h5>
                <div className="answer-set my-4">
                    {answerButtons}
                </div>
            </div>
            <hr className="hr"/>
        </>
    )
}