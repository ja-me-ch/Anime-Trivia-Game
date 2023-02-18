import About from '../Dialog/Content/About';
import GettingStarted from '../Dialog/Content/GettingStarted';

const GetDialogContent = function (dialogType) {
    switch (dialogType) {
        case 'about':
            return About;
        case 'gettingStarted':
            return GettingStarted;
        default:
            console.log(`dialogType of ${dialogType} is not found.`);
    }
}

export default GetDialogContent;