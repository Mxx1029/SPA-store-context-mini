import React, { useContext, useState } from 'react'; // useContext is only needed, if you want to use the useContext hook for step 4 (consuming the ThemeContext)
import ReactDOM from 'react-dom';


// Create ThemeContext object
// It contains a Consumer property (Component)
// It contains a Provider property (Component)
const ThemeContext = React.createContext();
const NumberContext = React.createContext();

// Look, display is not getting any properties in!!
function Display() {
    // ThemeContext.Consumer --- this actually accesses the ThemeContext 
    // new way to yesterday (week 28, day 1)
    // return (
    //     <ThemeContext.Consumer>
    //         {/* <div className="display">
    //             Theme is {theme}
    //         </div> */}
    //         {/* new way of using (consuming) Context */}
    //         {theme => <div>Theme is {theme}</div>}
    //     </ThemeContext.Consumer>
    // )
    // another way of consuming the ThemeContext using the useContext hook (like yesterday, week 28, day 1)
    // Joel thinks this is easier to read
    
    // the useContext hook allows us to use contexts without defining a Consumer
    const contextValue = useContext(ThemeContext); 
    const number = useContext(NumberContext);
    return (
        <div onClick={() => contextValue.setTheme(contextValue.theme === "light" ? "dark" : "light")}>
            Theme is {contextValue.theme}, Number: {number}
        </div>
    )
}

// old way of receiving the data from parent via props and how to access it
// function Display(props) {
//     const theme = props.theme;
//     const lang = props.lang;
//     return (
//         <div className="display">
//             This is the display component, theme is {theme}, Language is {lang}
//         </div>
//     )
// }
// another way of receiving the data via props
// function Display(props) {
//     const { theme, lang } = props; // Object destructuring
//     return (
//         <div className="display">
//             This is the display component, theme is {theme}, Language is {lang}
//         </div>
//     )
// }
// another way of receiving the data via props
// function Display({ theme, lang }) { // Object destructuring
//     return (
//         <div className="display">
//             This is the display component, theme is {theme}, Language is {lang}
//         </div>
//     )
// }

function App() {
    const [theme, setTheme] = useState("dark"); // array destructuring always needed for the useState hook
    const contextValue = {theme, setTheme}; // creating an object here, to access it in Display, you need to access it's properties!

    // ThemeContext.Provider --- this makes our context available to all descendants
    return (
        <NumberContext.Provider value={1337}>
            <ThemeContext.Provider value={contextValue}>
                <div className="App">
                    {/* old way of passing data to children */}
                    {/* <Display theme={theme} lang="fr"/> 
                    <Display theme={theme} lang="en"/> */}
                    <Display />
                    <Display />
                </div>
            </ThemeContext.Provider>
        </NumberContext.Provider>
        
    )
}

ReactDOM.render(
    <App />,
    document.querySelector("#root")
);