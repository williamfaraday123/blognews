import Script from "next/script";

const AdSense = () => {
    return (
        <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3975567686262683"
            crossorigin="anonymous"
            strategy="afterInteractive"
        />
    );
};

export default AdSense;