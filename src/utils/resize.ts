let initialWindowWidth = window.innerWidth;

//function changes/resizes the width of the left column "div which contains all TODO notes names".
export function mouseDown(event: any) {
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);
    const left = document.getElementById("left-container");
    const center = document.getElementById("center-container");
    const right = document.getElementById("right-container");
    let prevX = event.clientX;

    function mouseMove(event: any) {
        let newX = prevX - event.clientX;
        const rectCenter = center?.getBoundingClientRect();
        const rectLeft = left?.getBoundingClientRect();
        const rectRight = right?.getBoundingClientRect();

        if (rectCenter && rectLeft && right && center && left && rectRight) {

            if (right.clientWidth >= 50) {
                center.style.left = rectCenter.left - newX + "px";
                left.style.width = rectLeft.width - newX + "px";
                right.style.width = rectRight.width + newX + "px";
            }
            else {
                window.removeEventListener("mousemove", mouseMove);
                right.style.width = "8%";
                left.style.width = "92%";
                center.style.left = "92%";
            }
            prevX = event.clientX;
            //a code resets the width of all "3 divs, center, left and right" divs when a deformation in the dimensions happens. 
            let leftOfCenterDiv = center.style.left.split(".");
            if (parseInt(leftOfCenterDiv[0]) + 3 < left.clientWidth) { resetWindow(true); }
        }
    }
    function mouseUp() {
        window.removeEventListener("mousemove", mouseMove);
    }
}
// window.addEventListener("resize", resetWindow);
//functions reset the size of all the divs when called
function resetWindow(reset = false) {
    if (initialWindowWidth !== window.innerWidth || reset) {
        const left = document.getElementById("left-container");
        const center = document.getElementById("center-container");
        const right = document.getElementById("right-container");
        initialWindowWidth = window.innerWidth;
        if(right && left && center){
            right.style.width = "70%";
            left.style.width = "30%";
            center.style.left = "30%";
        }
    }
}