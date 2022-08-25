import React from "react"
import {nanoid} from "nanoid"

export default function Question(props){
    const [answerArray, setAnswerArray] = React.useState([])
    const answerButtons = answerArray.map(answer => {
        const classes = "btn mx-3 " +
            (answer.isSelected ? "btn-outline-primary" : "btn-primary")
        return (
            <button className={classes}>{answer.value}</button>
        )
    })

    React.useEffect(() => {
        const newArray = props.incorrect_answers
        let rand = Math.floor( Math.random() * newArray.length )
        
        newArray.splice(rand, 0, props.correct_answer)
        
        setAnswerArray(prevState => newArray.map(item => {
            return {
                value: item,
                isSelected: false,
            }
        }))
    }, [])

    return (
        <>
            <div className="question">
                <h5>{props.question}</h5>
                <div className="my-4">
                    {answerButtons}
                </div>
            </div>
            <hr className="hr"/>
        </>
    )
}