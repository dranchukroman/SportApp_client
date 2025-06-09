import {ReactComponent as Share} from "../../assets/icons/share.svg";
import {ReactComponent as AddToMainScreenAndroid} from "../../assets/icons/add-to-main-screen-android.svg";
import {ReactComponent as AddToMainScreenIOS} from "../../assets/icons/add-to-main-screen-ios.svg";

import {ReactComponent as Plus} from "../../assets/icons/plus.svg";
import {ReactComponent as Safari} from '../../assets/icons/safari.svg'
import {ReactComponent as Copy} from '../../assets/icons/copy.svg'
import {ReactComponent as Paste} from '../../assets/icons/paste.svg'
import ThreeDotsMenuButton from "../../components/icons/ThreeDotsMenuButton/ThreeDotsMenuButton";
import {ReactComponent as Google} from "../../assets/icons/google.svg";
import { copyCurrentUrl } from "../../utils/copyUrl";

export const downloadInstructions = {
    iOS: {
        NotSafari: [
            {
                title: <>Tap here to <b>copy the link</b></>,
                icon: <Copy />,
                onClick: copyCurrentUrl
            },
            {
                title: <>Open <b>Safari</b></>,
                icon: <Safari />,
            },
            {
                title: <>Paste the copied link into the address bar</>,
                icon: <Paste />,
            },
        ],
        Safari: [
            {
                title: <>Tap the <b>Share</b> icon</>,
                icon: <Share />,
            },
            {
                title: <>Select <b>Add to Home Screen</b></>,
                icon: <AddToMainScreenIOS />,
            },
            {
                title: <>Finally, press <b>Add</b></>,
                icon: <Plus />,
            },
        ]
    },
    Android: {
        Supported: [
            {
                title: <>Tap the <b>three dots</b> icon</>,
                icon: <ThreeDotsMenuButton />,
            },
            {
                title: <>Select <b>Add to Home Screen</b></>,
                icon: <AddToMainScreenAndroid />,
            },
            {
                title: <>Tap <b>Add</b> to confirm</>,
                icon: <Plus />,
            },
        ],
        notSupported: [
            {
                title: <>Tap here to <b>copy the link</b></>,
                icon: <Copy />,
                onClick: copyCurrentUrl
            },
            {
                title: <>Open <b>Chrome</b></>,
                icon: <Google />,
            },
            {
                title: <>Paste the copied link into the address bar</>,
                icon: <Paste />,
            },
        ]
    },
}