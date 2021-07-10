import { terminal } from "terminal-kit";

export function renderHeader(){
    let term = terminal;
    term.clear();
    // Header
    term.down(1);
    for (let index = 0; index < term.width; index++) {
        term("=");
    }
    term.down(2);
}
export function pad(pad: string | number, str: string, padLeft: boolean) {
    let padString: string;

    if (typeof pad == "string") {
        padString = pad as string;
    } else {
        
    }

    if (typeof str === 'undefined') 
        return pad;
    if (padLeft) {
        return (pad + str).slice(-padString.length);
    } else {
        return (str + pad).substring(0, padString.length);
    }
}