import Share from "../../assets/icons/DownloadPages/Share";
import { AddToMainScreenIOS, AddToMainScreenAndroid } from "../../assets/icons/DownloadPages/AddToMainScreen";
import Plus from "../../assets/icons/DownloadPages/Plus";
import Safari from '../../assets/icons/DownloadPages/Safari'
import Copy from '../../assets/icons/DownloadPages/Copy'
import Paste from '../../assets/icons/DownloadPages/Paste'
import Android3dots from "../../assets/icons/DownloadPages/Android3dots";
import Google from "../../assets/icons/DownloadPages/Google";
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
                icon: <Android3dots />,
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