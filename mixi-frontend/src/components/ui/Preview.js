import PreviewActive from "./PreviewActive";
import PreviewInactive from "./PreviewInactive";

function Preview(props) {

    return (
        <div className="preview">
            {/* {() => {
                if (props.activePossibleDrink>0) {
                    //console.log(props.activePossibleDrink);
                    <h1>{props.possibleDrinks[props.activePossibleDrink - 1].name}</h1>

                }
            }} */}
            {props.activePossibleDrink > 0 ?
                //console.log(props.activePossibleDrink);
                <h1>{props.possibleDrinks[props.activePossibleDrink - 1].name}</h1> : <></>

            }
            {/* <p>
                Aktiv: {props.activePossibleDrink}
            </p> */}
            {props.activePossibleDrink!=null ? <PreviewActive activePossibleDrink={props.activePossibleDrink} possibleDrinks={props.possibleDrinks} baseDrinks={props.baseDrinks}  /> : <PreviewInactive />}

        </div>
    )
}
export default Preview;