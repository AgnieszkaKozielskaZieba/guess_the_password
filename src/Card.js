import React,{Component} from "react"
import "./Card.css"

class Card extends Component{
	static defaultProps={
		id:0,
		color:"grey",
		show:false,
		onShow(id){}
	}
	render(){
		const {id,color,show,onShow}=this.props
		var styleCard={backgroundColor:show?color:"grey"}
		return(
			<div className="Card" 
			style={styleCard}
			onClick={()=>onShow(id)}></div>
			)
	}
}

export default Card