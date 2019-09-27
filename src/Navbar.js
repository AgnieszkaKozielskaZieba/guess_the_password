import React, {Component} from "react"
import "./Navbar.css"

class Navbar extends Component{

static defaultProps={
	onNewGame(){}
}
render(){
	return(
		<div className="Navbar">
		<span onClick={this.props.onNewGame}>
		New Game
		</span>
		</div>
		)
}
}

export default Navbar