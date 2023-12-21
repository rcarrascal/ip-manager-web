const loadReCaptcha = (siteKey) => {
    window.grecaptcha = window.grecaptcha || {};
 
    const script = document.createElement('script');
    script.src = `https://www.recaptcha.net/recaptcha/api.js?render=${siteKey}`;
    document.body.appendChild(script);
};
 
const getToken = async (siteKey, action) => {

    let token = "";
    await window.grecaptcha.execute(siteKey, { action })
        .then((res) => {
            token = res;
        });
    return token;
};
 
export { loadReCaptcha, getToken };