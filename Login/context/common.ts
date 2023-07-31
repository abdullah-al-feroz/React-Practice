import CryptoJS from "crypto-js";
import { AUTH_DATA, SYSTEM_SETTINGS_DATA } from "./constants";

const simplifyAuthData = (data:any) => {
    if (data && data.userQuery && data.userQuery.authorize){
        return data.userQuery.authorize;
    }
    return data;
};

export const DateFormat = new Intl.DateTimeFormat("en-US", { day: "numeric", month: "long", year: "numeric" });

export const AddDays = (date=new Date(), days:any) => new Date(date.getTime() + (days * 24 * 60 * 60 * 1000));

export const Auth = {
    key: () => CryptoJS.enc.Hex.parse("4033646b666a3538363033242529283e3c4a6543212b2d").toString(CryptoJS.enc.Utf8),

    get: () => {
        if(typeof(window) !== 'undefined'){
            var encrypted = window && localStorage && localStorage.getItem(AUTH_DATA);
            if (encrypted == null) {
                return null;
            }
    
            try {
                const aes = CryptoJS.AES;
                const key = Auth.key();
                const utf8 = CryptoJS.enc.Utf8;
                const decrypted = aes.decrypt(encrypted, key, { format: JsonFormatter });
                if (decrypted) {
                    return JSON.parse(decrypted.toString(utf8));
                }
            } catch (e) {
                console.log("No Auth Data");
            }
        }
        return null;
    },

    set: (auth:any) => {
        try {
            const buffer = JSON.stringify(simplifyAuthData(auth));
            const aes = CryptoJS.AES;
            const key = Auth.key();
            const encrypted = aes.encrypt(buffer, key, { format: JsonFormatter });
            localStorage.setItem(AUTH_DATA, encrypted.toString());
        } catch (e) {
            console.log(e);
        }
    },

    remove: () => {
        localStorage.removeItem(AUTH_DATA);
    }
}


const InitialSystemSettings = {
    Title: "",
    // Logo: "/static/media/PocketX1.c6bc4566.png",
    SalesInvoicePrintType:"a4",
    RemoveTokenOnAppClose: false
}

export const SystemSettings = {
    key: () => CryptoJS.enc.Hex.parse("4033646b666a3538363033242529283e3c4a6543212b2d").toString(CryptoJS.enc.Utf8),

    get: () => {
        
        const encrypted = localStorage.getItem(SYSTEM_SETTINGS_DATA);
        let result = {...InitialSystemSettings}
        if (encrypted == null) {
            return result;
        }

        try {
            
            const aes = CryptoJS.AES;
            const key = SystemSettings.key();
            const utf8 = CryptoJS.enc.Utf8;
            const decrypted = aes.decrypt(encrypted, key, { format: JsonFormatter });
            if (decrypted) {
                let deObject = JSON.parse(decrypted.toString(utf8));
                result = {...InitialSystemSettings, ...deObject}
                return result;
            }
        } catch (e) {
            console.log("No Auth Data");
        }
        return null;
    },

    set: (settings:any) => {
        try {
            const buffer = JSON.stringify(simplifyAuthData(settings));
            const aes = CryptoJS.AES;
            const key = SystemSettings.key();
            const encrypted = aes.encrypt(buffer, key, { format: JsonFormatter });
            localStorage.setItem(SYSTEM_SETTINGS_DATA, encrypted.toString());
        } catch (e) {
            console.log(e);
        }
    },

    generateSettings: (data:any) =>{
        const result:any = {...InitialSystemSettings};
        let keys = Object.keys(InitialSystemSettings)
        
        if(data){
            keys.forEach((a) => {
                
                let item = data.find((d:any) => d.key === a)
                if(item){
                    result[a] = item.value;
                }
            })
        }
        return result;
    },

    remove: () => {
        localStorage.removeItem(SYSTEM_SETTINGS_DATA);
    }
}

const  JsonFormatter = {
    stringify: function (cipherParams:any) {
        // create json object with ciphertext
        const jsonObj = { ".ae": cipherParams.ciphertext.toString(CryptoJS.enc.Base64), ".dq":'', ".ry":'' };

        // optionally add iv or salt
        if (cipherParams.iv) {
            jsonObj[".dq"] = cipherParams.iv.toString();
        }

        if (cipherParams.salt) {
            jsonObj[".ry"] = cipherParams.salt.toString();
        }

        // stringify json object
        return JSON.stringify(jsonObj);
    },
    parse: function (jsonStr:any) {
        // parse json string
        const jsonObj = JSON.parse(jsonStr);

        // extract ciphertext from json object, and create cipher params object
        const cipherParams = CryptoJS.lib.CipherParams.create({
            ciphertext: CryptoJS.enc.Base64.parse(jsonObj[".ae"])
        });

        // optionally extract iv or salt

        if (jsonObj[".dq"]) {
            cipherParams.iv = CryptoJS.enc.Hex.parse(jsonObj[".dq"]);
        }

        if (jsonObj[".ry"]) {
            cipherParams.salt = CryptoJS.enc.Hex.parse(jsonObj[".ry"]);
        }
        return cipherParams;
    }
};


