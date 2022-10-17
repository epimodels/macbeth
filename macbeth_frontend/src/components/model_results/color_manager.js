const colorList = {
    "black": "#000000",
    "blue": "#0000FF",
    "brinkpink": "#FF6384",
    "brown": "#A52A2A",
    "coral": "#FF7F50",
    "cyan": "#00FFFF",
    "darkblue": "#00008B",
    "darkgreen": "#006400",
    "darkorange": "#FF8C00",
    "darkred": "#8B0000",
    "gold": "#FFD700",
    "green": "#008000",
    "gray": "#808080",
    "grey": "#808080",
    "hotpink": "#FF69B4",
    "indigo": "#4B0082",
    "lightblue": "#ADD8E6",
    "lightpink": "#FFB6C1",
    "magenta": "#FF00FF",
    "maroon": "#800000",
    "navy": "#000080",
    "orange": "#FFA500",
    "orangered": "#FF4500",
    "pink": "#FFC0CB",
    "purple": "#800080",
    "red": "#FF0000",
    "salmon": "#FA8072",
    "springgreen": "#19FF64",
    "summersky": "#35A2EB",
    "yellow": "#FFFF00",
}
const colors = Object.keys(colorList);

// If no colors are provided, these are the default colors given
let colorOrder = [
    "brinkpink",
    "summersky",
    "springgreen",
    "coral",
    "gray",
    "purple",
]

/*
 * Returns a color in hexadecimal (format: "#FF5733")
 * Uses parameter index to determine what color should be given next
 * If there are no more set default colors, returns a random color
 */
export function GetNextColor(index) {
    let color = "";

    // If there exists a color for this index
    if (index < colorOrder.length) {
        color = colorList[colorOrder[index]];
    }
    else {
        color = GetRandomColor();
    }

    return color;
}

/*
 * Returns a color in hexadecimal (format: "#FF5733") corresponding to the given colorName string as long as it is one of the pre-defined colors
 * If colorName does not correspond to a color in the list, it will return a random color instead
 * colorName is not case-sensitive or space-sensitive ("R E D" would count for "red")
 */
export function GetCertainColor(colorName) {
    // make input all lowercase without spaces
    colorName = colorName.toLowerCase();
    colorName = colorName.replace(/\s+/g, '');

    let color = "";
    // If colorName is within list
    if (colorList[colorName] !== undefined) {
        color = colorList[colorName];
    }
    else
    {
        color = GetRandomColor();
    }

    return color;
}

/*
 * Returns true if parameter colorHex is a valid hex code, false if not
 */
export function TestColor(colorHex) {
    var reg=/^#(?:(?:[A-F0-9]{2}){3,4}|[A-F0-9]{3,4})$/gm;
    return reg.test(colorHex);
}

/* 
 * Returns a color in hexadecimal (format: "#FF5733")
 * Chosen randomly from pre-defined list
 */
function GetRandomColor() {
    let randomIndex = Math.floor(Math.random() * colors.length);
    return colorList[colors[randomIndex]];
}