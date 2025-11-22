import './headingText.css'
const HeadingText=({text="Marketing Dashboard",customStyle={}}:{text:string;customStyle?:any})=>{
    return (
            <p className="heading-text" style={customStyle}>{text}</p>
    )
}

export default HeadingText