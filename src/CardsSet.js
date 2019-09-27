import React,{Component} from "react"
import Card from "./Card"
import Navbar from "./Navbar"
import "./CardsSet.css"

class CardsSet extends Component{
	static defaultProps = {
	  allColors: ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond",
	              "Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate",
	              "Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod",
	              "DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange",
	              "DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey",
	              "DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue",
	              "FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod",
	              "Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki",
	              "Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan",
	              "LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon",
	              "LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow",
	              "Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid",
	              "MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise",
	              "MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy",
	              "OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen",
	              "PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue",
	              "Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen",
	              "SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen",
	              "SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke",
	              "Yellow","YellowGreen"],
		pairsNumber:10
	};
	constructor(props){
		super(props)
		const shuffled = props.allColors.sort(() => 0.5 - Math.random());
		const usedColors=shuffled.slice(0,props.pairsNumber)
		const doubleUsedColors=usedColors.concat(usedColors)
		var finalCardsColors=doubleUsedColors.sort(()=>0.5-Math.random())
		this.state={
			cardsData:finalCardsColors.map((c,i)=>{
				return {id:i, color:c, show:false, guessed:false}
			}),
			anotherShowId:null,
			active:true
		}
		this.handleShow=this.handleShow.bind(this)
		this.handleNewGame=this.handleNewGame.bind(this)
	}


handleNewGame(){
		const shuffled = this.props.allColors.sort(() => 0.5 - Math.random());
		const usedColors=shuffled.slice(0,this.props.pairsNumber)
		const doubleUsedColors=usedColors.concat(usedColors)
		var finalCardsColors=doubleUsedColors.sort(()=>0.5-Math.random())
		this.setState({
			cardsData:finalCardsColors.map((c,i)=>{
				return {id:i, color:c, show:false, guessed:false}
			}),
			anotherShowId:null,
			active:true
		})
}

	handleShow(id){
		if (!this.state.active) {
			console.log("no active")
			return
		}
		if (this.state.cardsData[id].show) return

		var {anotherShowId,active}=this.state
		var cardsData=JSON.parse(JSON.stringify(this.state.cardsData))
		cardsData[id].show=true;
		active=false
		this.setState({cardsData,active},
				()=>{
					var wait=false
					if(anotherShowId!==null){
						if(cardsData[anotherShowId].color===cardsData[id].color){
							cardsData[anotherShowId].guessed=true
							cardsData[id].guessed=true
						}else{
							cardsData[anotherShowId].show=false;
							cardsData[id].show=false;
							wait=true
						}
						anotherShowId=null
					}else{
						anotherShowId=id
					}
					active=true
					if (wait){
						setTimeout(()=>this.setState({cardsData,anotherShowId,active}),1000)
					}else{
						this.setState({cardsData,anotherShowId,active})	
					}		
				}
			)
		
	}

	render(){
		var Cards=this.state.cardsData.map(c=><Card key={c.id} id={c.id} color={c.color} show={c.show} onShow={this.handleShow}/>)
		return(
			<div>
			<Navbar onNewGame={this.handleNewGame}/>
			<div className="CardsSet">
			{Cards}
			</div>
			</div>
			)
	}
}

export default CardsSet