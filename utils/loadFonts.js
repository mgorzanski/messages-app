import { Font } from 'expo';

export async function loadFonts(callback) {
    await Font.loadAsync({
        'RobotoMono-Regular': require('./../fonts/RobotoMono-Regular.ttf'),
        'RammetoOne-Regular': require('./../fonts/RammettoOne-Regular.ttf'),
        'MuktaMahee-Regular': require('./../fonts/MuktaMahee-Regular.ttf'),
        'BebasNeue': require('./../fonts/BebasNeue.otf'),
        'Walkway Bold': require('./../fonts/Walkway-Bold.ttf'),
        'Arial': require('./../fonts/arial.ttf')
    });

    callback();
}