// save current design in local storage
export const saveAllComponentsInLocalstorage = function (allComponentsAddedToDom) {
    //
    // wait for components to be added to DOM
    setTimeout(() => {
        // save design
        localStorage.setItem('savedCurrentDesign', JSON.stringify(allComponentsAddedToDom));
    }, 100)
}
