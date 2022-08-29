export default function StartScreen(props){
    return (
        <div id="start-screem">
            <div className="position-absolute top-50 start-50 translate-middle text-center">
                <h1 className="display-1">Quizzical</h1>
                <h4 className="text-muted">Are you a trivia master?</h4>
                <br/>
                <button className="btn btn-lg btn-success" onClick={props.onClick}>Start Quiz</button>
            </div>
        </div>
    )
}