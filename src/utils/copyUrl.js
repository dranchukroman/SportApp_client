import { toast } from "sonner";

export const copyCurrentUrl = async (redirectTo) => {
    const url = `${window.location.origin}${redirectTo}`;

    if (navigator.clipboard && window.isSecureContext) {
        try {
            await navigator.clipboard.writeText(url);
            toast.success('Link copied to clipboard');
            return;
        } catch (err) {
            toast.error("Failed to copy the link");
            console.error('Clipboard API failed, falling back:', err);
        }
    }

    const textArea = document.createElement("textarea");
    textArea.value = url;

    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        const successful = document.execCommand("copy");
        toast.success(successful ? "Link copied to clipboard!" : "Failed to copy the link");
    } catch (err) {
        toast.error("Failed to copy the link");
        console.error("Fallback copy failed:", err);
    }

    document.body.removeChild(textArea);
};