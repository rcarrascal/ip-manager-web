window.grecaptcha = window.grecaptcha || {};
 
class Captcha {
    constructor(siteKey, action) {
        this.siteKey = siteKey;
        this.action = action;
    }
    async getToken() {
        let token = "";
        await window.grecaptcha.execute(this.siteKey, {action: this.action})
            .then((res) => {
                token = res;
            })
        return token;
    }
}
 
export default Captcha;