export default function createPassword(agentCode) {

    let result = ''

    for (const letter of agentCode) {

        let asciiCode = letter.charCodeAt(0)

        if (asciiCode <= 90 && asciiCode >= 65) {

            result += String.fromCharCode(155 - asciiCode)

        } else if (asciiCode <= 122 && asciiCode >= 97) {

            result += String.fromCharCode(219 - asciiCode)

        } else {

            result += letter
        }
    }

    return result

}