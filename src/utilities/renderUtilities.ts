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
export function pad(pad: string, str: string, padLeft: boolean) {
    if (typeof str === 'undefined') 
        return pad;
    if (padLeft) {
        return (pad + str).slice(-pad.length);
    } else {
        return (str + pad).substring(0, pad.length);
    }
}